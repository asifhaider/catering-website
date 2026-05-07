import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content" className="flex-1">
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
    </BrowserRouter>
  )
}
