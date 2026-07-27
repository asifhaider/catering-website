import DateSelector from '../components/DateSelector'
import MenuList from '../components/MenuList'
import { getMenuForDate } from '../data/menuData'
import { formatFriendlyDate } from '../utils/date'
import { usePageTitle } from '../utils/usePageTitle'
import { useCart } from '../context/CartContext'

export default function MenuPage() {
  usePageTitle('Menu')
  const { pickupDate, setPickupDate } = useCart()
  const menu = pickupDate ? getMenuForDate(pickupDate) : null

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Order catering</h1>
      <p className="mt-1 text-stone-600">Pick your pickup date to see that day's menu.</p>

      <div className="mt-6">
        <DateSelector value={pickupDate} onChange={setPickupDate} />
      </div>

      {menu && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-stone-900">Menu for {formatFriendlyDate(pickupDate!)}</h2>
          <MenuList menu={menu} />
        </section>
      )}
    </div>
  )
}
