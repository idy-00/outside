import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'

const PICKS = [
  { id: 'jogging-sherpa', colorIndex: 0 },
  { id: 'hoodie-noir',    colorIndex: 0 },
  { id: 'debardeur',      colorIndex: 0 },
]

function useVis() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .04 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, vis]
}

function BestCard({ product, defaultColor, index }) {
  const [ci, setCi] = useState(() => Math.floor(Math.random() * product.colors.length))
  const [si, setSi] = useState(0)
  const [added, setAdded] = useState(false)
  const [hov, setHov] = useState(false)
  const { add, openCart } = useCart()
  const [ref, vis] = useVis()
  const color = product.colors[ci]

  const handleAdd = () => {
    add({ id: product.id, name: product.name, color: color.label, size: product.sizes[si], price: product.price, img: color.img })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
    openCart()
  }

  return (
    <article ref={ref} style={{
      display: 'flex', flexDirection: 'column',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(24px)',
      transition: `opacity .6s ${index * .12}s, transform .6s ${index * .12}s`,
    }}>
      {/* image */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          aspectRatio: '3/4',
          background: color.light ? '#f0ece6' : '#111',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}>
        <img src={color.img} alt={product.name} style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center',
          padding: '2rem',
          transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .7s cubic-bezier(.25,.46,.45,.94)',
        }} />

        {/* sélecteur couleur */}
        {product.colors.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '1rem', left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            padding: '0 .75rem',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,.92)',
              backdropFilter: 'blur(8px)',
              padding: '4px 7px', gap: 5,
            }}>
              {product.colors.map((c, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setCi(i) }} title={c.label} style={{
                  width: 22, height: 22, background: c.hex, border: 'none',
                  outline: i === ci ? '2px solid var(--black)' : '2px solid transparent',
                  outlineOffset: 0,
                  boxShadow: i === ci ? 'none' : 'inset 0 0 0 1px rgba(0,0,0,.12)',
                  transform: i === ci ? 'scale(1.1)' : 'scale(1)',
                  transition: 'outline-color .15s, transform .15s',
                  minWidth: 22, minHeight: 22, flexShrink: 0,
                }} />
              ))}
              <span style={{
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '9px', letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'var(--black)', paddingLeft: 5, whiteSpace: 'nowrap',
              }}>{color.label}</span>
            </div>
          </div>
        )}

        {/* bouton + coin haut droit */}
        <button onClick={handleAdd} style={{
          position: 'absolute', top: 10, right: 10,
          width: 36, height: 36,
          background: added ? '#2a6e3f' : 'var(--white)',
          color: added ? 'var(--white)' : 'var(--black)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,.15)',
          transition: 'background .25s, transform .15s',
          transform: added ? 'scale(1.1)' : 'scale(1)',
        }}>
          {added
            ? <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 6l3 3 5-5"/></svg>
            : <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2v8M2 6h8"/></svg>
          }
        </button>

      </div>

      {/* infos */}
      <div style={{ padding: '1rem 0 .5rem', display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: '1.05rem',
          }}>{product.name}</span>
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 400,
            fontSize: '13px',
          }}>{product.price.toLocaleString('fr')} F</span>
        </div>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', color: 'var(--grey)',
        }}>{product.tagline}</span>


        {/* tailles inline */}
        <div style={{ display: 'flex', gap: 3, marginTop: '.4rem', flexWrap: 'wrap' }}>
          {product.sizes.map((s, i) => (
            <button key={s} onClick={() => setSi(i)} style={{
              minWidth: 34, minHeight: 34, padding: '0 .3rem',
              background: i === si ? 'var(--black)' : 'transparent',
              color: i === si ? 'var(--white)' : 'var(--grey)',
              border: 'none',
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.04em',
              transition: 'background .15s, color .15s',
            }}>{s}</button>
          ))}
        </div>

      </div>
    </article>
  )
}

export default function BestSellers({ setPage }) {
  const [headerRef, headerVis] = useVis()
  const PRODUCTS = useProducts()
  const picks = PICKS.map(({ id, colorIndex }) => ({
    product: PRODUCTS.find(p => p.id === id),
    defaultColor: colorIndex,
  })).filter(x => x.product)

  return (
    <section style={{ background: 'var(--white)', borderTop: '1px solid var(--light)' }}>
      <div ref={headerRef} style={{
        padding: 'clamp(3.5rem, 7vw, 5.5rem) var(--px) 0',
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? 'none' : 'translateY(14px)',
        transition: 'opacity .5s, transform .5s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '1rem', paddingBottom: '1.75rem',
          borderBottom: '1px solid var(--light)',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--grey)', marginBottom: '.4rem',
            }}>Nos pièces phares</p>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', lineHeight: 1.05,
            }}>Meilleures ventes</h2>
          </div>

          <button onClick={() => { setPage('shop'); window.scrollTo({ top: 0 }) }} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--grey)',
            borderBottom: '1px solid var(--light)',
            paddingBottom: '2px',
            transition: 'color .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--black)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--grey)'; e.currentTarget.style.borderColor = 'var(--light)' }}>
            Voir tout →
          </button>
        </div>
      </div>

      {/* grille 3 colonnes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(1rem, 3vw, 2rem)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) var(--px) clamp(3rem, 6vw, 5rem)',
      }} className="bestsellers-grid">
        {picks.map(({ product, defaultColor }, i) => (
          <BestCard key={product.id} product={product} defaultColor={defaultColor} index={i} />
        ))}
      </div>

      {/* CTA mobile centré */}
      <div style={{
        padding: '0 var(--px) clamp(3rem, 6vw, 5rem)',
        textAlign: 'center',
      }} className="bestsellers-cta-mobile">
        <button onClick={() => { setPage('shop'); window.scrollTo({ top: 0 }) }} style={{
          background: 'var(--black)', color: 'var(--white)', border: 'none',
          fontFamily: 'var(--sans)', fontWeight: 400,
          fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase',
          padding: '1rem 2.5rem',
          width: '100%', maxWidth: 340,
          minHeight: 52,
        }}>
          Voir toute la collection
        </button>
      </div>

      <style>{`
        .bestsellers-cta-mobile { display: none; }
        @media (max-width: 768px) {
          .bestsellers-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bestsellers-cta-mobile { display: block; }
        }
        @media (max-width: 480px) {
          .bestsellers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
