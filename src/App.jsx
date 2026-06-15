import { CartProvider } from './context/CartContext'
import Nav        from './components/Nav'
import CartDrawer from './components/CartDrawer'
import Hero       from './sections/Hero'
import Ticker     from './sections/Ticker'
import Manifesto  from './sections/Manifesto'
import Shop       from './sections/Shop'
import Lookbook   from './sections/Lookbook'
import Process    from './sections/Process'
import Footer     from './sections/Footer'

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <CartDrawer />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Shop />
        <Lookbook />
        <Process />
      </main>
      <Footer />
    </CartProvider>
  )
}
