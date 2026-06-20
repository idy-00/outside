import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { CATEGORIES } from '../data/products'

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

function ProductRow({ p, index, reverse }) {
  const [ci, setCi] = useState(() => Math.floor(Math.random() * p.colors.length))
  const [si, setSi] = useState(0)
  const [added, setAdded] = useState(false)
  const [imgHov, setImgHov] = useState(false)
  const { add, openCart } = useCart()
  const [ref, vis] = useVis()
  const color = p.colors[ci]

  const handleAdd = () => {
    add({ id: p.id, name: p.name, color: color.label, size: p.sizes[si], price: p.price, img: color.img })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
    openCart()
  }

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: 520,
      borderBottom: '1px solid var(--light)',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(28px)',
      transition: `opacity .6s ${index * .1}s, transform .6s ${index * .1}s`,
    }} className="product-row">

      {/* IMAGE */}
      <div style={{
        order: reverse ? 2 : 1,
        overflow: 'hidden',
        background: color.light ? '#f5f2ed' : '#111',
        position: 'relative',
        minHeight: 420,
      }}
        onMouseEnter={() => setImgHov(true)}
        onMouseLeave={() => setImgHov(false)}>
        <img src={color.img} alt={p.name} loading="lazy" style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center',
          padding: '2.5rem',
          transform: imgHov ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform .8s cubic-bezier(.25,.46,.45,.94)',
        }} />

        {/* sélecteur couleur */}
        {p.colors.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '1rem', left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 0,
            padding: '0 1rem',
          }}>
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,.92)',
              backdropFilter: 'blur(8px)',
              padding: '5px 8px',
              gap: 6,
            }}>
              {p.colors.map((c, i) => (
                <button key={i} onClick={() => setCi(i)} title={c.label} style={{
                  width: 28, height: 28,
                  background: c.hex,
                  border: i === ci ? '2px solid var(--black)' : '2px solid transparent',
                  outline: 'none',
                  boxShadow: i === ci ? 'none' : 'inset 0 0 0 1px rgba(0,0,0,.12)',
                  transition: 'border-color .15s, transform .15s',
                  transform: i === ci ? 'scale(1.1)' : 'scale(1)',
                  minWidth: 28, minHeight: 28,
                  flexShrink: 0,
                }} />
              ))}
              <span style={{
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '10px', letterSpacing: '.1em',
                color: 'var(--black)', textTransform: 'uppercase',
                alignSelf: 'center', paddingLeft: 6, whiteSpace: 'nowrap',
              }}>{color.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* INFO */}
      <div style={{
        order: reverse ? 1 : 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)',
        background: reverse ? 'var(--off)' : 'var(--white)',
      }}>

        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.28em', textTransform: 'uppercase',
          color: 'var(--grey)', marginBottom: '1.75rem', display: 'block',
        }}>0{index + 1} — {p.category}</span>

        <h3 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          lineHeight: 1.1, letterSpacing: '.01em',
          marginBottom: '.6rem',
        }}>{p.name}</h3>

        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '12px', color: 'var(--grey)',
          letterSpacing: '.04em', marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}>{p.tagline}</p>

        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 400,
          fontSize: '1.1rem', letterSpacing: '.02em',
          marginBottom: '1.75rem',
        }}>{p.price.toLocaleString('fr')} F CFA</p>

        {/* tailles */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--grey)', marginBottom: '.6rem',
          }}>Taille</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {p.sizes.map((s, i) => (
              <button key={s} onClick={() => setSi(i)} style={{
                width: 38, height: 38,
                background: i === si ? 'var(--black)' : 'transparent',
                color: i === si ? 'var(--white)' : 'var(--grey)',
                border: 'none',
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '11px', letterSpacing: '.04em',
                transition: 'background .15s, color .15s',
              }}>{s}</button>
            ))}
          </div>
        </div>

        <button onClick={handleAdd} style={{
          alignSelf: 'flex-start',
          background: added ? '#2a6e3f' : 'var(--black)',
          color: 'var(--white)', border: 'none',
          fontFamily: 'var(--sans)', fontWeight: 400,
          fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
          padding: '.9rem 2.2rem',
          minHeight: 48,
          transition: 'background .3s, opacity .15s',
        }}
        onMouseEnter={e => { if (!added) e.currentTarget.style.opacity = '.8' }}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          {added ? '✓ Ajouté' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  )
}

export default function ShopPage({ setPage }) {
  const [cat, setCat] = useState('Tous')
  const [headerRef, headerVis] = useVis()
  const PRODUCTS = useProducts()
  const categories = ['Tous', ...new Set(PRODUCTS.map(p => p.category))]

  useEffect(() => { window.scrollTo({ top: 0 }) }, [])

  const filteredProducts = cat === 'Tous' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <div style={{ paddingTop: 'var(--nav)', background: 'var(--white)', minHeight: '100vh' }}>

      {/* header */}
      <div ref={headerRef} style={{
        padding: 'clamp(3rem, 6vw, 5rem) var(--px) 0',
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? 'none' : 'translateY(14px)',
        transition: 'opacity .5s, transform .5s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '1.5rem', paddingBottom: '1.75rem',
          borderBottom: '1px solid var(--light)',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'var(--grey)', marginBottom: '.5rem',
            }}>Collection SS 2026</p>
            <h1 style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              lineHeight: 1.05,
            }}>The Collection</h1>
          </div>

          {/* filtres */}
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: 'var(--sans)', fontWeight: c === cat ? 400 : 300,
                fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase',
                color: c === cat ? 'var(--black)' : 'var(--grey)',
                borderBottom: c === cat ? '1px solid var(--black)' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color .15s',
                minHeight: 36,
              }}>{c}</button>
            ))}
          </nav>
        </div>
      </div>

      {/* produits — ligne complète */}
      <div>
        {filteredProducts.map((p, i) => (
          <ProductRow key={p.id} p={p} index={i} reverse={i % 2 === 1} />
        ))}
      </div>

      {/* bas de page */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 5rem) var(--px)',
        textAlign: 'center',
        borderTop: '1px solid var(--light)',
      }}>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '12px', color: 'var(--grey)',
          letterSpacing: '.04em', marginBottom: '1.5rem',
          lineHeight: 1.8,
        }}>
          Paiement à la réception · Livraison Dakar · Aucune avance
        </p>
        <button onClick={() => setPage('home')} style={{
          background: 'none', border: 'none', padding: 0,
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--grey)',
          borderBottom: '1px solid var(--light)', paddingBottom: '2px',
          transition: 'color .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}>
          Retour accueil
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-row {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .product-row > div { order: unset !important; }
        }
      `}</style>
    </div>
  )
}
