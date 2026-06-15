import { WA_NUMBER } from '../data/products'

export default function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
        gap: '2rem', padding: '4rem var(--px) 3rem',
      }}>
        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '.06em', marginBottom: '.7rem' }}>
            OUTSIDE™
          </p>
          <p style={{ fontFamily: 'DM Mono', fontStyle: 'italic', fontSize: '.6rem', letterSpacing: '.1em', opacity: .2, lineHeight: 2 }}>
            Blame Your Self Not The World<br />Dakar, Sénégal
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'DM Mono', fontSize: '.5rem', letterSpacing: '.28em', opacity: .25, marginBottom: '1.2rem' }}>NAVIGATION</p>
          {[['shop','Shop'],['lookbook','Lookbook'],['order','Commander']].map(([id,l]) => (
            <button key={id} onClick={() => go(id)} style={{
              display: 'block', marginBottom: '.5rem',
              background: 'none', border: 'none', color: 'var(--paper)',
              fontFamily: 'Outfit', fontWeight: 300, fontSize: '.78rem',
              opacity: .35, padding: 0, transition: 'opacity .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = .35}>{l}</button>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: 'DM Mono', fontSize: '.5rem', letterSpacing: '.28em', opacity: .25, marginBottom: '1.2rem' }}>CONTACT</p>
          {[[`https://wa.me/${WA_NUMBER}`,'WhatsApp'],['#','Instagram'],['#','TikTok']].map(([href,l]) => (
            <a key={l} href={href} target="_blank" rel="noopener" style={{
              display: 'block', marginBottom: '.5rem',
              color: 'var(--paper)', textDecoration: 'none',
              fontFamily: 'Outfit', fontWeight: 300, fontSize: '.78rem',
              opacity: .35, transition: 'opacity .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = .35}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{
        borderTop: '1px solid var(--rule)', padding: '.8rem var(--px)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'DM Mono', fontSize: '.5rem', letterSpacing: '.12em', opacity: .15 }}>© 2025 OUTSIDE™</span>
        <span style={{ fontFamily: 'DM Mono', fontSize: '.5rem', letterSpacing: '.12em', opacity: .12 }}>Tous droits réservés</span>
      </div>
    </footer>
  )
}
