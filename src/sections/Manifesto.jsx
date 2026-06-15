import { useRef, useEffect, useState } from 'react'

export default function Manifesto() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }}>

      {/* photo */}
      <div style={{ overflow: 'hidden', background: '#000', minHeight: 400 }}>
        <img src="/images/look5.jpg" alt="Outside editorial" style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block', filter: 'brightness(.9)',
          transform: vis ? 'scale(1)' : 'scale(1.04)',
          transition: 'transform 1s ease',
        }} />
      </div>

      {/* text */}
      <div style={{
        background: 'var(--paper)', color: 'var(--ink)',
        padding: '4rem var(--px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(16px)',
        transition: 'opacity .6s .15s, transform .6s .15s',
      }}>
        <p style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.3em', opacity: .35, marginBottom: '2rem' }}>
          — LA MARQUE
        </p>

        <h2 style={{
          fontFamily: 'Outfit', fontWeight: 900,
          fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
          lineHeight: 1, letterSpacing: '-.02em',
          marginBottom: '2rem',
        }}>
          Né dans<br />les rues<br />de Dakar.
        </h2>

        <p style={{
          fontFamily: 'Outfit', fontWeight: 300,
          fontSize: '.9rem', lineHeight: 1.85,
          opacity: .55, maxWidth: '36ch', marginBottom: '2.5rem',
        }}>
          OUTSIDE n'est pas une tendance.
          C'est une attitude. Chaque pièce rappelle
          que le monde ne te doit rien — c'est à toi
          de construire et d'assumer.
        </p>

        <blockquote style={{
          borderLeft: '2px solid rgba(10,10,10,.15)', paddingLeft: '1rem',
          fontFamily: 'DM Mono', fontStyle: 'italic',
          fontSize: '.7rem', letterSpacing: '.06em',
          opacity: .35, lineHeight: 1.9,
        }}>
          "Blame Your Self Not The World"
        </blockquote>
      </div>
    </section>
  )
}
