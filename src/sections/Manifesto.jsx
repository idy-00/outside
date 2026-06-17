import { useRef, useEffect, useState } from 'react'

export default function Manifesto() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .06 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--black)',
      padding: 'clamp(5rem, 12vw, 9rem) var(--px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <p style={{
        fontFamily: 'var(--sans)', fontWeight: 300,
        fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.25)', marginBottom: '2rem',
        opacity: vis ? 1 : 0, transition: 'opacity .7s .1s',
      }}>
        La Marque
      </p>

      <h2 style={{
        fontFamily: 'var(--serif)', fontWeight: 300,
        fontStyle: 'italic',
        fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
        lineHeight: 1.15, color: 'var(--white)',
        marginBottom: '1.75rem',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
        transition: 'opacity .7s .2s, transform .7s .2s',
      }}>
        L'abri comme vêtement.
      </h2>

      <p style={{
        fontFamily: 'var(--sans)', fontWeight: 300,
        fontSize: '15px', lineHeight: 1.95,
        color: 'rgba(255,255,255,.4)',
        maxWidth: '46ch', marginBottom: '2.5rem',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
        transition: 'opacity .7s .35s, transform .7s .35s',
      }}>
        OUTSIDE n'est pas une tendance. C'est une attitude.
        Chaque pièce rappelle que le monde ne te doit rien —
        c'est à toi de construire et d'assumer.
      </p>

      <p style={{
        fontFamily: 'var(--serif)', fontWeight: 300,
        fontStyle: 'italic', fontSize: '1rem',
        color: 'rgba(255,255,255,.3)',
        opacity: vis ? 1 : 0, transition: 'opacity .7s .5s',
      }}>
        "Blame Your Self Not The World"
      </p>
    </section>
  )
}
