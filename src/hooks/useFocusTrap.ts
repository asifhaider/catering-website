import { type RefObject, useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean
): void {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableEls = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE)
    );
    if (focusableEls.length > 0) {
      focusableEls[0].focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        container!.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isActive, containerRef]);
}
