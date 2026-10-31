import { useCallback, useEffect, useState } from 'react'
import { getBackend } from './backend/index.js'
import { useAuth } from './auth.jsx'

// Charge une liste ('quotes', 'interventions' ou 'projects') pour l'utilisateur connecté.
export function useList(kind) {
  const { user } = useAuth()
  const [state, setState] = useState({ rows: [], loading: true, error: '' })
  const userId = user?.id

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: '' }))
    try {
      const backend = await getBackend()
      const rows = await backend.data.list(kind)
      setState({ rows, loading: false, error: '' })
    } catch (err) {
      setState({ rows: [], loading: false, error: err.message || 'Impossible de charger les données.' })
    }
  }, [kind, userId])

  useEffect(() => {
    load()
  }, [load])

  return { ...state, reload: load }
}
