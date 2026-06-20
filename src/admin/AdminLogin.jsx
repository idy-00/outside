import { useState } from 'react'
import { login } from './auth'

export default function AdminLogin({ onSuccess }) {
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    const ok = await login(phone, pass)
    setLoading(false)
    if (ok) onSuccess()
    else setErr('Numéro ou mot de passe incorrect.')
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.25)', marginBottom: '.75rem',
        }}>OUTSIDE™</p>
        <h1 style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: '2rem', color: 'var(--white)', marginBottom: '2.5rem', lineHeight: 1.1,
        }}>Administration</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
            <label style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.3)',
            }}>Téléphone</label>
            <input
              type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="221 XX XXX XX XX"
              required autoComplete="username"
              style={{
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                color: 'var(--white)', fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '14px', padding: '.85rem 1rem',
                outline: 'none', width: '100%', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
            <label style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.3)',
            }}>Mot de passe</label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              required autoComplete="current-password"
              style={{
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                color: 'var(--white)', fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '14px', padding: '.85rem 1rem',
                outline: 'none', width: '100%', boxSizing: 'border-box',
              }}
            />
          </div>

          {err && (
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '12px', color: '#e05c5c',
            }}>{err}</p>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: '.5rem',
            background: 'var(--white)', color: 'var(--black)', border: 'none',
            fontFamily: 'var(--sans)', fontWeight: 400,
            fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase',
            padding: '1rem', minHeight: 50,
            opacity: loading ? .6 : 1, cursor: loading ? 'default' : 'pointer',
            transition: 'opacity .2s',
          }}>
            {loading ? 'Vérification…' : 'Connexion'}
          </button>
        </form>
      </div>
    </div>
  )
}
