<label style={s.label}>Broker Server</label>
<input 
  style={s.input} 
  placeholder="e.g. Exness-Real7, Exness-MT5Real2, VantageInternational-Live" 
  value={mt5.server}
  onChange={e => setMt5({...mt5, server:e.target.value})}
/>
<div style={{
  fontSize:'11px',
  color:'rgba(240,236,226,0.35)',
  marginBottom:'14px',
  marginTop:'-8px'
}}>
  Find your exact server name in your broker Personal Area. Demo accounts not allowed.
</div>
