import Icon from '../ui/Icon.jsx'
import GlowCard from '../ui/GlowCard.jsx'
import { SERVICES } from '../../data/content.js'

export default function Expertises() {
  return (
    <section id="expertises" className="section">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Expertises</p>
          <h2 className="h2">Cinq pôles, un seul partenaire technique.</h2>
          <p className="section__lead">
            Du logiciel au matériel, nous prenons en charge toute la chaîne technologique de votre activité.
          </p>
        </header>

        <div className="services">
          {SERVICES.map((s) => (
            <GlowCard
              key={s.title}
              className={`service${s.wideMd ? ' service--wide-md' : ''}`}
              style={{ '--span': s.cols }}
            >
              <div className="icon-chip">
                <Icon name={s.icon} />
              </div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <ul className="chips">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
