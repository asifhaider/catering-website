import { useId, useMemo } from "react";
import { getEarliestPickupDate, getLatestPickupDate, isPickupDateInRange, toDateInputValue, fromDateInputValue } from "../data/orderRules";
import { formatDateLong } from "../utils/format";
import { getMenuForDate } from "../data/menuData";

interface MenuDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
}

export default function MenuDatePicker({ value, onChange }: MenuDatePickerProps) {
  const inputId = useId();
  const helpId = useId();
  const errorId = useId();

  const today = useMemo(() => new Date(), []);
  const earliest = useMemo(() => getEarliestPickupDate(today), [today]);
  const latest = useMemo(() => getLatestPickupDate(today), [today]);

  const selectedDate = value ? fromDateInputValue(value) : null;
  const isValid = selectedDate ? isPickupDateInRange(selectedDate, today) : true;
  const selectedMenu = selectedDate && isValid ? getMenuForDate(selectedDate) : null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-brand-200 p-4 sm:p-5">
      <label htmlFor={inputId} className="block font-semibold text-brand-900 mb-1">
        Select your pickup date
      </label>
      <p id={helpId} className="text-sm text-brand-700 mb-3">
        Orders must be placed at least {2} days and at most {14} days in advance — choose a date between{" "}
        {formatDateLong(earliest)} and {formatDateLong(latest)}.
      </p>
      <input
        id={inputId}
        type="date"
        className="border border-brand-300 rounded-md px-3 py-2 text-brand-900 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:border-brand-600"
        min={toDateInputValue(earliest)}
        max={toDateInputValue(latest)}
        value={value ?? ""}
        onChange={handleChange}
        aria-describedby={!isValid ? `${helpId} ${errorId}` : helpId}
        aria-invalid={!isValid}
      />

      {!isValid && (
        <p id={errorId} role="alert" className="text-sm text-red-700 mt-2">
          Please choose a pickup date between {formatDateLong(earliest)} and {formatDateLong(latest)}.
        </p>
      )}

      <p className="mt-3 text-sm text-brand-800" aria-live="polite">
        {selectedMenu
          ? `Viewing the ${selectedMenu.dayName} menu (${selectedMenu.theme}) for ${formatDateLong(selectedDate!)}.`
          : "Choose a date above to see that day's menu."}
      </p>
    </div>
  );
}
