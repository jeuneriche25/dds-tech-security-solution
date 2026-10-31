const STATUSES = {
  quote: {
    nouveau: { label: 'Nouvelle', tone: 'info' },
    en_etude: { label: 'En étude', tone: 'warn' },
    envoye: { label: 'Devis envoyé', tone: 'aqua' },
    accepte: { label: 'Accepté', tone: 'ok' },
    refuse: { label: 'Refusé', tone: 'bad' },
  },
  intervention: {
    planifiee: { label: 'Planifiée', tone: 'info' },
    en_cours: { label: 'En cours', tone: 'warn' },
    terminee: { label: 'Terminée', tone: 'ok' },
    annulee: { label: 'Annulée', tone: 'bad' },
  },
}

// L'état est dit par un mot et un point de couleur, jamais par la couleur seule.
export default function StatusPill({ kind, status }) {
  const entry = STATUSES[kind]?.[status] || { label: status, tone: 'info' }
  return (
    <span className={`pill pill--${entry.tone}`}>
      <i className="pill__dot" aria-hidden="true" />
      {entry.label}
    </span>
  )
}
