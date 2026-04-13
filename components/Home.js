import { useState, useEffect } from 'react'
import Wallet from './Wallet'
import History from './History'

const s = {
  app: { maxWidth:'460px', margin:'0 auto', padding:'0 16px 90px', minHeight:'100vh', background:'#08080E' },
  topbar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 0 16px' },
  logoText: { fontFamily:'serif', fontSize:'20px', fontWeight:'800', color:'#F0ECE2' },
  logoSpan: { color:'#C49E3C' },
  credPill: { display:'flex', alignItems:'center', gap:'7px', background:'rgba(196,158,60,0.08)', border:'0.5px solid rgba(196,158,60,0.35)', borderRadius:'24px', padding:'8px 14px', fontSize:'13px', fontWeight:'600', color:'#C49E3C', cursor:'pointer' },
  credDot: { width:'6px', height:'6px', borderRadius:'50%', background:'#C49E3C' },
  hero: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'20px', padding:'22px', marginBottom:'14px' },
  heroEye: { fontSize:'10px', letterSpacing:'2.5px', textTransform:'uppercase', color:'#C49E3C', fontWeight:'600', marginBottom:'10px' },
  heroH: { fontFamily:'serif', fontSize:'26px', fontWeight:'800', lineHeight:'1.2', marginBottom:'8px' },
  heroEm: { color:'#C49E3C' },
  heroP: { fontSize:'13px', color:'rgba(240,236,226,0.45)', lineHeight:'1.65', marginBottom:'18px' },
  pills: { display:'flex', gap:'8px', flexWrap:'wrap' },
  pill: { background:'rgba(255,255,255,0.03)', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'20px', padding:'6px 14px', fontSize:'11px', color:'rgba(240,236,226,0.45)', fontWeight:'500' },
  pillB: { color:'#F0ECE2', fontWeight:'600' },
  ticker: { background:'rgba(0,200,150,0.1)', border:'0.5px solid rgba(0,200,150,0.22)', borderRadius:'11px', marginBottom:'18px', overflow:'hidden' },
  tickerHead: { display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', borderBottom:'0.5px solid rgba(0,200,150,0.22)' },
  tickerDot: { width:'7px', height:'7px', borderRadius:'50%', background:'#00C896' },
  tickerTitle: { fontSize:'11px', color:'#00C896', fontWeight:'600', letterSpacing:'1.5px', textTransform:'uppercase' },
  tickerScroll: { display:'flex', overflow:'hidden' },
  secLbl: { fontSize:'10px', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,236,226,0.25)', fontWeight:'600', marginBottom:'10px' },
  cdRow: { display:'flex', gap:'6px', marginBottom:'18px' },
  cdBox: { flex:'1', background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'12px', padding:'12px 6px', textAlign:'center' },
  cdNum: { fontFamily:'serif', fontSize:'26px', fontWeight:'700', color:'#C49E3C', lineHeight:'1' },
  cdLbl: { fontSize:'9px', color:'rgba(240,236,226,0.25)', textTransform:'uppercase', letterSpacing:'1.5px', marginTop:'4px' },
  cdSep: { display:'flex', alignItems:'center', paddingBottom:'18px', fontSize:'22px', color:'rgba(196,158,60,0.3)', fontWeight:'300' },
  sessCard: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'18px', padding:'22px', marginBottom:'10px' },
  sessCardFeat: { background:'#0F0F1A', border:'0.5px solid #C49E3C', borderRadius:'18px', padding:'22px', marginBottom:'10px' },
  scTop: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px' },
  scName: { fontFamily:'serif', fontSize:'20px', fontWeight:'700', color:'#F0ECE2' },
  scTime: { fontSize:'11px', color:'rgba(240,236,226,0.45)', marginTop:'4px' },
  badgeG: { fontSize:'10px', fontWeight:'600', padding:'5px 12px', borderRadius:'20px', background:'rgba(0,200,150,0.1)', color:'#00C896', border:'0.5px solid rgba(0,200,150,0.22)' },
  badgeGold: { fontSize:'10px', fontWeight:'600', padding:'5px 12px', borderRadius:'20px', background:'rgba(196,158,60,0.1)', color:'#C49E3C', border:'0.5px solid rgba(196,158,60,0.35)' },
  profLbl: { fontSize:'10px', color:'rgba(240,236,226,0.45)', textTransform:'uppercase', letterSpacing:'2px', fontWeight:'600', marginBottom:'5px' },
  profVal: { fontFamily:'serif', fontSize:'38px', fontWeight:'800', color:'#00C896', letterSpacing:'-1px', lineHeight:'1' },
  profSub: { fontSize:'12px', color:'rgba(240,236,226,0.45)', marginTop:'4px' },
  div: { height:'0.5px', background:'rgba(196,158,60,0.18)', margin:'0 0 16px' },
  meta: { display:'flex', gap:'20px', marginBottom:'18px' },
  metaItem: { fontSize:'12px', color:'rgba(240,236,226,0.45)' },
  metaB: { color:'#F0ECE2', fontWeight:'600', display:'block', marginBottom:'2px' },
  btnGold: { width:'100%', background:'#C49E3C', color:'#08080E', border:'none', borderRadius:'12px', padding:'15px', fontSize:'14px', fontWeight:'700', cursor:'pointer' },
  btnOut: { width:'100%', background:'transparent', color:'#C49E3C', border:'0.5px solid rgba(196,158,60,0.35)', borderRadius:'12px', padding:'15px', fontSize:'14px', fontWeight:'600', cursor:'pointer' },
  upRow: { display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'6px', marginBottom:'20px' },
  upCard: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'12px', padding:'12px 18px', flexShrink:'0', textAlign:'center', minWidth:'110px' },
  upTime: { fontFamily:'serif', fontSize:'15px', fontWeight:'700', color:'#F0ECE2' },
  upType: { fontSize:'10px', color:'rgba(240,236,226,0.45)', marginTop:'3px', textTransform:'uppercase', letterSpacing:'0.5px' },
  bnav: { display:'flex', justifyContent:'space-around', padding:'14px 0 8px', borderTop:'0.5px solid rgba(196,158,60,0.18)', background:'#08080E', maxWidth:'460px', margin:'0 auto' },
  nb: { display:'flex', flexDirection:'column', alignItems:'center', gap:'5px', fontSize:'9px', color:'rgba(240,236,226,0.25)', cursor:'pointer', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'600', background:'none', border:'none', fontFamily:'Inter,sans-serif', minWidth:'64px', padding:'4px' },
  nbOn: { display:'flex', flexDirection:'column', alignItems:'center', gap:'5px', fontSize:'9px', color:'#C49E3C', cursor:'pointer', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'600', background:'none', border:'none', fontFamily:'Inter,sans-serif', minWidth:'64px', padding:'4px' },
}

