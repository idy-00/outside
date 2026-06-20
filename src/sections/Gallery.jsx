import { useRef, useEffect, useState } from 'react'

function useVis(threshold = 0.08) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, vis]
}

export default function Gallery() {
  const [headerRef, headerVis] = useVis(0.1)
  const [blockARef, blockAVis] = useVis(0.05)
  const [blockCRef, blockCVis] = useVis(0.05)

  return (
    <section id="gallery" style={{ background: 'var(--off)' }}>

      {/* ── HEADER ── */}
      <div ref={headerRef} style={{
        padding: 'clamp(3.5rem, 7vw, 6rem) var(--px) clamp(2rem, 4vw, 3.5rem)',
        maxWidth: 680,
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? 'none' : 'translateY(18px)',
        transition: 'opacity .7s, transform .7s',
      }}>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
          color: 'var(--grey)', marginBottom: '.75rem',
        }}>Sur le terrain · Dakar 2026</p>
        <h2 style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)', lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}>Nos pièces, dans les rues</h2>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '13px', lineHeight: 1.85,
          color: 'var(--grey)', maxWidth: '48ch',
        }}>
          Des vêtements faits pour bouger, pas pour rester dans un tiroir.
          Chaque pièce Outside™ est conçue pour les rues de Dakar — du matin au soir, en toute saison.
        </p>
      </div>

      {/* ── BLOC A : grande photo gauche + texte droite ── */}
      <div ref={blockARef} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'clamp(420px, 55vw, 680px)',
        borderTop: '1px solid var(--light)',
        opacity: blockAVis ? 1 : 0,
        transform: blockAVis ? 'none' : 'translateY(24px)',
        transition: 'opacity .7s .05s, transform .7s .05s',
      }} className="gallery-row">
        <div style={{ overflow: 'hidden', background: '#111' }}>
          <img src="/images/look2.jpg" alt="" style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 15%',
          }} />
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)',
          background: 'var(--black)', color: 'var(--white)',
        }}>
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem',
          }}>01 — Attitude</span>
          <h3 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Blame Your Self<br />Not The World
          </h3>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '13px', lineHeight: 1.9,
            color: 'rgba(255,255,255,.45)',
            maxWidth: '36ch',
          }}>
            Outside™ c'est une mentalité avant d'être une marque.
            Né dans les rues de Dakar, porté par ceux qui avancent.
          </p>
        </div>
      </div>

      {/* ── SÉPARATEUR ── */}
      <div style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) var(--px)',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        background: 'var(--off)',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--light)' }} />
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '9px', letterSpacing: '.32em', textTransform: 'uppercase',
          color: 'var(--grey)', whiteSpace: 'nowrap',
        }}>SS 2026</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--light)' }} />
      </div>

      {/* ── BLOC C : texte gauche + grande photo droite ── */}
      <div ref={blockCRef} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'clamp(380px, 48vw, 600px)',
        borderTop: '1px solid var(--light)',
        opacity: blockCVis ? 1 : 0,
        transform: blockCVis ? 'none' : 'translateY(24px)',
        transition: 'opacity .7s .08s, transform .7s .08s',
      }} className="gallery-row">
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)',
          background: 'var(--off)',
        }}>
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase',
            color: 'var(--grey)', marginBottom: '1.5rem',
          }}>02 — Matière</span>
          <h3 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            L'Ensemble Outside™,<br />du sol au plafond
          </h3>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '13px', lineHeight: 1.9,
            color: 'var(--grey)',
            maxWidth: '36ch',
          }}>
            L'Ensemble Outside™ : texture premium, coupe ample, logo aigle brodé.
            Haut et bas assortis. Un look complet, sans effort.
          </p>
          <div style={{
            marginTop: '2rem',
            display: 'flex', gap: '2rem',
          }}>
            {[['25 000', 'Ensemble Outside™'], ['15 000', 'Hoodie Outside™']].map(([price, label]) => (
              <div key={label}>
                <p style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: '1.1rem', marginBottom: '.2rem',
                }}>{price} F</p>
                <p style={{
                  fontFamily: 'var(--sans)', fontWeight: 300,
                  fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase',
                  color: 'var(--grey)',
                }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: 'hidden', background: '#111' }}>
          <img src="/images/prod11.jpg" alt="Jogging Sherpa" style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            padding: '2rem',
            background: '#1a1a1a',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-row {
            min-height: unset !important;
          }
          .gallery-row > div:first-child {
            min-height: 180px;
          }
          .gallery-row > div:last-child {
            padding: 1.5rem 1.25rem !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-row > div:first-child {
            min-height: 140px;
          }
        }
      `}</style>
    </section>
  )
}
