import { useState } from 'react'
import Icon from './Icon.jsx'
import GlowCard from './GlowCard.jsx'
import Lightbox from './Lightbox.jsx'
import { PROJECTS } from '../data/content.js'

function mediaLabel(images) {
  const videos = images.filter((i) => i.type === 'video').length
  const photos = images.length - videos
  const parts = []
  if (photos) parts.push(`${photos} photo${photos > 1 ? 's' : ''}`)
  if (videos) parts.push(`${videos} vidéo${videos > 1 ? 's' : ''}`)
  return parts.join(' · ')
}

export default function Realisations() {
  const [open, setOpen] = useState(null) // { id, index }
  const current = open ? PROJECTS.find((p) => p.id === open.id) : null

  return (
    <section
      id="realisations"
      className="py-16 md:py-24 border-t border-line"
      style={{ background: 'linear-gradient(180deg, var(--surface), var(--bg))' }}
    >
      <div className="wrap">
        <p className="eyebrow">Réalisations</p>
        <h2 className="h2 mt-3 max-w-2xl">Des projets concrets, du code jusqu'au terrain.</h2>
        <p className="mt-4 text-muted max-w-xl">
          Installations de vidéosurveillance, sites web et applications : touchez une photo pour voir le détail.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {PROJECTS.map((p) => {
            const hasMedia = p.images && p.images.length > 0
            const cover = hasMedia ? p.images[0] : null
            return (
              <GlowCard key={p.id} className={`p-4 ${p.span || ''}`}>
                {hasMedia ? (
                  <button
                    type="button"
                    className="work-cover"
                    onClick={() => setOpen({ id: p.id, index: 0 })}
                    aria-label={`Voir les photos : ${p.title}`}
                  >
                    <img src={cover.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: cover.pos }} />
                  </button>
                ) : (
                  <div className={`work-visual ${p.tone}`}>
                    <Icon name={p.icon} className="" />
                  </div>
                )}
                <div className="p-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-xs text-aqua tracking-wider uppercase">{p.kind}</p>
                    {hasMedia && (
                      <button
                        type="button"
                        className="work-count"
                        onClick={() => setOpen({ id: p.id, index: 0 })}
                        aria-label={`Ouvrir la galerie : ${p.title}`}
                      >
                        <Icon name="image" className="ic-sm" /> {mediaLabel(p.images)}
                      </button>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mt-2">{p.title}</h3>
                  <p className="text-muted mt-2">{p.text}</p>
                  <ul className="chips mt-4">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            )
          })}
        </div>
      </div>

      {current && (
        <Lightbox
          items={current.images}
          index={open.index}
          title={current.title}
          onClose={() => setOpen(null)}
          onIndex={(i) => setOpen({ id: current.id, index: i })}
        />
      )}
    </section>
  )
}
