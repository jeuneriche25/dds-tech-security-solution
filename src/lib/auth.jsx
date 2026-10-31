import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MODE, getBackend } from './backend/index.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    let unsubscribe = () => {}
    ;(async () => {
      try {
        const backend = await getBackend()
        const current = await backend.auth.getUser()
        if (!alive) return
        setUser(current)
        unsubscribe = backend.auth.onChange(async () => {
          const next = await backend.auth.getUser()
          if (alive) setUser(next)
        })
      } catch (err) {
        console.error(err)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (credentials) => {
    const backend = await getBackend()
    const next = await backend.auth.signIn(credentials)
    setUser(next)
    return next
  }, [])

  const signUp = useCallback(async (details) => {
    const backend = await getBackend()
    const result = await backend.auth.signUp(details)
    if (result.user) setUser(result.user)
    return result
  }, [])

  const signOut = useCallback(async () => {
    const backend = await getBackend()
    await backend.auth.signOut()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (patch) => {
    const backend = await getBackend()
    const next = await backend.auth.updateProfile(patch)
    setUser(next)
    return next
  }, [])

  const value = useMemo(
    () => ({ user, loading, mode: MODE, signIn, signUp, signOut, updateProfile }),
    [user, loading, signIn, signUp, signOut, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>.')
  return ctx
}
