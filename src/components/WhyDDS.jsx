import Icon from './Icon.jsx'
import { WHY, CHAIN } from '../data/content.js'

export default function WhyDDS() {
  return (
    <section id="apropos" className="py-16 md:py-24 border-t border-line">
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div className="min-w-0">
            <p className="eyebrow">À propos</p>
            <h2 className="h2 mt-3">Pourquoi choisir DDS ?</h2>
            <p className="mt-4 text-muted max-w-md">
              DDS Tech &amp; Security réunit sous un même toit le développement logiciel et l'infrastructure physique.
              Vous n'avez qu'un seul numéro à appeler, de l'application jusqu'à la caméra.
            </p>
            <div className="mt-8 flex items-start gap-3 text-sm text-muted">
              <Icon name="pin" className="ic-sm mt-1 text-aqua" />
              <p>
                Basés à Dakar (Sénégal) et à Conakry et Labé (Guinée), nous intervenons dans toute la sous-région.
              </p>
            </div>
          </div>

          <div className="grid gap-4 min-w-0">
            {WHY.map((w) => (
              <div key={w.title} className="glass p-5 flex gap-4">
                <div className="icon-chip">
                  <Icon name={w.icon} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="text-muted mt-1">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass mt-10 p-6 md:p-8">
          <p className="font-mono text-xs tracking-[.16em] uppercase text-muted text-center">
            Une seule chaîne, de l'écran au terrain
          </p>
          <div className="chain mt-6">
            {CHAIN.map((c) => (
              <div className="chain-node" key={c.label}>
                <div className="icon-chip">
                  <Icon name={c.icon} />
                </div>
                <p className="label font-semibold mt-3 text-sm">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
