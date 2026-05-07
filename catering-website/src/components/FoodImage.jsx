// Accessible food image placeholder — no images of text (SC 1.4.5, 1.4.9)
// Emoji used purely as decorative graphic; all content conveyed via alt text

const CATEGORY_STYLES = {
  protein: {
    bg: 'linear-gradient(135deg, #F5E8DF 0%, #E8C9B0 100%)',
    border: '#B87A50',
    emoji: '🥩',
  },
  vegetarian: {
    bg: 'linear-gradient(135deg, #E4F0DC 0%, #C5DEB8 100%)',
    border: '#6A9E52',
    emoji: '🥗',
  },
  sides: {
    bg: 'linear-gradient(135deg, #F5EDD5 0%, #E8D5A0 100%)',
    border: '#C4A045',
    emoji: '🍚',
  },
}

export default function FoodImage({ item, className = '' }) {
  const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.sides

  return (
    <div
      className={`food-img-placeholder ${className}`}
      style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
      }}
      role="img"
      aria-label={`${item.name} — ${item.category} dish`}
    >
      <span className="food-img-placeholder__icon" aria-hidden="true">
        {style.emoji}
      </span>
    </div>
  )
}