const tickerData = [
  {init:'RK', name:'R***l K.', broker:'Exness', acct:'****2341', amt:'+$5.00', sess:'Standard'},
  {init:'AP', name:'A***i P.', broker:'ICMarkets', acct:'****8823', amt:'+$10.00', sess:'Plus'},
  {init:'VS', name:'V***m S.', broker:'FPMarkets', acct:'****4412', amt:'+$5.00', sess:'Standard'},
  {init:'MN', name:'M***a N.', broker:'Exness', acct:'****9901', amt:'+$5.00', sess:'Standard'},
  {init:'DK', name:'D***v K.', broker:'Pepperstone', acct:'****3317', amt:'+$10.00', sess:'Plus'},
  {init:'SR', name:'S***a R.', broker:'ICMarkets', acct:'****7765', amt:'+$5.00', sess:'Standard'},
]

export default function Home({ user, onLogout }) {
  const [tab, setTab] = useState('home')
  const [time, setTime] = useState({ h:'02', m:'14', s:'37' })
  const [sessions] = useState([
    { id:1, type:'Standard', time:'06:30 PM', target:5, credits:1, minBal:50 },
    { id:2, type:'Plus', time:'06:30 PM', target:10, credits:2, minBal:100 },
  ])
  const [joining, setJoining] = useState(null)
  const [live, setLive] = useState(false)
  const [pnl, setPnl] = useState(0)
  const [pct, setPct] = useState(0)
  const [result, setResult] = useState(null)
  const [credits] = useState(12)

  useEffect(() => {
    let s=37, m=14, h=2
    const iv = setInterval(() => {
      s--
      if(s<0){s=59;m--}
      if(m<0){m=59;h--}
      if(h<0)h=0
      setTime({
        h:String(h).padStart(2,'0'),
        m:String(m).padStart(2,'0'),
        s:String(s).padStart(2,'0')
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const joinSession = (sess) => {
    setJoining(sess)
    setLive(true)
    setPnl(0); setPct(0); setResult(null)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 0.22 + 0.05
      if(p >= sess.target) {
        p = sess.target
        clearInterval(iv)
        setTimeout(() => { setLive(false); setResult(sess) }, 800)
      }
      setPnl(p)
      setPct(Math.min(100, Math.round((p/sess.target)*100)))
    }, 300)
  }

  if(live && joining) return (
    <div style={{...s.app, display:'flex', flexDirection:'column'}}>
      <div style={s.topbar}>
        <div style={s.logoText}>Gold<span style={s.logoSpan}>Pulse</span></div>
        <div style={s.credPill}><div style={s.credDot}/>{credits}.00 Credits</div>
      </div>
      <div style={{background:'#0F0F1A', border:'1.5px solid #00C896', borderRadius:'18px', padding:'24px', marginBottom:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'11px',color:'#00C896',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'22px'}}>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#00C896'}}/>
          Trade Running · XAUUSD
        </div>
        <div style={{fontFamily:'serif',fontSize:'54px',fontWeight:'800',color:'#00C896',letterSpacing:'-2px',lineHeight:'1'}}>+${pnl.toFixed(2)}</div>
        <div style={{fontSize:'13px',color:'rgba(240,236,226,0.45)',margin:'8px 0 22px'}}>Target: ${joining.target}.00</div>
        <div style={{height:'8px',background:'rgba(255,255,255,0.05)',borderRadius:'4px',overflow:'hidden',marginBottom:'6px'}}>
          <div style={{height:'100%',background:'#00C896',borderRadius:'4px',width:`${pct}%`,transition:'width 0.5s ease'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(240,236,226,0.45)',marginBottom:'16px'}}>
          <span>Progress</span><b style={{color:'#00C896'}}>{pct}%</b>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(196,158,60,0.18)',borderRadius:'10px',padding:'11px 13px'}}>
            <div style={{fontSize:'10px',color:'rgba(240,236,226,0.45)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'3px'}}>Session</div>
            <div style={{fontFamily:'serif',fontSize:'16px',fontWeight:'700',color:'#F0ECE2'}}>{joining.type}</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(196,158,60,0.18)',borderRadius:'10px',padding:'11px 13px'}}>
            <div style={{fontSize:'10px',color:'rgba(240,236,226,0.45)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'3px'}}>Asset</div>
            <div style={{fontFamily:'serif',fontSize:'16px',fontWeight:'700',color:'#F0ECE2'}}>XAUUSD</div>
          </div>
        </div>
      </div>
      <div style={{background:'rgba(196,158,60,0.05)',border:'0.5px solid rgba(196,158,60,0.18)',borderRadius:'12px',padding:'14px 16px',fontSize:'12px',color:'rgba(240,236,226,0.45)',lineHeight:'1.7'}}>
        Trade is active on your MT5. Profit will be credited automatically upon completion.
      </div>
    </div>
  )

  if(result) return (
    <div style={{...s.app}}>
      <div style={s.topbar}>
        <div style={s.logoText}>Gold<span style={s.logoSpan}>Pulse</span></div>
        <div style={s.credPill}><div style={s.credDot}/>{credits}.00 Credits</div>
      </div>
      <div style={{textAlign:'center',padding:'32px 10px 16px'}}>
        <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'rgba(0,200,150,0.1)',border:'1.5px solid #00C896',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00C896" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{fontFamily:'serif',fontSize:'26px',fontWeight:'800',color:'#00C896',marginBottom:'4px'}}>Session Complete</div>
        <div style={{fontFamily:'serif',fontSize:'56px',fontWeight:'800',letterSpacing:'-2px',color:'#F0ECE2',marginBottom:'6px'}}>+${result.target}.00</div>
        <div style={{fontSize:'13px',color:'rgba(240,236,226,0.45)',marginBottom:'26px'}}>Credited to your MT5 account</div>
        <div style={{background:'#0F0F1A',border:'0.5px solid rgba(196,158,60,0.18)',borderRadius:'16px',padding:'18px',marginBottom:'20px',textAlign:'left'}}>
          <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'0.5px solid rgba(196,158,60,0.18)'}}><span style={{fontSize:'13px',color:'rgba(240,236,226,0.45)'}}>Session</span><span style={{fontSize:'14px',fontWeight:'600',color:'#F0ECE2'}}>{result.type} · 06:30 PM</span></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'0.5px solid rgba(196,158,60,0.18)'}}><span style={{fontSize:'13px',color:'rgba(240,236,226,0.45)'}}>Profit</span><span style={{fontSize:'14px',fontWeight:'600',color:'#00C896'}}>+${result.target}.00</span></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0'}}><span style={{fontSize:'13px',color:'rgba(240,236,226,0.45)'}}>Entry fee</span><span style={{fontSize:'14px',fontWeight:'600',color:'rgba(240,236,226,0.45)'}}>-{result.credits} Credit</span></div>
        </div>
        <div style={{fontSize:'13px',color:'rgba(240,236,226,0.45)',marginBottom:'22px'}}>Next session: <b style={{color:'#F0ECE2'}}>08:45 PM</b> · Try next session to earn more</div>
        <button style={s.btnGold} onClick={() => { setResult(null); setJoining(null); setTab('home') }}>Back to Sessions →</button>
      </div>
    </div>
  )

  return (
    <div style={s.app}>
      <div style={s.topbar}>
        <div style={s.logoText}>Gold<span style={s.logoSpan}>Pulse</span></div>
        <div style={s.credPill}><div style={s.credDot}/>{credits}.00 Credits</div>
      </div>

      {tab === 'home' && <>
        <div style={s.hero}>
          <div style={s.heroEye}>Automated Session Trading</div>
          <div style={s.heroH}>Earn <span style={s.heroEm}>consistent profits</span><br/>every session</div>
          <div style={s.heroP}>Our system trades XAUUSD automatically on your MT5. Join a session, sit back, and collect your profit directly in your broker account.</div>
          <div style={s.pills}>
            <div style={s.pill}><span style={s.pillB}>XAUUSD</span> Gold</div>
            <div style={s.pill}><span style={s.pillB}>0.10</span> Fixed Lot</div>
            <div style={s.pill}><span style={s.pillB}>~20 min</span> Session</div>
          </div>
        </div>

        <div style={s.ticker}>
          <div style={s.tickerHead}>
            <div style={s.tickerDot}/>
            <div style={s.tickerTitle}>Live session profits</div>
          </div>
          <div style={{overflowX:'auto',display:'flex'}}>
            {tickerData.map((d,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 18px',borderRight:'0.5px solid rgba(0,200,150,0.22)',whiteSpace:'nowrap',flexShrink:'0'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#141424',border:'0.5px solid rgba(196,158,60,0.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:'700',color:'#C49E3C'}}>{d.init}</div>
                <div>
                  <div style={{fontSize:'12px',fontWeight:'600',color:'#F0ECE2'}}>{d.name} · {d.acct}</div>
                  <div style={{fontSize:'10px',color:'rgba(240,236,226,0.45)'}}>{d.broker} · {d.sess}</div>
                </div>
                <div style={{fontFamily:'serif',fontSize:'13px',fontWeight:'700',color:'#00C896'}}>{d.amt}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.secLbl}>Next session starts in</div>
        <div style={s.cdRow}>
          <div style={s.cdBox}><div style={s.cdNum}>{time.h}</div><div style={s.cdLbl}>hours</div></div>
          <div style={s.cdSep}>:</div>
          <div style={s.cdBox}><div style={s.cdNum}>{time.m}</div><div style={s.cdLbl}>minutes</div></div>
          <div style={s.cdSep}>:</div>
          <div style={s.cdBox}><div style={s.cdNum}>{time.s}</div><div style={s.cdLbl}>seconds</div></div>
        </div>

        <div style={s.secLbl}>Sessions at 06:30 PM</div>

        {sessions.map((sess,i) => (
          <div key={sess.id} style={i===0 ? s.sessCardFeat : s.sessCard}>
            <div style={s.scTop}>
              <div>
                <div style={s.scName}>{sess.type}</div>
                <div style={s.scTime}>{sess.time} · XAUUSD · Lot 0.10</div>
              </div>
              <div style={i===0 ? s.badgeG : s.badgeGold}>{i===0 ? 'Popular' : 'Plus'}</div>
            </div>
            <div style={{marginBottom:'18px'}}>
              <div style={s.profLbl}>Profit per session</div>
              <div style={s.profVal}>+${sess.target}.00</div>
              <div style={s.profSub}>Credited directly to your MT5 account</div>
            </div>
            <div style={s.div}/>
            <div style={s.meta}>
              <div style={s.metaItem}><b style={s.metaB}>{sess.credits} Credit</b>Entry fee</div>
              <div style={s.metaItem}><b style={s.metaB}>${sess.minBal}</b>Min balance</div>
              <div style={s.metaItem}><b style={s.metaB}>~20 min</b>Duration</div>
            </div>
            <button style={i===0 ? s.btnGold : s.btnOut} onClick={() => joinSession(sess)}>
              Join {sess.type} Session →
            </button>
          </div>
        ))}

        <div style={s.secLbl}>More sessions today</div>
        <div style={s.upRow}>
          {['08:45 PM','10:15 PM','11:30 PM'].map((t,i) => (
            <div key={i} style={s.upCard}>
              <div style={s.upTime}>{t}</div>
              <div style={s.upType}>{i<2?'Std · Plus':'Standard'}</div>
            </div>
          ))}
        </div>
      </>}

      {tab === 'wallet' && <Wallet credits={credits}/>}
      {tab === 'history' && <History user={user}/>}

      <div style={s.bnav}>
        <button style={tab==='home'?s.nbOn:s.nb} onClick={() => setTab('home')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
          </svg>
          Sessions
        </button>
        <button style={tab==='wallet'?s.nbOn:s.nb} onClick={() => setTab('wallet')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="5" width="20" height="15" rx="2"/><path d="M16 12h2"/>
          </svg>
          Wallet
        </button>
        <button style={tab==='history'?s.nbOn:s.nb} onClick={() => setTab('history')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
          </svg>
          History
        </button>
      </div>
    </div>
  )
}
