import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollManager from './components/layout/ScrollManager.jsx'
import PublicLayout from './components/layout/PublicLayout.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'
import Overview from './pages/dashboard/Overview.jsx'
import Quotes from './pages/dashboard/Quotes.jsx'
import Interventions from './pages/dashboard/Interventions.jsx'
import Projects from './pages/dashboard/Projects.jsx'
import Settings from './pages/dashboard/Settings.jsx'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />

        <Route
          path="/espace"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="devis" element={<Quotes />} />
          <Route path="interventions" element={<Interventions />} />
          <Route path="projets" element={<Projects />} />
          <Route path="parametres" element={<Settings />} />
          <Route path="*" element={<Navigate to="/espace" replace />} />
        </Route>
      </Routes>
    </>
  )
}
