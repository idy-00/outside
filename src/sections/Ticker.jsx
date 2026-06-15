const WORDS = ['OUTSIDE™', '·', 'BLAME YOUR SELF NOT THE WORLD', '·', 'DAKAR', '·', 'STREETWEAR', '·', 'SS 2025', '·']
const BAND  = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

export default function Ticker() {
  return (
    <>
      <style>{`@keyframes tk{to{transform:translateX(-50%)}}`}</style>
      <div style={{ background: 'var(--paper)', overflow: 'hidden', borderTop: '1px solid var(--warm)', borderBottom: '1px solid var(--warm)' }}>
        <div style={{
          display: 'flex', gap: '2rem', padding: '.65rem 0',
          whiteSpace: 'nowrap', width: 'max-content',
          animation: 'tk 30s linear infinite',
        }}>
          {BAND.map((w, i) => (
            <span key={i} style={{
              fontFamily: 'DM Mono', fontSize: '.68rem',
              letterSpacing: '.2em', color: 'var(--ink)', flexShrink: 0,
            }}>{w}</span>
          ))}
        </div>
      </div>
    </>
  )
}
