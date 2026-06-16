import { useRef, useEffect, useState } from 'react'

export default function Manifesto() {
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
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ overflow: 'hidden', minHeight: 480, background: '#111' }}>
        <img src="/images/look5.jpg" alt="" style={{
          width: '100%', height: '100%', minHeight: 480,
          objectFit: 'cover', objectPosition: 'center top',
          filter: 'grayscale(1) contrast(1.1)',
          transform: vis ? 'scale(1)' : 'scale(1.04)',
          transition: 'transform 1.2s ease',
        }} />
      </div>

      <div style={{
        padding: 'clamp(3rem, 7vw, 5rem) var(--px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: 'var(--white)',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
        transition: 'opacity .7s .1s, transform .7s .1s',
      }}>
        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
          fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--grey)', marginBottom: '2rem',
        }}>
          La Marque
        </p>

        <h2 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          lineHeight: .92, textTransform: 'uppercase',
          letterSpacing: '-.01em', marginBottom: '1.8rem',
        }}>
          L'abri comme<br />vêtement.
        </h2>

        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '15px', lineHeight: 1.85,
          color: 'var(--grey)', maxWidth: '38ch', marginBottom: '2rem',
        }}>
          OUTSIDE n'est pas une tendance. C'est une attitude.
          Chaque pièce rappelle que le monde ne te doit rien —
          c'est à toi de construire et d'assumer.
        </p>

        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '13px', fontStyle: 'italic',
          color: 'rgba(0,0,0,.25)',
          borderLeft: '1px solid var(--border)', paddingLeft: '1rem',
          lineHeight: 1.9,
        }}>
          "Blame Your Self Not The World"
        </p>
      </div>
    </section>
  )
}
