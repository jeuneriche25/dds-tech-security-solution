import Icon from './Icon.jsx'

export function ProgressBar({ value, label }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span className="progress__bar" style={{ width: `${v}%` }} />
    </div>
  )
}

export function EmptyState({ icon = 'file', title, children }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon name={icon} />
      </span>
      <p className="empty__title">{title}</p>
      {children && <div className="empty__text">{children}</div>}
    </div>
  )
}

export function PageHead({ title, children, actions }) {
  return (
    <div className="page-head">
      <div className="page-head__text">
        <h2 className="page-head__title">{title}</h2>
        {children && <p className="page-head__sub">{children}</p>}
      </div>
      {actions && <div className="page-head__actions">{actions}</div>}
    </div>
  )
}

export function ExampleTag() {
  return <span className="tag-example">Exemple</span>
}

export function LoadState({ loading, error }) {
  if (loading) {
    return (
      <p className="load-state" role="status">
        <span className="spinner" aria-hidden="true" /> Chargement…
      </p>
    )
  }
  if (error) {
    return (
      <p className="load-state load-state--error" role="alert">
        <Icon name="alert" size="sm" /> {error}
      </p>
    )
  }
  return null
}
