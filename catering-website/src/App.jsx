import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import SkipLink from './components/SkipLink'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import MenuPage from './pages/MenuPage'
import ItemDetailPage from './pages/ItemDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import InvoicePage from './pages/InvoicePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

// SC 2.4.2 Page Titled — set default title on route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Move focus to main content marker on route change for SPA accessibility
    const main = document.getElementById('main-content')
    if (main) {
      main.focus({ preventScroll: false })
    }
  }, [pathname])
  return null
}

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — Zara\'s Kitchen'
  }, [])
  return (
    <main id="main-content" className="page-main" tabIndex={-1} style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Page Not Found</h1>
        <p style={{ marginInline: 'auto', marginBottom: 'var(--space-6)' }}>
          The page you're looking for doesn't exist.
        </p>
        <a href="#/" className="btn btn--primary">Back to Menu</a>
      </div>
    </main>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <Navigation />

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice/:orderId" element={<InvoicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    // SC 3.1.1 Language of Page set on <html> in index.html
    <CartProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </CartProvider>
  )
}
