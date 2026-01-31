import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    // Try to send email if SMTP config provided via env
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const payload = { name, email, subject, message, receivedAt: new Date().toISOString() };

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // Dynamically import nodemailer to avoid adding to server bundle if not present
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
        await transporter.sendMail({
          from: `Website <${SMTP_USER}>`,
          to: 'alejo.djm@gmail.com',
          subject: `[Website Contact] ${subject ?? '(no subject)'}`,
          text: `From: ${name} <${email}>

${message}`,
        });
        return NextResponse.json({ ok: true });
      } catch (err) {
        // fallthrough to logging
        console.error('Email send failed:', err);
      }
    }

    // Fallback: log to file
    const logDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const logPath = path.join(logDir, 'contact-submissions.log');
    fs.appendFileSync(logPath, JSON.stringify(payload) + '\n');

    return NextResponse.json({ ok: true, note: 'Logged to file (SMTP not configured)' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
