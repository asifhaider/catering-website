import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Facebook, Instagram, Mail, MapPin, Phone, Printer, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { addDays, Category, formatIsoDate, formatLongDate, getMenuForDate, MenuItem } from './data'

function DateMenuSelector({
  selectedDate,
  onChange,
}: {
  selectedDate: string
  onChange: (date: string) => void
}) {
  const today = useMemo(() => new Date(), [])
  const minimumDate = formatIsoDate(addDays(today, 2))
  const maximumDate = formatIsoDate(addDays(today, 14))
  const [error, setError] = useState('')
  const [announcement, setAnnouncement] = useState('')

  const handleChange = (value: string) => {
    if (value < minimumDate || value > maximumDate) {
      setError(`Select a pickup date between ${formatLongDate(minimumDate)} and ${formatLongDate(maximumDate)}.`)
      return
    }
    setError('')
    onChange(value)
    setAnnouncement(`${formatLongDate(value)} selected. Menu updated.`)
  }

  return (
    <section id="pickup-menu" className="date-panel" aria-labelledby="date-heading">
      <div className="date-panel__copy">
        <span className="eyebrow">Plan your gathering</span>
        <h1 id="date-heading">Good food, made for sharing.</h1>
        <p>
          Choose your pickup date and discover a homemade menu prepared in small batches
          for your table.
        </p>
      </div>
      <div className="date-card">
        <div className="date-card__icon" aria-hidden="true"><CalendarDays size={22} /></div>
        <div className="field">
          <label htmlFor="catering-date">Catering pickup date</label>
          <input
            id="catering-date"
            type="date"
            min={minimumDate}
            max={maximumDate}
            value={selectedDate}
            aria-describedby={`date-help${error ? ' date-error' : ''}`}
            aria-invalid={error ? 'true' : undefined}
            onChange={(event) => handleChange(event.target.value)}
          />
          <p id="date-help" className="field-help">
            Choose a date from 2 to 14 days from today.
          </p>
          {error && <p id="date-error" className="field-error" role="alert">{error}</p>}
        </div>
        <div className="selected-date">
          <span>Your menu</span>
          <strong>{formatLongDate(selectedDate)}</strong>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </section>
  )
}

const categories: Category[] = ['Protein', 'Vegetarian', 'Sides']

export type CartLine = {
  key: string
  item: MenuItem
  date: string
  quantity: number
}

export type CheckoutData = {
  name: string
  email: string
  phone: string
  pickupTime: string
  payment: 'Card at pickup' | 'Cash at pickup'
  instructions: string
}

type Order = {
  orderNumber: string
  createdAt: string
  customer: CheckoutData
  cart: CartLine[]
}

