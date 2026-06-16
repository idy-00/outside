import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { PRODUCTS, CATEGORIES } from '../data/products'

function useVisible() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .04 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, vis]
}

function Card({ p }) {
  const [ci, setCi] = useState(0)
  const [si, setSi] = useState(0)
  const [added, setAdded] = useState(false)
  const { add, openCart } = useCart()
  const color = p.colors[ci]

  const handleAdd = () => {
    add({ id: p.id, name: p.name, color: color.label, size: p.sizes[si], price: p.price, img: color.img })
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
    openCart()
  }

  return (
    <article style={{ background: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
      {/* image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#e8e4de' }}
        onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
        <img src={color.img} alt={p.name} style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          filter: 'grayscale(.3) contrast(1.05)',
          transition: 'transform .5s ease',
        }} />

        {/* swatches */}
        <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 5 }}>
          {p.colors.map((c, i) => (
            <button key={i} title={c.label} onClick={e => { e.stopPropagation(); setCi(i) }} style={{
              width: 12, height: 12, background: c.hex, border: 'none',
              outline: `2px solid ${i === ci ? '#fff' : 'transparent'}`,
              outlineOffset: 2, boxShadow: '0 0 0 1px rgba(0,0,0,.3)',
              padding: 0, transition: 'outline-color .15s',
            }} />
          ))}
        </div>
      </div>

      {/* info */}
      <div style={{ padding: '.9rem .9rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500, fontSize: '14px' }}>
            {p.name}
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: p.price > 0 ? 'var(--black)' : 'var(--grey)' }}>
            {p.price > 0 ? `${p.price.toLocaleString('fr')} F` : '—'}
          </span>
        </div>

        <span style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '12px', color: 'var(--grey)',
        }}>
          {color.label}
        </span>

        {/* sizes */}
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 2 }}>
          {p.sizes.map((s, i) => (
            <button key={s} onClick={() => setSi(i)} style={{
              minWidth: 30, height: 26, padding: '0 .3rem',
              border: `1px solid ${i === si ? 'var(--black)' : '#ddd'}`,
              background: i === si ? 'var(--black)' : 'transparent',
              color: i === si ? 'var(--white)' : 'var(--black)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              transition: 'all .12s',
            }}>{s}</button>
          ))}
        </div>

        <button onClick={handleAdd} style={{
          marginTop: 8, padding: '.6rem 1rem',
          border: `1px solid ${added ? 'transparent' : 'var(--border)'}`,
          background: added ? 'var(--black)' : 'transparent',
          color: added ? 'var(--white)' : 'var(--black)',
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
          fontSize: '13px', transition: 'all .15s',
        }}>
          {added ? '✓ Ajouté' : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('Tous')
  const [ref, vis] = useVisible()
  const filtered = cat === 'Tous' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <section id="shop" ref={ref} style={{ background: 'var(--white)' }}>
      {/* header */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 5rem) var(--px) 1.5rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
        transition: 'opacity .5s, transform .5s',
      }}>
        <div>
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--grey)', marginBottom: '.5rem',
          }}>Collection · SS 2025</p>
          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            lineHeight: .9, textTransform: 'uppercase', letterSpacing: '-.01em',
          }}>Shop</h2>
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '.25rem .75rem',
              border: '1px solid',
              borderColor: c === cat ? 'var(--black)' : 'var(--border)',
              background: c === cat ? 'var(--black)' : 'transparent',
              color: c === cat ? 'var(--white)' : 'var(--grey)',
              fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
              fontSize: '13px', transition: 'all .15s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* grid */}
      {vis && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)', borderTop: 'none',
        }}>
          {filtered.map(p => <Card key={p.id} p={p} />)}
        </div>
      )}
    </section>
  )
}
