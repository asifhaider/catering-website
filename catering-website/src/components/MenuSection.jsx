import FoodCard from './FoodCard'

const SECTION_META = {
  protein:    { label: 'Proteins',    icon: '🍗', desc: '5 hearty mains' },
  vegetarian: { label: 'Vegetarian',  icon: '🥦', desc: '3 plant-based options' },
  sides:      { label: 'Sides',       icon: '🍚', desc: '2 accompaniments' },
}

export default function MenuSection({ category, items }) {
  const meta = SECTION_META[category]
  const headingId = `section-${category}`

  return (
    /* SC 2.4.10 – each category is a section with an explicit heading */
    <section className="mb-12" aria-labelledby={headingId}>
      <div className="flex items-center gap-3 mb-6">
        {/* SC 1.1.1 – decorative emoji hidden from AT; the heading text conveys the info */}
        <span aria-hidden="true" className="text-3xl">{meta.icon}</span>
        <div>
          {/* SC 2.4.6 – descriptive heading for the section */}
          <h2 id={headingId} className="text-xl font-bold text-gray-900 font-display">{meta.label}</h2>
          <p className="text-sm text-gray-600">{meta.desc}</p>
        </div>
        <div className="ml-auto h-px flex-1 bg-gray-200" aria-hidden="true" />
      </div>

      {/* SC 1.3.1 – list semantics communicate that these are related items */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 list-none" role="list">
        {items.map(item => (
          <li key={item.id}>
            <FoodCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
