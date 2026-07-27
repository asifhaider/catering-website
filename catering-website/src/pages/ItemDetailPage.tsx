import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findFoodItemById } from '../data/menuData'
import AddToCartControl from '../components/AddToCartControl'
import { usePageTitle } from '../utils/usePageTitle'

export default function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const item = itemId ? findFoodItemById(itemId) : undefined
  const [statusMessage, setStatusMessage] = useState('')

  usePageTitle(item ? item.name : 'Item not found')

  if (!item) {
    return (
      <div>
        <p>Sorry, we couldn't find that menu item.</p>
        <Link to="/" className="text-amber-800 hover:underline">
          Back to menu
        </Link>
      </div>
    )
  }

  const { nutrition } = item

  return (
    <div>
      <Link to="/" className="text-sm text-amber-800 hover:underline">
        Back to menu
      </Link>

      <p aria-live="polite" role="status" className="sr-only">
        {statusMessage}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <img src={item.imageUrl} alt="" className="h-64 w-full rounded-lg object-cover md:h-full" />

        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{item.name}</h1>
          <p className="mt-1 text-lg text-stone-700">${item.pricePerPortion.toFixed(2)} / portion</p>

          <section className="mt-4">
            <h2 className="text-lg font-semibold text-stone-900">Description</h2>
            <p className="mt-1 text-stone-700">{item.description}</p>
          </section>

          <section className="mt-4">
            <h2 className="text-lg font-semibold text-stone-900">Ingredients</h2>
            <ul className="mt-1 list-disc pl-5 text-stone-700">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-lg font-semibold text-stone-900">Allergens</h2>
            {item.allergens.length > 0 ? (
              <ul className="mt-1 list-disc pl-5 text-stone-700">
                {item.allergens.map((allergen) => (
                  <li key={allergen} className="capitalize">
                    {allergen}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-stone-700">No known allergens listed.</p>
            )}
          </section>

          <section className="mt-6">
            <AddToCartControl
              item={item}
              onAdded={(addedItem, quantity) =>
                setStatusMessage(`${addedItem.name}, ${quantity} portions, added to cart.`)
              }
            />
          </section>
        </div>
      </div>

      <section className="mt-8 max-w-sm">
        <h2 className="text-lg font-semibold text-stone-900">Nutrition Facts</h2>
        <p className="mt-1 text-xs text-stone-500">
          Amounts shown per serving ({nutrition.servingSize}). Values in grams (g) and milligrams (mg).
        </p>
        <dl className="mt-2 divide-y divide-stone-300 border border-stone-300 text-sm text-stone-800">
          <div className="flex justify-between px-3 py-2">
            <dt className="font-medium">Serving size</dt>
            <dd>{nutrition.servingSize}</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt className="font-semibold">Calories</dt>
            <dd className="font-semibold">{nutrition.calories}</dd>
          </div>
          <div className="px-3 py-2">
            <div className="flex justify-between">
              <dt className="font-medium">Total Fat</dt>
              <dd>{nutrition.totalFatGrams}g</dd>
            </div>
            <dl>
              <div className="flex justify-between pl-4 text-stone-600">
                <dt>Saturated Fat</dt>
                <dd>{nutrition.saturatedFatGrams}g</dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt className="font-medium">Cholesterol</dt>
            <dd>{nutrition.cholesterolMg}mg</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt className="font-medium">Sodium</dt>
            <dd>{nutrition.sodiumMg}mg</dd>
          </div>
          <div className="px-3 py-2">
            <div className="flex justify-between">
              <dt className="font-medium">Total Carbohydrate</dt>
              <dd>{nutrition.totalCarbsGrams}g</dd>
            </div>
            <dl>
              <div className="flex justify-between pl-4 text-stone-600">
                <dt>Dietary Fiber</dt>
                <dd>{nutrition.dietaryFiberGrams}g</dd>
              </div>
              <div className="flex justify-between pl-4 text-stone-600">
                <dt>Sugars</dt>
                <dd>{nutrition.sugarsGrams}g</dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt className="font-medium">Protein</dt>
            <dd>{nutrition.proteinGrams}g</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
