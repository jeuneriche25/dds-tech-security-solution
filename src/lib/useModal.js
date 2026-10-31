import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])'

// Comportement commun aux fenêtres modales : défilement bloqué, focus piégé,
// Échap pour fermer, focus rendu à l'élément d'origine.
export function useModal(ref, onClose) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector(FOCUSABLE)?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [ref])
}
