// Tout le contenu éditable du site est ici : modifiez ce fichier, pas les composants.

export const SITE = {
  name: 'DDS Tech & Security',
  legalName: 'Diallo Digital Solutions',
  slogan:
    "L'excellence technologique au service de votre sécurité et de votre croissance numérique.",
  whatsapp: '221787536191',
  whatsappDisplay: '+221 78 753 61 91',
  year: 2026,
}

export const waLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const NAV = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Expertises', href: '#expertises' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { label: 'Interventions réussies', value: '500+', gradient: true },
  { label: 'Support technique', value: 'Réactif' },
  { label: 'Hikvision · Dahua · Full-Stack', value: 'Certifié' },
]

export const CAMS = ['CAM 01 · ENTRÉE', 'CAM 02 · ACCUEIL', 'CAM 03 · ENTREPÔT', 'CAM 04 · PARKING']

export const SERVICES = [
  {
    icon: 'code',
    title: 'Développement Web & Mobile',
    text: 'SaaS, e-commerce et applications sur-mesure en React et Node. Des interfaces rapides et un code facile à faire évoluer.',
    tags: ['React', 'Node', 'SaaS', 'E-commerce'],
    span: 'lg:col-span-2',
  },
  {
    icon: 'shield',
    title: 'Vidéosurveillance & Sécurité',
    text: 'Caméras IP et PoE Hikvision et Dahua, enregistreurs NVR, consultation à distance depuis votre téléphone.',
    tags: ['Hikvision', 'Dahua', 'NVR', 'Accès distant'],
    span: 'lg:col-span-2',
  },
  {
    icon: 'wifi',
    title: 'Réseaux & WiFi Pro',
    text: 'Configuration de routeurs, pose de bornes WiFi et infrastructures réseau fiables pour bureaux, commerces et sites.',
    tags: ['Routeurs', 'Bornes WiFi', 'Câblage'],
    span: 'lg:col-span-2',
  },
  {
    icon: 'wrench',
    title: 'Maintenance Informatique & Matériel',
    text: 'Contrats préventifs et curatifs pour les entreprises : un parc informatique suivi et des pannes traitées rapidement.',
    tags: ['Préventif', 'Curatif', 'Contrats entreprises'],
    span: 'lg:col-span-3',
  },
  {
    icon: 'phone',
    title: 'Réparation de Smartphones & Électronique',
    text: "Diagnostic avancé, réparation de cartes mères et remplacement d'écrans pour vos appareils.",
    tags: ['Diagnostic', 'Cartes mères', 'Écrans'],
    span: 'md:col-span-2 lg:col-span-3',
  },
]

// Les deux premiers sont de vrais projets. Remplacez les deux suivants par vos réalisations.
export const PROJECTS = [
  {
    icon: 'nav',
    tone: 'wv-1',
    kind: 'Application mobile · Mobilité',
    title: 'SunuTraffic',
    text: 'Application de navigation avec trafic en temps réel pour les trajets quotidiens à Dakar.',
    tags: ['Mobile', 'Temps réel', 'Cartographie'],
  },
  {
    icon: 'star',
    tone: 'wv-2',
    kind: 'Site vitrine · Restauration',
    title: 'La Marmite Dorée',
    text: 'Site haut de gamme pour un restaurant-traiteur, conçu pour valoriser ses menus et ses prestations.',
    tags: ['Site web', 'Design premium', 'Traiteur'],
  },
  {
    icon: 'layers',
    tone: 'wv-3',
    kind: 'Application web · Logistique',
    title: 'Plateforme logistique',
    text: 'Suivi des flux, des livraisons et des équipes réunis dans une seule interface de gestion.',
    tags: ['React', 'Node', 'Tableau de bord'],
  },
  {
    icon: 'cam',
    tone: 'wv-4',
    kind: 'Installation · Sécurité',
    title: 'Vidéosurveillance multi-sites',
    text: "Déploiement de caméras IP, d'enregistreurs NVR et d'un réseau dédié, avec supervision à distance.",
    tags: ['Hikvision', 'Dahua', 'PoE'],
  },
]

export const WHY = [
  {
    icon: 'user',
    title: 'Un interlocuteur unique',
    text: 'Site web, réseau, caméras, maintenance : une seule équipe suit votre projet de bout en bout.',
  },
  {
    icon: 'bolt',
    title: "Rapidité d'intervention",
    text: 'Un support technique réactif, car une panne ou une caméra hors service ne peut pas attendre.',
  },
  {
    icon: 'badge',
    title: 'Expertise certifiée',
    text: 'Solutions certifiées Hikvision et Dahua, et développement Full-Stack maîtrisé.',
  },
]

export const CHAIN = [
  { icon: 'code', label: 'Application' },
  { icon: 'wifi', label: 'Réseau' },
  { icon: 'cam', label: 'Caméras' },
  { icon: 'wrench', label: 'Maintenance' },
]

export const SERVICE_OPTIONS = [
  'Développement web & mobile',
  'Vidéosurveillance & sécurité',
  'Réseaux & WiFi pro',
  'Maintenance informatique & matériel',
  'Réparation smartphone & électronique',
  'Autre demande',
]
