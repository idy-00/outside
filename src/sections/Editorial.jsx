import { useRef, useEffect, useState } from 'react'

export default function Editorial() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .06 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: 'var(--white)', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      }}>
        {/* image */}
        <div style={{ overflow: 'hidden', minHeight: 520, background: '#0a0a0a', position: 'relative' }}>
          <img src="/images/look11.jpg" alt="" style={{
            width: '100%', height: '100%', minHeight: 520,
            objectFit: 'cover', objectPosition: 'center',
            transform: vis ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 1.4s ease',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,.35) 0%, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '2rem', left: '2rem',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.4)',
          }}>
            Éditorial 01 — 2025
          </div>
        </div>

        {/* text */}
        <div style={{
          background: 'var(--black)', color: 'var(--white)',
          padding: 'clamp(3.5rem, 8vw, 6rem) var(--px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(30px)',
          transition: 'opacity .7s .15s, transform .7s .15s',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.3)', marginBottom: '2rem',
          }}>Éditorial 01</p>

          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: .88, textTransform: 'uppercase',
            letterSpacing: '-.01em', marginBottom: '1.75rem',
          }}>
            Étude des<br />Voids.
          </h2>

          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
            fontSize: '15px', lineHeight: 1.85,
            color: 'rgba(255,255,255,.45)', maxWidth: '36ch', marginBottom: '2.5rem',
          }}>
            L'espace négatif n'est pas vide, il est structurel.
            Nos silhouettes sont définies autant par ce qu'elles
            englobent que par ce qu'elles excluent.
          </p>

          <button onClick={() => document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
              fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'flex', alignItems: 'center', gap: '.6rem',
              transition: 'gap .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '1rem'}
            onMouseLeave={e => e.currentTarget.style.gap = '.6rem'}>
            Explorer la campagne →
          </button>
        </div>
      </div>
    </section>
  )
}
