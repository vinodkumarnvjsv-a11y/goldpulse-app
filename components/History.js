export default function History({ user }) {
  const s = {
    wrap: { padding:'0' },
    stats: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginBottom:'16px' },
    stat: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'13px', padding:'14px 10px', textAlign:'center' },
    statVal: { fontFamily:'serif', fontSize:'22px', fontWeight:'700' },
    statLbl: { fontSize:'10px', color:'rgba(240,236,226,0.45)', textTransform:'uppercase', letterSpacing:'0.5px', marginTop:'3px' },
    secLbl: { fontSize:'10px', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,236,226,0.25)', fontWeight:'600', marginBottom:'10px' },
    item: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'14px', padding:'14px 16px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'12px' },
    av: { width:'38px', height:'38px', borderRadius:'50%', background:'#141424', border:'0.5px solid rgba(196,158,60,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#C49E3C', flexShrink:'0' },
    mid: { flex:'1', minWidth:'0' },
    name: { fontSize:'13px', fontWeight:'600', color:'#F0ECE2', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
    meta: { fontSize:'11px', color:'rgba(240,236,226,0.45)', marginTop:'2px' },
    right: { textAlign:'right', flexShrink:'0' },
    amt: { fontFamily:'serif', fontSize:'16px', fontWeight:'700' },
    time: { fontSize:'10px', color:'rgba(240,236,226,0.25)', marginTop:'2px' },
  }

  const myHistory = [
    { sess:'Standard', time:'Today 02:15 PM', win:true, amt:'+$5.00' },
    { sess:'Plus', time:'Today 11:30 AM', win:true, amt:'+$10.00' },
    { sess:'Standard', time:'Yesterday 08:45 PM', win:true, amt:'+$5.00' },
    { sess:'Standard', time:'Yesterday 06:30 PM', win:false, amt:null },
    { sess:'Plus', time:'Mon 10:00 PM', win:true, amt:'+$10.00' },
    { sess:'Standard', time:'Mon 08:00 PM', win:true, amt:'+$5.00' },
  ]

  const community = [
    { init:'RK', name:'R***l K.', broker:'Exness', acct:'****2341', sess:'Standard', amt:'+$5.00', time:'2m ago' },
    { init:'AP', name:'A***i P.', broker:'ICMarkets', acct:'****8823', sess:'Plus', amt:'+$10.00', time:'4m ago' },
    { init:'VS', name:'V***m S.', broker:'FPMarkets', acct:'****4412', sess:'Standard', amt:'+$5.00', time:'6m ago' },
    { init:'MN', name:'M***a N.', broker:'Exness', acct:'****9901', sess:'Standard', amt:'+$5.00', time:'9m ago' },
    { init:'DK', name:'D***v K.', broker:'Pepperstone', acct:'****3317', sess:'Plus', amt:'+$10.00', time:'12m ago' },
    { init:'SR', name:'S***a R.', broker:'ICMarkets', acct:'****7765', sess:'Standard', amt:'+$5.00', time:'15m ago' },
  ]

  const wins = myHistory.filter(h => h.win).length
  const total = myHistory.length
  const profit = myHistory.filter(h=>h.win).reduce((a,h) => a + parseFloat(h.amt), 0)

  return (
    <div style={s.wrap}>
      <div style={s.stats}>
        <div style={s.stat}>
          <div style={{...s.statVal, color:'#00C896'}}>{Math.round((wins/total)*100)}%</div>
          <div style={s.statLbl}>Win rate</div>
        </div>
        <div style={s.stat}>
          <div style={{...s.statVal, color:'#C49E3C'}}>+${profit}</div>
          <div style={s.statLbl}>Total profit</div>
        </div>
        <div style={s.stat}>
          <div style={{...s.statVal, color:'#F0ECE2'}}>{total}</div>
          <div style={s.statLbl}>Sessions</div>
        </div>
      </div>

      <div style={s.secLbl}>My session history</div>
      {myHistory.map((h,i) => (
        <div key={i} style={s.item}>
          <div style={{...s.av, color: h.win ? '#00C896' : 'rgba(240,236,226,0.25)'}}>
            {h.sess[0]}
          </div>
          <div style={s.mid}>
            <div style={s.name}>{h.sess} Session</div>
            <div style={s.meta}>{h.time}</div>
          </div>
          <div style={s.right}>
            <div style={{...s.amt, color: h.win ? '#00C896' : 'rgba(240,236,226,0.45)'}}>
              {h.win ? h.amt : 'Try next session'}
            </div>
          </div>
        </div>
      ))}

      <div style={{...s.secLbl, marginTop:'20px'}}>Live community profits</div>
      {community.map((c,i) => (
        <div key={i} style={s.item}>
          <div style={s.av}>{c.init}</div>
          <div style={s.mid}>
            <div style={s.name}>{c.name}</div>
            <div style={s.meta}>{c.acct} · {c.broker} · {c.sess}</div>
          </div>
          <div style={s.right}>
            <div style={{...s.amt, color:'#00C896'}}>{c.amt}</div>
            <div style={s.time}>{c.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
