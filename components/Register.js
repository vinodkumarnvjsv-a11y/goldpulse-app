import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Register({ onLogin }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ fullName:'', email:'', mobile:'' })
  const [otp, setOtp] = useState(['','','','','',''])
  const [mt5, setMt5] = useState({ login:'', password:'', server:'' })
  const [balance, setBalance] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    if(step === 2) {
      const iv = setInterval(() => setTimer(t => t > 0 ? t-1 : 0), 1000)
      return () => clearInterval(iv)
    }
  }, [step])

  const sendOtp = async () => {
    if(!form.fullName || !form.email || !form.mobile) {
      setError('Please fill all fields'); return
    }
    setLoading(true); setError('')
    try {
      const res = await axios.post('/api/register', form)
      setUserId(res.data.userId)
      setStep(2); setTimer(30)
    } catch(e) {
      setError(e.response?.data?.error || 'Something went wrong')
    }
    setLoading(false)
  }

  const verifyOtp = async () => {
    const code = otp.join('')
    if(code.length < 6) { setError('Enter complete OTP'); return }
    setLoading(true); setError('')
    try {
      await axios.post('/api/verify-otp', { userId, otp: code })
      setStep(3)
    } catch(e) {
      setError(e.response?.data?.error || 'Invalid OTP')
    }
    setLoading(false)
  }

  const connectMt5 = async () => {
    if(!mt5.login || !mt5.password || !mt5.server) {
      setError('Please fill all MT5 fields'); return
    }
    setLoading(true); setError('')
    try {
      const res = await axios.post('/api/connect-mt5', { userId, ...mt5 })
      setBalance(res.data.balance)
      setStep(4)
    } catch(e) {
      setError(e.response?.data?.error || 'MT5 connection failed')
    }
    setLoading(false)
  }

  const startTrading = () => {
    onLogin({ userId, fullName: form.fullName, email: form.email })
  }

  const handleOtp = (val, idx) => {
    const newOtp = [...otp]
    newOtp[idx] = val
    setOtp(newOtp)
    if(val && idx < 5) {
      document.getElementById(`otp-${idx+1}`)?.focus()
    }
  }

  const s = {
    wrap: { minHeight:'100vh', background:'#08080E', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' },
    box: { width:'100%', maxWidth:'420px' },
    logo: { textAlign:'center', marginBottom:'32px' },
    logoIcon: { width:'52px', height:'52px', borderRadius:'14px', background:'#C49E3C', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' },
    logoText: { fontFamily:'serif', fontSize:'28px', fontWeight:'800', color:'#F0ECE2' },
    logoSpan: { color:'#C49E3C' },
    dots: { display:'flex', gap:'6px', justifyContent:'center', marginBottom:'28px' },
    dot: { width:'8px', height:'8px', borderRadius:'50%', background:'rgba(196,158,60,0.25)' },
    dotOn: { width:'22px', height:'8px', borderRadius:'4px', background:'#C49E3C' },
    card: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'20px', padding:'24px' },
    title: { fontFamily:'serif', fontSize:'22px', fontWeight:'800', color:'#F0ECE2', marginBottom:'4px' },
    sub: { fontSize:'13px', color:'rgba(240,236,226,0.45)', marginBottom:'22px', lineHeight:'1.6' },
    label: { display:'block', fontSize:'11px', color:'rgba(240,236,226,0.45)', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'7px' },
    input: { width:'100%', background:'#141424', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'11px', padding:'13px 16px', color:'#F0ECE2', fontSize:'14px', outline:'none', marginBottom:'14px' },
    btn: { width:'100%', background:'#C49E3C', color:'#08080E', border:'none', borderRadius:'12px', padding:'15px', fontSize:'14px', fontWeight:'700', cursor:'pointer', marginTop:'6px' },
    error: { background:'rgba(224,85,85,0.1)', border:'0.5px solid rgba(224,85,85,0.3)', borderRadius:'10px', padding:'12px', fontSize:'13px', color:'#E05555', marginBottom:'14px' },
    otpRow: { display:'flex', gap:'8px', marginBottom:'20px' },
    otpInp: { flex:'1', textAlign:'center', background:'#141424', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'11px', padding:'14px 6px', color:'#F0ECE2', fontSize:'22px', fontFamily:'serif', fontWeight:'700', outline:'none', width:'100%' },
    balBox: { background:'rgba(0,200,150,0.1)', border:'0.5px solid rgba(0,200,150,0.22)', borderRadius:'12px', padding:'16px', marginBottom:'16px', display:'flex', alignItems:'center', justifyContent:'space-between' },
    balLabel: { fontSize:'11px', color:'#00C896', textTransform:'uppercase', letterSpacing:'1px', fontWeight:'600' },
    balVal: { fontFamily:'serif', fontSize:'24px', fontWeight:'700', color:'#00C896' },
    row: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'0.5px solid rgba(196,158,60,0.18)' },
    rowK: { fontSize:'13px', color:'rgba(240,236,226,0.45)' },
    rowV: { fontSize:'14px', fontWeight:'600', color:'#F0ECE2' },
  }

  return (
    <div style={s.wrap}>
      <div style={s.box}>
        <div style={s.logo}>
          <div style={s.logoIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#08080E" strokeWidth="2.2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div style={s.logoText}>Gold<span style={s.logoSpan}>Pulse</span></div>
          <div style={{fontSize:'12px',color:'rgba(240,236,226,0.4)',marginTop:'4px'}}>Professional Automated Trading</div>
        </div>

        <div style={s.dots}>
          {[1,2,3,4].map(i => (
            <div key={i} style={step===i ? s.dotOn : s.dot}/>
          ))}
        </div>

        {error && <div style={s.error}>{error}</div>}

        {step === 1 && (
          <div style={s.card}>
            <div style={s.title}>Create Account</div>
            <div style={s.sub}>Join GoldPulse and start earning consistent profits from automated XAUUSD trading sessions.</div>
            <label style={s.label}>Full Name</label>
            <input style={s.input} placeholder="Your full name" value={form.fullName}
              onChange={e => setForm({...form, fullName:e.target.value})}/>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" placeholder="you@email.com" value={form.email}
              onChange={e => setForm({...form, email:e.target.value})}/>
            <label style={s.label}>Mobile Number</label>
            <input style={s.input} type="tel" placeholder="+91 98765 43210" value={form.mobile}
              onChange={e => setForm({...form, mobile:e.target.value})}/>
            <button style={s.btn} onClick={sendOtp} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP →'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={s.card}>
            <div style={s.title}>Verify Identity</div>
            <div style={s.sub}>Enter the 6-digit OTP sent to your email and mobile number.</div>
            <div style={s.otpRow}>
              {otp.map((v,i) => (
                <input key={i} id={`otp-${i}`} style={s.otpInp}
                  maxLength={1} value={v}
                  onChange={e => handleOtp(e.target.value, i)}/>
              ))}
            </div>
            <button style={s.btn} onClick={verifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(240,236,226,0.45)',marginTop:'14px'}}>
              Resend OTP in <b style={{color:'#C49E3C'}}>{timer}s</b>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={s.card}>
            <div style={s.title}>Connect MT5</div>
            <div style={s.sub}>Your credentials are encrypted with AES-256. We only place trades — never withdraw funds.</div>
            <label style={s.label}>MT5 Login ID</label>
            <input style={s.input} placeholder="e.g. 12345678" value={mt5.login}
              onChange={e => setMt5({...mt5, login:e.target.value})}/>
            <label style={s.label}>MT5 Password</label>
            <input style={s.input} type="password" placeholder="Your MT5 password" value={mt5.password}
              onChange={e => setMt5({...mt5, password:e.target.value})}/>
            <label style={s.label}>Broker Server</label>
            <input style={s.input} placeholder="e.g. Exness-Real" value={mt5.server}
              onChange={e => setMt5({...mt5, server:e.target.value})}/>
            <button style={s.btn} onClick={connectMt5} disabled={loading}>
              {loading ? 'Connecting...' : 'Connect & Verify →'}
            </button>
          </div>
        )}

        {step === 4 && (
          <div style={s.card}>
            <div style={{textAlign:'center',marginBottom:'22px'}}>
              <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'rgba(0,200,150,0.1)',border:'1.5px solid rgba(0,200,150,0.22)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00C896" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div style={{fontFamily:'serif',fontSize:'22px',fontWeight:'700',color:'#F0ECE2',marginBottom:'4px'}}>MT5 Connected!</div>
              <div style={{fontSize:'13px',color:'rgba(240,236,226,0.45)'}}>Account verified and ready to trade</div>
            </div>
            <div style={s.balBox}>
              <div>
                <div style={s.balLabel}>Account Balance</div>
                <div style={{fontSize:'11px',color:'rgba(0,200,150,0.6)',marginTop:'2px'}}>{mt5.server} · ****{mt5.login.slice(-4)}</div>
              </div>
              <div style={s.balVal}>${balance}</div>
            </div>
            <div style={{background:'#141424',border:'0.5px solid rgba(196,158,60,0.18)',borderRadius:'14px',padding:'16px',marginBottom:'18px'}}>
              <div style={s.row}><span style={s.rowK}>Broker</span><span style={s.rowV}>{mt5.server}</span></div>
              <div style={s.row}><span style={s.rowK}>Account</span><span style={s.rowV}>****{mt5.login.slice(-4)}</span></div>
              <div style={{...s.row,borderBottom:'none'}}><span style={s.rowK}>Status</span><span style={{...s.rowV,color:'#00C896'}}>Active</span></div>
            </div>
            <button style={s.btn} onClick={startTrading}>Start Trading →</button>
          </div>
        )}
      </div>
    </div>
  )
}
