import Icon from './Icon.jsx'
import { STATS, CAMS } from '../data/content.js'

function SupervisionPanel() {
  return (
    <div className="min-w-0" aria-hidden="true">
      <div className="glass p-4 sm:p-5" style={{ boxShadow: '0 30px 80px rgba(47,107,255,.22)' }}>
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[.12em] uppercase text-muted pb-4">
          <span className="flex items-center gap-2">
            <span className="live-dot" /> Supervision en ligne
          </span>
          <span>NVR · PoE</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CAMS.map((label) => (
            <div className="cam" key={label}>
              <span className="cam-icon">
                <Icon name="cam" className="" />
              </span>
              <span className="rec font-mono">
                <i />
                REC
              </span>
              <span className="cam-label font-mono">{label}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-xs text-muted mt-4 pt-4 border-t border-line grid gap-1.5">
          <div className="flex justify-between gap-4">
            <span>accès distant</span>
            <span className="text-aqua">actif</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>réseau</span>
            <span className="text-aqua">stable</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>application mobile</span>
            <span className="text-aqua">connectée</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="accueil" className="hero py-14 md:py-24">
      <div className="gridlines" />
      <div className="wrap relative">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-14 items-center">
          <div className="min-w-0">
            <span className="badge">🚀 Partenaire Tech &amp; Sécurité de référence — Sénégal &amp; Guinée</span>
            <h1 className="mt-6">
              Propulsez et sécurisez votre activité avec des <span className="grad-text">solutions sur-mesure.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-[34rem]">
              Du développement d'applications web et mobile haute performance jusqu'à l'installation de systèmes de
              vidéosurveillance et de réseaux professionnels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary">
                Démarrer mon projet <Icon name="arrow" className="ic-sm" />
              </a>
              <a href="#expertises" className="btn btn-ghost">
                Explorer nos expertises
              </a>
            </div>
            <dl className="mt-12 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="stat-label">{s.label}</dt>
                  <dd className={`stat-value w-fit ${s.gradient ? 'grad-text' : ''}`}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SupervisionPanel />
        </div>
      </div>
    </section>
  )
}
