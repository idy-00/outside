import { useRef, useEffect, useState } from 'react'
import { WA_NUMBER } from '../data/products'

const STEPS = [
  { n: '01', t: 'Choisir',   b: 'Parcours la boutique. Modèle, couleur, taille. Ajoute au panier.' },
  { n: '02', t: 'Envoyer',   b: 'Le panier génère automatiquement ton message WhatsApp.' },
  { n: '03', t: 'Confirmer', b: 'On confirme la dispo sous 24h. Aucune avance requise.' },
  { n: '04', t: 'Recevoir',  b: 'Livraison Dakar ou retrait. Paiement à la réception.' },
]

export default function Process() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .06 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="order" ref={ref} style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
      <div style={{
        padding: 'clamp(3rem, 6vw, 5rem) var(--px) 1.5rem',
        borderBottom: '1px solid var(--border)',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
        transition: 'opacity .4s, transform .4s',
      }}>
        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--grey)', marginBottom: '.5rem',
        }}>Comment commander</p>
        <h2 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
          lineHeight: .9, textTransform: 'uppercase', letterSpacing: '-.01em',
        }}>Simple & rapide</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ borderRight: '1px solid var(--border)' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '3rem 1fr',
              padding: '1.4rem var(--px)', gap: '.75rem',
              borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-8px)',
              transition: `opacity .4s ${.08 * i}s, transform .4s ${.08 * i}s`,
            }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(0,0,0,.2)', paddingTop: 2 }}>{s.n}</span>
              <div>
                <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500, fontSize: '14px', marginBottom: '.35rem' }}>{s.t}</p>
                <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--grey)', lineHeight: 1.7 }}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: 'clamp(3rem, 7vw, 5rem) var(--px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
          transition: 'opacity .5s .25s, transform .5s .25s',
        }}>
          <h3 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            lineHeight: .9, textTransform: 'uppercase',
            letterSpacing: '-.01em', marginBottom: '1.5rem',
          }}>
            Prêt à<br />sortir ?
          </h3>
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
            fontSize: '15px', lineHeight: 1.8, color: 'var(--grey)',
            maxWidth: '32ch', marginBottom: '2.5rem',
          }}>
            Paiement à la réception. Livraison Dakar.
            Aucune avance. Zéro prise de tête.
          </p>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour OUTSIDE 👋, je souhaite passer une commande.')}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              alignSelf: 'flex-start',
              background: 'var(--black)', color: 'var(--white)',
              fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500,
              fontSize: '14px', padding: '.8rem 2rem', textDecoration: 'none',
              transition: 'opacity .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
