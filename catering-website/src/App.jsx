import { useEffect, useMemo, useState } from 'react';
import MenuDatePicker from './components/MenuDatePicker';
import MenuList from './components/MenuList';
import ItemDetail from './components/ItemDetail';
import AddToCartToast from './components/AddToCartToast';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Invoice from './components/Invoice';
import About from './components/About';
import Contact from './components/Contact';
import { menuForDate } from './data';

const defaultDate = () => { const d=new Date(); d.setDate(d.getDate()+3); return d.toISOString().slice(0,10); };

export default function App(){
  const [date,setDate]=useState(defaultDate);
  const [cart,setCart]=useState([]);
  const [selected,setSelected]=useState(null);
  const [notice,setNotice]=useState('');
  const [cartOpen,setCartOpen]=useState(false);
  const [checkoutOpen,setCheckoutOpen]=useState(false);
  const [order,setOrder]=useState(null);
  useEffect(()=>{document.title=checkoutOpen?'Checkout | Hearth & Ladle':order?'Order confirmed | Hearth & Ladle':'Hearth & Ladle | Homemade Catering';},[checkoutOpen,order]);
  const formatted=useMemo(()=>new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(new Date(`${date}T12:00:00`)),[date]);
  const menu=useMemo(()=>menuForDate(date),[date]);
  const add=(item,qty=6)=>{setCart(current=>current.some(line=>line.id===item.id)?current.map(line=>line.id===item.id?{...line,qty:Math.min(30,line.qty+qty)}:line):[...current,{...item,qty}]);setNotice(`${qty} portions of ${item.name}`);window.setTimeout(()=>setNotice(''),2800);};
  return <>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">H</span><span>Hearth &amp; Ladle<small>Homemade catering</small></span></a><nav aria-label="Primary"><a href="#menu">Menu</a><a href="#about">Our story</a><a href="#contact">Contact</a></nav><button className="cart-pill" onClick={()=>setCartOpen(true)} aria-label={`Open cart with ${cart.length} items`}>Cart <span>{cart.reduce((n,i)=>n+i.qty,0)}</span></button></header>
    <main id="top">
      <section className="hero"><div className="hero-image" role="img" aria-label="A table filled with homemade catered dishes"></div><div className="hero-panel"><p className="eyebrow">Food made with heart</p><h1>Gather around something <em>good.</em></h1><p>Generous, scratch-made dishes prepared for your people. Choose your menu, tell us when, and we’ll have it warm and ready.</p><a className="primary-button" href="#menu">Plan your table</a><div className="hero-note"><strong>Pickup in Willow Glen</strong><span>Freshly prepared for 6–30 guests</span></div></div></section>
      <section id="menu" className="menu-shell"><MenuDatePicker value={date} onChange={setDate}/><div className="section-heading"><div><span className="eyebrow">{formatted}</span><h2>{menu.title}</h2></div><p>10 dishes · made fresh for your pickup</p></div><MenuList items={menu.items} onSelect={setSelected} onAdd={add}/></section>
      <About/>
      <Contact/>
    </main>
    <ItemDetail item={selected} onClose={()=>setSelected(null)} onAdd={add}/>
    <AddToCartToast message={notice}/>
    <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onUpdate={(id,qty)=>setCart(lines=>lines.map(line=>line.id===id?{...line,qty}:line))} onRemove={id=>setCart(lines=>lines.filter(line=>line.id!==id))} onCheckout={()=>{setCartOpen(false);setCheckoutOpen(true);}}/>
    <Checkout open={checkoutOpen} items={cart} date={date} onBack={()=>{setCheckoutOpen(false);setCartOpen(true);}} onPlaceOrder={details=>{const invoice={...details,id:`HL-${Date.now().toString().slice(-6)}`,createdAt:new Date().toISOString(),pickupDate:formatted,items:cart};const saved=JSON.parse(localStorage.getItem('hearthOrders')||'[]');localStorage.setItem('hearthOrders',JSON.stringify([invoice,...saved]));setCheckoutOpen(false);setOrder(invoice);}}/>
    <Invoice order={order} onDone={()=>{setOrder(null);setCart([]);window.scrollTo({top:0,behavior:'smooth'});}}/>
  </>;
}
