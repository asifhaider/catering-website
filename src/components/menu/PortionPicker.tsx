import { useId } from 'react';

const MIN = 6;
const MAX = 30;

interface PortionPickerProps {
  value: number | null;
  onChange: (size: number) => void;
}

export default function PortionPicker({ value, onChange }: PortionPickerProps) {
  const id = useId();
  const rangeId = `${id}-range`;
  const displayId = `${id}-display`;
  const current = value ?? MIN;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={rangeId} className="text-sm font-medium text-stone-800">
          Number of people{' '}
          <span className="text-stone-500 font-normal">(min 6, max 30)</span>
        </label>
        <div
          id={displayId}
          aria-live="polite"
          aria-atomic="true"
          className="text-2xl font-bold text-amber-700 tabular-nums min-w-[3ch] text-right"
        >
          {value ?? '—'}
        </div>
      </div>
      <input
        id={rangeId}
        type="range"
        min={MIN}
        max={MAX}
        step={1}
        value={current}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={current}
        aria-valuetext={value ? `${value} people` : 'Not selected'}
        aria-describedby={displayId}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => { if (!value) onChange(MIN); }}
        className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-amber-600 [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-600
          [&::-moz-range-thumb]:border-0 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      />
      <div className="flex justify-between text-xs text-stone-500 mt-1">
        <span>{MIN} people</span>
        <span>{MAX} people</span>
      </div>
    </div>
  );
}