function MenuCard({
  item,
  onViewDetails,
  onAdd,
}: {
  item: MenuItem
  onViewDetails: (item: MenuItem, trigger: HTMLButtonElement) => void
  onAdd: (item: MenuItem, quantity: number) => string | null
}) {
  const [quantity, setQuantity] = useState(6)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const helpId = `${item.id}-quantity-help`
  const errorId = `${item.id}-quantity-error`

  const handleQuantity = (value: number) => {
    setQuantity(value)
    setError(value < 6 || value > 30 ? `People for ${item.name} must be between 6 and 30.` : '')
    setAdded(false)
  }

  const handleAdd = () => {
    if (quantity < 6 || quantity > 30) {
      setError(`People for ${item.name} must be between 6 and 30.`)
      document.getElementById(`${item.id}-quantity`)?.focus()
      return
    }
    const addError = onAdd(item, quantity)
    if (addError) {
      setError(addError)
      document.getElementById(`${item.id}-quantity`)?.focus()
      return
    }
    setError('')
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <article className="menu-card">
      <div className="menu-card__image-wrap" style={{ backgroundColor: item.accent }}>
        <img src={item.image} alt={`${item.name} platter`} className="menu-card__image" />
        <span className="menu-card__category">{item.category}</span>
      </div>
      <div className="menu-card__body">
        <h3>{item.name}</h3>
        <p className="menu-card__price">${item.price.toFixed(2)} <span>per person</span></p>
        <button
          className="details-button"
          type="button"
          onClick={(event) => onViewDetails(item, event.currentTarget)}
          aria-label={`View details for ${item.name}`}
        >
          View details <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <div className="quantity-field">
          <label htmlFor={`${item.id}-quantity`}>People for {item.name}</label>
          <div className="quantity-field__row">
            <input
              id={`${item.id}-quantity`}
              type="number"
              min="6"
              max="30"
              step="1"
              value={quantity}
              onChange={(event) => handleQuantity(Number(event.target.value))}
              aria-describedby={`${helpId}${error ? ` ${errorId}` : ''}`}
              aria-invalid={error ? 'true' : undefined}
            />
            <span>portions</span>
          </div>
          <span id={helpId} className="sr-only">Choose 6 to 30 people.</span>
          {error && <span id={errorId} className="quantity-error">{error}</span>}
        </div>
        <button className={`add-button${added ? ' added' : ''}`} type="button" onClick={handleAdd} aria-label={`Add ${item.name} to cart`}>
          {added ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
          {added ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

function MenuList({
  selectedDate,
  onAdd,
}: {
  selectedDate: string
  onAdd: (item: MenuItem, quantity: number) => string | null
}) {
  const items = useMemo(() => getMenuForDate(selectedDate), [selectedDate])
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null)
  const detailTrigger = useRef<HTMLButtonElement | null>(null)

  const openDetails = (item: MenuItem, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger
    setDetailItem(item)
  }

  const closeDetails = () => {
    setDetailItem(null)
    window.setTimeout(() => detailTrigger.current?.focus(), 0)
  }

  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-heading">
      <div className="section-intro">
        <span className="eyebrow">This week’s table</span>
        <h2 id="menu-heading">Menu for {formatLongDate(selectedDate)}</h2>
        <p>Ten dishes, prepared fresh for your gathering. Every selection serves 6–30 people.</p>
      </div>
      {categories.map((category) => {
        const categoryItems = items.filter((item) => item.category === category)
        return (
          <section className="menu-category" aria-labelledby={`${category.toLowerCase()}-heading`} key={category}>
            <div className="category-heading">
              <h2 id={`${category.toLowerCase()}-heading`}>{category}</h2>
              <span>{categoryItems.length} {categoryItems.length === 1 ? 'dish' : 'dishes'}</span>
            </div>
            <ul className="menu-grid">
              {categoryItems.map((item) => (
                <li key={item.id}><MenuCard item={item} onViewDetails={openDetails} onAdd={onAdd} /></li>
              ))}
            </ul>
          </section>
        )
      })}
      <p className="sr-only" role="status" aria-live="polite">
        Menu updated for {formatLongDate(selectedDate)}: 10 items in three categories.
      </p>
      <ItemDetailsDialog item={detailItem} onClose={closeDetails} />
    </section>
  )
}

function ItemDetailsDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (item && dialog && !dialog.open) dialog.showModal()
    if (!item && dialog?.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={dialogRef}
      className="details-dialog"
      aria-labelledby={item ? `${item.id}-detail-title` : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {item && (
        <div className="details-dialog__panel">
          <button className="dialog-close" type="button" onClick={onClose} aria-label={`Close details for ${item.name}`}>
            <X aria-hidden="true" size={21} />
          </button>
          <div className="details-dialog__image">
            <img src={item.image} alt={`${item.name} served family-style on a platter`} />
          </div>
          <div className="details-dialog__content">
            <span className="eyebrow">{item.category}</span>
            <h2 id={`${item.id}-detail-title`}>{item.name}</h2>
            <p className="detail-price">${item.price.toFixed(2)} per person</p>
            <p className="detail-description">{item.description}</p>
            <div className="detail-columns">
              <section aria-labelledby={`${item.id}-ingredients`}>
                <h3 id={`${item.id}-ingredients`}>Ingredients</h3>
                <ul className="ingredient-list">
                  {item.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                </ul>
              </section>
              <section aria-labelledby={`${item.id}-dietary`}>
                <h3 id={`${item.id}-dietary`}>Dietary & allergen information</h3>
                <p>
                  {item.category === 'Vegetarian' ? 'Suitable for vegetarian diets. ' : ''}
                  Prepared in a kitchen that also handles milk, eggs, wheat, soy, tree nuts, fish, and shellfish.
                </p>
              </section>
            </div>
            <section aria-labelledby={`${item.id}-nutrition`}>
              <h3 id={`${item.id}-nutrition`}>Nutrition facts</h3>
              <table className="nutrition-table">
                <caption>Estimated nutrition per serving</caption>
                <thead><tr><th scope="col">Nutrient</th><th scope="col">Amount</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Calories</th><td>{item.calories} kcal</td></tr>
                  <tr><th scope="row">Protein</th><td>{item.protein} g</td></tr>
                  <tr><th scope="row">Carbohydrates</th><td>{item.carbs} g</td></tr>
                  <tr><th scope="row">Fat</th><td>{item.fat} g</td></tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}
    </dialog>
  )
}

function CartDrawer({
  open,
  cart,
  onClose,
  onUpdate,
  onRemove,
  onCheckout,
}: {
  open: boolean
  cart: CartLine[]
  onClose: () => void
  onUpdate: (key: string, quantity: number) => void
  onRemove: (key: string) => void
  onCheckout: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [drafts, setDrafts] = useState<Record<string, number>>({})
  const [confirming, setConfirming] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const subtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)
  const dates = [...new Set(cart.map((line) => line.date))]

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])

  useEffect(() => {
    setDrafts(Object.fromEntries(cart.map((line) => [line.key, line.quantity])))
  }, [cart])

  const updateQuantity = (line: CartLine, quantity: number) => {
    setDrafts((current) => ({ ...current, [line.key]: quantity }))
    if (quantity >= 6 && quantity <= 30) {
      onUpdate(line.key, quantity)
      setStatus(`${line.item.name} updated to ${quantity} people. Line total $${(line.item.price * quantity).toFixed(2)}.`)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      aria-labelledby="cart-drawer-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <div>
            <span className="eyebrow">Your order</span>
            <h2 id="cart-drawer-title">Your catering cart</h2>
          </div>
          <button className="dialog-close cart-close" type="button" onClick={onClose} aria-label="Close cart"><X size={21} /></button>
        </header>
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={38} aria-hidden="true" />
              <h3>Your cart is empty</h3>
              <p>Add a few dishes from today’s menu to begin your gathering.</p>
              <button type="button" className="secondary-button" onClick={onClose}>Continue browsing menu</button>
            </div>
          ) : dates.map((date) => (
            <section className="cart-date-group" aria-labelledby={`cart-date-${date}`} key={date}>
              <h3 id={`cart-date-${date}`}>Pickup {formatLongDate(date)}</h3>
              <ul className="cart-lines">
                {cart.filter((line) => line.date === date).map((line) => {
                  const draft = drafts[line.key] ?? line.quantity
                  const invalid = draft < 6 || draft > 30
                  return (
                    <li className="cart-line" key={line.key}>
                      <img src={line.item.image} alt="" />
                      <div className="cart-line__content">
                        <strong>{line.item.name}</strong>
                        <span>${line.item.price.toFixed(2)} per person</span>
                        <label htmlFor={`cart-quantity-${line.key}`}>People for {line.item.name}</label>
                        <div className="cart-line__controls">
                          <input
                            id={`cart-quantity-${line.key}`}
                            type="number"
                            min="6"
                            max="30"
                            value={draft}
                            aria-describedby={`cart-help-${line.key}${invalid ? ` cart-error-${line.key}` : ''}`}
                            aria-invalid={invalid ? 'true' : undefined}
                            onChange={(event) => updateQuantity(line, Number(event.target.value))}
                          />
                          <span id={`cart-help-${line.key}`} className="sr-only">Choose 6 to 30 people.</span>
                          <b>${(line.item.price * (invalid ? line.quantity : draft)).toFixed(2)}</b>
                        </div>
                        {invalid && <span className="quantity-error" id={`cart-error-${line.key}`}>People must be between 6 and 30.</span>}
                        {confirming === line.key ? (
                          <div className="remove-confirm" role="group" aria-label={`Confirm removal of ${line.item.name}`}>
                            <span>Remove this dish?</span>
                            <button type="button" onClick={() => { onRemove(line.key); setConfirming(null); setStatus(`${line.item.name} removed from cart.`) }}>Remove</button>
                            <button type="button" onClick={() => setConfirming(null)}>Cancel</button>
                          </div>
                        ) : (
                          <button className="remove-button" type="button" onClick={() => setConfirming(line.key)} aria-label={`Remove ${line.item.name} for ${formatLongDate(date)} from cart`}>
                            <Trash2 size={15} aria-hidden="true" /> Remove
                          </button>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
        {cart.length > 0 && (
          <footer className="cart-drawer__footer">
            <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <p>Pickup details and taxes are confirmed at checkout.</p>
            <button className="checkout-button" type="button" onClick={onCheckout}>
              Proceed to checkout <ArrowRight size={18} aria-hidden="true" />
            </button>
          </footer>
        )}
        <p className="sr-only" role="status" aria-live="polite">{status}</p>
      </div>
    </dialog>
  )
}

function Checkout({
  cart,
  onBack,
  onPlaceOrder,
}: {
  cart: CartLine[]
  onBack: () => void
  onPlaceOrder: (data: CheckoutData) => void
}) {
  const [form, setForm] = useState<CheckoutData>({
    name: '', email: '', phone: '', pickupTime: '', payment: 'Card at pickup', instructions: '',
  })
  const [acknowledged, setAcknowledged] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const subtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)
  const pickupDate = cart[0]?.date

  const setField = (field: keyof CheckoutData, value: string) =>
    setForm((current) => ({ ...current, [field]: value }))

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.pickupTime) nextErrors.pickupTime = 'Select a pickup time.'
    if (!form.name.trim()) nextErrors.name = 'Enter a full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter an email address in name@example.com format.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter a phone number.'
    if (!acknowledged) nextErrors.acknowledged = 'Confirm the kitchen and allergy notice.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }
    setSubmitting(true)
    window.setTimeout(() => onPlaceOrder(form), 650)
  }

  const fieldProps = (name: string) => ({
    'aria-invalid': errors[name] ? 'true' as const : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <main id="main" className="checkout-page">
      <div className="checkout-heading">
        <span className="eyebrow">Almost ready</span>
        <h1>Let’s arrange your pickup.</h1>
        <p>Review your table, then tell us when and how to reach you.</p>
      </div>
      <form className="checkout-layout" onSubmit={submit} noValidate>
        <div className="checkout-form">
          {Object.keys(errors).length > 0 && (
            <div className="error-summary" ref={errorSummaryRef} tabIndex={-1} role="alert">
              <h2>There {Object.keys(errors).length === 1 ? 'is' : 'are'} {Object.keys(errors).length} {Object.keys(errors).length === 1 ? 'problem' : 'problems'} with your order</h2>
              <ul>{Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul>
            </div>
          )}
          <section aria-labelledby="pickup-heading">
            <h2 id="pickup-heading">Pickup details</h2>
            <div className="field">
              <label htmlFor="pickup-date">Pickup date</label>
              <input id="pickup-date" value={pickupDate ? formatLongDate(pickupDate) : ''} readOnly />
              <p className="field-help">To change the date, return to the menu and start a new cart.</p>
            </div>
            <div className="field">
              <label htmlFor="pickupTime">Pickup time (required)</label>
              <select id="pickupTime" value={form.pickupTime} onChange={(e) => setField('pickupTime', e.target.value)} {...fieldProps('pickupTime')}>
                <option value="">Select a pickup window</option>
                <option>10:00–10:30 AM</option><option>11:00–11:30 AM</option><option>12:00–12:30 PM</option>
                <option>4:00–4:30 PM</option><option>5:00–5:30 PM</option>
              </select>
              {errors.pickupTime && <p className="field-error" id="pickupTime-error">{errors.pickupTime}</p>}
            </div>
          </section>
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact information</h2>
            <div className="two-fields">
              <div className="field">
                <label htmlFor="name">Full name (required)</label>
                <input id="name" autoComplete="name" value={form.name} onChange={(e) => setField('name', e.target.value)} {...fieldProps('name')} />
                {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone (required)</label>
                <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} {...fieldProps('phone')} />
                {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email (required)</label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setField('email', e.target.value)} {...fieldProps('email')} />
              {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
            </div>
          </section>
          <fieldset className="payment-options">
            <legend>Payment method</legend>
            <p>Payment is completed when you pick up your order. No card details are collected online.</p>
            {(['Card at pickup', 'Cash at pickup'] as const).map((method) => (
              <label key={method}><input type="radio" name="payment" value={method} checked={form.payment === method} onChange={() => setField('payment', method)} /><span><strong>{method}</strong><small>{method === 'Card at pickup' ? 'Tap or insert your card when you arrive' : 'Please bring exact change when possible'}</small></span></label>
            ))}
          </fieldset>
          <section aria-labelledby="notes-heading">
            <h2 id="notes-heading">One last note</h2>
            <div className="field">
              <label htmlFor="instructions">Special instructions (optional)</label>
              <textarea id="instructions" maxLength={500} rows={5} value={form.instructions} onChange={(e) => setField('instructions', e.target.value)} aria-describedby="instructions-count" />
              <p id="instructions-count" className="field-help">{form.instructions.length} of 500 characters</p>
            </div>
            <div className="check-field">
              <input id="acknowledged" type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} {...fieldProps('acknowledged')} />
              <label htmlFor="acknowledged">I understand that the kitchen handles common allergens and cannot guarantee an allergen-free meal. (required)</label>
            </div>
            {errors.acknowledged && <p className="field-error" id="acknowledged-error">{errors.acknowledged}</p>}
          </section>
        </div>
        <aside className="order-review" aria-labelledby="order-review-heading">
          <h2 id="order-review-heading">Order review</h2>
          <p className="review-date">Pickup {pickupDate && formatLongDate(pickupDate)}{form.pickupTime && ` · ${form.pickupTime}`}</p>
          <ul>
            {cart.map((line) => <li key={line.key}><div><strong>{line.item.name}</strong><span>{line.quantity} people · ${line.item.price.toFixed(2)} each</span></div><b>${(line.quantity * line.item.price).toFixed(2)}</b></li>)}
          </ul>
          <div className="review-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
          <p className="review-note">No additional taxes or online payment fees.</p>
          <button type="button" className="back-button" onClick={onBack}>Back to cart</button>
          <button className="place-order-button" type="submit" disabled={submitting}>{submitting ? 'Placing order…' : 'Place order'}</button>
          {submitting && <p role="status" className="field-help">Placing your order.</p>}
        </aside>
      </form>
    </main>
  )
}

function Invoice({ order, saveWarning, onReturn }: { order: Order; saveWarning: string; onReturn: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const total = order.cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)
  const pickupDate = order.cart[0].date

  useEffect(() => {
    document.title = `Order confirmation ${order.orderNumber} | Saffron & Table`
    headingRef.current?.focus()
    return () => { document.title = 'Saffron & Table | Homemade Catering' }
  }, [order.orderNumber])

  return (
    <main id="main" className="invoice-page">
      <div className="invoice-success">
        <span className="success-mark" aria-hidden="true"><Check size={28} /></span>
        <span className="eyebrow">Order confirmed</span>
        <h1 ref={headingRef} tabIndex={-1}>Your table is on our calendar.</h1>
        <p>We’ve received your catering order and look forward to cooking for you.</p>
        <div className="order-number"><span>Order number</span><strong>{order.orderNumber}</strong></div>
        {saveWarning && <p className="save-warning" role="status">{saveWarning}</p>}
      </div>
      <article className="invoice" aria-label={`Invoice for order ${order.orderNumber}`}>
        <header className="invoice-header">
          <div className="brand">
            <span className="brand-mark">S</span>
            <span><strong>Saffron & Table</strong><small>Homemade catering</small></span>
          </div>
          <div>
            <strong>Invoice</strong>
            <span>{order.orderNumber}</span>
            <time dateTime={order.createdAt}>
              Placed {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short', timeZoneName: 'short' }).format(new Date(order.createdAt))}
            </time>
          </div>
        </header>
        <div className="invoice-meta">
          <section><h2>Pickup details</h2><p>{formatLongDate(pickupDate)}<br />{order.customer.pickupTime}</p></section>
          <section><h2>Contact details</h2><p>{order.customer.name}<br /><a href={`mailto:${order.customer.email}`}>{order.customer.email}</a><br /><a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a></p></section>
          <section><h2>Payment method</h2><p>{order.customer.payment}<br /><small>Payment due at pickup</small></p></section>
        </div>
        <section aria-labelledby="invoice-items-heading">
          <h2 id="invoice-items-heading">Order items</h2>
          <div className="table-scroll" tabIndex={0} aria-label="Scrollable order items table">
            <table className="invoice-table">
              <caption>Itemized catering order</caption>
              <thead><tr><th scope="col">Item</th><th scope="col">People</th><th scope="col">Unit price</th><th scope="col">Line total</th></tr></thead>
              <tbody>{order.cart.map((line) => <tr key={line.key}><th scope="row">{line.item.name}</th><td>{line.quantity}</td><td>${line.item.price.toFixed(2)}</td><td>${(line.quantity * line.item.price).toFixed(2)}</td></tr>)}</tbody>
              <tfoot><tr><th scope="row" colSpan={3}>Total</th><td>${total.toFixed(2)}</td></tr></tfoot>
            </table>
          </div>
        </section>
        <div className="invoice-notes">
          <section><h2>Special instructions</h2><p>{order.customer.instructions || 'No special instructions.'}</p></section>
          <section><h2>Important allergy information</h2><p>Our kitchen handles common allergens and cannot guarantee an allergen-free meal.</p></section>
          <section><h2>Need help?</h2><p>Call <a href="tel:+15550148362">(555) 014-8362</a> or <a href="mailto:hello@saffronandtable.example">email Catering Support</a>.</p></section>
        </div>
      </article>
      <div className="invoice-actions">
        <button className="secondary-button" type="button" onClick={() => window.print()}><Printer size={18} aria-hidden="true" /> Print invoice</button>
        <button className="checkout-button" type="button" onClick={onReturn}>Return to menu</button>
      </div>
      <p className="sr-only" role="status">Order placed. Your order number is {order.orderNumber}.</p>
    </main>
  )
}

function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-story">
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85" alt="Founder Maya preparing fresh vegetables in the catering kitchen" />
          <span aria-hidden="true">Made by hand<br />in our neighborhood</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">Our story</span>
          <h2 id="about-heading">Food that feels like coming home.</h2>
          <p className="about-lede">Saffron & Table began with one crowded kitchen, a borrowed stockpot, and the belief that a shared meal can turn any day into an occasion.</p>
          <p>Our founder, Maya, grew up around tables where recipes traveled by memory and everyone left with a container for tomorrow. Today, we bring that same warmth to gatherings across our community—cooking in small batches and packing every order with care.</p>
        </div>
      </div>
      <section className="values-section" aria-labelledby="values-heading">
        <span className="eyebrow">What we value</span>
        <h2 id="values-heading">Thoughtful from market to table.</h2>
        <ul className="values-list">
          <li><span>01</span><h3>Small-batch cooking</h3><p>Every dish is prepared in manageable batches for the texture and flavor of a home-cooked meal.</p></li>
          <li><span>02</span><h3>Seasonal ingredients</h3><p>We follow what is fresh, flavorful, and available from trusted growers and neighborhood suppliers.</p></li>
          <li><span>03</span><h3>Community first</h3><p>We’re a local kitchen serving the celebrations, workdays, and in-between moments that bring people together.</p></li>
        </ul>
      </section>
      <section className="how-it-works" aria-labelledby="how-heading">
        <div>
          <span className="eyebrow">Simple by design</span>
          <h2 id="how-heading">How pickup catering works</h2>
          <p>Plan ahead, choose what your table loves, and leave the cooking to us.</p>
          <a className="text-link" href="#pickup-menu">Choose a pickup date and view the menu <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <ol>
          <li><span aria-hidden="true">1</span><div><h3>Choose your pickup date</h3><p>Order between 2 and 14 days ahead.</p></div></li>
          <li><span aria-hidden="true">2</span><div><h3>Select your menu</h3><p>Build a generous spread for 6–30 people.</p></div></li>
          <li><span aria-hidden="true">3</span><div><h3>Pick up and enjoy</h3><p>We’ll have everything packed and ready.</p></div></li>
        </ol>
      </section>
      <section className="allergen-note" aria-labelledby="allergen-heading">
        <div><span className="eyebrow">Kitchen transparency</span><h2 id="allergen-heading">Made with care, shared with honesty.</h2></div>
        <p>Our kitchen handles milk, eggs, wheat, soy, tree nuts, fish, and shellfish. We follow careful preparation practices, but we cannot guarantee an allergen-free meal. Please share allergies and dietary needs in your order notes so we can discuss what may work for your table.</p>
      </section>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter an email address in name@example.com format.'
    if (!form.topic) next.topic = 'Select a topic.'
    if (!form.message.trim()) next.message = 'Enter a message.'
    setErrors(next)
    if (Object.keys(next).length) {
      window.setTimeout(() => summaryRef.current?.focus(), 0)
      return
    }
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setSent(true)
      setErrors({})
      window.setTimeout(() => successRef.current?.focus(), 0)
    }, 600)
  }

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const described = (field: string, help?: string) => ({
    'aria-invalid': errors[field] ? 'true' as const : undefined,
    'aria-describedby': [help, errors[field] ? `contact-${field}-error` : ''].filter(Boolean).join(' ') || undefined,
  })

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-intro">
        <span className="eyebrow">Get in touch</span>
        <h2 id="contact-heading">Let’s talk about your table.</h2>
        <p>Questions about a menu, a dietary need, or a gathering? We reply Tuesday–Saturday, 9 AM–5 PM.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-details">
          <section aria-labelledby="direct-contact-heading">
            <h3 id="direct-contact-heading">Reach us directly</h3>
            <a href="tel:+15550148362"><Phone aria-hidden="true" /> <span>Call (555) 014-8362</span></a>
            <a href="mailto:hello@saffronandtable.example"><Mail aria-hidden="true" /> <span>Email hello@saffronandtable.example</span></a>
          </section>
          <section aria-labelledby="social-heading">
            <h3 id="social-heading">Follow the kitchen</h3>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /> <span>Visit Saffron & Table on Instagram (opens in a new tab)</span></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><Facebook aria-hidden="true" /> <span>Visit Saffron & Table on Facebook (opens in a new tab)</span></a>
          </section>
          <section aria-labelledby="pickup-location-heading">
            <h3 id="pickup-location-heading">Pickup location & hours</h3>
            <div className="contact-address"><MapPin aria-hidden="true" /><p>142 Garden Row<br />Portland, OR 97214<br /><br />Tuesday–Saturday<br />10 AM–6 PM</p></div>
          </section>
        </div>
        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-success" role="status">
              <span className="success-mark" aria-hidden="true"><Check size={25} /></span>
              <h3 ref={successRef} tabIndex={-1}>Thanks—your message is ready.</h3>
              <p>This demo recorded your message locally. We’ll connect it to the real inbox when the business details are finalized.</p>
              <button type="button" className="secondary-button" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', topic: '', message: '' }) }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-labelledby="contact-form-heading">
              <h3 id="contact-form-heading">Send us a message</h3>
              {Object.keys(errors).length > 0 && <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert"><strong>There are {Object.keys(errors).length} errors in your message.</strong><ul>{Object.entries(errors).map(([field, error]) => <li key={field}><a href={`#contact-${field}`}>{error}</a></li>)}</ul></div>}
              <div className="two-fields">
                <div className="field"><label htmlFor="contact-name">Full name (required)</label><input id="contact-name" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} {...described('name')} />{errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}</div>
                <div className="field"><label htmlFor="contact-email">Email (required)</label><input id="contact-email" type="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} {...described('email')} />{errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}</div>
              </div>
              <div className="two-fields">
                <div className="field"><label htmlFor="contact-phone">Phone (optional)</label><input id="contact-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></div>
                <div className="field"><label htmlFor="contact-topic">Topic (required)</label><select id="contact-topic" value={form.topic} onChange={(e) => update('topic', e.target.value)} {...described('topic')}><option value="">Select a topic</option><option>Menu question</option><option>Dietary needs</option><option>Existing order</option><option>Something else</option></select>{errors.topic && <p className="field-error" id="contact-topic-error">{errors.topic}</p>}</div>
              </div>
              <div className="field"><label htmlFor="contact-message">Message (required)</label><textarea id="contact-message" rows={6} maxLength={500} value={form.message} onChange={(e) => update('message', e.target.value)} {...described('message', 'contact-message-help')} /><p className="field-help" id="contact-message-help">Maximum 500 characters. {form.message.length} of 500 used.</p>{errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}</div>
              <button className="send-button" type="submit" disabled={sending}>{sending ? 'Sending message…' : 'Send message'}</button>
              {sending && <p className="sr-only" role="status">Sending message.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><div className="brand"><span className="brand-mark">S</span><span><strong>Saffron & Table</strong><small>Homemade catering</small></span></div><p>Gather generously. Eat joyfully.</p></div>
      <nav aria-label="Footer navigation"><a href="#pickup-menu">Menu</a><a href="#about">Our story</a><a href="#contact">Contact</a></nav>
      <div className="footer-contact"><a href="tel:+15550148362">Call Saffron & Table</a><a href="mailto:hello@saffronandtable.example">Email Saffron & Table</a><span>142 Garden Row, Portland, OR</span></div>
      <p className="copyright">© {new Date().getFullYear()} Saffron & Table. All rights reserved.</p>
    </footer>
  )
}

function App() {
  const [selectedDate, setSelectedDate] = useState(() => formatIsoDate(addDays(new Date(), 2)))
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartStatus, setCartStatus] = useState('')
  const [toast, setToast] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [invoice, setInvoice] = useState<Order | null>(null)
  const [saveWarning, setSaveWarning] = useState('')
  const cartButtonRef = useRef<HTMLButtonElement>(null)
  const cartSubtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)

  const addToCart = (item: MenuItem, quantity: number) => {
    if (cart.length && cart[0].date !== selectedDate) {
      return `Your cart is for ${formatLongDate(cart[0].date)}. Complete or clear that order before adding another pickup date.`
    }
    const key = `${selectedDate}:${item.id}`
    const existing = cart.find((line) => line.key === key)
    if (existing && existing.quantity + quantity > 30) {
      const remaining = 30 - existing.quantity
      return `${item.name} already has ${existing.quantity} people in your cart. ${remaining > 0 ? `Add up to ${remaining} more.` : 'The 30-person maximum has been reached.'}`
    }
    const nextCart = existing
      ? cart.map((line) => line.key === key ? { ...line, quantity: line.quantity + quantity } : line)
      : [...cart, { key, item, date: selectedDate, quantity }]
    setCart(nextCart)
    const nextSubtotal = nextCart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)
    const action = existing ? `Updated ${item.name} to ${existing.quantity + quantity} people.` : `Added ${quantity} people of ${item.name} to cart.`
    const status = `${action} Cart has ${nextCart.length} menu ${nextCart.length === 1 ? 'item' : 'items'}, subtotal $${nextSubtotal.toFixed(2)}.`
    setCartStatus(status)
    setToast(action)
    window.setTimeout(() => setToast(''), 2500)
    return null
  }

  const closeCart = () => {
    setCartOpen(false)
    window.setTimeout(() => cartButtonRef.current?.focus(), 0)
  }

  const placeOrder = (customer: CheckoutData) => {
    const order: Order = {
      orderNumber: `ST-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      customer,
      cart,
    }
    try {
      const saved = JSON.parse(localStorage.getItem('saffron-table-orders') || '[]') as Order[]
      localStorage.setItem('saffron-table-orders', JSON.stringify([...saved, order]))
      setSaveWarning('')
    } catch {
      setSaveWarning('Your order is confirmed, but it could not be saved on this device for the business record. Please print or save this invoice.')
    }
    setCheckoutOpen(false)
    setInvoice(order)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#main" className="skip-link">Skip to content</a>
        <a className="brand" href="#" aria-label="Saffron and Table home">
          <span className="brand-mark">S</span>
          <span><strong>Saffron & Table</strong><small>Homemade catering</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#menu">Menu</a>
          <a href="#about">Our story</a>
          <a href="#contact">Contact</a>
        </nav>
        <button ref={cartButtonRef} className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cart.length} menu ${cart.length === 1 ? 'item' : 'items'}, ${cart.reduce((sum, line) => sum + line.quantity, 0)} total portions`}>
          <ShoppingBag size={19} aria-hidden="true" />
          <span>Cart</span>
          <span className="cart-count" aria-hidden="true">{cart.length}</span>
        </button>
      </header>
      {invoice ? (
        <Invoice order={invoice} saveWarning={saveWarning} onReturn={() => { setInvoice(null); setCart([]); window.scrollTo({ top: 0 }) }} />
      ) : checkoutOpen ? (
        <Checkout
          cart={cart}
          onBack={() => { setCheckoutOpen(false); setCartOpen(true) }}
          onPlaceOrder={placeOrder}
        />
      ) : (
        <main id="main">
          <DateMenuSelector selectedDate={selectedDate} onChange={setSelectedDate} />
          <MenuList selectedDate={selectedDate} onAdd={addToCart} />
          <About />
          <Contact />
        </main>
      )}
      {!checkoutOpen && !invoice && <Footer />}
      {toast && <div className="toast" aria-hidden="true"><Check size={18} /> {toast}</div>}
      <p className="sr-only" role="status" aria-live="polite">{cartStatus}</p>
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={closeCart}
        onUpdate={(key, quantity) => setCart((current) => current.map((line) => line.key === key ? { ...line, quantity } : line))}
        onRemove={(key) => setCart((current) => current.filter((line) => line.key !== key))}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); window.scrollTo({ top: 0 }) }}
      />
    </div>
  )
}

export default App
