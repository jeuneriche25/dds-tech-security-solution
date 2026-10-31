import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import { useAuth } from '../lib/auth.jsx'
import { usePageTitle } from '../lib/hooks.js'

const MIN_PASSWORD = 8
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const { user, loading, signUp, mode } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' })
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  usePageTitle('Inscription')

  if (!loading && user && !sent) return <Navigate to="/espace" replace />

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))
  const touch = (key) => () => setTouched((t) => ({ ...t, [key]: true }))

  const errors = {
    fullName: form.fullName.trim().length < 2 ? 'Indiquez votre nom complet.' : '',
    email: EMAIL_RE.test(form.email.trim()) ? '' : 'Adresse e-mail invalide.',
    password:
      form.password.length < MIN_PASSWORD ? `Au moins ${MIN_PASSWORD} caractères.` : '',
    confirm: form.confirm !== form.password ? 'Les mots de passe ne correspondent pas.' : '',
  }
  const invalid = Object.values(errors).some(Boolean)
  const show = (key) => (touched[key] || error ? errors[key] : '')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setTouched({ fullName: true, email: true, password: true, confirm: true })
    if (invalid) return
    setBusy(true)
    try {
      const result = await signUp({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
      if (result.needsConfirmation) {
        setSent(true)
      } else {
        navigate('/espace', { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <section className="auth">
        <div className="auth__card auth__card--solo">
          <p className="eyebrow">Presque terminé</p>
          <h1 className="auth__title">Vérifiez votre boîte e-mail.</h1>
          <p className="auth__sub">
            Nous avons envoyé un lien de confirmation à <strong>{form.email.trim()}</strong>. Cliquez dessus pour
            activer votre espace client.
          </p>
          <Link to="/connexion" className="btn btn--primary btn--block">
            Aller à la connexion
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="auth">
      <div className="auth__wrap">
        <div className="auth__intro">
          <p className="eyebrow">Espace client</p>
          <h1 className="h2">Créez votre espace client.</h1>
          <p className="auth__lead">
            Demandez un devis en quelques clics et suivez chaque étape de vos installations et projets.
          </p>
          <ul className="auth__perks">
            <li>
              <Icon name="check" size="sm" /> Gratuit, sans engagement
            </li>
            <li>
              <Icon name="check" size="sm" /> Vos données restent privées
            </li>
            <li>
              <Icon name="check" size="sm" /> Un interlocuteur DDS pour votre dossier
            </li>
          </ul>
        </div>

        <div className="auth__card">
          <div className="auth__head">
            <h2 className="auth__title">Inscription</h2>
            <p className="auth__sub">Quelques informations suffisent.</p>
          </div>

          {mode === 'demo' && (
            <div className="auth__notice" role="note">
              <p className="auth__notice-title">
                <Icon name="alert" size="sm" /> Mode démonstration
              </p>
              <p>Le compte est créé dans ce navigateur uniquement. Aucune donnée n'est envoyée à DDS.</p>
            </div>
          )}

          <form className="auth__form" onSubmit={onSubmit} noValidate>
            {error && (
              <p className="auth__alert" role="alert">
                <Icon name="alert" size="sm" /> {error}
              </p>
            )}

            <div className="field">
              <label className="field__label" htmlFor="su-name">
                Nom complet
              </label>
              <input
                id="su-name"
                name="fullName"
                className="field__control"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => set('fullName')(e.target.value)}
                onBlur={touch('fullName')}
                aria-invalid={show('fullName') ? 'true' : undefined}
                aria-describedby={show('fullName') ? 'su-name-error' : undefined}
              />
              {show('fullName') && (
                <p className="field__error" id="su-name-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="auth__row">
              <div className="field">
                <label className="field__label" htmlFor="su-email">
                  Adresse e-mail
                </label>
                <input
                  id="su-email"
                  name="email"
                  className="field__control"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                  onBlur={touch('email')}
                  aria-invalid={show('email') ? 'true' : undefined}
                  aria-describedby={show('email') ? 'su-email-error' : undefined}
                />
                {show('email') && (
                  <p className="field__error" id="su-email-error">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="su-phone">
                  Téléphone / WhatsApp <span className="field__hint">(facultatif)</span>
                </label>
                <input
                  id="su-phone"
                  name="phone"
                  className="field__control"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+221 …"
                  value={form.phone}
                  onChange={(e) => set('phone')(e.target.value)}
                />
              </div>
            </div>

            <div className="auth__row">
              <PasswordField
                id="su-password"
                label="Mot de passe"
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
                error={show('password')}
                hint={`${MIN_PASSWORD} caractères minimum.`}
              />
              <PasswordField
                id="su-confirm"
                label="Confirmer le mot de passe"
                value={form.confirm}
                onChange={set('confirm')}
                autoComplete="new-password"
                error={show('confirm')}
              />
            </div>

            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Création…
                </>
              ) : (
                'Créer mon espace client'
              )}
            </button>
          </form>

          <p className="auth__foot">
            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
