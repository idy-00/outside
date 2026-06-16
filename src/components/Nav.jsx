import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Nav() {
  const { count, openCart } = useCart()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let prev = 0
    const h = () => {
      const y = window.scrollY
      setHidden(y > prev && y > 100)
      prev = y
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav)', background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 var(--px)',
      transform: hidden ? 'translateY(-100%)' : 'none',
      transition: 'transform .3s ease',
    }}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
        background: 'none', border: 'none', padding: 0,
        fontFamily: 'Anton, sans-serif', fontSize: '1.2rem',
        letterSpacing: '.02em', color: 'var(--black)', marginRight: 'auto',
      }}>
        OUTSIDE™
      </button>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {[['shop','Shop'],['lookbook','Lookbook'],['order','Commander']].map(([id, lbl]) => (
          <button key={id} onClick={() => go(id)} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
            fontSize: '14px', color: 'var(--grey)',
            transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}>
            {lbl}
          </button>
        ))}

        <button onClick={openCart} style={{
          background: 'none', border: '1px solid var(--border)',
          color: 'var(--black)', fontFamily: 'Hanken Grotesk, sans-serif',
          fontWeight: 400, fontSize: '14px',
          padding: '.3rem .9rem',
          transition: 'border-color .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--black)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          Panier{count > 0 ? ` (${count})` : ''}
        </button>
      </div>
    </nav>
  )
}
