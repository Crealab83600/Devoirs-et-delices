# 📖🍰 Devoirs & Délices — Frontend

Application React + Vite du projet **Devoirs & Délices** (« Apprendre avec plaisir, savourer avec gourmandise ! ») : plateforme de réservation de cours particuliers, espace de suivi scolaire et boutique de pâtisseries artisanales.

## Lancer le projet

```bash
cd frontend
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Structure

```
frontend/
├── index.html              Page racine (polices, métadonnées)
├── vite.config.js          Configuration Vite
└── src/
    ├── main.jsx            Point d'entrée React
    ├── App.jsx             Routage (react-router-dom)
    ├── context/
    │   └── AppContext.jsx  Store global (réservations, commandes, panier, stocks) persisté en localStorage
    ├── data/
    │   ├── matieres.js     Matières, types de séance, durées, objectifs, documents, services
    │   ├── tarifs.js       Grilles tarifaires Fréjus, forfaits, offres commerciales, lieux
    │   ├── gateaux.js      Carte des gourmandises + allergènes + règles sanitaires
    │   └── disponibilites.js  Génération du calendrier des créneaux
    ├── components/
    │   ├── Header.jsx      Navigation + connexion élève
    │   ├── Footer.jsx      Pied de page (dont sécurité alimentaire)
    │   ├── CakeCard.jsx    Carte produit de la boutique
    │   └── PanierFlottant.jsx  Panier + validation de commande
    ├── pages/
    │   ├── Accueil.jsx     Présentation du concept, matières, offres, gourmandises
    │   ├── Services.jsx    Soutien individuel, aide aux devoirs, préparation examens, lieux
    │   ├── Matieres.jsx    Liste des matières disponibles
    │   ├── Tarifs.jsx      Grille tarifaire (individuel, groupe, forfaits), offres, paiement
    │   ├── Reserver.jsx    Réservation (niveau, matière, type de séance, durée, créneau)
    │   ├── Gourmandises.jsx Carte des gourmandises + allergènes + règles sanitaires
    │   ├── MesCommandes.jsx Suivi des commandes
    │   ├── MonEspace.jsx   Profil, séances, objectifs, documents
    │   ├── APropos.jsx     Histoire, équipe et méthode
    │   └── Contact.jsx     Téléphone, e-mail, formulaire
    └── admin/
        └── Admin.jsx       Statistiques, élèves & séances, disponibilités, pâtisseries, commandes
```

## Fonctionnement

L'application est une démonstration complète côté client : les données (élève connecté, réservations, commandes, stocks) sont stockées dans le `localStorage` du navigateur et peuvent être réinitialisées depuis l'onglet **Statistiques** de l'Administration.

## Fonctionnement commercial (Fréjus, Var)

- **Tarifs** : individuel de 18 € (primaire, 1 h) à 50 € (lycée, 2 h) ; petit groupe de 10 € à 19 € par élève ; forfaits 5 et 10 séances.
- **Lieux** : à domicile, à la bibliothèque La Villa Marie de Fréjus.
- **Paiement** : sur place uniquement, par carte bancaire avec terminal de paiement. Aucune donnée bancaire ne transite par le site.

## Identité visuelle

- Rose poudré (`#f2b8c6`), crème (`#fff8f0`), marron chocolat (`#5d4037`)
- Typographies arrondies : Baloo 2 (titres) et Quicksand (texte)
- Ambiance chaleureuse, élégante et familiale ; logo : livre ouvert + gâteau

## Hébergement

Le site est déployé sur GitHub Pages (build à la racine du dépôt). La configuration pour deux hébergeurs alternatifs plus robustes est incluse :

- **Netlify** : `netlify.toml` à la racine — sur app.netlify.com, « Add new site → Import an existing project », choisir le dépôt GitHub : build et publication automatiques.
- **Vercel** : `vercel.json` à la racine — sur vercel.com, « Add New → Project », choisir le dépôt, définir « Root Directory » sur `frontend`.

Les deux offrent HTTPS, déploiement automatique à chaque commit sur `main` et un CDN plus rapide que GitHub Pages.

## Sécurité de l'Administration

La page `/admin` est protégée par un code d'accès (`frontend/src/admin/code.js`, à modifier). C'est un premier filtre pour les visiteurs : sur un site 100 % statique, ce code est présent dans le code source téléchargé par le navigateur. Une protection réelle (comptes, mots de passe chiffrés, sessions) nécessite un backend — indispensable également si un jour les paiements passent en ligne.

Les allergènes sont affichés sur chaque fiche produit et rappelés dans la boutique, le pied de page et le formulaire de contact. Avant une vente régulière, consultez les règles d'étiquetage alimentaire et de déclaration d'activité sur economie.gouv.fr, et faites valider les conditions de l'activité par un adulte responsable.
