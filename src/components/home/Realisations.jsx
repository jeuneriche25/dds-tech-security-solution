import { useState } from 'react'
import Icon from '../ui/Icon.jsx'
import GlowCard from '../ui/GlowCard.jsx'
import Lightbox from './Lightbox.jsx'
import { PROJECTS } from '../../data/content.js'

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
    <section id="realisations" className="section section--projects">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Réalisations</p>
          <h2 className="h2">Des projets concrets, du code jusqu'au terrain.</h2>
          <p className="section__lead">
            Installations de vidéosurveillance, sites web et applications : touchez une photo pour voir le détail.
          </p>
        </header>

        <div className="projects">
          {PROJECTS.map((p) => {
            const hasMedia = p.images && p.images.length > 0
            const cover = hasMedia ? p.images[0] : null
            return (
              <GlowCard
                key={p.id}
                className={`project${p.wideMd ? ' project--wide-md' : ''}`}
                style={{ '--span': p.cols }}
              >
                {hasMedia ? (
                  <button
                    type="button"
                    className="project__cover"
                    onClick={() => setOpen({ id: p.id, index: 0 })}
                    aria-label={`Voir les photos : ${p.title}`}
                  >
                    <img src={cover.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: cover.pos }} />
                  </button>
                ) : (
                  <div className={`project__visual project__visual--${p.tone}`}>
                    <Icon name={p.icon} size="lg" />
                  </div>
                )}
                <div className="project__body">
                  <div className="project__top">
                    <p className="project__kind">{p.kind}</p>
                    {hasMedia && (
                      <button
                        type="button"
                        className="count-pill"
                        onClick={() => setOpen({ id: p.id, index: 0 })}
                        aria-label={`Ouvrir la galerie : ${p.title}`}
                      >
                        <Icon name="image" size="sm" /> {mediaLabel(p.images)}
                      </button>
                    )}
                  </div>
                  <h3 className="project__title">{p.title}</h3>
                  <p className="project__text">{p.text}</p>
                  <ul className="chips">
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
