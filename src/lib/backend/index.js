// Deux modes, choisis à la compilation :
// - "supabase" : vrais comptes et vraies données, si VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définis.
// - "demo"     : comptes et données stockés dans le navigateur du visiteur (aucun serveur).
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const MODE = url && key ? 'supabase' : 'demo'

let cached
export function getBackend() {
  if (!cached) {
    cached =
      MODE === 'supabase'
        ? import('./supabase.js').then((m) => m.default)
        : import('./local.js').then((m) => m.default)
  }
  return cached
}
