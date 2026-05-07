import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import FoodImage from './FoodImage'

const CATEGORY_LABELS = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  sides: 'Sides',
}

export default function FoodCard({ item }) {
  const navigate = useNavigate()
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(item.id)

  const handleViewDetails = () => {
    navigate(`/item/${item.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(item)
  }

  return (
    // SC 1.3.1: article for standalone content item
    <article
      className="food-card"
      aria-label={`${item.name}, ${CATEGORY_LABELS[item.category]}, $${item.price.toFixed(2)} per person`}
    >
      {/* Clickable image area */}
      <div className="food-card__image-wrap">
        <FoodImage item={item} />
        <button
          className="food-card__view-btn"
          onClick={handleViewDetails}
          aria-label={`View details for ${item.name}`}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      <div className="food-card__body">
        <div className="food-card__header">
          <h3 className="food-card__name">
            {/* SC 2.4.4: Link purpose clear in context */}
            <button
              onClick={handleViewDetails}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit',
                textAlign: 'left',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
              aria-label={`View details for ${item.name}`}
            >
              {item.name}
            </button>
          </h3>

          <div className="food-card__price">
            ${item.price.toFixed(2)}
            <span className="food-card__price-label">/ person</span>
          </div>
        </div>

        <div className="food-card__footer">
          {/* SC 1.4.1: badge has text label, not just color */}
          <span className={`badge badge--${item.category}`} aria-label={`Category: ${CATEGORY_LABELS[item.category]}`}>
            {CATEGORY_LABELS[item.category]}
          </span>

          <button
            className={`btn btn--sm ${inCart ? 'btn--outline' : 'btn--primary'}`}
            onClick={handleAddToCart}
            aria-label={
              inCart
                ? `${item.name} already in cart`
                : `Add ${item.name} to cart`
            }
            aria-pressed={inCart}
            type="button"
            disabled={inCart}
          >
            {inCart ? '✓ In Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
