import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function Brand({ compact = false, onClick, className = '' }) {
  return (
    <Link to="/" className={`brand ${className}`.trim()} aria-label="DDS Tech & Security, accueil" onClick={onClick}>
      <span className="brand__mark">
        <Icon name="shield" size="sm" />
      </span>
      <span className="brand__text">
        <span className="brand__name">DDS</span>
        {!compact && <span className="brand__sub">Tech &amp; Security</span>}
      </span>
    </Link>
  )
}
