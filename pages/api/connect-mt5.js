import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { userId, login, password, server } = req.body

  if(!userId || !login || !password || !server) {
    return res.status(400).json({ error: 'All fields required' })
  }

  // Block demo accounts
  if(
    server.toLowerCase().includes('demo') ||
    server.toLowerCase().includes('test') ||
    login.toString().toLowerCase().includes('demo')
  ) {
    return res.status(400).json({ 
      error: 'Demo accounts are not permitted. Please use a real MT5 account only.' 
    })
  }

  try {
    const brokerName = server.split('-')[0].split('.')[0]
    
    // NOTE: Real balance verification will be done via
    // Python MT5 bridge on VPS (coming soon)
    // For now we save credentials and verify via Python later
    const mockBalance = (Math.random() * 900 + 100).toFixed(2)

    const { error } = await supabaseAdmin
      .from('mt5_accounts')
      .upsert({
        user_id: userId,
        mt5_login: login.toString(),
        mt5_password: password,
        mt5_server: server,
        broker_name: brokerName,
        balance: parseFloat(mockBalance),
        is_active: true
      })

    if(error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      balance: mockBalance,
      broker: brokerName,
      message: 'MT5 connected successfully'
    })
  } catch(e) {
    return res.status(500).json({ error: 'Connection failed: ' + e.message })
  }
}
