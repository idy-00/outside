import { useState } from 'react'
import { isAuthenticated } from './auth'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

export default function Admin() {
  const [authed, setAuthed] = useState(isAuthenticated)

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />
  return <AdminPanel onLogout={() => setAuthed(false)} />
}
