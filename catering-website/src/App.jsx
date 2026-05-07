import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import InvoicePage from './pages/InvoicePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        {/* SC 2.4.1 Bypass Blocks – skip navigation link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* SC 1.3.1 / 4.1.2 – landmark role; tabIndex allows programmatic focus from skip link */}
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Routes>
              <Route path="/"              element={<Navigate to="/menu" replace />} />
              <Route path="/menu"          element={<MenuPage />} />
              <Route path="/cart"          element={<CartPage />} />
              <Route path="/checkout"      element={<CheckoutPage />} />
              <Route path="/invoice/:orderNumber" element={<InvoicePage />} />
              <Route path="/about"         element={<AboutPage />} />
              <Route path="/contact"       element={<ContactPage />} />
              <Route path="*"              element={<Navigate to="/menu" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  )
}
