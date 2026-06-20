const WORDS = ['OUTSIDE™', '—', 'BLAME YOUR SELF NOT THE WORLD', '—', 'DAKAR', '—', 'SS 2026', '—', 'STREETWEAR', '—']
const BAND  = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

export default function Ticker() {
  return (
    <>
      <style>{`@keyframes tk{from{transform:translateX(0)}to{transform:translateX(-25%)}}`}</style>
      <div style={{
        overflow: 'hidden', background: '#000',
        borderTop: '1px solid #222', borderBottom: '1px solid #222',
        padding: '.75rem 0',
      }}>
        <div style={{
          display: 'flex', gap: '2rem', whiteSpace: 'nowrap',
          width: 'max-content', animation: 'tk 30s linear infinite',
        }}>
          {BAND.map((w, i) => (
            <span key={i} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '.15em', textTransform: 'uppercase', flexShrink: 0,
              color: w === '—' ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.7)',
            }}>{w}</span>
          ))}
        </div>
      </div>
    </>
  )
}
