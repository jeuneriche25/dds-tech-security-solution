// Mode Supabase : vrais comptes (e-mail + mot de passe) et données protégées par RLS.
// Le schéma à appliquer se trouve dans supabase/schema.sql.
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const MESSAGES = [
  [/already registered|already exists/i, 'Un compte existe déjà avec cet e-mail.'],
  [/invalid login credentials/i, 'E-mail ou mot de passe incorrect.'],
  [/email not confirmed/i, "Confirmez d'abord votre adresse e-mail grâce au lien reçu par courriel."],
  [/password should be at least/i, 'Le mot de passe est trop court.'],
  [/rate limit|too many/i, 'Trop de tentatives. Réessayez dans quelques minutes.'],
  [/network|fetch/i, 'Connexion impossible. Vérifiez votre réseau.'],
]

function friendly(err) {
  const text = err?.message || ''
  const hit = MESSAGES.find(([re]) => re.test(text))
  return new Error(hit ? hit[1] : 'Une erreur est survenue. Réessayez.')
}

async function loadUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return null
  const { user } = session
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, company')
    .eq('id', user.id)
    .maybeSingle()
  return {
    id: user.id,
    email: user.email,
    fullName: profile?.full_name ?? user.user_metadata?.full_name ?? '',
    phone: profile?.phone ?? user.user_metadata?.phone ?? '',
    company: profile?.company ?? '',
  }
}

const TABLES = {
  quotes: ['quote_requests', 'created_at'],
  interventions: ['interventions', 'scheduled_at'],
  projects: ['projects', 'updated_at'],
}

const normalize = {
  quotes: (r) => ({ id: r.id, service: r.service, message: r.message, status: r.status, createdAt: r.created_at }),
  interventions: (r) => ({
    id: r.id,
    title: r.title,
    kind: r.kind,
    site: r.site,
    scheduledAt: r.scheduled_at,
    status: r.status,
  }),
  projects: (r) => ({
    id: r.id,
    name: r.name,
    kind: r.kind,
    phase: r.phase,
    progress: r.progress,
    updatedAt: r.updated_at,
  }),
}

const auth = {
  getUser: loadUser,

  onChange(cb) {
    // Ne jamais attendre un appel Supabase dans ce rappel : on le repousse d'un cycle.
    const { data } = supabase.auth.onAuthStateChange(() => setTimeout(cb, 0))
    return () => data.subscription.unsubscribe()
  },

  async signUp({ email, password, fullName, phone }) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/connexion`,
      },
    })
    if (error) throw friendly(error)
    // Avec la confirmation par e-mail, un compte existant revient sans identité.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      throw new Error('Un compte existe déjà avec cet e-mail.')
    }
    if (!data.session) return { user: null, needsConfirmation: true }
    return { user: await loadUser(), needsConfirmation: false }
  },

  async signIn({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) throw friendly(error)
    return loadUser()
  },

  async signOut() {
    await supabase.auth.signOut()
  },

  async updateProfile(patch) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Session expirée. Reconnectez-vous.')
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: (patch.fullName ?? '').trim(),
      phone: (patch.phone ?? '').trim(),
      company: (patch.company ?? '').trim(),
    })
    if (error) throw friendly(error)
    return loadUser()
  },
}

const data = {
  async list(kind) {
    const [table, orderColumn] = TABLES[kind]
    const { data: rows, error } = await supabase.from(table).select('*').order(orderColumn, { ascending: false })
    if (error) throw friendly(error)
    return (rows || []).map(normalize[kind])
  },

  async createQuote({ service, message }) {
    const { data: row, error } = await supabase.from('quote_requests').insert({ service, message }).select().single()
    if (error) throw friendly(error)
    return normalize.quotes(row)
  },
}

export default { mode: 'supabase', auth, data }
