import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || '';

async function verifyTurnstile(token: string, ip: string) {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
      remoteip: ip,
    }),
  });

  const data = await res.json();
  return data.success === true;
}

function validateForm(name: string, email: string, message: string) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  return (
    trimmedName.length >= 2 &&
    trimmedName.length <= 30 &&
    emailValid &&
    trimmedMessage.length >= 10
  );
}

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for') || ''
  const proxyChain = forwardedFor
    .split(',')
    .map(ip => ip.trim())
    .filter(Boolean)

  const realIp = proxyChain[0] || req.headers.get('x-real-ip') || 'unknown'

  const body = await req.json();

  const {
    from_name,
    from_email,
    message,
    turnstileToken,
    browserInfo,
    fingerprint,
  } = body;

  if (!turnstileToken) {
    return NextResponse.json({ error: 'Turnstile token missing' }, { status: 400 });
  }

  const verified = await verifyTurnstile(turnstileToken, realIp);
  if (!verified) {
    return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 });
  }

  if (!from_name || !from_email || !message || !validateForm(from_name, from_email, message)) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const extraData = `
IP: ${realIp  || 'error'}
Proxy Chain: ${proxyChain.join(' -> ') || 'error'}
User Agent: ${browserInfo?.userAgent || 'error'}
Language: ${browserInfo?.language || 'error'}
Platform: ${browserInfo?.platform || 'error'}
Screen: ${browserInfo?.screen || 'error'}
Timezone: ${browserInfo?.timezone || 'error'}
Fingerprint ID: ${fingerprint?.visitorId || 'error'}
Confidence: ${fingerprint?.confidence?.score || 'error'}
`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `'${from_name}' <${from_email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Yeni iletişim formu mesajı - ${from_name}`,
      text: `${message}\n\n---\n${extraData}`,
      replyTo: from_email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}
