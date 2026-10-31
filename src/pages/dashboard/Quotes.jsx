import { useState } from 'react'
import Icon from '../../components/ui/Icon.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { EmptyState, ExampleTag, LoadState, PageHead } from '../../components/ui/Bits.jsx'
import { SERVICE_OPTIONS } from '../../data/content.js'
import { getBackend } from '../../lib/backend/index.js'
import { formatDate } from '../../lib/format.js'
import { usePageTitle } from '../../lib/hooks.js'
import { useList } from '../../lib/useList.js'

export default function Quotes() {
  usePageTitle('Devis')
  const quotes = useList('quotes')
  const [open, setOpen] = useState(false)
  const [service, setService] = useState(SERVICE_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')
    if (message.trim().length < 10) {
      setError('Décrivez votre besoin en quelques mots (10 caractères minimum).')
      return
    }
    setBusy(true)
    try {
      const backend = await getBackend()
      await backend.data.createQuote({ service, message: message.trim() })
      setMessage('')
      setOpen(false)
      setNotice('Votre demande a bien été enregistrée. Nous revenons vers vous rapidement.')
      await quotes.reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHead
        title="Devis"
        actions={
          <button
            type="button"
            className="btn btn--primary btn--sm"
            aria-expanded={open}
            onClick={() => {
              setOpen((v) => !v)
              setError('')
            }}
          >
            <Icon name="plus" size="sm" /> Nouvelle demande
          </button>
        }
      >
        Vos demandes de devis et leur avancement.
      </PageHead>

      {notice && (
        <p className="notice notice--ok" role="status" style={{ marginBottom: '1.25rem' }}>
          {notice}
        </p>
      )}

      {open && (
        <form className="inline-form" onSubmit={submit} noValidate aria-label="Nouvelle demande de devis">
          {error && (
            <p className="auth__alert" role="alert">
              <Icon name="alert" size="sm" /> {error}
            </p>
          )}
          <div className="field">
            <label className="field__label" htmlFor="q-service">
              Service souhaité
            </label>
            <select
              id="q-service"
              name="service"
              className="field__control"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="q-message">
              Votre besoin
            </label>
            <textarea
              id="q-message"
              name="message"
              className="field__control"
              placeholder="Lieu, nombre d'équipements, délai souhaité…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--primary" disabled={busy}>
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Envoi…
                </>
              ) : (
                'Envoyer la demande'
              )}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <LoadState loading={quotes.loading} error={quotes.error} />

      {!quotes.loading && !quotes.error && (
        quotes.rows.length ? (
          <div className="rows">
            {quotes.rows.map((q) => (
              <article className="row" key={q.id}>
                <div className="row__main">
                  <p className="row__title">
                    {q.service}
                    {q.demo && <ExampleTag />}
                  </p>
                  <p className="row__meta">Demandé le {formatDate(q.createdAt)}</p>
                  {q.message && <p className="row__text">{q.message}</p>}
                </div>
                <div className="row__side">
                  <StatusPill kind="quote" status={q.status} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon="file" title="Aucune demande pour le moment">
            Décrivez votre besoin : nous revenons vers vous avec une proposition et un devis gratuit.
          </EmptyState>
        )
      )}
    </>
  )
}
