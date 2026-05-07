import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getItemById, ALLERGEN_LABELS, dayNames } from '../data/menu'
import Breadcrumb from '../components/Breadcrumb'
import FoodImage from '../components/FoodImage'
import NutritionTable from '../components/NutritionTable'

const CATEGORY_LABELS = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  sides: 'Sides',
}

export default function ItemDetailPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { addToCart, isInCart, selectedDate } = useCart()

  const item = getItemById(itemId)
  const inCart = item ? isInCart(item.id) : false

  useEffect(() => {
    if (item) {
      document.title = `${item.name} — Zara's Kitchen`
    }
  }, [item])

  if (!item) {
    return (
      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-16)' }}>
          <h1>Item Not Found</h1>
          <p style={{ marginTop: 'var(--space-4)', marginInline: 'auto' }}>
            We couldn't find that menu item.
          </p>
          <button
            className="btn btn--primary"
            onClick={() => navigate('/')}
            style={{ marginTop: 'var(--space-6)' }}
            type="button"
          >
            Back to Menu
          </button>
        </div>
      </main>
    )
  }

  const dayName = dayNames[item.dayOfWeek]

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: 'Menu', to: '/' },
          { label: item.name },
        ]}
      />

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">
          <div className="item-detail">
            {/* Image column */}
            <div className="item-detail__image-col">
              <FoodImage
                item={item}
                style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
              />

              {/* Allergen info */}
              {item.allergens.length > 0 && (
                <aside
                  className="alert alert--warning"
                  style={{ marginTop: 'var(--space-4)' }}
                  aria-labelledby="allergen-heading"
                >
                  <span className="alert__icon" aria-hidden="true">⚠️</span>
                  <div>
                    <h2
                      id="allergen-heading"
                      style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-2)' }}
                    >
                      Allergen Information
                    </h2>
                    {/* SC 3.1.4: Expanded abbreviations where needed */}
                    <ul className="allergen-list" role="list">
                      {item.allergens.map((a) => (
                        <li key={a} role="listitem">
                          <span className="allergen-chip">{ALLERGEN_LABELS[a] || a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}

              {item.allergens.length === 0 && (
                <div
                  className="alert alert--success"
                  style={{ marginTop: 'var(--space-4)' }}
                  aria-label="No common allergens"
                >
                  <span className="alert__icon" aria-hidden="true">✅</span>
                  <span>No common allergens listed for this dish.</span>
                </div>
              )}
            </div>

            {/* Content column */}
            <div className="item-detail__content-col">
              <div className="item-detail__meta">
                <span className={`badge badge--${item.category}`}>
                  {CATEGORY_LABELS[item.category]}
                </span>
                <span
                  className="badge"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {dayName}s only
                </span>
              </div>

              <h1 className="item-detail__name">{item.name}</h1>

              <div className="item-detail__price-block">
                <span className="item-detail__price">
                  ${item.price.toFixed(2)}
                </span>
                <span className="item-detail__price-note">
                  {' '}per person (minimum 6, maximum 30 portions)
                </span>
              </div>

              {/* Description */}
              <section className="item-detail__section" aria-labelledby="desc-heading">
                <h2 id="desc-heading" className="item-detail__section-title">About this dish</h2>
                <p>{item.description}</p>
              </section>

              {/* Ingredients */}
              <section className="item-detail__section" aria-labelledby="ing-heading">
                <h2 id="ing-heading" className="item-detail__section-title">Ingredients</h2>
                <ul
                  className="item-detail__ingredients-list"
                  role="list"
                  aria-label={`Ingredients in ${item.name}`}
                >
                  {item.ingredients.map((ing, i) => (
                    <li key={i} role="listitem" className="item-detail__ingredient-chip">
                      {ing}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Nutrition table (SC 1.3.1 semantic table) */}
              <section className="item-detail__section" aria-labelledby="nutrition-heading">
                <h2 id="nutrition-heading" className="item-detail__section-title">
                  Nutritional Information
                </h2>
                <p className="form-hint" style={{ marginBottom: 'var(--space-3)' }}>
                  Values are per serving and approximate.
                </p>
                <NutritionTable item={item} />
              </section>

              {/* Add to cart section */}
              <section className="item-detail__add-section" aria-labelledby="add-heading">
                <h2 id="add-heading" className="item-detail__section-title" style={{ margin: 0 }}>
                  Add to Your Order
                </h2>

                {!selectedDate && (
                  <div className="alert alert--info" role="note">
                    <span className="alert__icon" aria-hidden="true">ℹ️</span>
                    <span>
                      Please{' '}
                      <a href="/">select a pickup date on the menu page</a>{' '}
                      before adding items to your cart.
                    </span>
                  </div>
                )}

                {inCart ? (
                  <div className="in-cart-msg" role="status">
                    <span aria-hidden="true">✅</span>
                    <span>{item.name} is already in your cart.</span>
                    <button
                      className="btn btn--outline btn--sm"
                      onClick={() => navigate('/cart')}
                      type="button"
                    >
                      View Cart
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      addToCart(item)
                      navigate('/cart')
                    }}
                    disabled={!selectedDate}
                    aria-describedby={!selectedDate ? 'add-hint' : undefined}
                    type="button"
                  >
                    Add to Cart
                  </button>
                )}

                {!selectedDate && (
                  <span id="add-hint" className="form-hint">
                    A pickup date must be selected first.
                  </span>
                )}

                <div className="form-hint">
                  Portions are ordered in quantities of 6–30 people.
                  You can adjust the exact quantity in your cart.
                </div>
              </section>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <button
                  className="btn btn--ghost"
                  onClick={() => navigate(-1)}
                  type="button"
                  aria-label="Go back to previous page"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
