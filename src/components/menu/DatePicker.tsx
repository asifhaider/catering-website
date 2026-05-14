import { getValidCateringDates } from '../../utils/dateUtils';

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  hasCartItems: boolean;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseLocalDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatButtonLabel(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  return date.toLocaleDateString('en-CA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function DatePicker({ value, onChange, hasCartItems }: DatePickerProps) {
  const validDates = getValidCateringDates();

  const handleSelect = (isoDate: string) => {
    if (isoDate === value) return;
    if (hasCartItems) {
      const confirmed = window.confirm(
        'Changing the date will clear your current cart because each day has a different menu. Continue?'
      );
      if (!confirmed) return;
    }
    onChange(isoDate);
  };

  // Group dates by month for labelling
  const groupedByMonth: Map<string, string[]> = new Map();
  for (const d of validDates) {
    const date = parseLocalDate(d);
    const key = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    if (!groupedByMonth.has(key)) groupedByMonth.set(key, []);
    groupedByMonth.get(key)!.push(d);
  }

  return (
    <fieldset>
      <legend className="sr-only">Select a catering date (minimum 2 days, maximum 14 days from today)</legend>
      {Array.from(groupedByMonth.entries()).map(([monthLabel, dates]) => (
        <div key={monthLabel} className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            {monthLabel}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2" role="group" aria-label={monthLabel}>
            {dates.map((isoDate) => {
              const date = parseLocalDate(isoDate);
              const isSelected = value === isoDate;
              const dayName = DAYS_SHORT[date.getDay()];
              const dayNum = date.getDate();

              return (
                <button
                  key={isoDate}
                  type="button"
                  onClick={() => handleSelect(isoDate)}
                  aria-label={formatButtonLabel(isoDate)}
                  aria-pressed={isSelected}
                  className={[
                    'flex flex-col items-center justify-center min-w-[44px] min-h-[60px] rounded-xl border-2 transition-all font-medium text-sm',
                    isSelected
                      ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50',
                  ].join(' ')}
                >
                  <span className="text-xs opacity-75">{dayName}</span>
                  <span className="text-lg font-bold leading-tight">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
