interface QuantityStepperProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function QuantityStepper({ id, label, value, min = 1, max = 30, onChange }: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    if (Number.isNaN(parsed)) return;
    onChange(Math.min(max, Math.max(min, parsed)));
  };

  return (
    <div className="inline-flex items-center border border-brand-300 rounded-md">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className="px-2.5 py-1.5 text-brand-800 hover:bg-brand-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-l-md"
      >
        <span aria-hidden="true">−</span>
      </button>
      <label className="sr-only" htmlFor={id}>
        Quantity of {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        className="w-[2.5em] min-w-[2.5em] text-center border-x border-brand-300 py-1.5 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={value}
        min={min}
        max={max}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className="px-2.5 py-1.5 text-brand-800 hover:bg-brand-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-r-md"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
