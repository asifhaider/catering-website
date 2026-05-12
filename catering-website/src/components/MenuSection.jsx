import FoodCard from './FoodCard'

const SECTION_META = {
  protein:    { label: 'Proteins',    icon: '🍗', desc: '5 hearty mains' },
  vegetarian: { label: 'Vegetarian',  icon: '🥦', desc: '3 plant-based options' },
  sides:      { label: 'Sides',       icon: '🍚', desc: '2 accompaniments' },
}

export default function MenuSection({ category, items }) {
  const meta = SECTION_META[category]
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{meta.icon}</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display">{meta.label}</h2>
          <p className="text-sm text-gray-500">{meta.desc}</p>
        </div>
        <div className="ml-auto h-px flex-1 bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
