export default function Wallet({ credits }) {
  const s = {
    wrap: { padding:'0' },
    bal: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'18px', padding:'26px', textAlign:'center', marginBottom:'14px' },
    balLbl: { fontSize:'10px', color:'rgba(240,236,226,0.45)', textTransform:'uppercase', letterSpacing:'2px', fontWeight:'600', marginBottom:'8px' },
    balAmt: { fontFamily:'serif', fontSize:'48px', fontWeight:'800', color:'#C49E3C' },
    balSub: { fontSize:'12px', color:'rgba(240,236,226,0.45)', marginTop:'5px' },
    secLbl: { fontSize:'10px', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,236,226,0.25)', fontWeight:'600', marginBottom:'10px' },
    netList: { background:'#0F0F1A', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'16px', overflow:'hidden', marginBottom:'12px' },
    netItem: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:'0.5px solid rgba(196,158,60,0.18)', cursor:'pointer' },
    netLast: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', cursor:'pointer' },
    netLeft: { display:'flex', alignItems:'center', gap:'13px' },
    netOrb: { width:'38px', height:'38px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', letterSpacing:'0.3px' },
    netName: { fontSize:'14px', fontWeight:'600', color:'#F0ECE2' },
    netDesc: { fontSize:'11px', color:'rgba(240,236,226,0.45)', marginTop:'2px' },
    copyBtn: { fontSize:'11px', fontWeight:'600', color:'#C49E3C', background:'rgba(196,158,60,0.08)', border:'0.5px solid rgba(196,158,60,0.35)', padding:'6px 14px', borderRadius:'7px', cursor:'pointer' },
    notice: { background:'rgba(196,158,60,0.05)', border:'0.5px solid rgba(196,158,60,0.18)', borderRadius:'12px', padding:'14px 16px', fontSize:'12px', color:'rgba(240,236,226,0.45)', lineHeight:'1.7' },
  }

  const copy = (e) => {
    e.target.textContent = 'Copied!'
    e.target.style.color = '#00C896'
    setTimeout(() => {
      e.target.textContent = 'Copy'
      e.target.style.color = '#C49E3C'
    }, 1500)
  }

  const networks = [
    { name:'TRC20 · TRON', desc:'Fastest · ~1 min confirmation', bg:'rgba(232,65,66,0.1)', color:'#E84142', label:'TRC' },
    { name:'BEP20 · BSC', desc:'Low fees · ~45 sec', bg:'rgba(240,185,11,0.1)', color:'#D4A017', label:'BEP' },
    { name:'ERC20 · Ethereum', desc:'Standard · ~3 min', bg:'rgba(98,126,234,0.1)', color:'#627EEA', label:'ERC' },
  ]

  return (
    <div style={s.wrap}>
      <div style={s.bal}>
        <div style={s.balLbl}>Your Credits</div>
        <div style={s.balAmt}>{credits}.00</div>
        <div style={s.balSub}>1 Credit = $1 USDT · Used for session entry only</div>
      </div>

      <div style={s.secLbl}>Add Credits · Send USDT</div>

      <div style={s.netList}>
        {networks.map((n,i) => (
          <div key={i} style={i < networks.length-1 ? s.netItem : s.netLast}>
            <div style={s.netLeft}>
              <div style={{...s.netOrb, background:n.bg, color:n.color}}>{n.label}</div>
              <div>
                <div style={s.netName}>{n.name}</div>
                <div style={s.netDesc}>{n.desc}</div>
              </div>
            </div>
            <div style={s.copyBtn} onClick={copy}>Copy</div>
          </div>
        ))}
      </div>

      <div style={s.notice}>
        Min deposit: $1 USDT · Credits added automatically after blockchain confirmation · 
        Withdrawals go directly via your MT5 broker — we never touch your funds
      </div>
    </div>
  )
}
