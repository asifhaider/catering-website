import MenuItemCard from './MenuItemCard'

const CATEGORY_LABELS = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  sides: 'Sides',
}

export default function MenuGrid({ menu, selectedDate, onItemSelect }) {
  const dateLabel = selectedDate.toLocaleDateString('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const sections = [
    { key: 'protein', items: menu.protein },
    { key: 'vegetarian', items: menu.vegetarian },
    { key: 'sides', items: menu.sides },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-800">
          {menu.theme}
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Menu for <time dateTime={selectedDate.toISOString().split('T')[0]}>{dateLabel}</time>
        </p>
      </div>

      {sections.map(({ key, items }) => (
        <section key={key} aria-labelledby={`section-${key}`} className="mb-10">
          <h3
            id={`section-${key}`}
            className="text-lg font-semibold text-stone-700 border-b-2 border-brand-200 pb-2 mb-4"
          >
            {CATEGORY_LABELS[key]}
            <span className="ml-2 text-sm font-normal text-stone-400">({items.length} items)</span>
          </h3>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            aria-label={`${CATEGORY_LABELS[key]} items`}
          >
            {items.map(item => (
              <li key={item.id}>
                <MenuItemCard item={item} onSelect={() => onItemSelect(item)} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
