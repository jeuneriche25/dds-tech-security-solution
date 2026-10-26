import Icon from './Icon.jsx'
import { NAV, SITE, waLink } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-24" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="logo-mark">
                <Icon name="shield" className="ic-sm" />
              </span>
              <span className="font-display font-extrabold text-lg">
                DDS{' '}
                <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted font-normal">
                  Tech &amp; Security
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted max-w-sm">{SITE.slogan}</p>
            <p className="mt-3 text-xs text-muted">Dakar (Sénégal) · Conakry et Labé (Guinée)</p>
          </div>

          <nav aria-label="Liens rapides">
            <p className="font-mono text-xs tracking-[.16em] uppercase text-aqua">Liens rapides</p>
            <ul className="mt-4 grid gap-2 text-sm list-none p-0">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs tracking-[.16em] uppercase text-aqua">Contact</p>
            <ul className="mt-4 grid gap-2 text-sm list-none p-0">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp : {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="text-muted">Devis gratuit sur demande</li>
            </ul>
          </div>
        </div>

        <details className="mt-10 border-t border-line pt-6 text-sm text-muted" id="mentions">
          <summary className="inline-flex items-center gap-2 hover:text-fg">Mentions légales</summary>
          <div className="mt-4 max-w-2xl grid gap-2">
            <p>
              <strong className="text-fg font-semibold">Éditeur du site :</strong> {SITE.legalName}, exerçant sous la
              marque {SITE.name}, Dakar (Sénégal).
            </p>
            <p>
              <strong className="text-fg font-semibold">Contact :</strong> WhatsApp {SITE.whatsappDisplay}.
            </p>
            <p>
              Les informations présentées sur ce site sont données à titre indicatif et peuvent évoluer. Les marques
              Hikvision et Dahua appartiennent à leurs propriétaires respectifs.
            </p>
          </div>
        </details>

        <p className="mt-8 text-xs text-muted">
          © {SITE.year} {SITE.legalName} — {SITE.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
