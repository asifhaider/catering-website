import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MenuPage from './pages/MenuPage'
import ItemDetailPage from './pages/ItemDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import InvoicePage from './pages/InvoicePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice/:orderId" element={<InvoicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
