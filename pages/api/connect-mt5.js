import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { userId, login, password, server } = req.body
  try {
    const brokerName = server.split('-')[0]
    const mockBalance = (Math.random() * 500 + 50).toFixed(2)
    const { error } = await supabaseAdmin.from('mt5_accounts').upsert({
      user_id: userId,
      mt5_login: login,
      mt5_password: password,
      mt5_server: server,
      broker_name: brokerName,
      balance: mockBalance,
      is_active: true
    })
    if(error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ balance: mockBalance, broker: brokerName })
  } catch(e) {
    return res.status(500).json({ error: 'Connection failed' })
  }
}
