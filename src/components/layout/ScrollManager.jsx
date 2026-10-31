import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Défile vers l'ancre demandée (/#contact) ou remonte en haut à chaque changement de page.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    const id = decodeURIComponent(hash.slice(1))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tries = 0
    let timer
    const go = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      } else if (tries++ < 20) {
        timer = setTimeout(go, 50)
      }
    }
    go()
    return () => clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
