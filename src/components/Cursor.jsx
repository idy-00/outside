import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my, raf

    const move = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)

    const loop = () => {
      if (dot.current) {
        dot.current.style.left = mx + 'px'
        dot.current.style.top  = my + 'px'
      }
      rx += (mx - rx) * .13
      ry += (my - ry) * .13
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position:'fixed', width:5, height:5, borderRadius:'50%',
        background:'#efefef', pointerEvents:'none', zIndex:9999,
        transform:'translate(-50%,-50%)',
      }} />
      <div ref={ring} style={{
        position:'fixed', width:24, height:24, borderRadius:'50%',
        border:'1px solid rgba(239,239,239,.4)', pointerEvents:'none', zIndex:9998,
        transform:'translate(-50%,-50%)',
      }} />
    </>
  )
}
