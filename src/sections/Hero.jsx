import { useEffect, useRef } from 'react'

export default function Hero({ setPage }) {
  const imgRef = useRef(null)

  useEffect(() => {
    const h = () => {
      if (imgRef.current)
        imgRef.current.style.transform = `scale(1.04) translateY(${window.scrollY * 0.18}px)`
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <section style={{
      position: 'relative', height: '100svh', minHeight: 600,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src="/images/look9.jpg" alt="" style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 25%',
          transform: 'scale(1.04)', transformOrigin: 'center top',
          willChange: 'transform', filter: 'brightness(.48)',
        }} />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,.72) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(2.5rem, 8vh, 6rem) var(--px) clamp(2rem, 5vh, 3.5rem)',
      }}>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.38)', marginBottom: '1rem',
        }}>
          Dakar, Sénégal — SS 2026
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 300, fontStyle: 'italic',
          fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
          lineHeight: 1.08, color: 'var(--white)',
          marginBottom: 'clamp(1.75rem, 4vh, 2.75rem)',
          maxWidth: '14ch',
        }}>
          Blame Your Self<br />Not The World
        </h1>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,.1)',
        }}>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '12px', color: 'rgba(255,255,255,.38)',
            maxWidth: '32ch', lineHeight: 1.75,
          }}>
            Streetwear né dans les rues de Dakar.
          </p>

          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setPage('shop'); window.scrollTo({ top: 0 }) }}
              style={{
                background: 'var(--white)', color: 'var(--black)', border: 'none',
                fontFamily: 'var(--sans)', fontWeight: 500,
                fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
                padding: '.85rem 2rem',
                transition: 'opacity .2s',
                minHeight: 48,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Découvrir la collection
            </button>
            <button
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,.28)',
                color: 'rgba(255,255,255,.7)',
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
                padding: '.85rem 1.75rem',
                transition: 'border-color .2s',
                minHeight: 48,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.65)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.28)'}>
              Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
