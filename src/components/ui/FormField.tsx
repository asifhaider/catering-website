import { type ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ id, label, error, hint, required, children }: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-stone-800">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-600 ml-1">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-stone-500">
          {hint}
        </p>
      )}
      <div
        className={[
          '[&>input]:w-full [&>select]:w-full [&>textarea]:w-full',
          '[&>input]:px-3 [&>input]:py-2 [&>input]:rounded-lg [&>input]:border [&>input]:text-stone-900 [&>input]:text-sm [&>input]:min-h-[44px]',
          '[&>select]:px-3 [&>select]:py-2 [&>select]:rounded-lg [&>select]:border [&>select]:text-stone-900 [&>select]:text-sm [&>select]:min-h-[44px]',
          '[&>textarea]:px-3 [&>textarea]:py-2 [&>textarea]:rounded-lg [&>textarea]:border [&>textarea]:text-stone-900 [&>textarea]:text-sm',
          error
            ? '[&>input]:border-red-500 [&>select]:border-red-500 [&>textarea]:border-red-500'
            : '[&>input]:border-stone-300 [&>select]:border-stone-300 [&>textarea]:border-stone-300',
          '[&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:focus:ring-amber-500 [&>input]:focus:border-amber-500',
          '[&>select]:focus:outline-none [&>select]:focus:ring-2 [&>select]:focus:ring-amber-500 [&>select]:focus:border-amber-500',
          '[&>textarea]:focus:outline-none [&>textarea]:focus:ring-2 [&>textarea]:focus:ring-amber-500 [&>textarea]:focus:border-amber-500',
        ].join(' ')}
      >
        {children}
      </div>
      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
