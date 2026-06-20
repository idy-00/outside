import { useState } from 'react'
import { logout } from './auth'
import { useAdminProducts } from './useAdminProducts'
import { PRODUCTS as BASE_PRODUCTS } from '../data/products'
import ProductForm from './ProductForm'

export default function AdminPanel({ onLogout }) {
  const { merged, custom, addProduct, updateProduct, deleteProduct, restoreProduct } = useAdminProducts()
  const [view, setView] = useState('list') // 'list' | 'add' | 'edit'
  const [editing, setEditing] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)

  const handleLogout = () => { logout(); onLogout() }

  const handleSaveNew = p => {
    addProduct(p)
    setView('list')
  }

  const handleSaveEdit = p => {
    updateProduct(p.id, p)
    setEditing(null)
    setView('list')
  }

  const handleDelete = id => {
    deleteProduct(id)
    setConfirmDel(null)
  }

  const allForAdmin = [
    ...BASE_PRODUCTS.map(base => {
      const override = custom.find(c => c.id === base.id)
      return override ? { ...base, ...override } : base
    }),
    ...custom.filter(c => c._custom),
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', color: 'var(--white)' }}>

      {/* header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem clamp(1.5rem, 4vw, 3rem)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        position: 'sticky', top: 0, background: '#0e0e0e', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/images/logo-white.png" style={{ height: 28, opacity: .7 }} alt="OUTSIDE" />
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.3)',
          }}>Admin</span>
        </div>
        <button onClick={handleLogout} style={{
          background: 'none', border: '1px solid rgba(255,255,255,.1)',
          color: 'rgba(255,255,255,.35)', fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase',
          padding: '.5rem 1rem', cursor: 'pointer',
        }}>Déconnexion</button>
      </div>

      <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)' }}>

        {/* ── LIST VIEW ── */}
        {view === 'list' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              }}>Catalogue ({allForAdmin.filter(p => !p._hidden).length} articles)</h2>
              <button onClick={() => setView('add')} style={{
                background: 'var(--white)', color: 'var(--black)', border: 'none',
                fontFamily: 'var(--sans)', fontWeight: 400,
                fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
                padding: '.75rem 1.5rem', cursor: 'pointer', minHeight: 42,
              }}>+ Nouveau produit</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {allForAdmin.map((p, i) => (
                <div key={p.id} style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr auto',
                  gap: '1.25rem', alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,.06)',
                  opacity: p._hidden ? .35 : 1,
                }} className="admin-row">
                  {/* image */}
                  <div style={{
                    width: 60, height: 72, background: '#1a1a1a', overflow: 'hidden', flexShrink: 0,
                  }}>
                    {p.colors?.[0]?.img && (
                      <img src={p.colors[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    )}
                  </div>

                  {/* info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1rem' }}>{p.name}</span>
                      <span style={{
                        fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px',
                        letterSpacing: '.15em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,.25)',
                        background: 'rgba(255,255,255,.06)', padding: '2px 7px',
                      }}>{p.category}</span>
                      {p._hidden && <span style={{ fontSize: '9px', color: '#e05c5c', letterSpacing: '.1em' }}>MASQUÉ</span>}
                    </div>
                    <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.3)', marginTop: '.2rem' }}>
                      {p.price?.toLocaleString('fr')} F · {p.colors?.length} couleur{p.colors?.length > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* actions */}
                  <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                    {p._hidden ? (
                      <ActionBtn onClick={() => restoreProduct(p.id)} label="Restaurer" />
                    ) : (
                      <>
                        <ActionBtn onClick={() => { setEditing(p); setView('edit') }} label="Modifier" />
                        <ActionBtn onClick={() => setConfirmDel(p.id)} label="Supprimer" danger />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── ADD VIEW ── */}
        {view === 'add' && (
          <>
            <button onClick={() => setView('list')} style={backBtnStyle}>← Retour</button>
            <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.8rem', marginBottom: '2rem' }}>
              Nouveau produit
            </h2>
            <div style={{ maxWidth: 640 }}>
              <ProductForm onSave={handleSaveNew} onCancel={() => setView('list')} />
            </div>
          </>
        )}

        {/* ── EDIT VIEW ── */}
        {view === 'edit' && editing && (
          <>
            <button onClick={() => setView('list')} style={backBtnStyle}>← Retour</button>
            <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.8rem', marginBottom: '2rem' }}>
              Modifier — {editing.name}
            </h2>
            <div style={{ maxWidth: 640 }}>
              <ProductForm initial={editing} onSave={handleSaveEdit} onCancel={() => setView('list')} />
            </div>
          </>
        )}
      </div>

      {/* ── MODAL CONFIRM DELETE ── */}
      {confirmDel && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '1.5rem',
        }}>
          <div style={{
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,.1)',
            padding: '2rem', maxWidth: 380, width: '100%',
          }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.3rem', marginBottom: '1rem' }}>
              Supprimer ce produit ?
            </h3>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,.4)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Il sera masqué de la boutique. Tu pourras le restaurer depuis le catalogue admin.
            </p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => handleDelete(confirmDel)} style={{
                flex: 1, background: '#c0392b', color: '#fff', border: 'none',
                fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '11px',
                letterSpacing: '.15em', textTransform: 'uppercase',
                padding: '.85rem', cursor: 'pointer',
              }}>Supprimer</button>
              <button onClick={() => setConfirmDel(null)} style={{
                flex: 1, background: 'none', border: '1px solid rgba(255,255,255,.15)',
                color: 'rgba(255,255,255,.4)', fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
                padding: '.85rem', cursor: 'pointer',
              }}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 500px) {
          .admin-row { grid-template-columns: 50px 1fr !important; }
          .admin-row > div:last-child { grid-column: 1 / -1; padding-bottom: .5rem; }
        }
      `}</style>
    </div>
  )
}

function ActionBtn({ onClick, label, danger }) {
  return (
    <button onClick={onClick} style={{
      background: 'none',
      border: `1px solid ${danger ? 'rgba(192,57,43,.4)' : 'rgba(255,255,255,.1)'}`,
      color: danger ? '#e05c5c' : 'rgba(255,255,255,.4)',
      fontFamily: 'var(--sans)', fontWeight: 300,
      fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase',
      padding: '.4rem .8rem', cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'border-color .15s, color .15s',
    }}
    onMouseEnter={e => { e.currentTarget.style.color = danger ? '#ff6b6b' : 'var(--white)'; e.currentTarget.style.borderColor = danger ? 'rgba(192,57,43,.8)' : 'rgba(255,255,255,.3)' }}
    onMouseLeave={e => { e.currentTarget.style.color = danger ? '#e05c5c' : 'rgba(255,255,255,.4)'; e.currentTarget.style.borderColor = danger ? 'rgba(192,57,43,.4)' : 'rgba(255,255,255,.1)' }}>
      {label}
    </button>
  )
}

const backBtnStyle = {
  background: 'none', border: 'none', padding: 0,
  fontFamily: 'var(--sans)', fontWeight: 300,
  fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,.3)', cursor: 'pointer',
  marginBottom: '1.5rem', display: 'block',
}
