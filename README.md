# DDS Tech & Security — site vitrine

Site vitrine one-page en React, Vite et Tailwind CSS (mode sombre, verre dépoli, accents bleu électrique et cyan).

## Démarrage

```bash
npm install
npm run dev       # développement sur http://localhost:5173
npm run build     # génère le dossier dist/ à publier
npm run preview   # prévisualise le build
```

## Structure

```
index.html              Titre, meta SEO, polices
tailwind.config.js      Couleurs et polices (liées aux variables CSS)
src/
  main.jsx              Point d'entrée
  App.jsx               Assemble les sections
  index.css             Variables de design (:root) et styles des composants
  data/content.js       Tout le texte et les données : numéro WhatsApp, services, projets…
  components/
    Header.jsx          Navigation sticky + menu mobile + bouton « Devis gratuit »
    Hero.jsx            Badge, titre, CTA, indicateurs, panneau de supervision
    Expertises.jsx      Grille des 5 pôles (cartes à halo au survol)
    Realisations.jsx    Portfolio
    WhyDDS.jsx          « Pourquoi choisir DDS ? » + chaîne de valeur
    Contact.jsx         Formulaire, WhatsApp, coordonnées
    Footer.jsx          Identité, liens, mentions légales, copyright
    WhatsAppFloat.jsx   Bouton WhatsApp flottant
    GlowCard.jsx        Carte vitrée réutilisable
    Icon.jsx            Icônes SVG intégrées
```

## À personnaliser avant la mise en ligne

1. **Réalisations** (`src/data/content.js`, `PROJECTS`) : chaque projet a une galerie plein écran (flèches, clavier, balayage tactile, vidéo). Pour ajouter des photos, déposez-les en `.webp` ou `.jpg` dans `public/realisations/` (idéalement 1200 px de large, moins de 300 Ko), puis ajoutez une ligne `{ type: 'image', src: R + 'nom.webp', alt: 'Description' }` dans `images` du projet. Pour un nouveau projet, copiez un bloc existant. Les légendes sont à relire et à corriger si besoin.
2. **Chiffres et certifications** (`STATS`, `WHY`) : vérifiez que « 500+ interventions » et « certifié Hikvision/Dahua » sont justifiables.
3. **Mentions légales** (`Footer.jsx`) : ajoutez vos informations d'immatriculation (NINEA, RCCM, etc.).
4. **Formulaire** (`Contact.jsx`) : il prépare un message WhatsApp, rien n'est envoyé automatiquement. Pour recevoir les demandes par e-mail ou en base de données, branchez un service (Formspree, Supabase, fonction serverless…) dans `onSubmit`.
5. **Panneau du hero** : remplaçable par une vraie photo d'installation.

## Déploiement

Le dossier `dist/` est statique : Netlify, Vercel, Cloudflare Pages ou n'importe quel hébergement web conviennent.
