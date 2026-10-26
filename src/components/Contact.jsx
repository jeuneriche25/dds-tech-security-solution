import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { SITE, SERVICE_OPTIONS, waLink } from '../data/content.js'

export default function Contact() {
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

  // Aucun serveur : on prépare un message WhatsApp, l'envoi se fait au clic du visiteur.
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
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-line"
      style={{ background: 'radial-gradient(60% 60% at 90% 100%, rgba(47,107,255,.18), transparent 70%), var(--bg)' }}
    >
      <div className="wrap">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2 min-w-0">
            <p className="eyebrow">Contact</p>
            <h2 className="h2 mt-3">Parlons de votre projet.</h2>
            <p className="mt-4 text-muted">
              Décrivez votre besoin. Nous revenons vers vous avec une proposition et un devis gratuit.
            </p>

            <a
              className="btn btn-wa mt-8 w-full sm:w-auto"
              href={waLink(`Bonjour ${SITE.name}, je souhaite un devis.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" className="ic-sm" /> Écrire sur WhatsApp
            </a>

            <div className="mt-6 glass p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted">WhatsApp</p>
                <p ref={numberRef} className="font-mono text-base sm:text-lg font-medium">
                  {SITE.whatsappDisplay}
                </p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={copyNumber}>
                {copyLabel}
              </button>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-muted list-none p-0">
              {['Dakar, Sénégal', 'Conakry et Labé, Guinée', 'Intervention dans toute la sous-région'].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <Icon name="pin" className="ic-sm mt-0.5 text-aqua" /> {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <form className="glass p-5 sm:p-7 grid gap-5" onSubmit={onSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="field">
                  <label htmlFor="f-nom">Nom complet</label>
                  <input id="f-nom" name="nom" type="text" autoComplete="name" placeholder="Votre nom" required />
                </div>
                <div className="field">
                  <label htmlFor="f-tel">Téléphone / WhatsApp</label>
                  <input id="f-tel" name="tel" type="tel" autoComplete="tel" placeholder="+221 …" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-service">Service souhaité</label>
                <select id="f-service" name="service">
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-message">Votre besoin</label>
                <textarea id="f-message" name="message" placeholder="Décrivez votre projet en quelques lignes" required />
              </div>

              {status === 'error' && (
                <p className="text-sm" style={{ color: '#ffb4b4' }} role="alert">
                  Merci de renseigner votre nom, votre numéro et votre besoin.
                </p>
              )}

              <button type="submit" className="btn btn-primary w-full sm:w-fit">
                Préparer ma demande <Icon name="arrow" className="ic-sm" />
              </button>

              {status === 'ready' && (
                <div
                  className="rounded-xl p-4 border"
                  style={{ borderColor: 'var(--line-strong)', background: 'rgba(34,211,238,.07)' }}
                  role="status"
                >
                  <p className="font-semibold flex items-center gap-2">
                    <Icon name="check" className="ic-sm text-aqua" /> Votre demande est prête.
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Elle n'est pas encore envoyée. Appuyez sur le bouton ci-dessous : votre message s'ouvre dans
                    WhatsApp, prêt à partir.
                  </p>
                  <a className="btn btn-wa btn-sm mt-3" href={sendHref} target="_blank" rel="noopener noreferrer">
                    <Icon name="chat" className="ic-sm" /> Envoyer sur WhatsApp
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
