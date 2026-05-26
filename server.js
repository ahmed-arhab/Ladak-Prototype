const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const Twilio = require('twilio');
const Redis = require('ioredis');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

const USE_REDIS = !!process.env.REDIS_URL;
const redis = USE_REDIS ? new Redis(process.env.REDIS_URL) : null;

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'no-reply@ladak.com';
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY);

const OTP_TTL_MS = parseInt(process.env.OTP_TTL_MS || String(5 * 60 * 1000), 10);
const OTP_ATTEMPT_LIMIT = parseInt(process.env.OTP_ATTEMPT_LIMIT || '5', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'replace-me-with-strong-secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';
const OTP_SECRET = process.env.OTP_SECRET || 'replace-with-otp-secret';

const inMemoryStore = new Map();

function genSessionId() {
  return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(otp, sessionId) {
  return crypto.createHmac('sha256', OTP_SECRET).update(`${sessionId}|${otp}`).digest('hex');
}

async function storeSession(sessionId, obj) {
  if (USE_REDIS) {
    await redis.set(`otp:${sessionId}`, JSON.stringify(obj), 'PX', OTP_TTL_MS);
  } else {
    inMemoryStore.set(sessionId, obj);
    setTimeout(() => inMemoryStore.delete(sessionId), OTP_TTL_MS);
  }
}

async function getSession(sessionId) {
  if (USE_REDIS) {
    const raw = await redis.get(`otp:${sessionId}`);
    return raw ? JSON.parse(raw) : null;
  }
  return inMemoryStore.get(sessionId) || null;
}

async function deleteSession(sessionId) {
  if (USE_REDIS) {
    await redis.del(`otp:${sessionId}`);
  } else {
    inMemoryStore.delete(sessionId);
  }
}

async function updateSession(sessionId, partial) {
  const s = (await getSession(sessionId)) || {};
  const updated = Object.assign({}, s, partial);
  await storeSession(sessionId, updated);
  return updated;
}

async function sendEmailOtp(email, otp) {
  if (SENDGRID_API_KEY) {
    const msg = {
      to: email,
      from: SENDGRID_FROM_EMAIL,
      subject: 'Your Ladak OTP code',
      text: `Your OTP code is ${otp}. It will expire in ${Math.round(OTP_TTL_MS / 60000)} minutes.`,
      html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It expires in ${Math.round(OTP_TTL_MS / 60000)} minutes.</p>`
    };
    await sgMail.send(msg);
    return;
  }
  if (process.env.SMTP_URL) {
    const transporter = nodemailer.createTransport(process.env.SMTP_URL);
    await transporter.sendMail({
      from: SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Your Ladak OTP code',
      text: `Your OTP code is ${otp}`
    });
    return;
  }
  throw new Error('No email provider configured (SENDGRID_API_KEY or SMTP_URL required)');
}

async function sendSmsOtp(phone, otp) {
  if (!twilioSid || !twilioToken || !twilioFrom) {
    throw new Error('Twilio credentials are not fully configured.');
  }
  const client = Twilio(twilioSid, twilioToken);
  await client.messages.create({
    body: `Your Ladak OTP code is ${otp}. It expires in ${Math.round(OTP_TTL_MS / 60000)} minutes.`,
    from: twilioFrom,
    to: phone
  });
}

const createLimiter = (opts) => rateLimit(Object.assign({ windowMs: 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false }, opts));

app.post('/api/request-otp', createLimiter({ windowMs: 60 * 1000, max: 6 }), async (req, res) => {
  try {
    const { method, email, phone } = req.body;
    if (!method || (method === 'email' && !email) || (method === 'phone' && !phone)) {
      return res.status(400).json({ message: 'Missing method and destination (email or phone).' });
    }
    const otp = generateOtp();
    const sessionId = genSessionId();
    const hashed = hashOtp(otp, sessionId);
    const session = { hashed, method, dest: method === 'email' ? email : phone, createdAt: Date.now(), attempts: 0 };
    await storeSession(sessionId, session);
    try {
      if (method === 'email') await sendEmailOtp(email, otp);
      else await sendSmsOtp(phone, otp);
    } catch (err) {
      await deleteSession(sessionId);
      throw err;
    }
    return res.json({ sessionId, message: `OTP sent to ${session.dest.replace(/\s+/g, '')}.` });
  } catch (err) {
    console.error('request-otp error', err.message || err);
    return res.status(500).json({ message: err.message || 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', createLimiter({ windowMs: 60 * 1000, max: 12 }), async (req, res) => {
  try {
    const { sessionId, code } = req.body;
    if (!sessionId || !code) return res.status(400).json({ message: 'Missing sessionId or code.' });
    const session = await getSession(sessionId);
    if (!session) return res.status(400).json({ message: 'OTP session not found or expired.' });
    if (session.attempts >= OTP_ATTEMPT_LIMIT) {
      await deleteSession(sessionId);
      return res.status(429).json({ message: 'Too many failed attempts. Request a new code.' });
    }
    const candidateHash = hashOtp(String(code), sessionId);
    const storedHashBuf = Buffer.from(session.hashed, 'hex');
    const candBuf = Buffer.from(candidateHash, 'hex');
    let ok = false;
    if (storedHashBuf.length === candBuf.length) {
      ok = crypto.timingSafeEqual(storedHashBuf, candBuf);
    }
    if (!ok) {
      await updateSession(sessionId, { attempts: (session.attempts || 0) + 1 });
      return res.status(400).json({ message: 'Incorrect OTP.' });
    }
    await deleteSession(sessionId);
    const token = jwt.sign({ sub: session.dest, method: session.method }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return res.json({ message: 'OTP verified', token });
  } catch (err) {
    console.error('verify-otp error', err.message || err);
    return res.status(500).json({ message: err.message || 'Verification failed' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
