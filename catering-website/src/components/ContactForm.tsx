import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!formState.name.trim()) nextErrors.name = "Enter your name.";
    if (!formState.email.trim()) {
      nextErrors.email = "Enter an email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formState.message.trim()) nextErrors.message = "Enter a message.";
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    setFormState(INITIAL_STATE);
    setSubmitted(true);
  };

  const errorId = (field: keyof FormState) => `contact-error-${field}`;
  const fieldClass = (hasError: boolean) =>
    `w-full border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
      hasError ? "border-red-600" : "border-brand-300"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-brand-900 mb-1">
          Name <span className="text-red-700">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          className={fieldClass(!!errors.name)}
          value={formState.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId("name") : undefined}
        />
        {errors.name && (
          <p id={errorId("name")} role="alert" className="text-sm text-red-700 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-brand-900 mb-1">
          Email address <span className="text-red-700">*</span>
        </label>
        <input
          id="contact-email"
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

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-brand-900 mb-1">
          Message <span className="text-red-700">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          aria-required="true"
          className={fieldClass(!!errors.message)}
          value={formState.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errorId("message") : undefined}
        />
        {errors.message && (
          <p id={errorId("message")} role="alert" className="text-sm text-red-700 mt-1">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-brand-700 text-white font-semibold hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Send message
      </button>

      <p role="status" className="text-sm text-green-800">
        {submitted ? "Thanks for reaching out — we'll get back to you within one business day." : ""}
      </p>
    </form>
  );
}
