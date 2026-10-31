import { Link } from 'react-router-dom'
import Brand from '../ui/Brand.jsx'
import { NAV, SITE, waLink } from '../../data/content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Brand />
            <p className="footer__slogan">{SITE.slogan}</p>
            <p className="footer__where">Dakar (Sénégal) · Conakry et Labé (Guinée)</p>
          </div>

          <nav aria-label="Liens rapides">
            <p className="footer__title">Liens rapides</p>
            <ul className="footer__links">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link to={{ pathname: '/', hash: l.href }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Espace client">
            <p className="footer__title">Espace client</p>
            <ul className="footer__links">
              <li>
                <Link to="/connexion">Connexion</Link>
              </li>
              <li>
                <Link to="/inscription">Créer un compte</Link>
              </li>
              <li>
                <Link to="/espace">Mon espace</Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="footer__title">Contact</p>
            <ul className="footer__links">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp : {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="footer__muted">Devis gratuit sur demande</li>
            </ul>
          </div>
        </div>

        <details className="footer__legal">
          <summary>Mentions légales</summary>
          <div className="footer__legal-body">
            <p>
              <strong>Éditeur du site :</strong> {SITE.legalName}, exerçant sous la marque {SITE.name}, Dakar (Sénégal).
            </p>
            <p>
              <strong>Contact :</strong> WhatsApp {SITE.whatsappDisplay}.
            </p>
            <p>
              Les informations présentées sur ce site sont données à titre indicatif et peuvent évoluer. Les marques
              Hikvision et Dahua appartiennent à leurs propriétaires respectifs.
            </p>
          </div>
        </details>

        <p className="footer__copy">
          © {SITE.year} {SITE.legalName} — {SITE.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
