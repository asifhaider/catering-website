import type { PickupInfo } from '../../types';
import { getPickupTimeSlots } from '../../utils/dateUtils';
import { formatDate, formatTime } from '../../utils/formatUtils';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

interface PickupInfoStepProps {
  data: PickupInfo;
  cateringDate: string;
  onChange: (data: PickupInfo) => void;
  onNext: () => void;
}

export default function PickupInfoStep({ data, cateringDate, onChange, onNext }: PickupInfoStepProps) {
  const timeSlots = getPickupTimeSlots();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.pickupTime) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-display mb-1">Pickup Information</h2>
        <p className="text-stone-500 text-sm">
          All orders are pickup only. Choose your preferred time on the day of catering.
        </p>
      </div>

      <FormField id="pickup-date" label="Catering & Pickup Date">
        <input
          id="pickup-date"
          type="text"
          value={formatDate(cateringDate)}
          readOnly
          className="bg-stone-50 cursor-default text-stone-700"
          aria-readonly="true"
          aria-describedby="pickup-date-note"
        />
      </FormField>
      <p id="pickup-date-note" className="text-xs text-stone-500 -mt-4">
        To change the date, go back to the menu and select a different date.
      </p>

      <FormField
        id="pickup-time"
        label="Pickup Time"
        required
        error={!data.pickupTime ? undefined : undefined}
        hint="Choose a time window. Orders are typically ready within 30 minutes of your selected time."
      >
        <select
          id="pickup-time"
          required
          value={data.pickupTime}
          onChange={(e) => onChange({ ...data, pickupTime: e.target.value })}
          aria-describedby="pickup-time-hint"
        >
          <option value="">— Select a time —</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {formatTime(slot)}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="special-instructions"
        label="Special Instructions"
        hint="Allergies, dietary notes, or anything else we should know."
      >
        <textarea
          id="special-instructions"
          rows={4}
          value={data.specialInstructions}
          onChange={(e) => onChange({ ...data, specialInstructions: e.target.value })}
          aria-describedby="special-instructions-hint"
          placeholder="E.g. Please make the lamb kofta extra mild…"
          maxLength={500}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!data.pickupTime}
      >
        Continue to Contact Info
      </Button>
    </form>
  );
}
