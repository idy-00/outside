import { useRef, useEffect, useState } from 'react'
import { WA_NUMBER } from '../data/products'

const STEPS = [
  { n: '01', t: 'Choisir',   b: 'Parcours la boutique. Modèle, couleur, taille. Ajouter au panier.' },
  { n: '02', t: 'Envoyer',   b: 'Depuis le panier, ton message WhatsApp est généré automatiquement.' },
  { n: '03', t: 'Confirmer', b: 'On te confirme la dispo sous 24h. Aucune avance requise.' },
  { n: '04', t: 'Recevoir',  b: 'Livraison Dakar ou retrait. Paiement à la réception.' },
]

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Process() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .08 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="order" ref={ref} style={{ background: 'var(--paper)', padding: '5rem var(--px) 6rem' }}>
      <div style={{ color: 'var(--ink)' }}>

        {/* title */}
        <div style={{
          marginBottom: '3rem', paddingBottom: '1.2rem',
          borderBottom: '1px solid rgba(10,10,10,.12)',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity .4s, transform .4s',
        }}>
          <p style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.22em', opacity: .4, marginBottom: '.3rem' }}>
            Comment commander
          </p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-.02em' }}>
            Simple & rapide
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* steps */}
          <div>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2.5rem 1fr',
                padding: '1.1rem 0', gap: '.8rem',
                borderBottom: '1px solid rgba(10,10,10,.1)',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateX(-8px)',
                transition: `opacity .4s ${.06 * i}s, transform .4s ${.06 * i}s`,
              }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: '1rem', opacity: .15, lineHeight: 1.2, paddingTop: '.15rem' }}>{s.n}</span>
                <div>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '.82rem', letterSpacing: '.04em', marginBottom: '.35rem' }}>{s.t}</p>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.75, opacity: .45 }}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
            transition: 'opacity .45s .2s, transform .45s .2s',
          }}>
            <p style={{
              fontFamily: 'Outfit', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: .95, letterSpacing: '-.02em',
              marginBottom: '1.8rem',
            }}>
              Prêt à<br />sortir ?
            </p>
            <p style={{ fontSize: '.82rem', lineHeight: 1.85, opacity: .4, maxWidth: '30ch', marginBottom: '2rem' }}>
              Paiement à la réception. Livraison Dakar.
              Aucune avance. Zéro prise de tête.
            </p>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour OUTSIDE 👋, je souhaite passer une commande.')}`}
              target="_blank" rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.7rem',
                background: 'var(--wa)', color: '#fff',
                padding: '.9rem 1.8rem', textDecoration: 'none',
                fontFamily: 'Outfit', fontWeight: 500,
                fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase',
                transition: 'filter .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
              <WaIcon /> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
