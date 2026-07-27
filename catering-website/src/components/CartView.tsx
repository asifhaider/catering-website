import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getItemById } from "../data/menuData";
import { fromDateInputValue, MIN_PORTIONS, MAX_PORTIONS } from "../data/orderRules";
import { formatCurrency, formatDateLong } from "../utils/format";
import CartLineRow from "./CartLineRow";

export default function CartView() {
  const { lines, pickupDate, totalPortions, subtotal, updateQuantity, removeItem } = useCart();

  const isPortionCountValid = totalPortions >= MIN_PORTIONS && totalPortions <= MAX_PORTIONS;
  const canCheckout = lines.length > 0 && isPortionCountValid;

  if (lines.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-brand-200 p-6 text-center space-y-3">
        <h1 className="text-2xl font-bold text-brand-900">Your Cart</h1>
        <p className="text-brand-700">Your cart is empty. Browse the menu to add items.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-md bg-brand-700 text-white font-medium hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900">Your Cart</h1>

      {pickupDate && (
        <p className="text-brand-800">Pickup date: {formatDateLong(fromDateInputValue(pickupDate))}</p>
      )}

      <div className="bg-white rounded-lg border border-brand-200 px-4">
        <ul className="list-none m-0 p-0">
          {lines.map((line) => {
            const item = getItemById(line.itemId);
            if (!item) return null;
            return (
              <CartLineRow
                key={line.itemId}
                item={item}
                quantity={line.quantity}
                onQuantityChange={(quantity) => updateQuantity(line.itemId, quantity)}
                onRemove={() => removeItem(line.itemId)}
              />
            );
          })}
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-brand-200 p-4 space-y-3">
        <div className="flex justify-between text-brand-900">
          <span>Total portions</span>
          <span className="font-semibold">{totalPortions}</span>
        </div>
        <div className="flex justify-between text-brand-900 text-lg font-bold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {!isPortionCountValid && (
          <p id="portion-validation-message" role="alert" className="text-sm text-red-700">
            Orders must total between {MIN_PORTIONS} and {MAX_PORTIONS} portions. Adjust quantities to continue
            {totalPortions < MIN_PORTIONS ? ` — add at least ${MIN_PORTIONS - totalPortions} more.` : ` — remove at least ${totalPortions - MAX_PORTIONS}.`}
          </p>
        )}

        {canCheckout ? (
          <Link
            to="/checkout"
            className="block text-center px-4 py-2 rounded-md bg-brand-700 text-white font-medium hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Proceed to checkout
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            aria-describedby="portion-validation-message"
            className="block w-full text-center px-4 py-2 rounded-md bg-brand-700 text-white font-medium opacity-40 cursor-not-allowed"
          >
            Proceed to checkout
          </button>
        )}
      </div>
    </div>
  );
}
