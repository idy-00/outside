export default function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      background: 'var(--black)', color: 'var(--white)',
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingTop: 'var(--nav)',
    }}>
      <div style={{
        padding: 'clamp(4rem, 10vh, 7rem) var(--px) clamp(2.5rem, 5vh, 4rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}>

        <p style={{
          fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
          fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem',
        }}>
          Dakar, Sénégal — SS 2025
        </p>

        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          lineHeight: .9, letterSpacing: '-.01em',
          textTransform: 'uppercase',
          marginBottom: 'clamp(2.5rem, 6vh, 4rem)',
        }}>
          Blame<br />Your Self<br />Not The<br />World
        </h1>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,.08)',
        }}>
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 300,
            fontSize: '15px', color: 'rgba(255,255,255,.4)',
            maxWidth: '38ch', lineHeight: 1.7,
          }}>
            Streetwear né dans les rues de Dakar.
            Chaque pièce, une posture.
          </p>

          <button onClick={() => go('shop')} style={{
            background: 'var(--white)', color: 'var(--black)', border: 'none',
            fontFamily: 'Hanken Grotesk, sans-serif', fontWeight: 500,
            fontSize: '13px', letterSpacing: '.06em',
            padding: '.8rem 2rem', flexShrink: 0,
            transition: 'opacity .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Explorer la collection
          </button>
        </div>
      </div>
    </section>
  )
}
