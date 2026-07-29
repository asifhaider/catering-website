"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const photos = [
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=82"
];

const weeklyNames = {
  0: ["Citrus herb chicken", "Slow-roasted beef", "Maple glazed salmon", "Turkey meatballs", "Garlic butter shrimp", "Creamy chickpea stew", "Stuffed bell peppers", "Garden lentil bake", "Herbed basmati rice", "Roasted seasonal vegetables"],
  1: ["Jerk chicken", "Braised short ribs", "Coconut curry salmon", "Honey garlic turkey", "Island-spiced shrimp", "Curry chickpeas", "Callaloo & white beans", "Plantain black bean bake", "Rice & peas", "Caramelized plantains"],
  2: ["Lemon thyme chicken", "Rosemary pot roast", "Dill roasted salmon", "Turkey kofta", "Paprika shrimp", "Tuscan white beans", "Mushroom lentil loaf", "Spinach ricotta shells", "Garlic mashed potatoes", "Maple roasted carrots"],
  3: ["Tandoori chicken", "Beef keema", "Mustard seed salmon", "Turkey tikka", "Masala shrimp", "Chana masala", "Saag tofu", "Vegetable biryani", "Cumin basmati rice", "Cucumber mint salad"],
  4: ["Smoky barbecue chicken", "Coffee-rubbed brisket", "Cajun salmon", "Turkey sausage peppers", "Creole shrimp", "Red beans & okra", "Sweet potato black beans", "Cornmeal vegetable bake", "Scallion rice", "Vinegar slaw"],
  5: ["Harissa roast chicken", "Pomegranate beef", "Za’atar salmon", "Turkey shawarma", "Garlic lemon shrimp", "Moroccan chickpeas", "Eggplant tomato bake", "Lentil stuffed squash", "Saffron rice", "Sumac roasted cauliflower"],
  6: ["Buttermilk roast chicken", "Sunday pot roast", "Brown sugar salmon", "Sage turkey meatloaf", "Old Bay shrimp", "Mushroom pot pie", "White bean cassoulet", "Broccoli cheddar bake", "Whipped potatoes", "Braised greens"]
};

function makeMenu(day) {
  return weeklyNames[day].map((name, i) => ({
    id: `${day}-${i}`,
    name,
    category: i < 5 ? "Protein" : i < 8 ? "Vegetarian" : "Sides",
    price: i < 5 ? 13 + (i % 3) * 2 : i < 8 ? 9 + (i % 2) * 2 : 6 + i % 2,
    image: photos[i],
    description: `A generous, home-cooked tray of ${name.toLowerCase()}, made in small batches with layered spices and market-fresh ingredients.`,
    ingredients: i < 5 ? ["Primary protein", "Fresh herbs", "Aromatics", "House spice blend", "Olive oil"] : ["Seasonal produce", "Fresh herbs", "Aromatics", "House spice blend", "Olive oil"],
    calories: 260 + i * 35,
    protein: i < 5 ? 24 + i * 2 : 8 + i,
    carbs: 18 + i * 4,
    allergens: i % 3 === 0 ? "Contains dairy" : i % 3 === 1 ? "Contains soy" : "No major allergens in recipe"
  }));
}

function dateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 2); return dateInputValue(d); }, [today]);
  const maxDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 14); return dateInputValue(d); }, [today]);
  const [view, setView] = useState("menu");
  const [date, setDate] = useState(minDate);
  const [guests, setGuests] = useState(6);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const invoiceHeading = useRef(null);
  const menu = useMemo(() => makeMenu(new Date(`${date}T12:00:00`).getDay()), [date]);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty * guests, 0);
  const service = subtotal * 0.06;

  useEffect(() => {
    if (selected && dialogRef.current) dialogRef.current.showModal();
  }, [selected]);

  function navigate(next) {
    setView(next);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function add(item) {
    setCart(current => {
      const found = current.find(x => x.id === item.id);
      return found ? current.map(x => x.id === item.id ? { ...x, qty: Math.min(5, x.qty + 1) } : x) : [...current, { ...item, qty: 1 }];
    });
    setStatus(`${item.name} added to cart.`);
  }

  function updateQty(id, qty) {
    setCart(current => current.map(x => x.id === id ? { ...x, qty: Math.max(1, Math.min(5, Number(qty))) } : x));
    setStatus("Item quantity updated.");
  }

  function remove(id, name) {
    setCart(current => current.filter(x => x.id !== id));
    setStatus(`${name} removed from cart.`);
  }

  function placeOrder(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    ["name", "email", "phone", "pickup", "payment"].forEach(key => {
      if (!String(data.get(key) || "").trim()) nextErrors[key] = "This field is required.";
    });
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || ""))) nextErrors.email = "Enter an email in the format name@example.com.";
    if (cart.length === 0) nextErrors.cart = "Add at least one dish before placing your order.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => document.querySelector(".error-summary")?.focus());
      return;
    }
    const order = {
      id: `SS-${Date.now().toString().slice(-6)}`,
      created: new Date().toISOString(),
      date,
      guests,
      items: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      subtotal,
      service,
      total: subtotal + service,
      customer: { name: data.get("name"), email: data.get("email"), phone: data.get("phone") },
      pickup: data.get("pickup"),
      instructions: data.get("instructions") || "None"
    };
    const stored = JSON.parse(localStorage.getItem("saffron-sage-invoices") || "[]");
    localStorage.setItem("saffron-sage-invoices", JSON.stringify([order, ...stored].slice(0, 25)));
    setInvoice(order);
    setCart([]);
    setView("invoice");
    setStatus(`Order ${order.id} placed and invoice saved locally.`);
    setTimeout(() => invoiceHeading.current?.focus(), 50);
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <button className="brand" onClick={() => navigate("menu")} aria-label="Saffron and Sage Catering, home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span><strong>Saffron & Sage</strong><small>HOME CATERING</small></span>
        </button>
        <nav aria-label="Primary navigation">
          {["menu", "about", "contact"].map(item => (
            <button key={item} onClick={() => navigate(item)} aria-current={view === item ? "page" : undefined}>{item}</button>
          ))}
        </nav>
        <button className="cart-button" onClick={() => navigate("cart")} aria-label={`Cart, ${cart.length} different items`}>
          <span aria-hidden="true">⌑</span> Cart <b>{cart.length}</b>
        </button>
      </header>
      <div className="live-region" aria-live="polite" aria-atomic="true">{status}</div>

      <main id="main">
        {view === "menu" && (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">HOMEMADE • HEARTFELT • READY FOR PICKUP</p>
                <h1>Gather around<br/>something <em>good.</em></h1>
                <p className="hero-copy">Small-batch comfort food, made from scratch for your people. Choose a date, build your table, and we’ll handle the cooking.</p>
                <div className="trust-row" aria-label="Service highlights">
                  <span>⌁ Freshly made</span><span>♧ Serves 6–30</span><span>⌂ Local pickup</span>
                </div>
              </div>
              <div className="hero-photo" role="img" aria-label="A colorful homemade catering spread on a dining table">
                <div className="photo-card"><span>Made with care</span><strong>from our kitchen<br/>to your table</strong></div>
              </div>
            </section>

            <section className="planner" aria-labelledby="plan-title">
              <div><p className="eyebrow">PLAN YOUR TABLE</p><h2 id="plan-title">When are we cooking for you?</h2></div>
              <label>Pickup date <input type="date" min={minDate} max={maxDate} value={date} onChange={e => setDate(e.target.value)} /><small>Choose 2–14 days from today.</small></label>
              <label>Number of guests <input type="number" min="6" max="30" value={guests} onChange={e => setGuests(Math.max(6, Math.min(30, Number(e.target.value))))} /><small>We cater for 6–30 people.</small></label>
            </section>

            <section className="menu-section" aria-labelledby="menu-title">
              <div className="section-heading">
                <div><p className="eyebrow">TODAY’S TABLE</p><h2 id="menu-title">{new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2></div>
                <p>10 dishes • made fresh for {guests} guests</p>
              </div>
              {["Protein", "Vegetarian", "Sides"].map(category => (
                <section className="category" key={category} aria-labelledby={`cat-${category}`}>
                  <div className="category-title"><h3 id={`cat-${category}`}>{category}</h3><span>{menu.filter(i => i.category === category).length} options</span></div>
                  <div className="food-grid">
                    {menu.filter(i => i.category === category).map(item => (
                      <article className="food-card" key={item.id}>
                        <button className="image-button" onClick={() => setSelected(item)} aria-label={`View details for ${item.name}`}>
                          <img src={item.image} alt="" />
                          <span>{item.category}</span>
                        </button>
                        <div className="food-info">
                          <div><h4>{item.name}</h4><p>{item.description.split(",")[0]}.</p></div>
                          <div className="food-meta"><strong>{money.format(item.price)} <small>/ guest</small></strong><button onClick={() => add(item)} aria-label={`Add ${item.name} to cart`}>+</button></div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </section>
          </>
        )}

        {view === "cart" && (
          <section className="page-shell">
            <p className="eyebrow">YOUR ORDER</p><h1>Build your table.</h1>
            <p className="lede">Pickup {new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} • {guests} guests</p>
            {cart.length === 0 ? (
              <div className="empty-state"><span aria-hidden="true">♨</span><h2>Your table is waiting.</h2><p>Add a few dishes from the menu to begin.</p><button className="primary" onClick={() => navigate("menu")}>Browse the menu</button></div>
            ) : (
              <div className="cart-layout">
                <div className="cart-list">
                  {cart.map(item => (
                    <article className="cart-line" key={item.id}>
                      <img src={item.image} alt="" />
                      <div><span>{item.category}</span><h2>{item.name}</h2><p>{money.format(item.price)} per guest</p></div>
                      <label>Trays <input type="number" min="1" max="5" value={item.qty} onChange={e => updateQty(item.id, e.target.value)} /></label>
                      <strong>{money.format(item.price * item.qty * guests)}</strong>
                      <button className="remove" onClick={() => remove(item.id, item.name)} aria-label={`Remove ${item.name}`}>Remove</button>
                    </article>
                  ))}
                  <button className="text-button" onClick={() => navigate("menu")}>← Add more dishes</button>
                </div>
                <aside className="summary" aria-labelledby="summary-title">
                  <h2 id="summary-title">Order summary</h2><p><span>Food subtotal</span><strong>{money.format(subtotal)}</strong></p><p><span>Service & packaging</span><strong>{money.format(service)}</strong></p><hr/><p className="total"><span>Estimated total</span><strong>{money.format(subtotal + service)}</strong></p><small>Final total shown before your demo order is placed.</small><button className="primary" onClick={() => navigate("checkout")}>Continue to checkout</button>
                </aside>
              </div>
            )}
          </section>
        )}

        {view === "checkout" && (
          <section className="page-shell narrow">
            <p className="eyebrow">CHECKOUT</p><h1>Almost time to eat.</h1><p className="lede">No real payment is processed. This prototype stores your invoice only in this browser.</p>
            <form onSubmit={placeOrder} noValidate>
              {Object.keys(errors).length > 0 && <div className="error-summary" tabIndex="-1"><h2>Please check your order</h2><ul>{Object.entries(errors).map(([key, value]) => <li key={key}><a href={`#${key}`}>{value}</a></li>)}</ul></div>}
              <fieldset><legend>1. Pickup details</legend><label>Pickup date<input value={date} readOnly /></label><label>Pickup time<select id="pickup" name="pickup" defaultValue=""><option value="">Choose a time</option><option>11:00 AM – 11:30 AM</option><option>12:00 PM – 12:30 PM</option><option>4:30 PM – 5:00 PM</option><option>5:30 PM – 6:00 PM</option></select>{errors.pickup && <small className="error">{errors.pickup}</small>}</label></fieldset>
              <fieldset><legend>2. Contact information</legend><div className="form-grid"><label>Full name<input id="name" name="name" autoComplete="name" />{errors.name && <small className="error">{errors.name}</small>}</label><label>Email address<input id="email" name="email" type="email" autoComplete="email" />{errors.email && <small className="error">{errors.email}</small>}</label><label>Phone number<input id="phone" name="phone" type="tel" autoComplete="tel" />{errors.phone && <small className="error">{errors.phone}</small>}</label></div></fieldset>
              <fieldset><legend>3. Demo payment</legend><p className="field-note">For demonstration only. Do not enter real card information.</p><label>Payment method<select id="payment" name="payment" defaultValue=""><option value="">Choose a method</option><option>Pay at pickup</option><option>Demo card •••• 4242</option></select>{errors.payment && <small className="error">{errors.payment}</small>}</label></fieldset>
              <fieldset><legend>4. A note for the kitchen</legend><label>Special instructions <small>(optional)</small><textarea name="instructions" rows="4" placeholder="Allergies, pickup notes, or anything else we should know." /></label></fieldset>
              <div className="review-bar"><div><span>Total for {guests} guests</span><strong>{money.format(subtotal + service)}</strong></div><button className="primary" type="submit">Place demo order</button></div>
            </form>
          </section>
        )}

        {view === "invoice" && invoice && (
          <section className="page-shell narrow invoice">
            <div className="success-mark" aria-hidden="true">✓</div><p className="eyebrow">ORDER CONFIRMED</p><h1 ref={invoiceHeading} tabIndex="-1">Your table is on our calendar.</h1><p className="lede">Invoice {invoice.id} has been saved locally on this device.</p>
            <div className="invoice-paper">
              <header><div><span className="brand-mark">S</span><strong>Saffron & Sage</strong></div><div><small>INVOICE</small><strong>{invoice.id}</strong></div></header>
              <dl><div><dt>Pickup</dt><dd>{new Date(`${invoice.date}T12:00:00`).toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" })}<br/>{invoice.pickup}</dd></div><div><dt>Prepared for</dt><dd>{invoice.customer.name}<br/>{invoice.customer.email}<br/>{invoice.customer.phone}</dd></div><div><dt>Guests</dt><dd>{invoice.guests}</dd></div></dl>
              <table><caption>Ordered dishes</caption><thead><tr><th scope="col">Dish</th><th scope="col">Trays</th><th scope="col">Amount</th></tr></thead><tbody>{invoice.items.map(item => <tr key={item.id}><th scope="row">{item.name}</th><td>{item.qty}</td><td>{money.format(item.price * item.qty * invoice.guests)}</td></tr>)}</tbody><tfoot><tr><th scope="row" colSpan="2">Food subtotal</th><td>{money.format(invoice.subtotal)}</td></tr><tr><th scope="row" colSpan="2">Service & packaging</th><td>{money.format(invoice.service)}</td></tr><tr><th scope="row" colSpan="2">Total</th><td>{money.format(invoice.total)}</td></tr></tfoot></table>
              <div className="invoice-note"><strong>Kitchen note</strong><p>{invoice.instructions}</p></div>
            </div>
            <div className="invoice-actions"><button className="primary" onClick={() => window.print()}>Print invoice</button><button className="secondary" onClick={() => navigate("menu")}>Return to menu</button></div>
            <p className="storage-note">Local storage notice: this invoice is stored only in this browser and may be lost if browser data is cleared. No payment details are stored.</p>
          </section>
        )}

        {view === "about" && (
          <section className="about-page">
            <div className="about-hero"><div><p className="eyebrow">OUR KITCHEN, YOUR TABLE</p><h1>Food that feels like someone <em>thought of you.</em></h1><p>We’re a small, family-run kitchen making generous food for the moments worth gathering around.</p></div><img src={photos[1]} alt="A colorful homemade meal served family-style" /></div>
            <div className="story-grid"><div><p className="eyebrow">THE STORY</p><h2>It started with one crowded table.</h2></div><div><p>Saffron & Sage began the way the best food stories do: too many people in a small kitchen, one more chair pulled up, and a pot that somehow fed everyone.</p><p>Today, we cook that same way—thoughtfully, in small batches, with familiar ingredients and the kind of seasoning that makes a room go quiet for the first few bites.</p></div></div>
            <div className="values"><article><span>01</span><h3>Made from scratch</h3><p>No shortcuts. Sauces simmer, vegetables are chopped by hand, and every tray is cooked for your order.</p></article><article><span>02</span><h3>Gathering-sized</h3><p>Our menu is designed for sharing, from an intimate family supper to a full house of thirty.</p></article><article><span>03</span><h3>Rooted locally</h3><p>We work with neighborhood suppliers and choose seasonal produce whenever we can.</p></article></div>
          </section>
        )}

        {view === "contact" && (
          <section className="page-shell contact-page">
            <div><p className="eyebrow">LET’S TALK FOOD</p><h1>We’d love to hear what you’re planning.</h1><p className="lede">Questions about ingredients, a special gathering, or pickup? Send us a note.</p><address><a href="tel:+15550148722">(555) 014-8722</a><a href="mailto:hello@saffronandsage.test">hello@saffronandsage.test</a><span>Oakland, California</span></address><div className="social"><a href="#" aria-label="Saffron and Sage on Instagram">Instagram ↗</a><a href="#" aria-label="Saffron and Sage on Facebook">Facebook ↗</a></div></div>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); setContactSent(true); e.currentTarget.reset(); }}>
              <h2>Send a note</h2>{contactSent && <p className="success-message" role="status">Thanks! Your demo message has been received.</p>}
              <label>Your name<input required autoComplete="name" /></label><label>Email address<input required type="email" autoComplete="email" /></label><label>What can we help with?<select required defaultValue=""><option value="">Choose one</option><option>Menu question</option><option>Ingredient or allergy question</option><option>Large gathering</option><option>Something else</option></select></label><label>Your message<textarea required rows="5" /></label><button className="primary">Send message</button><small>This demo form does not send data outside your browser.</small>
            </form>
          </section>
        )}
      </main>

      <footer><div><span className="brand-mark">S</span><strong>Saffron & Sage</strong><p>Homemade food for the people you love.</p></div><div><strong>Pickup hours</strong><p>Monday–Saturday<br/>11 AM–6 PM</p></div><div><strong>Get in touch</strong><p>(555) 014-8722<br/>Oakland, California</p></div><small>© {new Date().getFullYear()} Saffron & Sage. Demo content.</small></footer>

      {selected && (
        <dialog ref={dialogRef} className="dish-dialog" onClose={() => setSelected(null)} onCancel={() => setSelected(null)}>
          <button className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close dish details">×</button>
          <img src={selected.image} alt="" />
          <div><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p>{selected.description}</p><strong className="dialog-price">{money.format(selected.price)} / guest</strong>
            <h3>Ingredients</h3><ul>{selected.ingredients.map(x => <li key={x}>{x}</li>)}</ul>
            <table><caption>Nutrition per serving</caption><tbody><tr><th scope="row">Calories</th><td>{selected.calories}</td></tr><tr><th scope="row">Protein</th><td>{selected.protein}g</td></tr><tr><th scope="row">Carbohydrates</th><td>{selected.carbs}g</td></tr><tr><th scope="row">Allergens</th><td>{selected.allergens}</td></tr></tbody></table>
            <button className="primary" onClick={() => { add(selected); dialogRef.current?.close(); }}>Add to cart</button>
          </div>
        </dialog>
      )}
    </>
  );
}
