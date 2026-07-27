import { useEffect, useId, useRef } from "react";
import type { FoodItem } from "../types";
import { formatCurrency } from "../utils/format";
import QuantityStepper from "./QuantityStepper";
import AddToCartButton from "./AddToCartButton";

interface ItemDetailProps {
  item: FoodItem | null;
  quantity: number;
  pickupDate: string | null;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
}

export default function ItemDetail({ item, quantity, pickupDate, onQuantityChange, onClose }: ItemDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  const handleDialogClose = () => {
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      className="p-0 rounded-lg border-0 w-full max-w-xl backdrop:bg-black/50"
    >
      {item && (
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-4 p-4 border-b border-brand-200 sticky top-0 bg-white">
            <h2 id={titleId} className="text-xl font-bold text-brand-900 m-0">
              {item.name}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close item details"
              className="text-brand-700 hover:text-brand-900 text-xl leading-none min-w-11 min-h-11 flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="p-4 space-y-5">
            <img src={item.imageUrl} alt={item.imageAlt} className="w-full h-56 object-cover rounded-md" />

            <p className="text-brand-900 font-semibold text-lg">{formatCurrency(item.pricePerPerson)} / person</p>

            <div className="flex flex-wrap items-center gap-2">
              <QuantityStepper id={`detail-qty-${item.id}`} label={item.name} value={quantity} onChange={onQuantityChange} />
              <AddToCartButton itemId={item.id} itemName={item.name} quantity={quantity} pickupDate={pickupDate} />
            </div>

            <div>
              <h3 className="font-semibold text-brand-900 mb-1">Description</h3>
              <p className="text-brand-800">{item.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-brand-900 mb-1">Ingredients</h3>
              <ul className="list-disc list-inside text-brand-800 space-y-0.5">
                {item.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {item.allergens.length > 0 && (
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">Allergens</h3>
                <p className="text-brand-800">{item.allergens.join(", ")}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-brand-900 mb-2">Nutrition Facts</h3>
              <table className="w-full border-collapse border border-brand-300 text-sm">
                <caption className="sr-only">Nutrition facts for {item.name}</caption>
                <tbody>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Serving size
                    </th>
                    <td className="p-2 text-right font-semibold text-brand-900">{item.nutrition.servingSize}</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-semibold p-2 text-brand-900">
                      Calories
                    </th>
                    <td className="p-2 text-right font-semibold text-brand-900">{item.nutrition.calories}</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Total Fat
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.totalFatG} g</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700 pl-6">
                      Saturated Fat
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.saturatedFatG} g</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Cholesterol
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.cholesterolMg} mg</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Sodium
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.sodiumMg} mg</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Total Carbohydrate
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.totalCarbsG} g</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700 pl-6">
                      Dietary Fiber
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.dietaryFiberG} g</td>
                  </tr>
                  <tr className="border-b border-brand-300">
                    <th scope="row" className="text-left font-normal p-2 text-brand-700 pl-6">
                      Sugars
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.sugarsG} g</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-left font-normal p-2 text-brand-700">
                      Protein
                    </th>
                    <td className="p-2 text-right text-brand-900">{item.nutrition.proteinG} g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
