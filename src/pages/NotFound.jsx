import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import { usePageTitle } from '../lib/hooks.js'

export default function NotFound() {
  usePageTitle('Page introuvable')
  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="h2">Cette page n'existe pas.</h1>
        <p className="section__lead">Le lien est peut-être incorrect, ou la page a été déplacée.</p>
        <Link to="/" className="btn btn--primary">
          <Icon name="home" size="sm" /> Retour à l'accueil
        </Link>
      </div>
    </section>
  )
}
