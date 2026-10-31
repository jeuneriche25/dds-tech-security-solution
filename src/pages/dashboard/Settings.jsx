import { useState } from 'react'
import Icon from '../../components/ui/Icon.jsx'
import { PageHead } from '../../components/ui/Bits.jsx'
import { useAuth } from '../../lib/auth.jsx'
import { usePageTitle } from '../../lib/hooks.js'

export default function Settings() {
  usePageTitle('Paramètres')
  const { user, updateProfile, signOut } = useAuth()
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    company: user?.company || '',
  })
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')
    if (form.fullName.trim().length < 2) {
      setError('Indiquez votre nom complet.')
      return
    }
    setBusy(true)
    try {
      await updateProfile(form)
      setNotice('Vos informations ont été enregistrées.')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHead title="Paramètres">Vos informations de contact et de facturation.</PageHead>

      <form className="inline-form" onSubmit={onSubmit} noValidate aria-label="Informations du compte">
        {error && (
          <p className="auth__alert" role="alert">
            <Icon name="alert" size="sm" /> {error}
          </p>
        )}
        {notice && (
          <p className="notice notice--ok" role="status">
            {notice}
          </p>
        )}

        <div className="auth__row">
          <div className="field">
            <label className="field__label" htmlFor="s-name">
              Nom complet
            </label>
            <input id="s-name" className="field__control" value={form.fullName} onChange={set('fullName')} autoComplete="name" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="s-email">
              Adresse e-mail
            </label>
            <input id="s-email" className="field__control" value={user?.email || ''} disabled readOnly />
          </div>
        </div>

        <div className="auth__row">
          <div className="field">
            <label className="field__label" htmlFor="s-phone">
              Téléphone / WhatsApp
            </label>
            <input
              id="s-phone"
              className="field__control"
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              autoComplete="tel"
              placeholder="+221 …"
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="s-company">
              Entreprise <span className="fine-print">(facultatif)</span>
            </label>
            <input id="s-company" className="field__control" value={form.company} onChange={set('company')} autoComplete="organization" />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? (
              <>
                <span className="spinner" aria-hidden="true" /> Enregistrement…
              </>
            ) : (
              'Enregistrer'
            )}
          </button>
        </div>
      </form>

      <section className="card" aria-labelledby="session-title">
        <h2 className="card__title" id="session-title">
          Session
        </h2>
        <p className="fine-print">Déconnectez-vous si vous utilisez un ordinateur partagé.</p>
        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={signOut}>
            <Icon name="logout" size="sm" /> Se déconnecter
          </button>
        </div>
      </section>
    </>
  )
}
