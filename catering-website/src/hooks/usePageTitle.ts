import { useEffect } from "react";

export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | Homestead Catering Co.`;
  }, [title]);
}
