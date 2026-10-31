import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Brand from '../ui/Brand.jsx'
import Drawer from '../ui/Drawer.jsx'
import Icon from '../ui/Icon.jsx'
import { useAuth } from '../../lib/auth.jsx'
import { initials } from '../../lib/format.js'

const ITEMS = [
  { to: '/espace', label: "Vue d'ensemble", icon: 'dashboard', end: true },
  { to: '/espace/devis', label: 'Devis', icon: 'file' },
  { to: '/espace/interventions', label: 'Interventions', icon: 'calendar' },
  { to: '/espace/projets', label: 'Projets', icon: 'folder' },
  { to: '/espace/parametres', label: 'Paramètres', icon: 'settings' },
]

// Navigation du tableau de bord, utilisée à la fois dans la sidebar et dans le tiroir mobile.
function SidebarNav({ onNavigate }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    await signOut()
    onNavigate?.()
    navigate('/', { replace: true })
  }

  return (
    <>
      <nav className="side__nav" aria-label="Tableau de bord">
        <p className="side__section">Espace client</p>
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `side__link${isActive ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <Icon name={item.icon} size="sm" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="side__foot">
        <div className="side__user">
          <div className="avatar" aria-hidden="true">
            {initials(user?.fullName, user?.email)}
          </div>
          <div>
            <strong>{user?.fullName || user?.email}</strong>
            <span>{user?.company || user?.email}</span>
          </div>
        </div>
        <Link to="/" className="btn btn--ghost btn--sm btn--block" onClick={onNavigate}>
          <Icon name="home" size="sm" /> Retour au site
        </Link>
        <button type="button" className="btn btn--ghost btn--sm btn--block" onClick={logout}>
          <Icon name="logout" size="sm" /> Se déconnecter
        </button>
      </div>
    </>
  )
}

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="dash">
      <a className="skip-link" href="#dash-main">
        Aller au contenu
      </a>

      <aside className="side" aria-label="Menu du tableau de bord">
        <div className="side__brand">
          <Brand />
        </div>
        <SidebarNav />
      </aside>

      <header className="dash__topbar">
        <Brand compact />
        <button
          type="button"
          className="btn btn--icon"
          aria-label="Ouvrir le menu du tableau de bord"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" size="sm" />
        </button>
      </header>

      <Drawer
        open={open}
        onClose={close}
        side="left"
        label="Menu du tableau de bord"
        title={<Brand compact onClick={close} />}
      >
        <SidebarNav onNavigate={close} />
      </Drawer>

      <main id="dash-main" className="dash__main">
        <Outlet />
      </main>
    </div>
  )
}
