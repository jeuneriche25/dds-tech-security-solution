import Icon from './Icon.jsx'
import GlowCard from './GlowCard.jsx'
import { SERVICES } from '../data/content.js'

export default function Expertises() {
  return (
    <section id="expertises" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Expertises</p>
        <h2 className="h2 mt-3 max-w-2xl">Cinq pôles, un seul partenaire technique.</h2>
        <p className="mt-4 text-muted max-w-xl">
          Du logiciel au matériel, nous prenons en charge toute la chaîne technologique de votre activité.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {SERVICES.map((s) => (
            <GlowCard key={s.title} className={`p-6 ${s.span}`}>
              <div className="icon-chip">
                <Icon name={s.icon} />
              </div>
              <h3 className="font-display text-xl font-semibold mt-5">{s.title}</h3>
              <p className="text-muted mt-2">{s.text}</p>
              <ul className="chips mt-5">
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
