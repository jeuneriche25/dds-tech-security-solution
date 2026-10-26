import Icon from './Icon.jsx'
import GlowCard from './GlowCard.jsx'
import { PROJECTS } from '../data/content.js'

export default function Realisations() {
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
          Quelques projets représentatifs de notre travail en applications, en plateformes web et en installations de
          sécurité.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <GlowCard key={p.title} className="p-4">
              <div className={`work-visual ${p.tone}`}>
                <Icon name={p.icon} className="" />
              </div>
              <div className="p-2 pt-5">
                <p className="font-mono text-xs text-aqua tracking-wider uppercase">{p.kind}</p>
                <h3 className="font-display text-xl font-semibold mt-2">{p.title}</h3>
                <p className="text-muted mt-2">{p.text}</p>
                <ul className="chips mt-4">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
