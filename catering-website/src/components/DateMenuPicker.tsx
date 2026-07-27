"use client";

import { useId, useMemo, useState } from "react";
import {
  formatDisplayDate,
  getOrderWindow,
  isDateInOrderWindow,
  parseDateInputValue,
} from "@/lib/dates";

interface DateMenuPickerProps {
  value: string;
  onChange: (dateValue: string) => void;
}

export { getDefaultPickupDateValue } from "@/lib/dates";

export default function DateMenuPicker({ value, onChange }: DateMenuPickerProps) {
  const headingId = useId();
  const inputId = useId();
  const instructionsId = useId();
  const statusId = useId();
  const errorId = useId();

  const window = useMemo(() => getOrderWindow(), []);
  const [error, setError] = useState<string | null>(null);

  const selectedDate = parseDateInputValue(value);
  const statusText = selectedDate
    ? `Viewing menu for ${formatDisplayDate(selectedDate)}`
    : "No pickup date selected yet";

  function handleChange(nextValue: string) {
    if (!nextValue) {
      setError("Choose a pickup date to view that day’s menu.");
      return;
    }

    const parsed = parseDateInputValue(nextValue);
    if (!parsed || !isDateInOrderWindow(parsed)) {
      setError(
        `Choose a date between ${formatDisplayDate(window.earliest)} and ${formatDisplayDate(window.latest)}.`
      );
      return;
    }

    setError(null);
    onChange(nextValue);
  }

  return (
    <section
      className="date-menu-picker"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="section-heading">
        Choose your pickup date
      </h2>

      <p id={instructionsId} className="field-instructions">
        Orders must be placed at least 2 days and at most 2 weeks (14 days)
        ahead. Select a date between{" "}
        <strong>{formatDisplayDate(window.earliest)}</strong> and{" "}
        <strong>{formatDisplayDate(window.latest)}</strong>.
      </p>

      <div className="date-field">
        <label htmlFor={inputId} className="field-label">
          Pickup date
        </label>
        <input
          id={inputId}
          type="date"
          className="date-input"
          value={value}
          min={window.earliestValue}
          max={window.latestValue}
          aria-describedby={
            error
              ? `${instructionsId} ${statusId} ${errorId}`
              : `${instructionsId} ${statusId}`
          }
          aria-invalid={error ? true : undefined}
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>

      {error ? (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      ) : null}

      <p id={statusId} className="date-status" aria-live="polite">
        <span className="date-status-marker" aria-hidden="true">
          ●
        </span>
        <span>{statusText}</span>
      </p>
    </section>
  );
}
