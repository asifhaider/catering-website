"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | Mama's Kitchen";
  }, []);
  const router = useRouter();
  const { items, totalPrice, totalPortions, portionError, clearCart, selectedDate } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: selectedDate || "",
    pickupTime: "12:00",
    paymentMethod: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    instructions: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portionError || items.length === 0) return;

    const invoice = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      customer: { name: form.name, email: form.email, phone: form.phone },
      pickup: { date: form.pickupDate, time: form.pickupTime },
      paymentMethod: form.paymentMethod,
      specialInstructions: form.instructions,
      items: items.map((ci) => ({
        name: ci.menuItem.name,
        category: ci.menuItem.category,
        price: ci.menuItem.price,
        quantity: ci.quantity,
        subtotal: ci.menuItem.price * ci.quantity,
      })),
      totalPortions,
      totalPrice,
    };

    const existing = JSON.parse(localStorage.getItem("catering_invoices") || "[]");
    existing.push(invoice);
    localStorage.setItem("catering_invoices", JSON.stringify(existing));
    localStorage.setItem("catering_last_invoice", JSON.stringify(invoice));

    clearCart();
    router.push("/invoice");
  };

  if (items.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Nothing to Checkout</h1>
        <p className="text-gray-500 mb-6">Your cart is empty. Add some items first.</p>
        <a href="/" className="bg-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-700 min-h-[44px] inline-flex items-center">View Menu</a>
      </main>
    );
  }

  return (
    <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      {portionError && (
        <div role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {portionError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900 mb-2">Contact Information</legend>
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input id="checkout-name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="checkout-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input id="checkout-phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="tel" />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900 mb-2">Pickup Details</legend>
          <div>
            <label htmlFor="checkout-pickup-date" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input id="checkout-pickup-date" type="date" required value={form.pickupDate} onChange={(e) => update("pickupDate", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" />
          </div>
          <div>
            <label htmlFor="checkout-pickup-time" className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
            <input id="checkout-pickup-time" type="time" required value={form.pickupTime} onChange={(e) => update("pickupTime", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900 mb-2">Payment Method</legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="radio" name="paymentMethod" value="cash" checked={form.paymentMethod === "cash"} onChange={(e) => update("paymentMethod", e.target.value)} className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
              <span className="text-sm text-gray-700">Cash on Pickup</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={(e) => update("paymentMethod", e.target.value)} className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
              <span className="text-sm text-gray-700">Card</span>
            </label>
          </div>
          {form.paymentMethod === "card" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 italic">This is a demo — no actual payment is processed.</p>
              <div>
                <label htmlFor="checkout-card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input id="checkout-card-number" type="text" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} placeholder="1234 5678 9012 3456" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="cc-number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-card-expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input id="checkout-card-expiry" type="text" value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="cc-exp" />
                </div>
                <div>
                  <label htmlFor="checkout-card-cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input id="checkout-card-cvc" type="text" value={form.cardCvc} onChange={(e) => update("cardCvc", e.target.value)} placeholder="123" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="cc-csc" />
                </div>
              </div>
            </div>
          )}
        </fieldset>

        <div>
          <label htmlFor="checkout-instructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea id="checkout-instructions" rows={3} value={form.instructions} onChange={(e) => update("instructions", e.target.value)} placeholder="Allergies, dietary preferences, or any other notes..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
        </div>

        <section aria-labelledby="order-summary-heading" className="bg-gray-50 rounded-xl p-6 space-y-3">
          <h2 id="order-summary-heading" className="font-semibold text-gray-900">Order Summary</h2>
          {items.map((ci) => (
            <div key={ci.menuItem.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{ci.menuItem.name} &times; {ci.quantity}</span>
              <span className="font-medium">${(ci.menuItem.price * ci.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between text-lg font-bold">
            <span>Total ({totalPortions} portions)</span>
            <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
          </div>
        </section>

        <button
          type="submit"
          disabled={!!portionError}
          className="w-full bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Place Order
        </button>
      </form>
    </main>
  );
}
