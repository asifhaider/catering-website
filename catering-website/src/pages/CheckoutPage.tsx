import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getItemById } from "../data/menuData";
import { buildInvoice, saveInvoice } from "../data/invoiceStorage";
import { fromDateInputValue, MIN_PORTIONS, MAX_PORTIONS } from "../data/orderRules";
import { formatCurrency, formatDateLong } from "../utils/format";
import CheckoutForm from "../components/CheckoutForm";
import { usePageTitle } from "../hooks/usePageTitle";
import type { CheckoutDetails } from "../types";

export default function CheckoutPage() {
  usePageTitle("Checkout");
  const { lines, pickupDate, totalPortions, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const isPortionCountValid = totalPortions >= MIN_PORTIONS && totalPortions <= MAX_PORTIONS;
  if (lines.length === 0 || !pickupDate || !isPortionCountValid) {
    return <Navigate to="/cart" replace />;
  }

  const pickupDateLabel = formatDateLong(fromDateInputValue(pickupDate));

  const handleSubmit = (details: CheckoutDetails) => {
    const invoice = buildInvoice(lines, details);
    saveInvoice(invoice);
    clearCart();
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold text-brand-900 mb-6">Checkout</h1>
        <CheckoutForm pickupDateLabel={pickupDateLabel} onSubmit={handleSubmit} />
      </div>

      <aside className="bg-white rounded-lg border border-brand-200 p-4 h-fit space-y-3">
        <h2 className="text-lg font-semibold text-brand-900">Order summary</h2>
        <ul className="list-none m-0 p-0 space-y-2">
          {lines.map((line) => {
            const item = getItemById(line.itemId);
            if (!item) return null;
            return (
              <li key={line.itemId} className="flex justify-between text-sm text-brand-800">
                <span>
                  {item.name} × {line.quantity}
                </span>
                <span>{formatCurrency(item.pricePerPerson * line.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-brand-200 pt-3 flex justify-between font-semibold text-brand-900">
          <span>Total ({totalPortions} portions)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
