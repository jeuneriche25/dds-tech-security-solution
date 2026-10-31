import { useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { useModal } from '../../lib/useModal.js'

function DrawerPanel({ onClose, side, label, title, children }) {
  const ref = useRef(null)
  useModal(ref, onClose)
  return (
    <div className={`drawer drawer--${side}`}>
      <div className="drawer__backdrop" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={label} ref={ref}>
        <div className="drawer__head">
          {title}
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Fermer le menu">
            <Icon name="close" size="sm" />
          </button>
        </div>
        <div className="drawer__body">{children}</div>
      </aside>
    </div>
  )
}

// Tiroir latéral : menu mobile du site et sidebar mobile du tableau de bord.
export default function Drawer({ open, ...props }) {
  if (!open) return null
  return createPortal(<DrawerPanel {...props} />, document.body)
}
