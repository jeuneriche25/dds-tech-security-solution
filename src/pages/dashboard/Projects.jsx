import { EmptyState, ExampleTag, LoadState, PageHead, ProgressBar } from '../../components/ui/Bits.jsx'
import { formatShort, relativeDay } from '../../lib/format.js'
import { usePageTitle } from '../../lib/hooks.js'
import { useList } from '../../lib/useList.js'

export default function Projects() {
  usePageTitle('Projets')
  const { rows, loading, error } = useList('projects')

  return (
    <>
      <PageHead title="Projets">L'avancement de vos sites, applications et installations.</PageHead>

      <LoadState loading={loading} error={error} />

      {!loading && !error &&
        (rows.length ? (
          <div className="rows">
            {rows.map((p) => (
              <article className="card" key={p.id}>
                <div className="card__head">
                  <div style={{ minWidth: 0 }}>
                    <h2 className="card__title">
                      {p.name}
                      {p.demo && (
                        <>
                          {' '}
                          <ExampleTag />
                        </>
                      )}
                    </h2>
                    <p className="row__meta">
                      {p.kind} · Phase : {p.phase}
                    </p>
                  </div>
                  <span className="fine-print">Mis à jour {formatShort(p.updatedAt)}</span>
                </div>
                <div className="row__progress">
                  <div className="row__progress-head">
                    <span>Avancement</span>
                    <span>{p.progress}%</span>
                  </div>
                  <ProgressBar value={p.progress} label={`Avancement de ${p.name}`} />
                </div>
                <p className="fine-print">Dernière activité {relativeDay(p.updatedAt)}.</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon="folder" title="Aucun projet pour le moment">
            Vos sites et applications apparaîtront ici dès leur lancement.
          </EmptyState>
        ))}
    </>
  )
}
