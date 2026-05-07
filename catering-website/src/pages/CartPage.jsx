import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import FoodImage from '../components/FoodImage'
import Breadcrumb from '../components/Breadcrumb'
import { MIN_PORTIONS, MAX_PORTIONS, dayNames, dayThemes } from '../data/menu'

function formatDisplayDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, selectedDate } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Cart — Zara\'s Kitchen'
  }, [])

  const handleQuantityChange = (foodId, delta, currentQty) => {
    const next = currentQty + delta
    if (next < MIN_PORTIONS || next > MAX_PORTIONS) return
    updateQuantity(foodId, next)
  }

  const handleRemove = (item) => {
    removeFromCart(item.id)
    // Announce removal for screen readers via aria-live on the list
  }

  const isEmpty = cartItems.length === 0

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Menu', to: '/' }, { label: 'Cart' }]} />

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Your Cart</h1>

          {selectedDate && (
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
              Ordering for:{' '}
              <strong>{formatDisplayDate(selectedDate)}</strong>{' '}
              — {dayThemes[selectedDate.getDay()]}
            </p>
          )}

          {isEmpty ? (
            <div className="empty-cart">
              <span className="empty-cart__icon" aria-hidden="true">🛒</span>
              <h2 className="empty-cart__title">Your cart is empty</h2>
              <p className="empty-cart__text">
                Browse our menu and add dishes to get started.
              </p>
              <Link to="/" className="btn btn--primary">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Cart items */}
              <section aria-labelledby="cart-items-heading">
                <h2 id="cart-items-heading" className="sr-only">Cart items</h2>

                <div className="alert alert--info" style={{ marginBottom: 'var(--space-4)' }}>
                  <span className="alert__icon" aria-hidden="true">ℹ️</span>
                  <span>
                    Set the number of portions for each dish.
                    Minimum{' '}
                    <strong>{MIN_PORTIONS} portions</strong>,
                    maximum{' '}
                    <strong>{MAX_PORTIONS} portions</strong>.
                  </span>
                </div>

                {/* SC 1.3.1 / 4.1.2: List with aria-live for dynamic updates */}
                <ul
                  role="list"
                  aria-label="Cart items"
                  aria-live="polite"
                  aria-relevant="removals additions"
                >
                  {cartItems.map(({ food, quantity }) => (
                    <li
                      key={food.id}
                      role="listitem"
                      className="cart-item"
                    >
                      {/* Thumbnail */}
                      <div className="cart-item__img-wrap">
                        <FoodImage item={food} />
                      </div>

                      {/* Info */}
                      <div className="cart-item__info">
                        <Link
                          to={`/item/${food.id}`}
                          className="cart-item__name"
                          aria-label={`View details for ${food.name}`}
                        >
                          {food.name}
                        </Link>
                        <div className="cart-item__category">
                          {food.category.charAt(0).toUpperCase() + food.category.slice(1)}
                        </div>
                        <div className="cart-item__unit-price">
                          ${food.price.toFixed(2)} × {quantity} portions
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="cart-item__controls">
                        {/* Quantity stepper */}
                        <div
                          className="qty-stepper"
                          role="group"
                          aria-label={`Portions for ${food.name}`}
                        >
                          <button
                            type="button"
                            className="qty-stepper__btn"
                            onClick={() => handleQuantityChange(food.id, -1, quantity)}
                            disabled={quantity <= MIN_PORTIONS}
                            aria-label={`Decrease portions of ${food.name}, currently ${quantity}`}
                          >
                            <span aria-hidden="true">−</span>
                          </button>

                          {/* SC 4.1.2: value announced by aria-label on group */}
                          <output
                            className="qty-stepper__value"
                            aria-live="polite"
                            aria-atomic="true"
                            aria-label={`${quantity} portions`}
                          >
                            {quantity}
                          </output>

                          <button
                            type="button"
                            className="qty-stepper__btn"
                            onClick={() => handleQuantityChange(food.id, 1, quantity)}
                            disabled={quantity >= MAX_PORTIONS}
                            aria-label={`Increase portions of ${food.name}, currently ${quantity}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="cart-item__subtotal" aria-label={`Subtotal for ${food.name}`}>
                          ${(food.price * quantity).toFixed(2)}
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          className="btn btn--icon btn--ghost"
                          onClick={() => handleRemove(food)}
                          aria-label={`Remove ${food.name} from cart`}
                          style={{ color: 'var(--color-error)' }}
                        >
                          <span aria-hidden="true">🗑</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'var(--space-6)' }}>
                  <Link to="/" className="btn btn--ghost">
                    ← Continue Browsing
                  </Link>
                </div>
              </section>

              {/* Order summary */}
              <aside aria-labelledby="summary-heading">
                <div className="order-summary">
                  <h2 id="summary-heading" className="order-summary__title">
                    Order Summary
                  </h2>

                  <div className="order-summary__rows">
                    {cartItems.map(({ food, quantity }) => (
                      <div key={food.id} className="order-summary__row">
                        <span>
                          {food.name}{' '}
                          <span style={{ color: 'var(--color-text-muted)' }}>
                            ×{quantity}
                          </span>
                        </span>
                        <span>${(food.price * quantity).toFixed(2)}</span>
                      </div>
                    ))}

                    <hr className="divider" style={{ margin: 0 }} />

                    <div className="order-summary__row order-summary__row--total">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="order-summary__note">
                    Payment is collected at pickup. Taxes, if applicable, will be
                    discussed at time of pickup.
                  </p>

                  {!selectedDate ? (
                    <div className="alert alert--warning" style={{ marginTop: 'var(--space-4)' }}>
                      <span className="alert__icon" aria-hidden="true">⚠️</span>
                      <span>
                        <Link to="/">Select a pickup date</Link> before checking out.
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn--primary btn--full"
                      style={{ marginTop: 'var(--space-5)' }}
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
