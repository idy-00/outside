import { WA_NUMBER } from '../data/products'

export default function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--black)', color: 'var(--white)', borderTop: '1px solid #1a1a1a' }}>
      {/* brand */}
      <div style={{
        padding: 'clamp(4rem, 10vw, 8rem) var(--px) 3rem',
        borderBottom: '1px solid #1a1a1a', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(4rem, 16vw, 12rem)',
          lineHeight: .85, letterSpacing: '-.02em',
          textTransform: 'uppercase',
        }}>
          OUTSIDE™
        </p>
        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '13px', letterSpacing: '.15em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.25)', marginTop: '1.2rem',
        }}>
          Blame Your Self Not The World
        </p>
      </div>

      {/* links */}
      <div style={{
        padding: '1.8rem var(--px)',
        display: 'flex', justifyContent: 'center',
        gap: '2rem', flexWrap: 'wrap',
        borderBottom: '1px solid #1a1a1a',
      }}>
        {[['shop','Shop'],['lookbook','Lookbook'],['order','Commander']].map(([id, lbl]) => (
          <button key={id} onClick={() => go(id)} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
            fontSize: '13px', color: 'rgba(255,255,255,.35)',
            transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}>
            {lbl}
          </button>
        ))}
        {[[`https://wa.me/${WA_NUMBER}`, 'WhatsApp'], ['#', 'Instagram'], ['#', 'TikTok']].map(([href, lbl]) => (
          <a key={lbl} href={href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 400,
            fontSize: '13px', color: 'rgba(255,255,255,.35)', textDecoration: 'none',
            transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}>
            {lbl}
          </a>
        ))}
      </div>

      {/* bottom */}
      <div style={{
        padding: '1.2rem var(--px)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem',
      }}>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.2)' }}>
          © 2025 OUTSIDE™
        </span>
        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.12)' }}>
          Dakar, Sénégal
        </span>
      </div>
    </footer>
  )
}
