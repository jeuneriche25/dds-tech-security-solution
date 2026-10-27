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

// Photos : déposez vos fichiers dans public/realisations/ puis listez-les dans "images".
// "pos" règle le cadrage de la vignette (x% y%). Le premier élément doit être une image.
const R = '/realisations/'

export const PROJECTS = [
  {
    id: 'marmite',
    kind: 'Site vitrine · Restauration',
    title: 'La Marmite Dorée',
    text: 'Site haut de gamme pour un restaurant-traiteur, conçu pour valoriser ses menus et ses prestations.',
    tags: ['Site web', 'Design premium', 'Traiteur'],
    span: 'lg:col-span-3',
    images: [
      { type: 'image', src: R + 'marmite-doree.webp', pos: '50% 50%', alt: 'Visuel des plats du restaurant-traiteur La Marmite Dorée' },
      { type: 'image', src: R + 'marmite-facade.webp', pos: '50% 25%', alt: 'Devanture du restaurant La Marmite Dorée' },
    ],
  },
  {
    id: 'boutique',
    kind: 'Installation · Sécurité',
    title: "Vidéosurveillance d'une boutique",
    text: "Caméras IP posées à l'extérieur et à l'intérieur, câbles protégés sous goulotte et affichage des caméras sur un écran de supervision.",
    tags: ['Caméras IP', 'Câblage', 'Supervision'],
    span: 'lg:col-span-3',
    images: [
      { type: 'image', src: R + 'boutique-camera-auvent.webp', pos: '50% 43%', alt: "Caméra IP fixée sous l'auvent de la boutique" },
      { type: 'image', src: R + 'boutique-facade.webp', pos: '50% 20%', alt: 'Façade de la boutique équipée' },
      { type: 'image', src: R + 'boutique-camera-dome.webp', pos: '50% 35%', alt: "Caméra dôme dans l'angle d'une pièce, câble sous goulotte" },
      { type: 'image', src: R + 'boutique-camera-angle.webp', pos: '50% 40%', alt: "Caméra extérieure fixée dans l'angle de l'auvent" },
      { type: 'image', src: R + 'boutique-supervision.webp', pos: '50% 30%', alt: 'Écran de supervision avec les caméras en direct' },
    ],
  },
  {
    id: 'magasin',
    kind: 'Installation · Sécurité',
    title: "Vidéosurveillance d'un magasin",
    text: "Caméras dôme au plafond et écran de supervision à quatre vues pour surveiller les rayons et l'entrée.",
    tags: ['Caméras dôme', '4 vues', 'Supervision'],
    span: 'lg:col-span-2',
    images: [
      { type: 'image', src: R + 'magasin-camera-dome.webp', pos: '50% 20%', alt: 'Caméra dôme fixée au plafond au-dessus des rayons' },
      { type: 'image', src: R + 'magasin-supervision.webp', pos: '50% 45%', alt: 'Écran de supervision affichant quatre caméras' },
      {
        type: 'video',
        src: R + 'magasin-presentation.mp4',
        poster: R + 'magasin-presentation.webp',
        alt: "Vidéo de l'installation et de l'écran de supervision",
      },
    ],
  },
  {
    id: 'sunutraffic',
    icon: 'nav',
    tone: 'wv-1',
    kind: 'Application mobile · Mobilité',
    title: 'SunuTraffic',
    text: 'Application de navigation avec trafic en temps réel pour les trajets quotidiens à Dakar.',
    tags: ['Mobile', 'Temps réel', 'Cartographie'],
    span: 'lg:col-span-2',
  },
  {
    id: 'affiche',
    kind: 'Communication · Identité',
    title: 'Affiche DDS Tech & Security',
    text: "Identité visuelle et affiche des services de développement web et mobile de DDS.",
    tags: ['Identité', 'Affiche', 'Web & mobile'],
    span: 'md:col-span-2 lg:col-span-2',
    images: [
      { type: 'image', src: R + 'dds-affiche.webp', pos: '50% 0%', alt: 'Affiche DDS Tech & Security : développement web et mobile' },
    ],
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
