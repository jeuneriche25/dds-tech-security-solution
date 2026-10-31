const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
const shortFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })
const monthFmt = new Intl.DateTimeFormat('fr-FR', { month: 'short' })
const timeFmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

export const formatDate = (v) => (v ? dateFmt.format(new Date(v)) : '—')
export const formatShort = (v) => (v ? shortFmt.format(new Date(v)) : '—')
export const formatTime = (v) => (v ? timeFmt.format(new Date(v)) : '')
export const dayOf = (v) => new Date(v).getDate()
export const monthOf = (v) => monthFmt.format(new Date(v)).replace('.', '')

export function firstName(name = '', email = '') {
  const first = name.trim().split(/\s+/)[0]
  return first || email.split('@')[0] || ''
}

export function initials(name = '', email = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length) return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
  return (email[0] || 'D').toUpperCase()
}

export function relativeDay(v) {
  if (!v) return ''
  const days = Math.round((new Date(v).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000)
  if (days === 0) return "aujourd'hui"
  if (days === 1) return 'demain'
  if (days === -1) return 'hier'
  if (days > 1) return `dans ${days} jours`
  return `il y a ${Math.abs(days)} jours`
}
