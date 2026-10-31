import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Brand from '../ui/Brand.jsx'
import Drawer from '../ui/Drawer.jsx'
import Icon from '../ui/Icon.jsx'
import { NAV } from '../../data/content.js'
import { useAuth } from '../../lib/auth.jsx'
import { useScrollSpy } from '../../lib/hooks.js'

const SECTION_IDS = NAV.map((l) => l.href.slice(1))
const toHome = (hash) => ({ pathname: '/', hash })

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(SECTION_IDS, pathname === '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)
  const logout = async () => {
    await signOut()
    close()
    navigate('/', { replace: true })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__bar">
        <Brand />

        <nav className="navbar__links" aria-label="Navigation principale">
          {NAV.map((l) => {
            const id = l.href.slice(1)
            const isActive = active === id
            return (
              <Link
                key={id}
                to={toHome(l.href)}
                className={`navbar__link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <Link to="/espace" className="btn btn--ghost btn--sm navbar__account">
              <Icon name="dashboard" size="sm" /> Mon espace
            </Link>
          ) : (
            <Link to="/connexion" className="btn btn--ghost btn--sm navbar__account">
              Connexion
            </Link>
          )}
          <Link to={toHome('#contact')} className="btn btn--primary btn--sm">
            Devis gratuit
          </Link>
          <button
            type="button"
            className="btn btn--icon navbar__burger"
            aria-label="Ouvrir le menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size="sm" />
          </button>
        </div>
      </div>

      <Drawer open={open} onClose={close} side="right" label="Menu principal" title={<Brand compact onClick={close} />}>
        <nav className="drawer__nav" aria-label="Menu principal">
          {NAV.map((l) => (
            <Link key={l.href} to={toHome(l.href)} className="drawer__link" onClick={close}>
              {l.label}
              <Icon name="arrow" size="sm" />
            </Link>
          ))}
        </nav>
        <div className="drawer__actions">
          <Link to={toHome('#contact')} className="btn btn--primary btn--block" onClick={close}>
            Devis gratuit
          </Link>
          {user ? (
            <>
              <Link to="/espace" className="btn btn--ghost btn--block" onClick={close}>
                <Icon name="dashboard" size="sm" /> Mon espace
              </Link>
              <button type="button" className="btn btn--ghost btn--block" onClick={logout}>
                <Icon name="logout" size="sm" /> Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link to="/connexion" className="btn btn--ghost btn--block" onClick={close}>
                Connexion
              </Link>
              <Link to="/inscription" className="btn btn--ghost btn--block" onClick={close}>
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </header>
  )
}
