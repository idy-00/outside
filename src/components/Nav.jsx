import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Nav() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <header style={{
      position: 'fixed', inset: '0 0 auto', zIndex: 200,
      height: 56,
      display: 'flex', alignItems: 'center',
      padding: '0 var(--px)',
      gap: '2rem',
      background: scrolled ? 'rgba(10,10,10,.97)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      transition: 'background .3s, border-color .3s',
    }}>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
        background: 'none', border: 'none', color: 'var(--paper)',
        fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem',
        letterSpacing: '.2em', padding: 0, marginRight: 'auto',
      }}>
        OUTSIDE
      </button>

      <nav style={{ display: 'flex', gap: '1.8rem' }}>
        {[['shop','Shop'],['lookbook','Lookbook'],['order','Commander']].map(([id, label]) => (
          <button key={id} onClick={() => go(id)} style={{
            background: 'none', border: 'none', color: 'var(--paper)',
            fontFamily: 'DM Mono, monospace', fontSize: '.6rem',
            letterSpacing: '.15em', padding: 0, opacity: .5,
            transition: 'opacity .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = .5}>
            {label}
          </button>
        ))}
      </nav>

      <button onClick={openCart} style={{
        background: 'none', border: '1px solid rgba(243,237,229,.2)',
        color: 'var(--paper)', fontFamily: 'DM Mono, monospace',
        fontSize: '.6rem', letterSpacing: '.12em',
        padding: '.35rem .9rem', display: 'flex',
        alignItems: 'center', gap: '.45rem',
        transition: 'border-color .15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(243,237,229,.7)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(243,237,229,.2)'}>
        Panier {count > 0 && <span style={{
          background: 'var(--paper)', color: 'var(--ink)',
          width: 16, height: 16, borderRadius: '50%',
          fontSize: 9, fontWeight: 700, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>{count}</span>}
      </button>
    </header>
  )
}
