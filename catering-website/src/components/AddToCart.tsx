"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency, formatDisplayDate, parseDateInputValue } from "@/lib/dates";
import type { FoodItem } from "@/lib/types";
import { MAX_PORTIONS, MIN_PORTIONS } from "@/lib/types";

interface AddToCartProps {
  item: FoodItem;
  cateringDate: string;
}

export default function AddToCart({ item, cateringDate }: AddToCartProps) {
  const {
    items,
    addItem,
  } = useCart();
  const existing = items.find((cartItem) => cartItem.foodItemId === item.id);
  const [portions, setPortions] = useState(existing?.portions ?? MIN_PORTIONS);
  const [inputValue, setInputValue] = useState(String(existing?.portions ?? MIN_PORTIONS));
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const labelId = useId();
  const inputId = useId();
  const instructionsId = useId();
  const totalId = useId();
  const errorId = useId();
  const statusId = useId();
  const contextId = useId();

  const date = parseDateInputValue(cateringDate);
  const dateLabel = date ? formatDisplayDate(date) : cateringDate;
  const lineTotal = useMemo(
    () => item.pricePerPortion * portions,
    [item.pricePerPortion, portions]
  );
  const isUpdate = Boolean(existing);
  const atMin = portions <= MIN_PORTIONS;
  const atMax = portions >= MAX_PORTIONS;

  function applyPortions(next: number) {
    if (!Number.isFinite(next) || next < MIN_PORTIONS || next > MAX_PORTIONS) {
      setError(
        `Enter a portion size between ${MIN_PORTIONS} and ${MAX_PORTIONS} people.`
      );
      return false;
    }
    setError(null);
    setPortions(next);
    setInputValue(String(next));
    return true;
  }

  function handleDecrease() {
    applyPortions(portions - 1);
    setStatus(null);
  }

  function handleIncrease() {
    applyPortions(portions + 1);
    setStatus(null);
  }

  function handleInputChange(value: string) {
    setInputValue(value);
    setStatus(null);
    if (value.trim() === "") {
      setError(
        `Enter a portion size between ${MIN_PORTIONS} and ${MAX_PORTIONS} people.`
      );
      return;
    }
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < MIN_PORTIONS || parsed > MAX_PORTIONS) {
      setError(
        `Enter a portion size between ${MIN_PORTIONS} and ${MAX_PORTIONS} people.`
      );
      return;
    }
    setError(null);
    setPortions(parsed);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = Number(inputValue);
    if (!applyPortions(parsed)) {
      return;
    }

    addItem({
      foodItemId: item.id,
      name: item.name,
      category: item.category,
      pricePerPortion: item.pricePerPortion,
      image: item.image,
      imageAlt: item.imageAlt,
      portions: parsed,
      cateringDate,
    });

    setStatus(
      `${isUpdate ? "Updated" : "Added"} ${item.name}, ${parsed} portions, to cart for pickup on ${dateLabel}.`
    );
  }

  return (
    <section
      className="add-to-cart section-panel"
      style={{ marginTop: "1.5rem" }}
      aria-labelledby={labelId}
    >
      <h2 id={labelId} className="section-heading" style={{ fontSize: "1.6rem" }}>
        {isUpdate ? "Update cart" : "Add to cart"}
      </h2>
      <p id={contextId} className="section-lede">
        Adding: <strong>{item.name}</strong> for pickup on{" "}
        <strong>{dateLabel}</strong>.
      </p>

      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={inputId} className="field-label">
            Portions (feeds how many people)
          </label>
          <p id={instructionsId} className="field-instructions">
            Choose between {MIN_PORTIONS} and {MAX_PORTIONS} people for this
            dish. Price is {formatCurrency(item.pricePerPortion)} per portion.
          </p>

          <div className="qty-control" role="group" aria-labelledby={inputId}>
            <button
              type="button"
              onClick={handleDecrease}
              disabled={atMin}
              aria-label="Decrease portions"
            >
              −
            </button>
            <input
              id={inputId}
              type="number"
              inputMode="numeric"
              min={MIN_PORTIONS}
              max={MAX_PORTIONS}
              step={1}
              value={inputValue}
              aria-describedby={
                error
                  ? `${instructionsId} ${totalId} ${contextId} ${errorId}`
                  : `${instructionsId} ${totalId} ${contextId}`
              }
              aria-invalid={error ? true : undefined}
              onChange={(event) => handleInputChange(event.target.value)}
            />
            <button
              type="button"
              onClick={handleIncrease}
              disabled={atMax}
              aria-label="Increase portions"
            >
              +
            </button>
          </div>

          {error ? (
            <p id={errorId} className="field-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <p id={totalId} className="date-status" aria-live="polite">
          <span>Line total: </span>
          <strong>{formatCurrency(error ? 0 : lineTotal)}</strong>
          {!error ? (
            <span className="visually-hidden">
              {" "}
              for {portions} portions of {item.name}
            </span>
          ) : null}
        </p>

        <button
          type="submit"
          className="button button-primary"
          disabled={Boolean(error)}
        >
          {isUpdate ? "Update cart" : "Add to cart"}
        </button>

        {status ? (
          <p id={statusId} className="field-instructions" role="status">
            {status}{" "}
            <a href="/cart">View cart</a>
          </p>
        ) : null}
      </form>
    </section>
  );
}
