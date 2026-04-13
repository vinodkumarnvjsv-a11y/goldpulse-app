import { supabaseAdmin } from '../../lib/supabase'

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
    if(existing) {
      await supabaseAdmin.from('users')
        .update({ otp, otp_expires_at: otpExpiry }).eq('email', email)
      return res.status(200).json({ userId: existing.id })
    }
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({ full_name: fullName, email, mobile, otp, otp_expires_at: otpExpiry })
      .select().single()
    if(error) return res.status(400).json({ error: error.message })
    console.log(`OTP for ${email}: ${otp}`)
    return res.status(200).json({ userId: user.id })
  } catch(e) {
    return res.status(500).json({ error: 'Server error' })
  }
}
