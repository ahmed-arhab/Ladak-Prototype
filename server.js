const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const Twilio = require('twilio');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000;

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getDestinationText(method, email, phone) {
  return method === 'phone' ? phone : email;
}

async function sendEmailOtp(email, otp) {
  if (!sendgridApiKey) {
    throw new Error('SendGrid API key is not configured.');
  }
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@ladak.com',
    subject: 'Your Ladak Adventure OTP code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It expires in 5 minutes.</p>`
  };
  await sgMail.send(msg);
}

async function sendSmsOtp(phone, otp) {
  if (!twilioSid || !twilioToken || !twilioFrom) {
    throw new Error('Twilio credentials are not fully configured.');
  }
  const client = Twilio(twilioSid, twilioToken);
  await client.messages.create({
    body: `Your Ladak OTP code is ${otp}. It expires in 5 minutes.`,
    from: twilioFrom,
    to: phone
  });
}

app.post('/api/send-otp', async (req, res) => {
  const { type, name, email, phone, method } = req.body;
  if (!type || !email || !phone || !method) {
    return res.status(400).json({ message: 'Missing required OTP fields.' });
  }
  const otp = generateOtp();
  const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  otpStore.set(sessionId, {
    otp,
    email,
    phone,
    method,
    createdAt: Date.now()
  });
  setTimeout(() => otpStore.delete(sessionId), OTP_TTL_MS);
  try {
    if (method === 'email') {
      await sendEmailOtp(email, otp);
    } else {
      await sendSmsOtp(phone, otp);
    }
    return res.json({ sessionId, message: `OTP sent to ${getDestinationText(method, email, phone)}.` });
  } catch (error) {
    otpStore.delete(sessionId);
    console.error('OTP send error:', error.message || error);
    return res.status(500).json({ message: error.message || 'Failed to send OTP.' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { sessionId, code } = req.body;
  if (!sessionId || !code) {
    return res.status(400).json({ message: 'Missing session ID or code.' });
  }
  const session = otpStore.get(sessionId);
  if (!session) {
    return res.status(400).json({ message: 'OTP session not found or expired.' });
  }
  const age = Date.now() - session.createdAt;
  if (age > OTP_TTL_MS) {
    otpStore.delete(sessionId);
    return res.status(400).json({ message: 'OTP has expired. Please request a new code.' });
  }
  if (session.otp !== code) {
    return res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
  }
  otpStore.delete(sessionId);
  return res.json({ message: 'OTP verified successfully.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
