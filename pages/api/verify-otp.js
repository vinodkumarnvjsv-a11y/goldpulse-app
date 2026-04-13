import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { userId, otp } = req.body
  try {
    const { data: user } = await supabaseAdmin
      .from('users').select('otp, otp_expires_at').eq('id', userId).single()
    if(!user) return res.status(404).json({ error: 'User not found' })
    if(user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' })
    if(new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({ error: 'OTP expired' })
    }
    await supabaseAdmin.from('users')
      .update({ is_verified: true, otp: null }).eq('id', userId)
    return res.status(200).json({ message: 'Verified' })
  } catch(e) {
    return res.status(500).json({ error: 'Server error' })
  }
}
