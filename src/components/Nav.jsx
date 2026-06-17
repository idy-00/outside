import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Nav({ page, setPage }) {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled]   = useState(false)
  const [hidden,   setHidden]     = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    let prev = 0
    const h = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > prev && y > 200)
      prev = y
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = id => {
    setMenuOpen(false)
    if (page !== 'home') { setPage('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80) }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isShop = page === 'shop'
  const navBg  = isShop ? 'var(--white)' : (scrolled ? 'rgba(10,10,10,.95)' : 'transparent')
  const textColor = isShop ? 'var(--black)' : 'var(--white)'
  const subColor  = isShop ? 'var(--grey)'  : 'rgba(255,255,255,.5)'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 'var(--nav)',
        background: navBg,
        backdropFilter: (!isShop && scrolled) ? 'blur(16px)' : 'none',
        borderBottom: isShop ? '1px solid var(--light)' : (scrolled ? '1px solid rgba(255,255,255,.05)' : '1px solid transparent'),
        display: 'flex', alignItems: 'center',
        padding: '0 var(--px)',
        transform: hidden ? 'translateY(-100%)' : 'none',
        transition: 'transform .35s ease, background .3s, border-color .3s',
      }}>
        {/* logo */}
        <button onClick={() => { setPage('home'); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{
          background: 'none', border: 'none', padding: 0, marginRight: 'auto',
          display: 'flex', alignItems: 'center',
        }}>
          <img
            src={isShop ? '/images/logo-black.png' : (scrolled ? '/images/logo-white.png' : '/images/logo-white.png')}
            alt="OUTSIDE"
            style={{ height: 38, width: 'auto', objectFit: 'contain', transition: 'opacity .3s' }}
          />
        </button>

        {/* desktop links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-desktop">
          {[['order','Commander'],['lookbook-anchor','Lookbook']].map(([id, lbl]) => (
            <button key={id} onClick={() => go(id === 'lookbook-anchor' ? 'gallery' : id)} style={{
              background: 'none', border: 'none', padding: 0,
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
              color: subColor, transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = textColor}
            onMouseLeave={e => e.currentTarget.style.color = subColor}>
              {lbl}
            </button>
          ))}

          {/* Shop CTA — le bouton visible */}
          <button onClick={() => { setPage('shop'); setMenuOpen(false); window.scrollTo({ top: 0 }) }} style={{
            background: isShop ? 'var(--black)' : 'var(--white)',
            color:       isShop ? 'var(--white)' : 'var(--black)',
            border: 'none',
            fontFamily: 'var(--sans)', fontWeight: 500,
            fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
            padding: '.55rem 1.4rem',
            transition: 'opacity .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Shop
          </button>

          {/* panier */}
          <button onClick={openCart} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
            color: subColor, display: 'flex', alignItems: 'center', gap: '.4rem',
            transition: 'color .2s', position: 'relative',
          }}
          onMouseEnter={e => e.currentTarget.style.color = textColor}
          onMouseLeave={e => e.currentTarget.style.color = subColor}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1h2.5l2.8 7.5H13l2.5-5.5H5"/>
              <circle cx="6.5" cy="13" r="1.2"/>
              <circle cx="12" cy="13" r="1.2"/>
            </svg>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -8,
                background: isShop ? 'var(--black)' : 'var(--white)',
                color: isShop ? 'var(--white)' : 'var(--black)',
                fontFamily: 'var(--sans)', fontWeight: 600,
                fontSize: '9px', width: 16, height: 16,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{count}</span>
            )}
          </button>
        </div>

        {/* mobile right */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="nav-mobile">
          <button onClick={openCart} style={{
            background: 'none', border: 'none', padding: 0,
            color: textColor, position: 'relative', display: 'flex', alignItems: 'center',
            transition: 'color .3s',
          }}>
            <svg width="20" height="19" viewBox="0 0 16 15" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1h2.5l2.8 7.5H13l2.5-5.5H5"/>
              <circle cx="6.5" cy="13" r="1.2"/>
              <circle cx="12" cy="13" r="1.2"/>
            </svg>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -7,
                background: isShop ? 'var(--black)' : 'var(--white)',
                color: isShop ? 'var(--white)' : 'var(--black)',
                fontFamily: 'var(--sans)', fontWeight: 600,
                fontSize: '9px', width: 15, height: 15,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{count}</span>
            )}
          </button>

          {/* hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} style={{
            background: 'none', border: 'none', padding: '4px',
            display: 'flex', flexDirection: 'column', gap: 5,
            cursor: 'pointer',
          }} aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5,
                background: textColor,
                transform: menuOpen
                  ? (i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'scaleX(0)')
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: 'transform .25s, opacity .2s, background .3s',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* mobile menu overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 199,
        background: isShop ? 'var(--white)' : 'var(--black)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity .3s',
      }} className="nav-mobile">
        <img src={isShop ? '/images/logo-black.png' : '/images/logo-white.png'}
          alt="OUTSIDE"
          style={{ height: 60, width: 'auto', marginBottom: '1rem', opacity: .7 }} />
        {[
          { label: 'Accueil',    action: () => { setPage('home'); setMenuOpen(false); window.scrollTo({ top:0 }) } },
          { label: 'Shop',       action: () => { setPage('shop'); setMenuOpen(false); window.scrollTo({ top:0 }) } },
          { label: 'Lookbook',   action: () => go('gallery') },
          { label: 'Commander',  action: () => go('order') },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: '2rem', letterSpacing: '.02em',
            color: isShop ? 'var(--black)' : 'var(--white)',
            transition: 'opacity .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.45'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            {item.label}
          </button>
        ))}
      </div>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none  !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none  !important; }
          .nav-mobile  { display: flex  !important; }
        }
      `}</style>
    </>
  )
}
