import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../ui/Icon.jsx'
import { useModal } from '../../lib/useModal.js'

// Galerie plein écran : flèches du clavier, Échap, balayage tactile, vignettes.
export default function Lightbox({ items, index, title, onClose, onIndex }) {
  const dialogRef = useRef(null)
  const touchX = useRef(null)
  const count = items.length
  const item = items[index]

  useModal(dialogRef, onClose)

  const go = useCallback((d) => onIndex((index + d + count) % count), [index, count, onIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

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
      <div className="lb__top">
        <div className="lb__heading">
          <p className="lb__title">{title}</p>
          <p className="lb__count" aria-live="polite">
            {index + 1} / {count}
          </p>
        </div>
        <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Fermer la galerie">
          <Icon name="close" size="sm" />
        </button>
      </div>

      <div
        className="lb__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {count > 1 && (
          <button type="button" className="btn btn--icon lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Photo précédente">
            <Icon name="prev" size="sm" />
          </button>
        )}

        {item.type === 'video' ? (
          <video
            key={item.src}
            className="lb__media"
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={item.alt}
          />
        ) : (
          <img key={item.src} className="lb__media" src={item.src} alt={item.alt} decoding="async" />
        )}

        {count > 1 && (
          <button type="button" className="btn btn--icon lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Photo suivante">
            <Icon name="next" size="sm" />
          </button>
        )}
      </div>

      <p className="lb__caption">{item.alt}</p>

      {count > 1 && (
        <div className="lb__thumbs" role="group" aria-label="Choisir une photo">
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              className="lb__thumb"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`${it.type === 'video' ? 'Vidéo' : 'Photo'} ${i + 1}`}
              onClick={() => onIndex(i)}
            >
              <img src={it.type === 'video' ? it.poster : it.src} alt="" loading="lazy" decoding="async" />
              {it.type === 'video' && (
                <span className="lb__play">
                  <Icon name="play" size="sm" />
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
