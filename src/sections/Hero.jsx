import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  { img: '/images/look3.jpg' },
  { img: '/images/look8.jpg' },
  { img: '/images/look9.jpg' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const intervalRef = useRef(null)

  const goTo = i => {
    setIdx(i)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 5000)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section style={{ height: '100svh', position: 'relative', overflow: 'hidden', background: '#000' }}>

      {/* background slides */}
      {SLIDES.map((s, i) => (
        <img key={i} src={s.img} alt="" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 20%',
          opacity: i === idx ? 1 : 0,
          filter: 'brightness(.38)',
          transition: 'opacity .8s ease',
          zIndex: 0,
        }} />
      ))}

      {/* vignette bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        padding: 'var(--px)',
        paddingTop: 72,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>

        {/* top row: location */}
        <div style={{
          position: 'absolute', top: 68, left: 'var(--px)', right: 'var(--px)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.22em', opacity: .3, textTransform: 'uppercase' }}>
            Dakar, Sénégal
          </span>
          <span style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.22em', opacity: .25 }}>
            SS 2025
          </span>
        </div>

        {/* main block */}
        <div>
          {/* headline — size contrôlée avec viewport clamp */}
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 12vw, 9rem)',
            lineHeight: .9,
            letterSpacing: '-.02em',
            marginBottom: '1.4rem',
          }}>
            OUT<br />SIDE™
          </h1>

          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid rgba(243,237,229,.15)',
          }}>
            <div>
              <p style={{
                fontFamily: 'DM Mono', fontStyle: 'italic',
                fontSize: 'clamp(.65rem, 1.5vw, .85rem)',
                opacity: .4, letterSpacing: '.04em', marginBottom: '.5rem',
              }}>
                Blame Your Self Not The World
              </p>
              {/* slide indicators */}
              <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    height: 2, width: i === idx ? 28 : 10,
                    background: 'var(--paper)', border: 'none', padding: 0,
                    opacity: i === idx ? .9 : .25,
                    transition: 'width .35s ease, opacity .35s ease',
                  }} />
                ))}
              </div>
            </div>

            <a href="#shop"
              onClick={e => { e.preventDefault(); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                background: 'var(--paper)', color: 'var(--ink)',
                fontFamily: 'Outfit', fontWeight: 500,
                fontSize: '.65rem', letterSpacing: '.16em', textTransform: 'uppercase',
                padding: '.75rem 1.8rem', textDecoration: 'none',
                transition: 'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#d9d0c4'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--paper)'}>
              Voir la collection
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
