import Icon from '../ui/Icon.jsx'
import { CHAIN, WHY } from '../../data/content.js'

export default function WhyDDS() {
  return (
    <section id="apropos" className="section">
      <div className="container">
        <div className="why">
          <div className="why__intro">
            <p className="eyebrow">À propos</p>
            <h2 className="h2">Pourquoi choisir DDS ?</h2>
            <p className="section__lead">
              DDS Tech &amp; Security réunit sous un même toit le développement logiciel et l'infrastructure physique.
              Vous n'avez qu'un seul numéro à appeler, de l'application jusqu'à la caméra.
            </p>
            <p className="why__where">
              <Icon name="pin" size="sm" />
              <span>
                Basés à Dakar (Sénégal) et à Conakry et Labé (Guinée), nous intervenons dans toute la sous-région.
              </span>
            </p>
          </div>

          <div className="why__list">
            {WHY.map((w) => (
              <div key={w.title} className="why__item glass">
                <div className="icon-chip">
                  <Icon name={w.icon} />
                </div>
                <div>
                  <h3 className="why__title">{w.title}</h3>
                  <p className="why__text">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chain glass">
          <p className="chain__title">Une seule chaîne, de l'écran au terrain</p>
          <div className="chain__nodes">
            {CHAIN.map((c) => (
              <div className="chain__node" key={c.label}>
                <div className="icon-chip">
                  <Icon name={c.icon} />
                </div>
                <p className="chain__label">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
