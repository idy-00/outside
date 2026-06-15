import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { WA_NUMBER } from '../data/products'

function buildMsg(items) {
  const lines = items.map(i =>
    `• ${i.name} — ${i.color} / ${i.size} ×${i.qty}${i.price ? ` (${(i.price*i.qty).toLocaleString('fr')} FCFA)` : ''}`
  ).join('\n')
  const total = items.reduce((s,i)=>s+(i.price||0)*i.qty,0)
  return encodeURIComponent(
    `Bonjour OUTSIDE 👋\n\nMa commande :\n${lines}\n${total?`\nTotal estimé : ${total.toLocaleString('fr')} FCFA`:''}\n\nMerci de confirmer la disponibilité 🙏`
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

  return (
    <>
      {/* dim overlay */}
      <div onClick={closeCart} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)',
        zIndex: 400,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .25s',
      }} />

      {/* panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420,
        maxWidth: '100vw', zIndex: 401,
        background: 'var(--smoke)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
      }}>

        {/* head */}
        <div style={{
          height: 52, padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--stone)',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily:'DM Mono', fontSize:'.65rem', letterSpacing:'.12em', color:'var(--ink)' }}>
            PANIER {items.length > 0 && `— ${items.reduce((s,i)=>s+i.qty,0)} article${items.length > 1 ? 's' : ''}`}
          </span>
          <button onClick={closeCart} style={{
            background:'none', border:'none', width:32, height:32,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--ink)', fontSize:'1rem', opacity:.4,
            transition:'opacity .15s',
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity=1}
          onMouseLeave={e=>e.currentTarget.style.opacity=.4}>✕</button>
        </div>

        {/* list */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {items.length === 0 ? (
            <div style={{
              height:'100%', display:'flex',
              flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:'1rem', opacity:.25, color:'var(--ink)',
            }}>
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                <path d="M1 1h4L9 18H24l4-10H10"/>
                <circle cx="11" cy="24.5" r="2" fill="currentColor" stroke="none"/>
                <circle cx="23" cy="24.5" r="2" fill="currentColor" stroke="none"/>
              </svg>
              <p style={{ fontFamily:'DM Mono', fontSize:'.62rem', letterSpacing:'.15em' }}>VIDE</p>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <div key={item.key} style={{
                  display:'grid', gridTemplateColumns:'88px 1fr',
                  gap:'1.2rem', padding:'1.2rem 1.5rem',
                  borderBottom:'1px solid var(--stone)',
                  color:'var(--ink)',
                }}>
                  <img src={item.img} alt={item.name}
                    style={{ width:88, height:110, objectFit:'cover', objectPosition:'top' }} />

                  <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
                    <span style={{ fontFamily:'Anton', fontSize:'.85rem', letterSpacing:'.06em' }}>{item.name}</span>
                    <span style={{ fontFamily:'DM Mono', fontSize:'.58rem', letterSpacing:'.1em', opacity:.4 }}>
                      {item.color} · {item.size}
                    </span>

                    <div style={{ display:'flex', alignItems:'center', gap:'.4rem', marginTop:'auto' }}>
                      <button onClick={() => setQty(item.key, item.qty-1)} style={{
                        width:24, height:24, border:'1px solid var(--stone)',
                        background:'none', color:'var(--ink)', fontSize:'.9rem',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>−</button>
                      <span style={{ fontFamily:'DM Mono', fontSize:'.7rem', minWidth:20, textAlign:'center' }}>{item.qty}</span>
                      <button onClick={() => setQty(item.key, item.qty+1)} style={{
                        width:24, height:24, border:'1px solid var(--stone)',
                        background:'none', color:'var(--ink)', fontSize:'.9rem',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>+</button>
                      <span style={{ marginLeft:'auto', fontFamily:'DM Mono', fontSize:'.72rem', letterSpacing:'.04em' }}>
                        {item.price > 0 ? `${(item.price*item.qty).toLocaleString('fr')} F` : '—'}
                      </span>
                    </div>

                    <button onClick={() => remove(item.key)} style={{
                      background:'none', border:'none', padding:0,
                      fontFamily:'DM Mono', fontSize:'.55rem',
                      letterSpacing:'.1em', color:'var(--grey)',
                      textAlign:'left', textDecoration:'underline',
                      transition:'color .15s',
                    }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--ink)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--grey)'}>
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div style={{
            padding:'1.2rem 1.5rem', borderTop:'1px solid var(--stone)',
            display:'flex', flexDirection:'column', gap:'.8rem',
            flexShrink:0, color:'var(--ink)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontFamily:'DM Mono', fontSize:'.6rem', letterSpacing:'.1em', opacity:.45 }}>Total estimé</span>
              {total > 0
                ? <span style={{ fontFamily:'Anton', fontSize:'1.1rem' }}>{total.toLocaleString('fr')} FCFA</span>
                : <span style={{ fontFamily:'DM Mono', fontSize:'.6rem', opacity:.3, fontStyle:'italic' }}>À confirmer</span>
              }
            </div>

            <a href={`https://wa.me/${WA_NUMBER}?text=${buildMsg(items)}`}
              target="_blank" rel="noopener" onClick={closeCart}
              style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'.7rem',
                background:'#128C7E', color:'#fff', padding:'1rem',
                fontFamily:'DM Sans', fontWeight:500, fontSize:'.65rem',
                letterSpacing:'.15em', textTransform:'uppercase',
                textDecoration:'none', transition:'background .15s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='#0f7468'}
              onMouseLeave={e=>e.currentTarget.style.background='#128C7E'}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Commander via WhatsApp
            </a>

            <button onClick={clear} style={{
              background:'none', border:'none', padding:'.1rem 0',
              fontFamily:'DM Mono', fontSize:'.55rem', letterSpacing:'.1em',
              color:'var(--grey)', textDecoration:'underline',
              textAlign:'center', transition:'color .15s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--ink)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--grey)'}>
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  )
}
