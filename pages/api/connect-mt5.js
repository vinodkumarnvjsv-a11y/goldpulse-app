import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { userId, login, password, server } = req.body

  if(!userId || !login || !password || !server) {
    return res.status(400).json({ error: 'All fields required' })
  }

  if(server.toLowerCase().includes('demo') || 
     server.toLowerCase().includes('test')) {
    return res.status(400).json({ 
      error: 'Demo accounts not permitted. Real accounts only.' 
    })
  }

  try {
    const response = await fetch('http://45.120.138.193:8000/verify-mt5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: parseInt(login),
        password: password,
        server: server
      })
    })

    const data = await response.json()

    if(!response.ok) {
      return res.status(400).json({ 
        error: data.detail || 'MT5 connection failed' 
      })
    }

    const { error } = await supabaseAdmin
      .from('mt5_accounts')
      .upsert({
        user_id: userId,
        mt5_login: login.toString(),
        mt5_password: password,
        mt5_server: server,
        broker_name: data.broker,
        balance: data.balance,
        currency: data.currency,
        is_active: true
      })

    if(error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      balance: data.balance,
      broker: data.broker,
      currency: data.currency,
      message: 'MT5 connected and verified!'
    })

  } catch(e) {
    return res.status(500).json({ 
      error: 'Bridge connection failed: ' + e.message 
    })
  }
}
