import { useState } from 'react'
import { logout } from './auth'
import { useAdminProducts } from './useAdminProducts'
import { PRODUCTS as BASE_PRODUCTS } from '../data/products'
import { getStats } from './stats'
import ProductForm from './ProductForm'

// ── helpers ──────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return '—'
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'À l\'instant'
  if (m < 60) return `Il y a ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `Il y a ${h}h`
  const d = Math.floor(h / 24)
  return `Il y a ${d}j`
}

function ordersLast7Days(orders = []) {
  const cutoff = Date.now() - 7 * 24 * 3600 * 1000
  return orders.filter(o => o.ts > cutoff).length
}

function ordersLast30Days(orders = []) {
  const cutoff = Date.now() - 30 * 24 * 3600 * 1000
  return orders.filter(o => o.ts > cutoff).length
}

// ── stat card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      padding: '1.5rem 1.75rem',
      border: '1px solid rgba(255,255,255,.07)',
      background: 'rgba(255,255,255,.02)',
      display: 'flex', flexDirection: 'column', gap: '.5rem',
    }}>
      <p style={{
        fontFamily: 'var(--sans)', fontWeight: 300,
        fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.25)',
      }}>{label}</p>
      <p style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1,
        color: accent || 'var(--white)',
      }}>{value}</p>
      {sub && <p style={{
        fontFamily: 'var(--sans)', fontWeight: 300,
        fontSize: '11px', color: 'rgba(255,255,255,.25)',
      }}>{sub}</p>}
    </div>
  )
}

// ── action btn ────────────────────────────────────────────────
function ActionBtn({ onClick, label, danger }) {
  return (
    <button onClick={onClick} style={{
      background: 'none',
      border: `1px solid ${danger ? 'rgba(192,57,43,.35)' : 'rgba(255,255,255,.1)'}`,
      color: danger ? '#e05c5c' : 'rgba(255,255,255,.4)',
      fontFamily: 'var(--sans)', fontWeight: 300,
      fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase',
      padding: '.4rem .85rem', cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'border-color .15s, color .15s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = danger ? '#ff7070' : 'var(--white)'
      e.currentTarget.style.borderColor = danger ? 'rgba(192,57,43,.8)' : 'rgba(255,255,255,.3)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = danger ? '#e05c5c' : 'rgba(255,255,255,.4)'
      e.currentTarget.style.borderColor = danger ? 'rgba(192,57,43,.35)' : 'rgba(255,255,255,.1)'
    }}>
      {label}
    </button>
  )
}

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'list',      label: 'Catalogue' },
  { id: 'add',       label: '+ Nouveau produit' },
]

// ── main ──────────────────────────────────────────────────────
export default function AdminPanel({ onLogout }) {
  const { custom, addProduct, updateProduct, deleteProduct, restoreProduct } = useAdminProducts()
  const [view, setView] = useState('dashboard')
  const [editing, setEditing] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const stats = getStats()

  const allForAdmin = [
    ...BASE_PRODUCTS.map(base => {
      const override = custom.find(c => c.id === base.id)
      return override ? { ...base, ...override } : base
    }),
    ...custom.filter(c => c._custom),
  ]

  const visible = allForAdmin.filter(p => !p._hidden)
  const hidden  = allForAdmin.filter(p => p._hidden)

  const topProducts = Object.entries(stats.productAdds || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([id, count]) => {
      const p = allForAdmin.find(x => x.id === id)
      return { name: p?.name || id, count }
    })

  const catalogueValue = visible.reduce((s, p) => s + (p.price || 0), 0)

  const handleLogout = () => { logout(); onLogout() }

  const handleSaveNew = p => { addProduct(p); setView('list') }
  const handleSaveEdit = p => { updateProduct(p.id, p); setEditing(null); setView('list') }
  const handleDelete = id => { deleteProduct(id); setConfirmDel(null) }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'var(--white)', display: 'flex', flexDirection: 'column' }}>

      {/* ── TOP BAR ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
        height: 56,
        borderBottom: '1px solid rgba(255,255,255,.06)',
        position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 20,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* hamburger mobile */}
          <button onClick={() => setMenuOpen(v => !v)} style={{
            display: 'none', background: 'none', border: 'none',
            color: 'rgba(255,255,255,.4)', cursor: 'pointer', padding: '.25rem',
          }} className="admin-burger">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 1h18M0 7h18M0 13h18"/>
            </svg>
          </button>
          <img src="/images/logo-white.png" style={{ height: 26, opacity: .65 }} alt="OUTSIDE" />
          <div style={{ width: '1px', height: 18, background: 'rgba(255,255,255,.08)' }} />
          <span style={{
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.2)',
          }}>Administration</span>
        </div>

        <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.35rem',
            background: 'none', border: '1px solid rgba(255,255,255,.08)',
            color: 'rgba(255,255,255,.3)', fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase',
            padding: '.45rem .9rem', textDecoration: 'none',
            transition: 'color .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M7 1h4v4M11 1L5 7"/><path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8"/>
            </svg>
            Voir le site
          </a>
          <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid rgba(255,255,255,.08)',
            color: 'rgba(255,255,255,.3)', fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase',
            padding: '.45rem .9rem', cursor: 'pointer',
            transition: 'color .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}>
            Déconnexion
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 200, flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,.05)',
          padding: '2rem 0',
          display: 'flex', flexDirection: 'column', gap: '.25rem',
        }} className={`admin-sidebar${menuOpen ? ' open' : ''}`}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setView(n.id === 'add' ? 'add' : n.id); setMenuOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: view === n.id ? 'rgba(255,255,255,.05)' : 'none',
              border: 'none', borderLeft: view === n.id ? '2px solid rgba(255,255,255,.4)' : '2px solid transparent',
              color: view === n.id ? 'var(--white)' : 'rgba(255,255,255,.3)',
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase',
              padding: '.75rem 1.5rem', cursor: 'pointer',
              transition: 'color .15s, background .15s',
            }}
            onMouseEnter={e => { if (view !== n.id) e.currentTarget.style.color = 'rgba(255,255,255,.6)' }}
            onMouseLeave={e => { if (view !== n.id) e.currentTarget.style.color = 'rgba(255,255,255,.3)' }}>
              {n.label}
            </button>
          ))}

          <div style={{ marginTop: 'auto', padding: '0 1.5rem' }}>
            <div style={{ height: '1px', background: 'rgba(255,255,255,.05)', marginBottom: '1.25rem' }} />
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.15)', lineHeight: 1.8,
            }}>
              {visible.length} articles actifs<br />
              {hidden.length > 0 && `${hidden.length} masqué${hidden.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </aside>

        {/* ── CONTENT ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)' }}>

          {/* ── DASHBOARD ── */}
          {view === 'dashboard' && (
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.6rem' }}>Vue d'ensemble</p>
              <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '2.5rem', lineHeight: 1.1 }}>
                Tableau de bord
              </h2>

              {/* stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', marginBottom: '3rem' }} className="stats-grid">
                <StatCard label="Vues du site" value={stats.pageViews || 0} sub="Depuis le lancement" />
                <StatCard label="Commandes WhatsApp" value={stats.waClicks || 0} sub={stats.lastOrder ? `Dernière : ${timeAgo(stats.lastOrder)}` : 'Aucune encore'} accent="rgba(37,211,102,.9)" />
                <StatCard label="Ajouts panier" value={stats.cartAdds || 0} sub="Total cumulé" />
                <StatCard label="Articles en vente" value={visible.length} sub={`${Object.keys(stats.productAdds || {}).length} produits cliqués`} />
              </div>

              {/* 7 / 30 jours */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,.06)', marginBottom: '3rem' }} className="stats-grid-2">
                <div style={{ padding: '1.5rem 1.75rem', background: '#0a0a0a' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.75rem' }}>7 derniers jours</p>
                  <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '2rem', color: 'rgba(37,211,102,.9)' }}>{ordersLast7Days(stats.orders)}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,.2)', marginTop: '.3rem' }}>commandes</p>
                </div>
                <div style={{ padding: '1.5rem 1.75rem', background: '#0a0a0a' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.75rem' }}>30 derniers jours</p>
                  <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '2rem', color: 'rgba(37,211,102,.9)' }}>{ordersLast30Days(stats.orders)}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,.2)', marginTop: '.3rem' }}>commandes</p>
                </div>
              </div>

              {/* top produits */}
              {topProducts.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '1.25rem' }}>Produits les plus ajoutés au panier</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {topProducts.map((p, i) => {
                      const max = topProducts[0].count
                      return (
                        <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1.5rem 1fr 80px', gap: '1rem', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                          <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '10px', color: 'rgba(255,255,255,.2)' }}>0{i + 1}</span>
                          <div>
                            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '.95rem', marginBottom: '.3rem' }}>{p.name}</p>
                            <div style={{ height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 1, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${(p.count / max) * 100}%`, background: 'rgba(255,255,255,.3)', transition: 'width .6s' }} />
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.35)', textAlign: 'right' }}>{p.count} ajout{p.count > 1 ? 's' : ''}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* catalogue rapide */}
              <div style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.02)' }}>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem' }}>Valeur catalogue</p>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.6rem' }}>
                  {catalogueValue.toLocaleString('fr')} F CFA
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,.2)', marginTop: '.3rem' }}>
                  Somme des prix de tous les articles actifs
                </p>
              </div>
            </div>
          )}

          {/* ── CATALOGUE ── */}
          {view === 'list' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem' }}>Gestion</p>
                  <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                    Catalogue <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '.75em' }}>({visible.length})</span>
                  </h2>
                </div>
                <button onClick={() => setView('add')} style={{
                  background: 'var(--white)', color: 'var(--black)', border: 'none',
                  fontFamily: 'var(--sans)', fontWeight: 400,
                  fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase',
                  padding: '.7rem 1.5rem', cursor: 'pointer', minHeight: 40,
                }}>+ Ajouter</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {allForAdmin.map(p => (
                  <div key={p.id} style={{
                    display: 'grid', gridTemplateColumns: '52px 1fr auto',
                    gap: '1.25rem', alignItems: 'center',
                    padding: '.9rem 0',
                    borderBottom: '1px solid rgba(255,255,255,.05)',
                    opacity: p._hidden ? .3 : 1,
                    transition: 'opacity .2s',
                  }} className="admin-row">
                    <div style={{ width: 52, height: 64, background: '#151515', overflow: 'hidden', flexShrink: 0 }}>
                      {p.colors?.[0]?.img && (
                        <img src={p.colors[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap', marginBottom: '.25rem' }}>
                        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '.95rem' }}>{p.name}</span>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '8px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', background: 'rgba(255,255,255,.05)', padding: '2px 6px' }}>{p.category}</span>
                        {p._hidden && <span style={{ fontFamily: 'var(--sans)', fontSize: '8px', letterSpacing: '.1em', color: '#e05c5c' }}>MASQUÉ</span>}
                      </div>
                      <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,.25)' }}>
                        {p.price?.toLocaleString('fr')} F · {p.colors?.length} couleur{p.colors?.length > 1 ? 's' : ''}
                        {stats.productAdds?.[p.id] ? ` · ${stats.productAdds[p.id]} ajout${stats.productAdds[p.id] > 1 ? 's' : ''} panier` : ''}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '.4rem', flexShrink: 0 }}>
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
            </div>
          )}

          {/* ── ADD ── */}
          {view === 'add' && (
            <div>
              <button onClick={() => setView('list')} style={backBtnStyle}>← Retour</button>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem' }}>Catalogue</p>
              <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '2rem' }}>Nouveau produit</h2>
              <div style={{ maxWidth: 640 }}>
                <ProductForm onSave={handleSaveNew} onCancel={() => setView('list')} />
              </div>
            </div>
          )}

          {/* ── EDIT ── */}
          {view === 'edit' && editing && (
            <div>
              <button onClick={() => setView('list')} style={backBtnStyle}>← Retour</button>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem' }}>Catalogue</p>
              <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '2rem' }}>Modifier — <em>{editing.name}</em></h2>
              <div style={{ maxWidth: 640 }}>
                <ProductForm initial={editing} onSave={handleSaveEdit} onCancel={() => setView('list')} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── MODAL CONFIRM DELETE ── */}
      {confirmDel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1.5rem' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.08)', padding: '2rem', maxWidth: 360, width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.3rem', marginBottom: '.75rem' }}>Supprimer ce produit ?</h3>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.35)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Il sera masqué de la boutique. Restaurable depuis le catalogue.
            </p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={() => handleDelete(confirmDel)} style={{ flex: 1, background: '#c0392b', color: '#fff', border: 'none', fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', padding: '.8rem', cursor: 'pointer' }}>Supprimer</button>
              <button onClick={() => setConfirmDel(null)} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.35)', fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', padding: '.8rem', cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-sidebar { background: #0a0a0a; }
        @media (max-width: 700px) {
          .admin-burger { display: flex !important; }
          .admin-sidebar {
            position: fixed; top: 56px; left: 0; bottom: 0; z-index: 15;
            transform: translateX(-100%); transition: transform .25s;
            border-right: 1px solid rgba(255,255,255,.08);
            width: 220px !important;
          }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-row { grid-template-columns: 48px 1fr !important; }
          .admin-row > div:last-child { grid-column: 1 / -1; padding-bottom: .5rem; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

const backBtnStyle = {
  background: 'none', border: 'none', padding: 0,
  fontFamily: 'var(--sans)', fontWeight: 300,
  fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,.25)', cursor: 'pointer',
  marginBottom: '1.5rem', display: 'block',
  transition: 'color .15s',
}
