import Icon from './Icon.jsx'
import { SITE, waLink } from '../data/content.js'

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={waLink(`Bonjour ${SITE.name}, je souhaite un devis.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à DDS sur WhatsApp"
    >
      <Icon name="chat" className="ic" />
      <span>WhatsApp</span>
    </a>
  )
}
