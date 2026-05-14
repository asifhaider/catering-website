import { useState } from 'react';
import type { ContactInfo } from '../../types';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

interface ContactInfoStepProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

function validate(data: ContactInfo): Errors {
  const errors: Errors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (data.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits)';
  }
  return errors;
}

export default function ContactInfoStep({ data, onChange, onNext, onBack }: ContactInfoStepProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  const update = (field: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value });
    if (touched) setErrors(validate({ ...data, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-display mb-1">Contact Information</h2>
        <p className="text-stone-500 text-sm">
          We'll use this information to confirm your order and coordinate pickup.
        </p>
      </div>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <legend className="sr-only">Your name</legend>
        <FormField id="first-name" label="First Name" required error={errors.firstName}>
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            value={data.firstName}
            onChange={update('firstName')}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'first-name-error' : undefined}
          />
        </FormField>
        <FormField id="last-name" label="Last Name" required error={errors.lastName}>
          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            value={data.lastName}
            onChange={update('lastName')}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'last-name-error' : undefined}
          />
        </FormField>
      </fieldset>

      <FormField id="email" label="Email Address" required error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={update('email')}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField id="phone" label="Phone Number" required error={errors.phone}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={update('phone')}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          placeholder="+1 (905) 555-0100"
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
