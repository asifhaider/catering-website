"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import {
  formatCurrency,
  formatDisplayDate,
  getOrderWindow,
  isDateInOrderWindow,
  parseDateInputValue,
} from "@/lib/dates";
import { buildInvoice, saveInvoice } from "@/lib/invoices";
import type { CheckoutInfo, PaymentMethod } from "@/lib/types";
import { TAX_RATE } from "@/lib/types";

const PICKUP_TIMES = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

type FormErrors = Partial<Record<keyof CheckoutInfo | "form", string>>;

export default function CheckoutForm() {
  const router = useRouter();
  const { items, cateringDate, clearCart, setCateringDate } = useCart();
  const window = useMemo(() => getOrderWindow(), []);
  const formId = useId();

  const [form, setForm] = useState<CheckoutInfo>({
    pickupDate: cateringDate || window.earliestValue,
    pickupTime: "12:00",
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    venmoHandle: "",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.pricePerPortion * item.portions,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  function updateField<K extends keyof CheckoutInfo>(key: K, value: CheckoutInfo[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      delete next.form;
      return next;
    });
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    const date = parseDateInputValue(form.pickupDate);

    if (!date || !isDateInOrderWindow(date)) {
      next.pickupDate = `Choose a pickup date between ${formatDisplayDate(window.earliest)} and ${formatDisplayDate(window.latest)}.`;
    }
    if (!form.pickupTime) {
      next.pickupTime = "Choose a pickup time.";
    }
    if (!form.fullName.trim()) {
      next.fullName = "Enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!/^[+()\-\s\d]{7,}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }

    if (form.paymentMethod === "card") {
      if (!/^\d{13,19}$/.test(form.cardNumber?.replace(/\s/g, "") || "")) {
        next.cardNumber = "Enter a card number (digits only, for demo).";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry || "")) {
        next.cardExpiry = "Enter expiry as MM/YY.";
      }
      if (!/^\d{3,4}$/.test(form.cardCvc || "")) {
        next.cardCvc = "Enter a 3- or 4-digit CVC (card security code).";
      }
    }

    if (form.paymentMethod === "venmo") {
      if (!form.venmoHandle?.trim()) {
        next.venmoHandle = "Enter your Venmo handle.";
      }
    }

    return next;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (items.length === 0) {
      setErrors({ form: "Your cart is empty. Add dishes before placing an order." });
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setCateringDate(form.pickupDate);
    const invoice = buildInvoice(items, form);
    saveInvoice(invoice);
    clearCart();
    router.push(`/invoice?id=${invoice.id}`);
  }

  if (items.length === 0) {
    return (
      <section className="section-panel" aria-labelledby={`${formId}-empty`}>
        <h1 id={`${formId}-empty`} className="section-heading">
          Checkout
        </h1>
        <p className="section-lede">
          Your cart is empty. Browse a day’s menu to build an order before
          checking out.
        </p>
        <Link href="/#menu" className="button button-primary">
          Browse menu
        </Link>
      </section>
    );
  }

  return (
    <div className="checkout-layout">
      <form
        className="section-panel stack-form"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby={`${formId}-title`}
      >
        <h1 id={`${formId}-title`} className="section-heading">
          Checkout
        </h1>
        <p className="section-lede">
          Step 2 of 2: Checkout. Payment details are collected for demonstration
          only — no real charge is processed.
        </p>

        {errors.form ? (
          <p className="field-error" role="alert">
            {errors.form}
          </p>
        ) : null}

        <fieldset>
          <legend className="menu-category-heading">Pickup details</legend>
          <div className="form-row two">
            <div>
              <label htmlFor={`${formId}-pickup-date`} className="field-label">
                Pickup date (required)
              </label>
              <p id={`${formId}-date-help`} className="field-instructions">
                Orders must be placed between 2 days and 2 weeks (14 days) ahead.
              </p>
              <input
                id={`${formId}-pickup-date`}
                className="text-input"
                type="date"
                required
                min={window.earliestValue}
                max={window.latestValue}
                value={form.pickupDate}
                aria-invalid={errors.pickupDate ? true : undefined}
                aria-describedby={
                  errors.pickupDate
                    ? `${formId}-date-help ${formId}-date-error`
                    : `${formId}-date-help`
                }
                onChange={(event) => updateField("pickupDate", event.target.value)}
              />
              {errors.pickupDate ? (
                <p id={`${formId}-date-error`} className="field-error" role="alert">
                  {errors.pickupDate}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={`${formId}-pickup-time`} className="field-label">
                Pickup time (required)
              </label>
              <select
                id={`${formId}-pickup-time`}
                className="select-input"
                required
                value={form.pickupTime}
                aria-invalid={errors.pickupTime ? true : undefined}
                aria-describedby={
                  errors.pickupTime ? `${formId}-time-error` : undefined
                }
                onChange={(event) => updateField("pickupTime", event.target.value)}
              >
                {PICKUP_TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.pickupTime ? (
                <p id={`${formId}-time-error`} className="field-error" role="alert">
                  {errors.pickupTime}
                </p>
              ) : null}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="menu-category-heading">Contact information</legend>
          <div className="stack-form">
            <div>
              <label htmlFor={`${formId}-name`} className="field-label">
                Full name (required)
              </label>
              <input
                id={`${formId}-name`}
                className="text-input"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.fullName}
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={
                  errors.fullName ? `${formId}-name-error` : undefined
                }
                onChange={(event) => updateField("fullName", event.target.value)}
              />
              {errors.fullName ? (
                <p id={`${formId}-name-error`} className="field-error" role="alert">
                  {errors.fullName}
                </p>
              ) : null}
            </div>
            <div className="form-row two">
              <div>
                <label htmlFor={`${formId}-email`} className="field-label">
                  Email address (required)
                </label>
                <input
                  id={`${formId}-email`}
                  className="text-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? `${formId}-email-error` : undefined
                  }
                  onChange={(event) => updateField("email", event.target.value)}
                />
                {errors.email ? (
                  <p id={`${formId}-email-error`} className="field-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${formId}-phone`} className="field-label">
                  Phone number (required)
                </label>
                <input
                  id={`${formId}-phone`}
                  className="text-input"
                  type="tel"
                  name="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={
                    errors.phone ? `${formId}-phone-error` : undefined
                  }
                  onChange={(event) => updateField("phone", event.target.value)}
                />
                {errors.phone ? (
                  <p id={`${formId}-phone-error`} className="field-error" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="menu-category-heading">Payment</legend>
          <p className="field-instructions">
            Choose how you plan to pay. No real payment is processed on this
            site.
          </p>
          <div
            className="payment-options"
            role="radiogroup"
            aria-label="Payment method"
          >
            {(
              [
                ["card", "Card"],
                ["cash", "Cash on pickup"],
                ["venmo", "Venmo"],
              ] as [PaymentMethod, string][]
            ).map(([value, label]) => (
              <label key={value} className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={form.paymentMethod === value}
                  onChange={() => updateField("paymentMethod", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {form.paymentMethod === "card" ? (
            <div className="stack-form" style={{ marginTop: "1rem" }}>
              <div>
                <label htmlFor={`${formId}-card`} className="field-label">
                  Card number (required)
                </label>
                <input
                  id={`${formId}-card`}
                  className="text-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.cardNumber}
                  aria-invalid={errors.cardNumber ? true : undefined}
                  aria-describedby={
                    errors.cardNumber ? `${formId}-card-error` : undefined
                  }
                  onChange={(event) =>
                    updateField("cardNumber", event.target.value)
                  }
                />
                {errors.cardNumber ? (
                  <p id={`${formId}-card-error`} className="field-error" role="alert">
                    {errors.cardNumber}
                  </p>
                ) : null}
              </div>
              <div className="form-row two">
                <div>
                  <label htmlFor={`${formId}-expiry`} className="field-label">
                    Expiry MM/YY (required)
                  </label>
                  <input
                    id={`${formId}-expiry`}
                    className="text-input"
                    type="text"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    aria-invalid={errors.cardExpiry ? true : undefined}
                    aria-describedby={
                      errors.cardExpiry ? `${formId}-expiry-error` : undefined
                    }
                    onChange={(event) =>
                      updateField("cardExpiry", event.target.value)
                    }
                  />
                  {errors.cardExpiry ? (
                    <p
                      id={`${formId}-expiry-error`}
                      className="field-error"
                      role="alert"
                    >
                      {errors.cardExpiry}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor={`${formId}-cvc`} className="field-label">
                    CVC (card security code, required)
                  </label>
                  <input
                    id={`${formId}-cvc`}
                    className="text-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={form.cardCvc}
                    aria-invalid={errors.cardCvc ? true : undefined}
                    aria-describedby={
                      errors.cardCvc ? `${formId}-cvc-error` : undefined
                    }
                    onChange={(event) =>
                      updateField("cardCvc", event.target.value)
                    }
                  />
                  {errors.cardCvc ? (
                    <p id={`${formId}-cvc-error`} className="field-error" role="alert">
                      {errors.cardCvc}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {form.paymentMethod === "venmo" ? (
            <div style={{ marginTop: "1rem" }}>
              <label htmlFor={`${formId}-venmo`} className="field-label">
                Venmo handle (required)
              </label>
              <input
                id={`${formId}-venmo`}
                className="text-input"
                type="text"
                value={form.venmoHandle}
                aria-invalid={errors.venmoHandle ? true : undefined}
                aria-describedby={
                  errors.venmoHandle ? `${formId}-venmo-error` : undefined
                }
                onChange={(event) =>
                  updateField("venmoHandle", event.target.value)
                }
              />
              {errors.venmoHandle ? (
                <p id={`${formId}-venmo-error`} className="field-error" role="alert">
                  {errors.venmoHandle}
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="menu-category-heading">Special instructions</legend>
          <label htmlFor={`${formId}-notes`} className="field-label">
            Special instructions (optional)
          </label>
          <textarea
            id={`${formId}-notes`}
            className="textarea-input"
            rows={4}
            value={form.specialInstructions}
            onChange={(event) =>
              updateField("specialInstructions", event.target.value)
            }
          />
        </fieldset>

        <button
          type="submit"
          className="button button-primary"
          disabled={submitting}
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>

      <aside className="section-panel" aria-labelledby={`${formId}-summary`}>
        <h2 id={`${formId}-summary`} className="section-heading">
          Order summary
        </h2>
        <ul className="ingredient-list" style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.map((item) => (
            <li key={item.foodItemId} style={{ marginBottom: "0.85rem" }}>
              <strong>{item.name}</strong>
              <br />
              {item.portions} portions × {formatCurrency(item.pricePerPortion)} ={" "}
              {formatCurrency(item.pricePerPortion * item.portions)}
            </li>
          ))}
        </ul>
        <p>
          Subtotal: <strong>{formatCurrency(subtotal)}</strong>
        </p>
        <p>
          Tax ({(TAX_RATE * 100).toFixed(2)}%):{" "}
          <strong>{formatCurrency(tax)}</strong>
        </p>
        <p className="date-status">
          Total: <strong>{formatCurrency(total)}</strong>
        </p>
        <p>
          <Link href="/cart">Back to cart</Link>
        </p>
      </aside>
    </div>
  );
}
