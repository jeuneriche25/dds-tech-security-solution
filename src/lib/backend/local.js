// Mode démonstration : tout reste dans le navigateur (localStorage).
// Ce n'est PAS un vrai système de comptes : rien n'est envoyé à DDS et les mots de passe
// ne protègent que ce navigateur. Pour de vrais comptes, activer le mode Supabase.

const KEYS = {
  users: 'dds:demo:users',
  session: 'dds:demo:session',
  data: (id) => `dds:demo:data:${id}`,
}

const memory = new Map()
const store = {
  get(key) {
    try {
      const raw = localStorage.getItem(key)
      return raw == null ? null : JSON.parse(raw)
    } catch {
      return memory.has(key) ? memory.get(key) : null
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      memory.set(key, value)
    }
  },
  del(key) {
    try {
      localStorage.removeItem(key)
    } catch {
      memory.delete(key)
    }
  },
}

const listeners = new Set()
const notify = () =>
  listeners.forEach((cb) => {
    try {
      cb()
    } catch {
      /* un abonné défaillant ne doit pas bloquer les autres */
    }
  })

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('dds:demo:')) notify()
  })
}

const normEmail = (email) => String(email || '').trim().toLowerCase()
const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

async function hashPassword(password, salt) {
  const text = `${salt}:${password}`
  if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  return btoa(unescape(encodeURIComponent(text)))
}

const readUsers = () => store.get(KEYS.users) || []
const publicUser = (u) => ({
  id: u.id,
  email: u.email,
  fullName: u.fullName || '',
  phone: u.phone || '',
  company: u.company || '',
})

function currentUser() {
  const session = store.get(KEYS.session)
  if (!session) return null
  return readUsers().find((u) => u.id === session.userId) || null
}

// Lignes d'exemple, signalées "demo: true" dans l'interface.
function seed(userId) {
  const day = 86400000
  const at = (offsetDays, hour = 10) => {
    const d = new Date(Date.now() + offsetDays * day)
    d.setHours(hour, 0, 0, 0)
    return d.toISOString()
  }
  store.set(KEYS.data(userId), {
    quotes: [
      {
        id: newId(),
        service: 'Vidéosurveillance & sécurité',
        message: "Installation de 4 caméras IP pour une boutique, avec écran de supervision.",
        status: 'envoye',
        createdAt: at(-5, 9),
        demo: true,
      },
    ],
    interventions: [
      {
        id: newId(),
        title: 'Visite de maintenance préventive',
        kind: 'Maintenance',
        site: 'Siège de l’entreprise',
        scheduledAt: at(3, 10),
        status: 'planifiee',
        demo: true,
      },
      {
        id: newId(),
        title: 'Pose de 4 caméras IP',
        kind: 'Installation',
        site: 'Boutique principale',
        scheduledAt: at(-12, 9),
        status: 'terminee',
        demo: true,
      },
    ],
    projects: [
      {
        id: newId(),
        name: 'Site vitrine de votre entreprise',
        kind: 'Site web',
        phase: 'Maquette validée',
        progress: 60,
        updatedAt: at(-2, 15),
        demo: true,
      },
      {
        id: newId(),
        name: 'Application mobile de commande',
        kind: 'Application mobile',
        phase: 'Cadrage',
        progress: 20,
        updatedAt: at(-6, 11),
        demo: true,
      },
    ],
  })
}

const SORT_KEY = { quotes: 'createdAt', interventions: 'scheduledAt', projects: 'updatedAt' }

const auth = {
  async getUser() {
    const u = currentUser()
    return u ? publicUser(u) : null
  },

  onChange(cb) {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },

  async signUp({ email, password, fullName, phone }) {
    const mail = normEmail(email)
    if (readUsers().some((u) => u.email === mail)) {
      throw new Error('Un compte existe déjà avec cet e-mail.')
    }
    const salt = newId()
    const user = {
      id: newId(),
      email: mail,
      salt,
      hash: await hashPassword(password, salt),
      fullName: (fullName || '').trim(),
      phone: (phone || '').trim(),
      company: '',
    }
    store.set(KEYS.users, [...readUsers(), user])
    seed(user.id)
    store.set(KEYS.session, { userId: user.id })
    notify()
    return { user: publicUser(user), needsConfirmation: false }
  },

  async signIn({ email, password }) {
    const invalid = new Error('E-mail ou mot de passe incorrect.')
    const user = readUsers().find((u) => u.email === normEmail(email))
    if (!user) throw invalid
    if ((await hashPassword(password, user.salt)) !== user.hash) throw invalid
    store.set(KEYS.session, { userId: user.id })
    notify()
    return publicUser(user)
  },

  async signOut() {
    store.del(KEYS.session)
    notify()
  },

  async updateProfile(patch) {
    const user = currentUser()
    if (!user) throw new Error('Session expirée. Reconnectez-vous.')
    const next = {
      ...user,
      fullName: (patch.fullName ?? user.fullName).trim(),
      phone: (patch.phone ?? user.phone).trim(),
      company: (patch.company ?? user.company).trim(),
    }
    store.set(
      KEYS.users,
      readUsers().map((u) => (u.id === user.id ? next : u)),
    )
    notify()
    return publicUser(next)
  },
}

const data = {
  async list(kind) {
    const user = currentUser()
    if (!user) return []
    const all = store.get(KEYS.data(user.id)) || {}
    const key = SORT_KEY[kind]
    return [...(all[kind] || [])].sort((a, b) => new Date(b[key]) - new Date(a[key]))
  },

  async createQuote({ service, message }) {
    const user = currentUser()
    if (!user) throw new Error('Session expirée. Reconnectez-vous.')
    const all = store.get(KEYS.data(user.id)) || { quotes: [], interventions: [], projects: [] }
    const row = {
      id: newId(),
      service,
      message,
      status: 'nouveau',
      createdAt: new Date().toISOString(),
      demo: false,
    }
    store.set(KEYS.data(user.id), { ...all, quotes: [row, ...(all.quotes || [])] })
    return row
  },
}

export default { mode: 'demo', auth, data }
