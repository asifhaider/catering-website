import { type ReactNode, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(containerRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={containerRef}
        className={`relative w-full ${sizeClasses[size]} bg-cream rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90dvh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 flex-shrink-0">
          <h2 id={titleId} className="text-lg font-bold text-stone-900 font-display">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="flex items-center justify-center w-10 h-10 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
}
