import { WA_NUMBER } from '../data/products'

export default function Footer({ setPage, page }) {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--black)', color: 'var(--white)' }}>
      <div style={{
        padding: 'clamp(5rem, 10vw, 8rem) var(--px) clamp(3rem, 6vw, 5rem)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.25,
          color: 'rgba(255,255,255,.55)',
          maxWidth: '22ch',
        }}>
          "Blame your self,<br />not the world."
        </p>
        <p style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.2)',
        }}>
          Chaque rue est un podium.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2rem',
        padding: 'clamp(2.5rem, 5vw, 4rem) var(--px)',
        borderBottom: '1px solid rgba(255,255,255,.05)',
      }}>
        {[
          { label: 'Navigation', items: [['shop','Shop'],['gallery','Lookbook'],['order','Commander']], type: 'btn' },
          { label: 'Contact',    items: [[`https://wa.me/${WA_NUMBER}`,'WhatsApp'],['https://www.instagram.com/outside_drip?igsh=NmlycnVqNTMzanB1','Instagram'],['https://vt.tiktok.com/ZSQWhWnsT/','TikTok']], type: 'link' },
          { label: 'Info',       items: [['','Livraison Dakar'],['','Paiement à réception'],['','Retours 7 jours']], type: 'text' },
        ].map(col => (
          <div key={col.label}>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.25)', marginBottom: '1.2rem',
            }}>{col.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              {col.items.map(([href, lbl]) => col.type === 'btn' ? (
                <button key={lbl} onClick={() => {
                  if (href === 'shop') { setPage?.('shop'); window.scrollTo({ top: 0 }) }
                  else go(href)
                }} style={{
                  background: 'none', border: 'none', padding: 0, textAlign: 'left',
                  fontFamily: 'var(--sans)', fontWeight: 300,
                  fontSize: '13px', color: 'rgba(255,255,255,.38)',
                  transition: 'color .15s', letterSpacing: '.01em',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.38)'}>
                  {lbl}
                </button>
              ) : col.type === 'link' ? (
                <a key={lbl} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: 'var(--sans)', fontWeight: 300,
                  fontSize: '13px', color: 'rgba(255,255,255,.38)',
                  textDecoration: 'none', transition: 'color .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.38)'}>
                  {lbl}
                </a>
              ) : (
                <span key={lbl} style={{
                  fontFamily: 'var(--sans)', fontWeight: 300,
                  fontSize: '13px', color: 'rgba(255,255,255,.25)',
                }}>{lbl}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '1.25rem var(--px)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', color: 'rgba(255,255,255,.15)',
        }}>© 2025 OUTSIDE — Dakar, Sénégal</span>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', color: 'rgba(255,255,255,.1)',
          letterSpacing: '.08em',
        }}>Streetwear · Made in Dakar</span>
      </div>
    </footer>
  )
}
