const PHOTOS = [
  '/images/look12.jpg',
  '/images/look13.jpg',
  '/images/look14.jpg',
  '/images/look15.jpg',
  '/images/look16.jpg',
  '/images/look17.jpg',
  '/images/look18.jpg',
  '/images/look19.jpg',
  '/images/look20.jpg',
  '/images/look21.jpg',
]

export default function LifestyleTicker() {
  const all = [...PHOTOS, ...PHOTOS]

  return (
    <section style={{
      background: 'var(--black)',
      borderTop: '1px solid rgba(255,255,255,.06)',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      overflow: 'hidden',
      position: 'relative',
      marginTop: 'clamp(3rem, 6vw, 5rem)',
      marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 3, pointerEvents: 'none',
        background: 'rgba(0,0,0,.55)',
        backdropFilter: 'blur(12px)',
        padding: '.5rem 1.5rem',
        border: '1px solid rgba(255,255,255,.12)',
      }}>
        <span style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '9px', letterSpacing: '.35em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.6)', whiteSpace: 'nowrap',
        }}>Dans les rues · Dakar</span>
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--black) 0%, transparent 8%, transparent 92%, var(--black) 100%)',
      }} />

      <div style={{
        display: 'flex',
        gap: '3px',
        animation: 'ticker-scroll 38s linear infinite',
        width: 'max-content',
      }}>
        {all.map((src, i) => (
          <div key={i} style={{
            width: 'clamp(160px, 22vw, 260px)',
            height: 'clamp(200px, 28vw, 340px)',
            flexShrink: 0, overflow: 'hidden',
          }}>
            <img src={src} alt="" loading="lazy" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block',
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker-scroll"] { animation: none; }
        }
      `}</style>
    </section>
  )
}
