import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import { useAuth } from '../lib/auth.jsx'
import { usePageTitle } from '../lib/hooks.js'

export default function Login() {
  const { user, loading, signIn, mode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/espace'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  usePageTitle('Connexion')

  if (!loading && user) return <Navigate to={from} replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Renseignez votre e-mail et votre mot de passe.')
      return
    }
    setBusy(true)
    try {
      await signIn({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth">
      <div className="auth__wrap">
        <div className="auth__intro">
          <p className="eyebrow">Espace client</p>
          <h1 className="h2">Bon retour parmi nous.</h1>
          <p className="auth__lead">
            Retrouvez vos devis, vos interventions et l'avancement de vos projets au même endroit.
          </p>
          <ul className="auth__perks">
            <li>
              <Icon name="check" size="sm" /> Suivi de vos demandes de devis
            </li>
            <li>
              <Icon name="check" size="sm" /> Planning de vos interventions
            </li>
            <li>
              <Icon name="check" size="sm" /> Avancement de vos sites et applications
            </li>
          </ul>
        </div>

        <div className="auth__card">
          <div className="auth__head">
            <h2 className="auth__title">Connexion</h2>
            <p className="auth__sub">Entrez l'e-mail et le mot de passe de votre compte.</p>
          </div>

          {mode === 'demo' && (
            <div className="auth__notice" role="note">
              <p className="auth__notice-title">
                <Icon name="alert" size="sm" /> Mode démonstration
              </p>
              <p>Les comptes sont enregistrés dans ce navigateur uniquement. Aucune donnée n'est envoyée à DDS.</p>
            </div>
          )}

          <form className="auth__form" onSubmit={onSubmit} noValidate>
            {error && (
              <p className="auth__alert" role="alert">
                <Icon name="alert" size="sm" /> {error}
              </p>
            )}

            <div className="field">
              <label className="field__label" htmlFor="login-email">
                Adresse e-mail
              </label>
              <input
                id="login-email"
                name="email"
                className="field__control"
                type="email"
                autoComplete="email"
                placeholder="vous@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? 'true' : undefined}
              />
            </div>

            <PasswordField
              id="login-password"
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              error={undefined}
            />

            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Connexion…
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <p className="auth__foot">
            Pas encore de compte ? <Link to="/inscription">Créer mon espace client</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
