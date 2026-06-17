import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { WA_NUMBER } from '../data/products'

function buildMsg(items) {
  const lines = items.map(i =>
    `• ${i.name} — ${i.color} / ${i.size} ×${i.qty}${i.price ? ` (${(i.price * i.qty).toLocaleString('fr')} FCFA)` : ''}`
  ).join('\n')
  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0)
  return encodeURIComponent(
    `Bonjour OUTSIDE™ 👋\n\nMa commande :\n${lines}\n${total ? `\nTotal : ${total.toLocaleString('fr')} FCFA` : ''}\n\nMerci de confirmer la disponibilité 🙏`
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
      {/* overlay */}
      <div onClick={closeCart} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
        zIndex: 300, opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .3s',
        backdropFilter: open ? 'blur(3px)' : 'none',
      }} />

      {/* drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 400, maxWidth: '94vw', zIndex: 301,
        background: 'var(--white)',
        borderLeft: '1px solid var(--light)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
        boxShadow: open ? '-20px 0 60px rgba(0,0,0,.12)' : 'none',
      }}>
        {/* header */}
        <div style={{
          height: 'var(--nav)', padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--light)', flexShrink: 0,
          background: 'var(--white)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '13px',
              letterSpacing: '.05em', textTransform: 'uppercase',
            }}>Panier</span>
            {count > 0 && (
              <span style={{
                background: 'var(--black)', color: 'var(--white)',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                fontSize: '10px', letterSpacing: '.06em',
                width: 20, height: 20, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{count}</span>
            )}
          </div>
          <button onClick={closeCart} style={{
            background: 'none', border: 'none',
            color: 'var(--grey)', fontSize: '1.3rem', lineHeight: 1,
            transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}>×</button>
        </div>

        {/* items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {items.length === 0 ? (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
              color: 'var(--grey)', padding: '2rem',
            }}>
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M1 1h4l5 17h15l4-10H9"/><circle cx="11" cy="25" r="2"/><circle cx="24" cy="25" r="2"/>
              </svg>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '15px', marginBottom: '.4rem' }}>Votre panier est vide</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--grey)' }}>
                  Explorez la collection pour commencer.
                </p>
              </div>
              <button onClick={() => { closeCart(); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }} style={{
                background: 'var(--black)', color: 'var(--white)', border: 'none',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase',
                padding: '.75rem 2rem', transition: 'opacity .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Voir la boutique
              </button>
            </div>
          ) : items.map(item => (
            <div key={item.key} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr',
              gap: '1rem', padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--light)',
            }}>
              <div style={{ background: '#f5f2ed', overflow: 'hidden' }}>
                <img src={item.img} alt="" style={{
                  width: 90, height: 112,
                  objectFit: 'cover', objectPosition: 'top',
                }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '14px',
                  letterSpacing: '.01em',
                }}>{item.name}</span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
                  fontSize: '12px', color: 'var(--grey)',
                }}>
                  {item.color} · {item.size}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                  fontSize: '14px', marginTop: '.15rem',
                }}>
                  {item.price > 0 ? `${(item.price * item.qty).toLocaleString('fr')} F` : 'À confirmer'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 'auto' }}>
                  <button onClick={() => setQty(item.key, item.qty - 1)} style={{
                    width: 26, height: 26, border: '1px solid var(--light)',
                    background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', color: 'var(--black)', transition: 'border-color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--black)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--light)'}>−</button>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                    fontSize: '13px', minWidth: 20, textAlign: 'center',
                  }}>{item.qty}</span>
                  <button onClick={() => setQty(item.key, item.qty + 1)} style={{
                    width: 26, height: 26, border: '1px solid var(--light)',
                    background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', color: 'var(--black)', transition: 'border-color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--black)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--light)'}>+</button>
                  <button onClick={() => remove(item.key)} style={{
                    background: 'none', border: 'none', marginLeft: 'auto', padding: 0,
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '11px',
                    color: 'var(--grey)', textDecoration: 'underline', transition: 'color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}>Retirer</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--light)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
            flexShrink: 0, background: 'var(--white)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
                fontSize: '13px', color: 'var(--grey)',
              }}>Total estimé</span>
              {total > 0
                ? <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                    fontSize: '18px',
                  }}>{total.toLocaleString('fr')} F CFA</span>
                : <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
                    fontSize: '13px', color: 'var(--grey)', fontStyle: 'italic',
                  }}>À confirmer</span>
              }
            </div>
            <button
              onClick={() => {
                const url = `https://wa.me/${WA_NUMBER}?text=${buildMsg(items)}`
                window.open(url, '_blank', 'noopener,noreferrer')
                closeCart()
              }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem',
                background: '#25D366', color: 'var(--white)',
                fontFamily: 'var(--sans)', fontWeight: 500,
                fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase',
                padding: '.9rem', border: 'none',
                width: '100%', minHeight: 52,
                transition: 'opacity .15s', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Commander sur WhatsApp
            </button>
            <button onClick={clear} style={{
              background: 'none', border: 'none',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
              fontSize: '12px', color: 'var(--grey)',
              textDecoration: 'underline', textAlign: 'center',
              transition: 'color .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--black)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}>Vider le panier</button>
          </div>
        )}
      </div>
    </>
  )
}
