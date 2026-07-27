import { useEffect, useRef } from 'react'
import type { FoodItem } from '../types'

interface FoodItemDetailProps {
  item: FoodItem | null
  onClose: () => void
  children?: React.ReactNode
}

export default function FoodItemDetail({ item, onClose, children }: FoodItemDetailProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (item) {
      dialog.showModal()
      closeButtonRef.current?.focus()
    } else {
      dialog.close()
    }
  }, [item])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

  if (!item) return null

  const { nutritionalFacts: nf } = item

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="item-detail-title"
      className="fixed inset-0 z-50 m-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-0 shadow-xl backdrop:bg-warm-brown/50 open:flex open:flex-col"
      onClose={onClose}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover"
        />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close item details"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-warm-brown shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <span aria-hidden="true" className="text-xl leading-none">&times;</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h2 id="item-detail-title" className="font-display text-2xl font-bold text-warm-brown">
          {item.name}
        </h2>
        <p className="mt-1 text-lg font-medium text-terracotta">
          ${item.price.toFixed(2)}{' '}
          <span className="text-sm font-normal text-warm-brown/80">/ serving</span>
        </p>

        <section aria-labelledby="description-heading" className="mt-6">
          <h3 id="description-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown/80">
            Description
          </h3>
          <p className="mt-2 text-warm-brown/90">{item.description}</p>
        </section>

        <section aria-labelledby="ingredients-heading" className="mt-6">
          <h3 id="ingredients-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown/80">
            Ingredients
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-warm-brown/90">
            {item.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="nutrition-heading" className="mt-6">
          <h3 id="nutrition-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown/80">
            Nutritional Facts
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border border-warm-brown/20 text-sm">
              <caption className="sr-only">
                Nutritional information for {item.name}
              </caption>
              <tbody>
                <tr className="border-b border-warm-brown/20 bg-warm-brown/5">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Serving Size</th>
                  <td className="px-3 py-2 text-right">{nf.servingSize}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Calories</th>
                  <td className="px-3 py-2 text-right">{nf.calories}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Total Fat</th>
                  <td className="px-3 py-2 text-right">{nf.totalFat}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Saturated Fat</th>
                  <td className="px-3 py-2 text-right">{nf.saturatedFat}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Cholesterol</th>
                  <td className="px-3 py-2 text-right">{nf.cholesterol}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Sodium</th>
                  <td className="px-3 py-2 text-right">{nf.sodium}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Total Carbohydrates</th>
                  <td className="px-3 py-2 text-right">{nf.totalCarbs}</td>
                </tr>
                <tr className="border-b border-warm-brown/20">
                  <th scope="row" className="px-3 py-2 text-left font-medium">Dietary Fiber</th>
                  <td className="px-3 py-2 text-right">{nf.dietaryFiber}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">Protein</th>
                  <td className="px-3 py-2 text-right">{nf.protein}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {children && (
          <div className="mt-6 border-t border-warm-brown/10 pt-6">
            {children}
          </div>
        )}
      </div>
    </dialog>
  )
}
