import { useState, useEffect } from 'react'
import Register from '../components/Register'
import Home from '../components/Home'

export default function Index() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('gp_user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem('gp_user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('gp_user')
    setUser(null)
  }

  if (loading) return (
    <div style={{
      display:'flex',alignItems:'center',
      justifyContent:'center',height:'100vh',
      background:'#08080E',color:'#C49E3C',
      fontFamily:'Inter,sans-serif',fontSize:'14px'
    }}>
      Loading...
    </div>
  )

  if (!user) return <Register onLogin={handleLogin} />
  return <Home user={user} onLogout={handleLogout} />
}
