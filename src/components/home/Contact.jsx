import { useRef, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import { SERVICE_OPTIONS, SITE, waLink } from '../../data/content.js'
import { useAuth } from '../../lib/auth.jsx'

const PLACES = ['Dakar, Sénégal', 'Conakry et Labé, Guinée', 'Intervention dans toute la sous-région']

export default function Contact() {
  const { user } = useAuth()
  const [status, setStatus] = useState('idle') // idle | error | ready
  const [sendHref, setSendHref] = useState(waLink())
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

  // Aucun serveur ici : on prépare un message WhatsApp, l'envoi se fait au clic du visiteur.
  const onSubmit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const nom = String(d.get('nom') || '').trim()
    const tel = String(d.get('tel') || '').trim()
    const message = String(d.get('message') || '').trim()
    if (!nom || !tel || !message) {
      setStatus('error')
      return
    }
    const texte = `Bonjour ${SITE.name},\n\nNom : ${nom}\nTéléphone : ${tel}\nService : ${d.get('service')}\n\n${message}`
    setSendHref(waLink(texte))
    setStatus('ready')
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
                required
              />
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
                required
              />
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
              required
            />
          </div>

          {status === 'error' && (
            <p className="form__error" role="alert">
              Merci de renseigner votre nom, votre numéro et votre besoin.
            </p>
          )}

          <button type="submit" className="btn btn--primary form__submit">
            Préparer ma demande <Icon name="arrow" size="sm" />
          </button>

          {status === 'ready' && (
            <div className="form__done" role="status">
              <p className="form__done-title">
                <Icon name="check" size="sm" /> Votre demande est prête.
              </p>
              <p className="form__done-text">
                Elle n'est pas encore envoyée. Appuyez sur le bouton ci-dessous : votre message s'ouvre dans WhatsApp,
                prêt à partir.
              </p>
              <a className="btn btn--wa btn--sm" href={sendHref} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" size="sm" /> Envoyer sur WhatsApp
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
