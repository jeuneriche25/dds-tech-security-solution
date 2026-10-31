# DDS Tech & Security — site vitrine et espace client

Site vitrine de DDS Tech & Security, avec un espace client (devis, interventions, projets, paramètres), une connexion et une inscription.

Stack : React 18, Vite 5, React Router 6, Sass (SCSS modulaire), Supabase (optionnel).

## Démarrer

```bash
npm install
npm run dev       # développement
npm run build     # production, dans dist/
npm run preview   # tester le build
```

## Deux modes de fonctionnement

- **Mode démonstration (par défaut)** : sans configuration, les comptes et les données sont enregistrés dans le navigateur du visiteur. Des exemples de devis, d'interventions et de projets sont affichés et signalés « Exemple ».
- **Mode Supabase** : vrais comptes et vraies données. Pour l'activer :
  1. Créer un projet sur [supabase.com](https://supabase.com).
  2. Exécuter le fichier `supabase/schema.sql` dans l'éditeur SQL du projet (tables, règles d'accès et création automatique du profil).
  3. Copier `.env.example` en `.env.local` et renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
  4. Sur Netlify, ajouter les mêmes variables dans *Site configuration → Environment variables*, puis relancer un déploiement.

## Structure

```
src/
  components/
    ui/        composants réutilisables (Icon, Brand, Drawer, StatusPill…)
    layout/    navbar, pied de page, layout public, sidebar du tableau de bord
    auth/      garde de route, champ mot de passe
    home/      sections de la page d'accueil
  pages/       Home, Login, Signup, NotFound
  pages/dashboard/  Overview, Quotes, Interventions, Projects, Settings
  lib/         authentification, accès aux données (demo / supabase), hooks
  styles/      SCSS : abstracts (variables, mixins), base, layout, components, pages
  data/        contenu du site (services, réalisations, textes)
supabase/
  schema.sql   schéma de la base et règles d'accès (RLS)
```

## Styles

Les styles sont en SCSS, découpés par rôle. Les couleurs, polices et points de rupture sont définis dans `src/styles/abstracts/_variables.scss`. Les points de rupture utilisent les mixins `md-up` (768 px) et `lg-up` (1024 px).

## Déploiement Netlify

- Commande de build : `npm run build`
- Dossier publié : `dist`
- Les routes sont redirigées vers `index.html` grâce à `public/_redirects`.
