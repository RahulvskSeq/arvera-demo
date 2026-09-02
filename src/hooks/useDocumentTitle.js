import { useEffect } from 'react'

const SUFFIX = 'ARVÉRA'

/** Sets a per-route document title and restores nothing — routes always set their own. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : `${SUFFIX} — Materials That Define Spaces`
  }, [title])
}
