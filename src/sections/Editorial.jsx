import { useRef, useEffect, useState } from 'react'

export default function Editorial() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .08 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      borderTop: '1px solid var(--border)',
    }}>
      {/* text — fond noir */}
      <div style={{
        background: 'var(--black)', color: 'var(--white)',
        padding: 'clamp(3rem, 7vw, 6rem) var(--px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
        transition: 'opacity .6s, transform .6s',
      }}>
        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.3)', marginBottom: '2rem',
        }}>Éditorial 01</p>

        <h2 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
          lineHeight: .9, textTransform: 'uppercase',
          letterSpacing: '-.01em', marginBottom: '1.8rem',
        }}>
          Étude des<br />Voids.
        </h2>

        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '15px', lineHeight: 1.8,
          color: 'rgba(255,255,255,.5)', maxWidth: '36ch', marginBottom: '2.5rem',
        }}>
          L'espace négatif n'est pas vide, il est structurel.
          Nos silhouettes sont définies autant par ce qu'elles
          englobent que par ce qu'elles excluent.
        </p>

        <button onClick={() => document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0,
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400, fontSize: '13px',
            letterSpacing: '.06em', color: 'rgba(255,255,255,.6)',
            borderBottom: '1px solid rgba(255,255,255,.2)', paddingBottom: 3,
            transition: 'color .2s, border-color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}>
          Explorer la campagne →
        </button>
      </div>

      {/* image */}
      <div style={{
        overflow: 'hidden', minHeight: 480, background: '#111',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
        transition: 'opacity .6s .15s, transform .6s .15s',
      }}>
        <img src="/images/look11.jpg" alt="" style={{
          width: '100%', height: '100%', minHeight: 480,
          objectFit: 'cover', objectPosition: 'center',
          filter: 'grayscale(1) contrast(1.15)',
        }} />
      </div>
    </section>
  )
}
