import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { useAuth } from '../../lib/auth.jsx'

export default function ClientSpace() {
  const { user } = useAuth()
  return (
    <section className="section section--tight" aria-labelledby="client-space-title">
      <div className="container">
        <div className="cta-band glass">
          <div className="cta-band__text">
            <p className="eyebrow">Espace client</p>
            <h2 className="h2 h2--sm" id="client-space-title">
              Suivez vos devis, interventions et projets en ligne.
            </h2>
            <p className="section__lead">
              Créez votre compte pour demander un devis, suivre l'avancement de vos installations et retrouver votre
              historique.
            </p>
          </div>
          <div className="cta-band__actions">
            {user ? (
              <Link to="/espace" className="btn btn--primary">
                <Icon name="dashboard" size="sm" /> Accéder à mon espace
              </Link>
            ) : (
              <>
                <Link to="/inscription" className="btn btn--primary">
                  Créer mon espace client
                </Link>
                <Link to="/connexion" className="btn btn--ghost">
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
