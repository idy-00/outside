import { useRef, useEffect, useState } from 'react'

const GRID = [
  { src: '/images/look11.jpg', span: 2, tall: true },
  { src: '/images/look1.jpg',  span: 1 },
  { src: '/images/look2.jpg',  span: 1 },
  { src: '/images/look5.jpg',  span: 1 },
  { src: '/images/look7.jpg',  span: 1 },
  { src: '/images/look3.jpg',  span: 2 },
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
    <section id="lookbook" style={{ background: 'var(--black)' }}>
      <div ref={ref} style={{
        padding: 'clamp(3rem, 6vw, 5rem) var(--px) 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        opacity: vis ? 1 : 0, transition: 'opacity .6s',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.28em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.25)', marginBottom: '.5rem',
          }}>Dans les rues · 2025</p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.05, color: 'var(--white)',
          }}>Lookbook</h2>
        </div>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.18)',
        }}>SS 2025</span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px', background: 'rgba(255,255,255,.04)',
      }}>
        {GRID.map(({ src, span, tall }, i) => (
          <div key={i} style={{
            gridColumn: `span ${span}`,
            overflow: 'hidden',
            aspectRatio: tall ? '2/3' : span === 2 ? '16/9' : '3/4',
            background: '#111',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(16px)',
            transition: `opacity .5s ${.07 * i}s, transform .5s ${.07 * i}s`,
            position: 'relative',
          }}
          onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; e.currentTarget.querySelector('.ov').style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.ov').style.opacity = '0' }}>
            <img src={src} loading="lazy" alt="" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              transition: 'transform .7s ease',
            }} />
            <div className="ov" style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,.25)',
              opacity: 0, transition: 'opacity .3s',
            }} />
          </div>
        ))}
      </div>

      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,.05)',
        padding: '1.1rem 0',
      }}>
        <div style={{
          display: 'flex', gap: '5rem',
          animation: 'marquee 20s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.1)',
            }}>
              OUTSIDE · DAKAR · SS 2025 · BLAME YOURSELF NOT THE WORLD
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  )
}
