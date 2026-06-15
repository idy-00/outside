import { useRef, useEffect, useState } from 'react'

export default function Editorial() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{
      background:'var(--white)', color:'var(--black)',
      display:'grid', gridTemplateColumns:'1fr 1fr',
      minHeight:'70vh',
    }}>
      {/* left — full image */}
      <div style={{ overflow:'hidden', position:'relative' }}>
        <img src="/images/look4.jpg" alt="Outside editorial"
          style={{
            width:'100%', height:'100%', objectFit:'cover', objectPosition:'top',
            display:'block',
            transform: vis ? 'scale(1)' : 'scale(1.06)',
            transition:'transform .9s cubic-bezier(.16,1,.3,1)',
          }} />
      </div>

      {/* right — text */}
      <div ref={ref} style={{
        padding:'5rem 3.5rem',
        display:'flex', flexDirection:'column', justifyContent:'center',
        opacity: vis?1:0, transform: vis?'none':'translateX(24px)',
        transition:'opacity .7s .2s, transform .7s .2s',
      }}>
        <p style={{ fontSize:'.55rem', letterSpacing:'.35em', textTransform:'uppercase', opacity:.35, marginBottom:'1.8rem' }}>
          — LA MARQUE
        </p>
        <h2 style={{
          fontFamily:'Barlow Condensed', fontWeight:900,
          fontSize:'clamp(3rem, 7vw, 7rem)',
          lineHeight:.82, letterSpacing:'-.01em',
          marginBottom:'2rem',
        }}>
          NÉ DANS<br />LES RUES.
        </h2>
        <p style={{
          fontSize:'.85rem', lineHeight:2, opacity:.5,
          maxWidth:'36ch', marginBottom:'2.5rem',
        }}>
          OUTSIDE est une marque née à Dakar. Pas dans un bureau, pas dans une réunion. Dans les rues. Portée par une génération qui prend sa vie en main et refuse les excuses.
        </p>
        <p style={{
          fontFamily:'Barlow Condensed', fontStyle:'italic', fontWeight:700,
          fontSize:'1.1rem', letterSpacing:'.04em', opacity:.3,
          borderLeft:'2px solid rgba(8,8,8,.2)', paddingLeft:'1rem',
        }}>
          "Blame Your Self Not The World"
        </p>
      </div>
    </section>
  )
}
