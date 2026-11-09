import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { SERVICE_OPTIONS, SITE, waLink } from '../../data/content.js'
import { useAuth } from '../../lib/auth.jsx'
import { getBackend } from '../../lib/backend/index.js'

const PLACES = ['Dakar, Sénégal', 'Conakry et Labé, Guinée', 'Intervention dans toute la sous-région']

// Un numéro joignable compte au moins 8 chiffres, avec ou sans indicatif.
const isPhone = (v) => v.replace(/\D/g, '').length >= 8

// Attributs d'accessibilité d'un champ en erreur.
const errorProps = (errors, key, id) =>
  errors[key] ? { 'aria-invalid': 'true', 'aria-describedby': `${id}-err` } : {}

export default function Contact() {
  const { user } = useAuth()
  const [errors, setErrors] = useState({})
  const [prepared, setPrepared] = useState(null) // { href, saved, saveError } une fois la demande prête
  const [saving, setSaving] = useState(false)
  const [copyLabel, setCopyLabel] = useState('Copier')
  const numberRef = useRef(null)

  const flash = (label) => {
    setCopyLabel(label)
    setTimeout(() => setCopyLabel('Copier'), 1800)
  }

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(SITE.whatsappDisplay)
      flash('Copié')
    } catch {
      const range = document.createRange()
      range.selectNodeContents(numberRef.current)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      flash('Sélectionné')
    }
  }

  // Le message WhatsApp part toujours. Si le visiteur est connecté, la demande est aussi enregistrée dans son espace.
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const nom = String(d.get('nom') || '').trim()
    const tel = String(d.get('tel') || '').trim()
    const service = String(d.get('service') || SERVICE_OPTIONS[0])
    const message = String(d.get('message') || '').trim()

    const next = {}
    if (!nom) next.nom = 'Indiquez votre nom.'
    if (!isPhone(tel)) next.tel = 'Indiquez un numéro joignable (8 chiffres minimum).'
    if (message.length < 10) next.message = 'Décrivez votre besoin en quelques mots (10 caractères minimum).'
    setErrors(next)
    setPrepared(null)
    if (Object.keys(next).length) {
      // Le focus va sur le premier champ en erreur (les attributs d'erreur ne sont pas encore rendus ici).
      const first = ['nom', 'tel', 'message'].find((k) => next[k])
      form.querySelector(`#f-${first}`)?.focus()
      return
    }

    const texte = `Bonjour ${SITE.name},\n\nNom : ${nom}\nTéléphone : ${tel}\nService : ${service}\n\n${message}`
    const result = { href: waLink(texte), saved: false, saveError: '' }

    if (user) {
      setSaving(true)
      try {
        const backend = await getBackend()
        await backend.data.createQuote({ service, message })
        result.saved = true
      } catch (err) {
        result.saveError = err.message
      } finally {
        setSaving(false)
      }
    }
    setPrepared(result)
  }

  return (
    <section id="contact" className="section section--contact">
      <div className="container contact">
        <div className="contact__info">
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Parlons de votre projet.</h2>
          <p className="section__lead">
            Décrivez votre besoin. Nous revenons vers vous avec une proposition et un devis gratuit.
          </p>

          <a
            className="btn btn--wa contact__wa"
            href={waLink(`Bonjour ${SITE.name}, je souhaite un devis.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" size="sm" /> Écrire sur WhatsApp
          </a>

          <div className="contact-card glass">
            <div className="contact-card__text">
              <p className="contact-card__label">WhatsApp</p>
              <p ref={numberRef} className="contact-card__number">
                {SITE.whatsappDisplay}
              </p>
            </div>
            <button type="button" className="btn btn--ghost btn--sm" onClick={copyNumber}>
              {copyLabel}
            </button>
          </div>

          <ul className="contact__places">
            {PLACES.map((p) => (
              <li key={p}>
                <Icon name="pin" size="sm" /> {p}
              </li>
            ))}
          </ul>
        </div>

        <form className="form glass" onSubmit={onSubmit} noValidate key={user?.id || 'anon'}>
          <div className="form__row">
            <div className="field">
              <label className="field__label" htmlFor="f-nom">
                Nom complet
              </label>
              <input
                id="f-nom"
                name="nom"
                className="field__control"
                type="text"
                autoComplete="name"
                placeholder="Votre nom"
                defaultValue={user?.fullName || ''}
                {...errorProps(errors, 'nom', 'f-nom')}
              />
              {errors.nom && (
                <p className="field__error" id="f-nom-err">
                  {errors.nom}
                </p>
              )}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="f-tel">
                Téléphone / WhatsApp
              </label>
              <input
                id="f-tel"
                name="tel"
                className="field__control"
                type="tel"
                autoComplete="tel"
                placeholder="+221 …"
                defaultValue={user?.phone || ''}
                {...errorProps(errors, 'tel', 'f-tel')}
              />
              {errors.tel && (
                <p className="field__error" id="f-tel-err">
                  {errors.tel}
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="f-service">
              Service souhaité
            </label>
            <select id="f-service" name="service" className="field__control">
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="f-message">
              Votre besoin
            </label>
            <textarea
              id="f-message"
              name="message"
              className="field__control"
              placeholder="Décrivez votre projet en quelques lignes"
              {...errorProps(errors, 'message', 'f-message')}
            />
            {errors.message && (
              <p className="field__error" id="f-message-err">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn--primary form__submit" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Préparer ma demande'} <Icon name="arrow" size="sm" />
          </button>

          {prepared && (
            <div className="form__done" role="status">
              <p className="form__done-title">
                <Icon name="check" size="sm" /> Votre demande est prête.
              </p>
              {prepared.saved && (
                <p className="form__done-text">
                  Elle est aussi enregistrée dans votre <Link to="/espace/devis">espace client</Link>.
                </p>
              )}
              {prepared.saveError && (
                <p className="form__error" role="alert">
                  Enregistrement dans votre espace impossible ({prepared.saveError}). Vous pouvez tout de même envoyer
                  votre demande sur WhatsApp.
                </p>
              )}
              <p className="form__done-text">
                Elle n'est pas encore envoyée. Appuyez sur le bouton ci-dessous : votre message s'ouvre dans WhatsApp,
                prêt à partir.
              </p>
              <a className="btn btn--wa btn--sm" href={prepared.href} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" size="sm" /> Envoyer sur WhatsApp
              </a>
              {!user && (
                <p className="form__done-text">
                  Pour suivre vos demandes, <Link to="/connexion">connectez-vous</Link> ou{' '}
                  <Link to="/inscription">créez un compte</Link>.
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
