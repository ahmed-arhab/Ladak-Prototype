Ladak-Prototype — OTP Authentication Backend

Setup

1. Copy `.env.example` to `.env` and fill in provider credentials (SendGrid or SMTP for email, Twilio for SMS). If possible, set `REDIS_URL` for persistence.

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm run dev
```

API

- POST /api/request-otp
  - body: { method: 'email'|'phone', email?: string, phone?: string }
  - returns: { sessionId, message }

- POST /api/verify-otp
  - body: { sessionId, code }
  - returns: { message, token }

Notes

- The server stores OTPs hashed using HMAC and supports Redis (recommended) or in-memory storage (development).
- On successful verification the server issues a JWT signed with `JWT_SECRET`.
- Rate limits and attempt limits are applied to mitigate abuse.
