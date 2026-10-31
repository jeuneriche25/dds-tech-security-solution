import Icon from '../ui/Icon.jsx'
import CamFeed from './CamFeed.jsx'
import { CAMS, STATS } from '../../data/content.js'
import { useClock } from '../../lib/hooks.js'

function SupervisionPanel() {
  const clock = useClock()
  return (
    <div className="panel" aria-hidden="true">
      <div className="panel__head">
        <span className="panel__live">
          <i className="dot dot--live" /> Supervision en ligne
        </span>
        <span className="panel__clock">{clock}</span>
      </div>
      <div className="cams">
        {CAMS.map((c) => (
          <CamFeed key={c.scene} scene={c.scene} label={c.label} />
        ))}
      </div>
      <ul className="panel__status">
        <li>
          <span>accès distant</span>
          <b>actif</b>
        </li>
        <li>
          <span>réseau</span>
          <b>stable</b>
        </li>
        <li>
          <span>application mobile</span>
          <b>connectée</b>
        </li>
      </ul>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="badge">🚀 Partenaire Tech &amp; Sécurité de référence — Sénégal &amp; Guinée</span>
          <h1 className="hero__title">
            Propulsez et sécurisez votre activité avec des <span className="grad-text">solutions sur-mesure.</span>
          </h1>
          <p className="hero__lead">
            Du développement d'applications web et mobile haute performance jusqu'à l'installation de systèmes de
            vidéosurveillance et de réseaux professionnels.
          </p>
          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary">
              Démarrer mon projet <Icon name="arrow" size="sm" />
            </a>
            <a href="#expertises" className="btn btn--ghost">
              Explorer nos expertises
            </a>
          </div>
          <dl className="stats">
            {STATS.map((s) => (
              <div className="stats__item" key={s.label}>
                <dt className="stats__label">{s.label}</dt>
                <dd className={`stats__value${s.gradient ? ' grad-text' : ''}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <SupervisionPanel />
      </div>
    </section>
  )
}
