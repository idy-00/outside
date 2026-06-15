import { useRef, useEffect, useState } from 'react'

/*
  Grille 12 colonnes, 2 rangées.
  Chaque item: gridColumn (start/end), aspect-ratio
*/
const GRID = [
  { src: '/images/look9.jpg',  col: '1/6',  ar: '3/4'  },   // grand gauche
  { src: '/images/look1.jpg',  col: '6/9',  ar: '3/4'  },   // milieu haut
  { src: '/images/look2.jpg',  col: '9/13', ar: '3/4'  },   // droite haut
  { src: '/images/look10.jpg', col: '1/5',  ar: '4/3'  },   // bas gauche large
  { src: '/images/look6.jpg',  col: '5/9',  ar: '4/3'  },   // bas milieu
  { src: '/images/look7.jpg',  col: '9/13', ar: '4/3'  },   // bas droite
]

function Item({ src, col, ar, delay, vis }) {
  return (
    <div style={{
      gridColumn: col, overflow: 'hidden',
      aspectRatio: ar, background: '#111',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(12px)',
      transition: `opacity .45s ${delay}s, transform .45s ${delay}s`,
    }}
    onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
    onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
      <img src={src} loading="lazy" alt="" style={{
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center top',
        display: 'block',
        transition: 'transform .5s ease',
      }} />
    </div>
  )
}

export default function Lookbook() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .04 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="lookbook" ref={ref} style={{ background: 'var(--ink)' }}>

      {/* header */}
      <div style={{
        padding: '4.5rem var(--px) 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid var(--rule)',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
        transition: 'opacity .4s, transform .4s',
        color: 'var(--paper)',
      }}>
        <div>
          <p style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.22em', opacity: .3, marginBottom: '.3rem' }}>
            Dans les rues · 2025
          </p>
          <h2 style={{
            fontFamily: 'Outfit', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-.02em',
          }}>Lookbook</h2>
        </div>
        <span style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.18em', opacity: .2 }}>
          SS 2025
        </span>
      </div>

      {/* mosaic */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 2, background: 'var(--ink)', padding: '2px',
      }}>
        {GRID.map((item, i) => (
          <Item key={i} {...item} delay={.05 * i} vis={vis} />
        ))}
      </div>
    </section>
  )
}
