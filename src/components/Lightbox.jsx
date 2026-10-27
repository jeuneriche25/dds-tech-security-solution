import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'

// Galerie plein écran : flèches du clavier, Échap, balayage tactile, vignettes.
export default function Lightbox({ items, index, title, onClose, onIndex }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const count = items.length
  const item = items[index]

  const go = useCallback((d) => onIndex((index + d + count) % count), [index, count, onIndex])

  // Bloque le défilement de la page et rend le focus à la fermeture.
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        go(1)
      } else if (e.key === 'ArrowLeft') {
        go(-1)
      } else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('button, video[controls]')
        if (!nodes || !nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={`Photos : ${title}`} ref={dialogRef}>
      <div className="lb-top">
        <div className="min-w-0">
          <p className="font-display font-semibold truncate">{title}</p>
          <p className="font-mono text-xs text-muted" aria-live="polite">
            {index + 1} / {count}
          </p>
        </div>
        <button ref={closeRef} type="button" className="lb-btn" onClick={onClose} aria-label="Fermer la galerie">
          <Icon name="close" className="ic-sm" />
        </button>
      </div>

      <div
        className="lb-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {count > 1 && (
          <button type="button" className="lb-btn lb-nav lb-prev" onClick={() => go(-1)} aria-label="Photo précédente">
            <Icon name="prev" className="ic-sm" />
          </button>
        )}

        {item.type === 'video' ? (
          <video
            key={item.src}
            className="lb-media"
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={item.alt}
          />
        ) : (
          <img key={item.src} className="lb-media" src={item.src} alt={item.alt} decoding="async" />
        )}

        {count > 1 && (
          <button type="button" className="lb-btn lb-nav lb-next" onClick={() => go(1)} aria-label="Photo suivante">
            <Icon name="next" className="ic-sm" />
          </button>
        )}
      </div>

      <p className="lb-cap">{item.alt}</p>

      {count > 1 && (
        <div className="lb-thumbs" role="group" aria-label="Choisir une photo">
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              className="lb-thumb"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`${it.type === 'video' ? 'Vidéo' : 'Photo'} ${i + 1}`}
              onClick={() => onIndex(i)}
            >
              <img src={it.type === 'video' ? it.poster : it.src} alt="" loading="lazy" decoding="async" />
              {it.type === 'video' && (
                <span className="lb-play">
                  <Icon name="play" className="ic-sm" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}
