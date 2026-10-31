import { useEffect, useState } from 'react'

// Heure affichée dans le panneau de supervision, mise à jour chaque seconde.
export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('fr-FR', { hour12: false })
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | DDS Tech & Security`
      : 'DDS Tech & Security | Développement, vidéosurveillance et réseaux'
  }, [title])
}

// Repère la section visible pour souligner le lien actif de la navbar.
export function useScrollSpy(ids, enabled) {
  const [active, setActive] = useState('')
  const key = ids.join(',')
  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) {
      setActive('')
      return undefined
    }
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key, enabled])
  return active
}
