import { supabaseAdmin } from '../../lib/supabase'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { fullName, email, mobile } = req.body
  if(!fullName || !email || !mobile) {
    return res.status(400).json({ error: 'All fields required' })
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
    const { data: existing } = await supabaseAdmin
      .from('users').select('id').eq('email', email).single()
    let userId
    if(existing) {
      await supabaseAdmin.from('users')
        .update({ otp, otp_expires_at: otpExpiry }).eq('email', email)
      userId = existing.id
    } else {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert({ 
          full_name: fullName, 
          email, 
          mobile, 
          otp, 
          otp_expires_at: otpExpiry 
        })
        .select().single()
      if(error) return res.status(400).json({ error: error.message })
      userId = user.id
    }
    await transporter.sendMail({
      from: `"GoldPulse" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your GoldPulse OTP Code',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#08080E;padding:32px;border-radius:16px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#C49E3C;font-size:32px;margin:0;font-family:serif">GoldPulse</h1>
            <p style="color:rgba(240,236,226,0.5);font-size:13px;margin-top:4px">Professional Automated Trading</p>
          </div>
          <div style="background:#0F0F1A;border:1px solid rgba(196,158,60,0.2);border-radius:12px;padding:28px;text-align:center;margin-bottom:20px">
            <p style="color:rgba(240,236,226,0.7);margin-bottom:20px;font-size:15px">Hello ${fullName},<br/>Your verification code is:</p>
            <div style="font-size:48px;font-weight:bold;letter-spacing:12px;color:#C49E3C;font-family:monospace">${otp}</div>
            <p style="color:rgba(240,236,226,0.4);font-size:12px;margin-top:20px">Valid for 10 minutes. Do not share this code.</p>
          </div>
          <p style="color:rgba(240,236,226,0.25);font-size:11px;text-align:center">
            If you did not create a GoldPulse account please ignore this email.
          </p>
        </div>
      `
    })
    return res.status(200).json({ 
      userId, 
      message: 'OTP sent to your email' 
    })
  } catch(e) {
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
}
