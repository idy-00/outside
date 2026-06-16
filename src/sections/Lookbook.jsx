import { useRef, useEffect, useState } from 'react'

const GRID = [
  { src: '/images/look9.jpg',  col: '1/5',  ar: '3/4' },
  { src: '/images/look1.jpg',  col: '5/8',  ar: '3/4' },
  { src: '/images/look2.jpg',  col: '8/13', ar: '3/4' },
  { src: '/images/look10.jpg', col: '1/5',  ar: '4/3' },
  { src: '/images/look6.jpg',  col: '5/9',  ar: '4/3' },
  { src: '/images/look7.jpg',  col: '9/13', ar: '4/3' },
]

export default function Lookbook() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .04 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="lookbook" ref={ref} style={{ background: 'var(--black)', borderTop: '1px solid #1a1a1a' }}>
      <div style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) var(--px) 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid #1a1a1a', color: 'var(--white)',
        opacity: vis ? 1 : 0, transition: 'opacity .5s',
      }}>
        <div>
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.25)', marginBottom: '.5rem',
          }}>Dans les rues · 2025</p>
          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: .9, textTransform: 'uppercase', letterSpacing: '-.01em',
          }}>Lookbook</h2>
        </div>
        <span style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.2)',
        }}>SS 2025</span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 2, padding: 2, background: 'var(--black)',
      }}>
        {GRID.map(({ src, col, ar }, i) => (
          <div key={i} style={{
            gridColumn: col, overflow: 'hidden', aspectRatio: ar, background: '#111',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
            transition: `opacity .5s ${.06 * i}s, transform .5s ${.06 * i}s`,
          }}
          onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
            <img src={src} loading="lazy" alt="" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              filter: 'grayscale(.2)',
              transition: 'transform .6s ease',
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}
