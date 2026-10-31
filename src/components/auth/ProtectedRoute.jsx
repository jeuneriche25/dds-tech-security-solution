import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="splash" role="status">
        <span className="spinner" aria-hidden="true" /> Chargement…
      </div>
    )
  }
  if (!user) return <Navigate to="/connexion" replace state={{ from: location }} />
  return children
}
