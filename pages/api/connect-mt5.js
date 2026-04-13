// Block demo accounts
if(
  server.toLowerCase().includes('demo') ||
  login.toString().toLowerCase().includes('demo')
) {
  return res.status(400).json({ 
    error: 'Demo accounts are not permitted. Real accounts only.' 
  })
}
