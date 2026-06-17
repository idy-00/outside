import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Nav        from './components/Nav'
import CartDrawer from './components/CartDrawer'
import Hero       from './sections/Hero'
import Manifesto  from './sections/Manifesto'
import Gallery    from './sections/Gallery'
import BestSellers from './sections/BestSellers'
import Process    from './sections/Process'
import Footer     from './sections/Footer'
import ShopPage   from './sections/ShopPage'

function Divider() {
  return (
    <div style={{
      background: 'var(--black)',
      padding: 'clamp(1.75rem, 3.5vw, 2.75rem) var(--px)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: '1.5rem',
      overflow: 'hidden',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,.08)' }} />
      <img
        src="/images/logo-white.png"
        alt="OUTSIDE"
        style={{ height: 36, width: 'auto', opacity: .22, flexShrink: 0 }}
      />
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,.08)' }} />
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <CartProvider>
      <Nav page={page} setPage={setPage} />
      <CartDrawer />
      {page === 'shop' ? (
        <ShopPage setPage={setPage} />
      ) : (
        <main>
          <Hero setPage={setPage} />
          <Manifesto />
          <BestSellers setPage={setPage} />
          <Gallery />
          <Process />
        </main>
      )}
      <Footer setPage={setPage} page={page} />
    </CartProvider>
  )
}
