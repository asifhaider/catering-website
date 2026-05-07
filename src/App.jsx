import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PastOrders from "./pages/PastOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <div className="page-wrapper">
          <Navbar />
          <CartDrawer />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:date" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:orderId" element={<OrderConfirmation />} />
              <Route path="/orders" element={<PastOrders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
