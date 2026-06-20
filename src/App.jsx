import { useState, useEffect } from 'react'
import { trackPageView } from './admin/stats'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import Nav        from './components/Nav'
import CartDrawer from './components/CartDrawer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Hero       from './sections/Hero'
import Manifesto  from './sections/Manifesto'
import Gallery    from './sections/Gallery'
import BestSellers from './sections/BestSellers'
import Process    from './sections/Process'
import LifestyleTicker from './sections/LifestyleTicker'
import Footer     from './sections/Footer'
import ShopPage   from './sections/ShopPage'
import Admin      from './admin/Admin'

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

// simple hash-based routing for admin (no react-router)
const isAdmin = window.location.pathname === '/admin'

export default function App() {
  const [page, setPage] = useState('home')
  useEffect(() => { trackPageView() }, [])

  if (isAdmin) return <Admin />

  return (
    <ProductsProvider>
      <CartProvider>
        <Nav page={page} setPage={setPage} />
        <CartDrawer />
        <WhatsAppFloat />
        {page === 'shop' ? (
          <ShopPage setPage={setPage} />
        ) : (
          <main>
            <Hero setPage={setPage} />
            <Manifesto />
            <BestSellers setPage={setPage} />
            <Gallery />
            <LifestyleTicker />
            <Process />
          </main>
        )}
        <Footer setPage={setPage} page={page} />
      </CartProvider>
    </ProductsProvider>
  )
}
