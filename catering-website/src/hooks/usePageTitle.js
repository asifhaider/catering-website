import { useEffect } from 'react'

const SITE_NAME = "Nana's Kitchen"

export function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME
    return () => {
      document.title = SITE_NAME
    }
  }, [pageTitle])
}
