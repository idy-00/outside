import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { PRODUCTS, CATEGORIES } from '../data/products'

function useOnScreen(threshold = .05) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [threshold])
  return [ref, vis]
}

function Card({ p, delay = 0 }) {
  const [ci, setCi] = useState(0)
  const [si, setSi] = useState(0)
  const [added, setAdded] = useState(false)
  const { add, openCart } = useCart()

  const color = p.colors[ci]

  const handleAdd = () => {
    add({ id: p.id, name: p.name, color: color.label, size: p.sizes[si], price: p.price, img: color.img })
    setAdded(true)
    setTimeout(() => setAdded(false), 1100)
    openCart()
  }

  return (
    <article style={{
      background: '#fff', display: 'flex', flexDirection: 'column',
      opacity: 0, animation: `cardIn .4s ${delay}s forwards`,
    }}>
      <style>{`@keyframes cardIn{to{opacity:1}}`}</style>

      {/* image container */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f0ebe3' }}>
        <img src={color.img} alt={p.name} style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          transition: 'transform .45s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />

        {/* color swatches on image */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10,
          display: 'flex', gap: '.3rem',
        }}>
          {p.colors.map((c, i) => (
            <button key={i} title={c.label} onClick={() => setCi(i)} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: c.hex, border: 'none', padding: 0,
              outline: `2px solid ${i === ci ? '#fff' : 'transparent'}`,
              outlineOffset: 2,
              boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
              transition: 'outline-color .15s',
            }} />
          ))}
        </div>

        {/* category label */}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(10,10,10,.65)', color: '#fff', backdropFilter: 'blur(4px)',
          fontFamily: 'DM Mono', fontSize: '.48rem', letterSpacing: '.18em',
          textTransform: 'uppercase', padding: '.2rem .5rem',
        }}>{p.category}</span>
      </div>

      {/* card body */}
      <div style={{ padding: '.9rem 1rem 1.1rem', color: 'var(--ink)', flex: 1, display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '.9rem', letterSpacing: '-.01em' }}>
            {p.name}
          </span>
          {p.price > 0
            ? <span style={{ fontFamily: 'DM Mono', fontSize: '.78rem' }}>{p.price.toLocaleString('fr')} F</span>
            : <span style={{ fontFamily: 'DM Mono', fontSize: '.58rem', opacity: .3, fontStyle: 'italic' }}>— F</span>
          }
        </div>

        <p style={{ fontFamily: 'DM Mono', fontSize: '.56rem', letterSpacing: '.1em', opacity: .4 }}>
          {color.label} · {p.tagline}
        </p>

        {/* sizes */}
        <div style={{ display: 'flex', gap: '.2rem', flexWrap: 'wrap' }}>
          {p.sizes.map((s, i) => (
            <button key={s} onClick={() => setSi(i)} style={{
              minWidth: 30, height: 26, padding: '0 .3rem',
              border: `1px solid ${i === si ? 'var(--ink)' : '#ddd'}`,
              background: i === si ? 'var(--ink)' : 'transparent',
              color: i === si ? '#fff' : 'var(--ink)',
              fontFamily: 'DM Mono', fontSize: '.55rem',
              transition: 'all .12s',
            }}>{s}</button>
          ))}
        </div>

        <button onClick={handleAdd} disabled={added} style={{
          marginTop: 'auto',
          padding: '.7rem', border: 'none',
          background: added ? '#2a7a50' : 'var(--ink)',
          color: '#fff', fontFamily: 'Outfit', fontWeight: 500,
          fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase',
          transition: 'background .2s',
        }}>
          {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('Tous')
  const [ref, vis] = useOnScreen()

  const filtered = cat === 'Tous' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <section id="shop" ref={ref} style={{ background: 'var(--warm)', padding: '4.5rem var(--px) 5rem' }}>

      {/* header */}
      <div style={{
        borderBottom: '1px solid rgba(10,10,10,.12)',
        paddingBottom: '1.2rem', marginBottom: '2rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        color: 'var(--ink)',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
        transition: 'opacity .4s, transform .4s',
      }}>
        <div>
          <p style={{ fontFamily: 'DM Mono', fontSize: '.55rem', letterSpacing: '.22em', opacity: .4, marginBottom: '.3rem' }}>
            Collection · SS 2025
          </p>
          <h2 style={{
            fontFamily: 'Outfit', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            letterSpacing: '-.02em', lineHeight: 1,
          }}>SHOP</h2>
        </div>

        {/* filters */}
        <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '.3rem .8rem',
              background: c === cat ? 'var(--ink)' : 'transparent',
              color: c === cat ? '#fff' : 'var(--ink)',
              border: `1px solid ${c === cat ? 'var(--ink)' : 'rgba(10,10,10,.2)'}`,
              fontFamily: 'Outfit', fontWeight: 400, fontSize: '.62rem', letterSpacing: '.08em',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { if (c !== cat) e.currentTarget.style.borderColor = 'rgba(10,10,10,.6)' }}
            onMouseLeave={e => { if (c !== cat) e.currentTarget.style.borderColor = 'rgba(10,10,10,.2)' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      {vis && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: 1, background: 'rgba(10,10,10,.08)',
        }}>
          {filtered.map((p, i) => <Card key={p.id} p={p} delay={i * .07} />)}
        </div>
      )}
    </section>
  )
}
