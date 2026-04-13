import { supabaseAdmin } from '../../lib/supabase'

const REAL_SERVERS = [
  'Exness-Real', 'Exness-Real2', 'Exness-Real3',
  'ICMarkets-Live01', 'ICMarkets-Live02',
  'FPMarkets-Live', 'Pepperstone-Live',
  'XM.COM-Real 3', 'XM.COM-Real 4',
  'Alpari-Real', 'HFM-Live',
  'OctaFX-Real', 'FBS-Real',
]

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  const { userId, login, password, server } = req.body

  if(!userId || !login || !password || !server) {
    return res.status(400).json({ error: 'All fields required' })
  }

  if(!REAL_SERVERS.includes(server)) {
    return res.status(400).json({ error: 'Only real trading accounts allowed. Demo accounts are not permitted.' })
  }

  if(login.toString().startsWith('demo') || login.toString().length < 6) {
    return res.status(400).json({ error: 'Demo accounts are not allowed. Please use a real MT5 account.' })
  }

  try {
    const brokerName = server.split('-')[0].split('.')[0]
    const mockBalance = (Math.random() * 500 + 50).toFixed(2)

    const { error } = await supabaseAdmin
      .from('mt5_accounts')
      .upsert({
        user_id: userId,
        mt5_login: login,
        mt5_password: password,
        mt5_server: server,
        broker_name: brokerName,
        balance: mockBalance,
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
