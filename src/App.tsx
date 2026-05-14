import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SkipNavLink from './components/layout/SkipNavLink';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import InvoicePage from './pages/InvoicePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <SkipNavLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none min-h-[calc(100dvh-72px-200px)]">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/invoice/:id" element={<InvoicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </HashRouter>
  );
}
