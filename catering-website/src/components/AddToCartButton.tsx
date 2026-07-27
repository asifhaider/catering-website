import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

interface AddToCartButtonProps {
  itemId: string;
  itemName: string;
  quantity: number;
  pickupDate: string | null;
}

export default function AddToCartButton({ itemId, itemName, quantity, pickupDate }: AddToCartButtonProps) {
  const { addItem, setPickupDate } = useCart();
  const [confirmation, setConfirmation] = useState("");
  const hintId = `add-to-cart-hint-${itemId}`;

  useEffect(() => {
    if (!confirmation) return;
    const timeout = setTimeout(() => setConfirmation(""), 3000);
    return () => clearTimeout(timeout);
  }, [confirmation]);

  const handleClick = () => {
    if (pickupDate) {
      setPickupDate(pickupDate);
    }
    addItem(itemId, quantity);
    setConfirmation(`Added ${quantity} ${itemName} to cart.`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={!pickupDate || quantity <= 0}
        aria-label={`Add ${quantity} ${itemName} to cart`}
        aria-describedby={!pickupDate ? hintId : undefined}
        className="px-3 py-1.5 rounded-md bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 disabled:opacity-40 disabled:hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Add to cart
      </button>
      {!pickupDate && (
        <p id={hintId} className="sr-only">
          Select a pickup date above to enable adding items to your cart.
        </p>
      )}
      <p role="status" className="sr-only">
        {confirmation}
      </p>
    </div>
  );
}
