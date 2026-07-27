import { useState } from "react";
import type { CheckoutDetails, PaymentMethod } from "../types";

const PICKUP_TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  pickupTime: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  specialInstructions: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  phone: "",
  email: "",
  pickupTime: "",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  specialInstructions: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

interface CheckoutFormProps {
  pickupDateLabel: string;
  onSubmit: (details: CheckoutDetails) => void;
}

export default function CheckoutForm({ pickupDateLabel, onSubmit }: CheckoutFormProps) {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const fieldClass = (hasError: boolean) =>
    `w-full border rounded-md px-3 py-2 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
      hasError ? "border-red-600" : "border-brand-300"
    }`;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!formState.fullName.trim()) nextErrors.fullName = "Enter your full name.";
    if (!formState.phone.trim()) nextErrors.phone = "Enter a phone number.";
    if (!formState.email.trim()) {
      nextErrors.email = "Enter an email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formState.pickupTime) nextErrors.pickupTime = "Select a pickup time.";
    if (formState.paymentMethod === "card") {
      if (!/^\d{13,19}$/.test(formState.cardNumber.replace(/\s/g, ""))) {
        nextErrors.cardNumber = "Enter a valid card number.";
      }
      if (!/^\d{2}\/\d{2}$/.test(formState.cardExpiry)) {
        nextErrors.cardExpiry = "Use MM/YY format.";
      }
      if (!/^\d{3,4}$/.test(formState.cardCvc)) {
        nextErrors.cardCvc = "Enter a valid CVC.";
      }
    }
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      contact: { fullName: formState.fullName.trim(), phone: formState.phone.trim(), email: formState.email.trim() },
      pickupDate: pickupDateLabel,
      pickupTime: formState.pickupTime,
      payment: {
        method: formState.paymentMethod,
        ...(formState.paymentMethod === "card"
          ? { cardNumber: formState.cardNumber, cardExpiry: formState.cardExpiry, cardCvc: formState.cardCvc }
          : {}),
      },
      specialInstructions: formState.specialInstructions.trim(),
    });
  };

  const errorId = (field: keyof FormState) => `checkout-error-${field}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <fieldset className="space-y-4 border-0 p-0 m-0">
        <legend className="text-lg font-semibold text-brand-900 mb-1 p-0">Contact information</legend>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-brand-900 mb-1">
            Full name <span className="text-red-700">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            className={fieldClass(!!errors.fullName)}
            value={formState.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
          />
          {errors.fullName && (
            <p id={errorId("fullName")} role="alert" className="text-sm text-red-700 mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-900 mb-1">
            Phone number <span className="text-red-700">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            className={fieldClass(!!errors.phone)}
            value={formState.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
          />
          {errors.phone && (
            <p id={errorId("phone")} role="alert" className="text-sm text-red-700 mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-900 mb-1">
            Email address <span className="text-red-700">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            className={fieldClass(!!errors.email)}
            value={formState.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {errors.email && (
            <p id={errorId("email")} role="alert" className="text-sm text-red-700 mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0 m-0">
        <legend className="text-lg font-semibold text-brand-900 mb-1 p-0">Pickup</legend>
        <p className="text-brand-800 text-sm">Pickup date: {pickupDateLabel}</p>
        <div>
          <label htmlFor="pickupTime" className="block text-sm font-medium text-brand-900 mb-1">
            Pickup time <span className="text-red-700">*</span>
          </label>
          <select
            id="pickupTime"
            required
            aria-required="true"
            className={fieldClass(!!errors.pickupTime)}
            value={formState.pickupTime}
            onChange={(e) => updateField("pickupTime", e.target.value)}
            aria-invalid={!!errors.pickupTime}
            aria-describedby={errors.pickupTime ? errorId("pickupTime") : undefined}
          >
            <option value="">Select a time</option>
            {PICKUP_TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.pickupTime && (
            <p id={errorId("pickupTime")} role="alert" className="text-sm text-red-700 mt-1">
              {errors.pickupTime}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0 m-0">
        <legend className="text-lg font-semibold text-brand-900 mb-1 p-0">Payment method</legend>
        <div className="flex flex-wrap gap-4">
          {(["card", "cash", "check"] as PaymentMethod[]).map((method) => (
            <label key={method} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formState.paymentMethod === method}
                onChange={() => updateField("paymentMethod", method)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              />
              <span className="capitalize text-brand-900">{method === "card" ? "Credit / debit card" : method}</span>
            </label>
          ))}
        </div>

        {formState.paymentMethod === "card" && (
          <div className="space-y-4 pt-2">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-brand-900 mb-1">
                Card number <span className="text-red-700">*</span>
              </label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                required
                aria-required="true"
                className={fieldClass(!!errors.cardNumber)}
                value={formState.cardNumber}
                onChange={(e) => updateField("cardNumber", e.target.value)}
                aria-invalid={!!errors.cardNumber}
                aria-describedby={errors.cardNumber ? errorId("cardNumber") : undefined}
              />
              {errors.cardNumber && (
                <p id={errorId("cardNumber")} role="alert" className="text-sm text-red-700 mt-1">
                  {errors.cardNumber}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-brand-900 mb-1">
                  Expiry (MM/YY) <span className="text-red-700">*</span>
                </label>
                <input
                  id="cardExpiry"
                  type="text"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  required
                  aria-required="true"
                  className={fieldClass(!!errors.cardExpiry)}
                  value={formState.cardExpiry}
                  onChange={(e) => updateField("cardExpiry", e.target.value)}
                  aria-invalid={!!errors.cardExpiry}
                  aria-describedby={errors.cardExpiry ? errorId("cardExpiry") : undefined}
                />
                {errors.cardExpiry && (
                  <p id={errorId("cardExpiry")} role="alert" className="text-sm text-red-700 mt-1">
                    {errors.cardExpiry}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="cardCvc" className="block text-sm font-medium text-brand-900 mb-1">
                  CVC (3-4 digits) <span className="text-red-700">*</span>
                </label>
                <input
                  id="cardCvc"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  required
                  aria-required="true"
                  className={fieldClass(!!errors.cardCvc)}
                  value={formState.cardCvc}
                  onChange={(e) => updateField("cardCvc", e.target.value)}
                  aria-invalid={!!errors.cardCvc}
                  aria-describedby={errors.cardCvc ? errorId("cardCvc") : undefined}
                />
                {errors.cardCvc && (
                  <p id={errorId("cardCvc")} role="alert" className="text-sm text-red-700 mt-1">
                    {errors.cardCvc}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-brand-700">
              This is a demo checkout — no payment is actually processed or stored.
            </p>
          </div>
        )}
        {formState.paymentMethod !== "card" && (
          <p className="text-sm text-brand-700">
            Pay with {formState.paymentMethod} when you pick up your order.
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-brand-900 mb-1">
          Special instructions <span className="text-brand-600 font-normal">(optional)</span>
        </label>
        <textarea
          id="specialInstructions"
          rows={4}
          className="w-full border border-brand-300 rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          value={formState.specialInstructions}
          onChange={(e) => updateField("specialInstructions", e.target.value)}
          placeholder="Allergies, dietary needs, packaging preferences, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 rounded-md bg-brand-700 text-white font-semibold hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Place order
      </button>
    </form>
  );
}
