import { type ReactNode, useEffect } from 'react';

interface PageWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ title, children, className = '' }: PageWrapperProps) {
  useEffect(() => {
    document.title = `${title} — Nour's Kitchen`;
  }, [title]);

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </div>
  );
}
