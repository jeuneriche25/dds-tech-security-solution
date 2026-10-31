import StatusPill from '../../components/ui/StatusPill.jsx'
import { EmptyState, ExampleTag, LoadState, PageHead } from '../../components/ui/Bits.jsx'
import { dayOf, formatTime, monthOf, relativeDay } from '../../lib/format.js'
import { usePageTitle } from '../../lib/hooks.js'
import { useList } from '../../lib/useList.js'

export default function Interventions() {
  usePageTitle('Interventions')
  const { rows, loading, error } = useList('interventions')

  return (
    <>
      <PageHead title="Interventions">Le planning de vos visites, installations et maintenances.</PageHead>

      <LoadState loading={loading} error={error} />

      {!loading && !error &&
        (rows.length ? (
          <div className="rows">
            {rows.map((i) => (
              <article className="row" key={i.id}>
                <div className="date-block" aria-hidden="true">
                  <span className="date-block__day">{dayOf(i.scheduledAt)}</span>
                  <span className="date-block__month">{monthOf(i.scheduledAt)}</span>
                </div>
                <div className="row__main">
                  <p className="row__title">
                    {i.title}
                    {i.demo && <ExampleTag />}
                  </p>
                  <p className="row__meta">
                    {i.kind} · {i.site} · {formatTime(i.scheduledAt)} · {relativeDay(i.scheduledAt)}
                  </p>
                </div>
                <div className="row__side">
                  <StatusPill kind="intervention" status={i.status} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon="calendar" title="Aucune intervention">
            Votre équipe DDS ajoutera ici chaque visite planifiée.
          </EmptyState>
        ))}
    </>
  )
}
