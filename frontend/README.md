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
    │   ├── matieres.js     Matières, tarifs, durées, objectifs, documents
    │   ├── gateaux.js      Catalogue des pâtisseries + allergènes
    │   └── disponibilites.js  Génération du calendrier des créneaux
    ├── components/
    │   ├── Header.jsx      Navigation + connexion élève
    │   ├── Footer.jsx      Pied de page (dont sécurité alimentaire)
    │   ├── CakeCard.jsx    Carte produit de la boutique
    │   └── PanierFlottant.jsx  Panier + validation de commande
    ├── pages/
    │   ├── Accueil.jsx     Présentation du concept
    │   ├── Cours.jsx       Matières et tarifs
    │   ├── Reserver.jsx    Calendrier et demande de réservation
    │   ├── Boutique.jsx    Catalogue des gâteaux + allergènes
    │   ├── MesCommandes.jsx Suivi des commandes
    │   ├── MonEspace.jsx   Profil, séances, objectifs, documents
    │   └── Contact.jsx     Formulaire de contact
    └── admin/
        └── Admin.jsx       Statistiques, élèves & séances, disponibilités, pâtisseries, commandes
```

## Fonctionnement

L'application est une démonstration complète côté client : les données (élève connecté, réservations, commandes, stocks) sont stockées dans le `localStorage` du navigateur et peuvent être réinitialisées depuis l'onglet **Statistiques** de l'Administration.

## Identité visuelle

- Rose poudré (`#f2b8c6`), crème (`#fff8f0`), marron chocolat (`#5d4037`)
- Typographies arrondies : Baloo 2 (titres) et Quicksand (texte)
- Ambiance chaleureuse, élégante et familiale ; logo : livre ouvert + gâteau

## Sécurité alimentaire

Les allergènes sont affichés sur chaque fiche produit et rappelés dans la boutique, le pied de page et le formulaire de contact. Avant une vente régulière, consultez les règles d'étiquetage alimentaire et de déclaration d'activité sur economie.gouv.fr, et faites valider les conditions de l'activité par un adulte responsable.
