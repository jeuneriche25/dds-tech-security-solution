import { useState } from 'react'
import Icon from './Icon.jsx'
import { NAV } from '../data/content.js'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="flex items-center justify-between gap-3 h-16">
          <a href="#accueil" className="flex items-center gap-3 min-w-0" aria-label="DDS Tech & Security, accueil">
            <span className="logo-mark">
              <Icon name="shield" className="ic-sm" />
            </span>
            <span className="leading-tight">
              <span className="block font-display font-extrabold tracking-tight text-lg">DDS</span>
              <span className="hidden sm:block font-mono text-[10px] tracking-[.18em] uppercase text-muted">
                Tech &amp; Security
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {NAV.map((l) => (
              <a key={l.href} className="nav-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary btn-sm">
              Devis gratuit
            </a>
            <button
              type="button"
              className="md:hidden btn btn-ghost btn-sm !px-2.5"
              aria-expanded={open}
              aria-controls="mnav"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="menu" className="ic-sm" />
            </button>
          </div>
        </div>

        {open && (
          <nav id="mnav" className="md:hidden border-t border-line py-3 flex flex-col" aria-label="Navigation mobile">
            {NAV.map((l) => (
              <a key={l.href} className="nav-link py-3" href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
