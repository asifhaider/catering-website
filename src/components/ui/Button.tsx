import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 disabled:bg-amber-300',
  secondary:
    'bg-stone-100 text-stone-800 hover:bg-stone-200 active:bg-stone-300 disabled:text-stone-400',
  ghost:
    'bg-transparent text-stone-700 hover:bg-stone-100 active:bg-stone-200 disabled:text-stone-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
  outline:
    'border border-amber-600 text-amber-700 bg-transparent hover:bg-amber-50 active:bg-amber-100 disabled:text-amber-300 disabled:border-amber-200',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600',
        'disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
