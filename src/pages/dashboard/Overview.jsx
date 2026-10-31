import { Link } from 'react-router-dom'
import Icon from '../../components/ui/Icon.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { EmptyState, ExampleTag, LoadState, ProgressBar } from '../../components/ui/Bits.jsx'
import { useAuth } from '../../lib/auth.jsx'
import { useList } from '../../lib/useList.js'
import { dayOf, firstName, formatShort, formatTime, monthOf, relativeDay } from '../../lib/format.js'
import { usePageTitle } from '../../lib/hooks.js'

export default function Overview() {
  usePageTitle("Vue d'ensemble")
  const { user } = useAuth()
  const quotes = useList('quotes')
  const interventions = useList('interventions')
  const projects = useList('projects')

  const loading = quotes.loading || interventions.loading || projects.loading
  const error = quotes.error || interventions.error || projects.error

  const openQuotes = quotes.rows.filter((q) => !['accepte', 'refuse'].includes(q.status))
  const newQuotes = quotes.rows.filter((q) => q.status === 'nouveau')
  const planned = interventions.rows
    .filter((i) => i.status === 'planifiee')
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
  const next = planned[0]
  const activeProjects = projects.rows.filter((p) => p.progress < 100)
  const average = activeProjects.length
    ? Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length)
    : 0

  return (
    <>
      <header className="hello">
        <h1 className="hello__title">Bonjour {firstName(user?.fullName, user?.email)}</h1>
        <p className="hello__sub">Voici l'état de vos demandes, interventions et projets.</p>
      </header>

      <LoadState loading={loading} error={error} />

      {!loading && !error && (
        <>
          <div className="kpis">
            <div className="kpi">
              <p className="kpi__label">Devis en cours</p>
              <p className="kpi__value">{openQuotes.length}</p>
              <p className="kpi__hint">
                {newQuotes.length ? `dont ${newQuotes.length} en attente de réponse` : 'Aucune demande en attente'}
              </p>
            </div>
            <div className="kpi">
              <p className="kpi__label">Interventions planifiées</p>
              <p className="kpi__value">{planned.length}</p>
              <p className="kpi__hint">
                {next ? `Prochaine ${relativeDay(next.scheduledAt)}` : 'Rien de prévu pour le moment'}
              </p>
            </div>
            <div className="kpi">
              <p className="kpi__label">Avancement moyen</p>
              <p className="kpi__value">{average}%</p>
              <p className="kpi__hint">
                {activeProjects.length
                  ? `sur ${activeProjects.length} projet${activeProjects.length > 1 ? 's' : ''} en cours`
                  : 'Aucun projet en cours'}
              </p>
            </div>
          </div>

          <div className="grid-2">
            <div className="stack">
              <section className="card" aria-labelledby="next-title">
                <div className="card__head">
                  <h2 className="card__title" id="next-title">
                    Prochaine intervention
                  </h2>
                  <Link className="card__link" to="/espace/interventions">
                    Tout voir
                  </Link>
                </div>
                {next ? (
                  <div className="row">
                    <div className="date-block" aria-hidden="true">
                      <span className="date-block__day">{dayOf(next.scheduledAt)}</span>
                      <span className="date-block__month">{monthOf(next.scheduledAt)}</span>
                    </div>
                    <div className="row__main">
                      <p className="row__title">
                        {next.title}
                        {next.demo && <ExampleTag />}
                      </p>
                      <p className="row__meta">
                        {next.site} · {formatTime(next.scheduledAt)}
                      </p>
                    </div>
                    <StatusPill kind="intervention" status={next.status} />
                  </div>
                ) : (
                  <EmptyState icon="calendar" title="Aucune intervention planifiée">
                    Votre équipe DDS vous contactera pour fixer la prochaine visite.
                  </EmptyState>
                )}
              </section>

              <section className="card" aria-labelledby="quotes-title">
                <div className="card__head">
                  <h2 className="card__title" id="quotes-title">
                    Derniers devis
                  </h2>
                  <Link className="card__link" to="/espace/devis">
                    Tout voir
                  </Link>
                </div>
                {quotes.rows.length ? (
                  <div className="rows">
                    {quotes.rows.slice(0, 3).map((q) => (
                      <div className="row" key={q.id}>
                        <div className="row__main">
                          <p className="row__title">
                            {q.service}
                            {q.demo && <ExampleTag />}
                          </p>
                          <p className="row__meta">Demandé le {formatShort(q.createdAt)}</p>
                        </div>
                        <StatusPill kind="quote" status={q.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon="file" title="Aucune demande de devis">
                    <Link to="/espace/devis">Demander un devis</Link>
                  </EmptyState>
                )}
              </section>
            </div>

            <section className="card" aria-labelledby="projects-title">
              <div className="card__head">
                <h2 className="card__title" id="projects-title">
                  Projets en cours
                </h2>
                <Link className="card__link" to="/espace/projets">
                  Tout voir
                </Link>
              </div>
              {activeProjects.length ? (
                <div className="rows">
                  {activeProjects.map((p) => (
                    <div className="row" key={p.id} style={{ display: 'grid' }}>
                      <div className="row__main">
                        <p className="row__title">
                          {p.name}
                          {p.demo && <ExampleTag />}
                        </p>
                        <p className="row__meta">
                          {p.kind} · {p.phase}
                        </p>
                      </div>
                      <div className="row__progress">
                        <div className="row__progress-head">
                          <span>Avancement</span>
                          <span>{p.progress}%</span>
                        </div>
                        <ProgressBar value={p.progress} label={`Avancement de ${p.name}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState icon="folder" title="Aucun projet en cours">
                  Vos sites et applications apparaîtront ici dès leur lancement.
                </EmptyState>
              )}
            </section>
          </div>

          <p className="dash-page-foot">
            <Icon name="lock" size="sm" /> Vos données ne sont visibles que depuis votre compte.
          </p>
        </>
      )}
    </>
  )
}
