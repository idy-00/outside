import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { WA_NUMBER } from '../data/products'

function buildMsg(items) {
  const lines = items.map(i =>
    `• ${i.name} — ${i.color} / ${i.size} ×${i.qty}${i.price ? ` (${(i.price * i.qty).toLocaleString('fr')} FCFA)` : ''}`
  ).join('\n')
  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0)
  return encodeURIComponent(
    `Bonjour OUTSIDE 👋\n\nMa commande :\n${lines}\n${total ? `\nTotal : ${total.toLocaleString('fr')} FCFA` : ''}\n\nMerci de confirmer la disponibilité 🙏`
  )
}

export default function CartDrawer() {
  const { items, open, closeCart, remove, setQty, clear, total } = useCart()

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') closeCart() }
    if (open) document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, closeCart])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div onClick={closeCart} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)',
        zIndex: 100, opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .25s',
      }} />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 380, maxWidth: '92vw', zIndex: 101,
        background: 'var(--white)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
      }}>
        {/* header */}
        <div style={{
          height: 'var(--nav)', padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400, fontSize: '14px' }}>
            Panier{count > 0 ? ` (${count})` : ''}
          </span>
          <button onClick={closeCart} style={{
            background: 'none', border: 'none',
            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '18px',
            color: 'var(--grey)', lineHeight: 1,
          }}>×</button>
        </div>

        {/* items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {items.length === 0 ? (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--grey)',
            }}>
              <svg width="28" height="24" viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1h4l4 17h15l4-10H10"/><circle cx="11" cy="24.5" r="2" fill="currentColor" stroke="none"/><circle cx="23" cy="24.5" r="2" fill="currentColor" stroke="none"/>
              </svg>
              <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '14px' }}>Votre panier est vide</p>
            </div>
          ) : items.map(item => (
            <div key={item.key} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr',
              gap: '1rem', padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--border)',
            }}>
              <img src={item.img} alt="" style={{ width: 80, height: 100, objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(.2)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500, fontSize: '14px' }}>{item.name}</span>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '12px', color: 'var(--grey)' }}>
                  {item.color} · {item.size}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                  <button onClick={() => setQty(item.key, item.qty - 1)} style={{ width: 24, height: 24, border: '1px solid var(--border)', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>−</button>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => setQty(item.key, item.qty + 1)} style={{ width: 24, height: 24, border: '1px solid var(--border)', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>+</button>
                  <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                    {item.price > 0 ? `${(item.price * item.qty).toLocaleString('fr')} F` : '—'}
                  </span>
                </div>
                <button onClick={() => remove(item.key)} style={{
                  background: 'none', border: 'none', padding: 0, textAlign: 'left',
                  fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '12px',
                  color: 'var(--grey)', textDecoration: 'underline',
                }}>Retirer</button>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '.85rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--grey)' }}>Total estimé</span>
              {total > 0
                ? <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500, fontSize: '16px' }}>{total.toLocaleString('fr')} FCFA</span>
                : <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--grey)', fontStyle: 'italic' }}>À confirmer</span>
              }
            </div>
            <a href={`https://wa.me/${WA_NUMBER}?text=${buildMsg(items)}`}
              target="_blank" rel="noopener noreferrer" onClick={closeCart}
              style={{
                display: 'block', textAlign: 'center',
                background: 'var(--black)', color: 'var(--white)',
                fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500,
                fontSize: '14px', padding: '.85rem',
                textDecoration: 'none', transition: 'opacity .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Commander sur WhatsApp
            </a>
            <button onClick={clear} style={{
              background: 'none', border: 'none',
              fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '12px',
              color: 'var(--grey)', textDecoration: 'underline', textAlign: 'center',
            }}>Vider le panier</button>
          </div>
        )}
      </div>
    </>
  )
}
