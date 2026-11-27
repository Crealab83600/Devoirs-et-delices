export const niveaux = [
  { id: 'primaire', label: 'Primaire' },
  { id: 'college', label: 'Collège' },
  { id: 'lycee', label: 'Lycée' },
]

export const grilleIndividuel = {
  primaire: { '1h': 18, '1h30': 25, '2h': 32 },
  college: { '1h': 22, '1h30': 32, '2h': 42 },
  lycee: { '1h': 26, '1h30': 38, '2h': 50 },
}

export const tarifGroupe = {
  '1h': 10,
  '1h30': 15,
  '2h': 19,
}

export const forfaits = [
  {
    id: 'forfait-5',
    nom: '5 séances d’1 h',
    prix: { primaire: 85, college: 105, lycee: 125 },
  },
  {
    id: 'forfait-10',
    nom: '10 séances d’1 h',
    prix: { primaire: 160, college: 200, lycee: 240 },
  },
]

export const offresCommerciales = [
  {
    id: 'decouverte',
    nom: 'Première séance découverte',
    emoji: '🎁',
    avantage: 'Une première séance pour faire connaissance et évaluer les besoins, sans engagement.',
  },
  {
    id: 'parrainage',
    nom: 'Parrainage',
    emoji: '🤝',
    avantage: 'Parrainez une famille : une séance offerte pour le filleul, une réduction pour le parrain.',
  },
  {
    id: 'famille',
    nom: 'Forfait famille',
    emoji: '👨‍👩‍👧‍👦',
    avantage: 'Tarif réduit dès le deuxième enfant inscrit dans la fratrie.',
  },
  {
    id: 'stage-vacances',
    nom: 'Stage vacances',
    emoji: '🏖️',
    avantage: 'Stages intensifs pendant les vacances scolaires pour rattraper ou prendre de l’avance.',
  },
  {
    id: 'brevet',
    nom: 'Préparation au brevet',
    emoji: '📘',
    avantage: 'Offre spécifique aux collégiens : méthodologie, annales et simulations d’épreuves.',
  },
  {
    id: 'bac',
    nom: 'Préparation au bac',
    emoji: '🎓',
    avantage: 'Offre spécifique aux lycéens : révisions ciblées, entraînement aux épreuves et gestion du stress.',
  },
]

export const conditionsForfaits = [
  'Les forfaits sont à utiliser sur une période définie, précisée lors de la réservation.',
  'Toute annulation doit être signalée au moins 24 h à l’avance pour que la séance reste comptée comme due.',
  'Les forfaits sont nominatifs et non remboursables, mais transférables au sein d’une même fratrie.',
]

export const moyensPaiement = [
  'Carte bancaire sur place, avec terminal de paiement.',
  'Chèque accepté.',
  'Le règlement se fait à la fin de la séance (et à la récupération des gourmandises).',
  'Aucune coordonnée bancaire ne circule sur ce site ni n’est stockée en ligne : le paiement est 100 % en personne.',
]

export const lieux = [
  { id: 'domicile', nom: 'À domicile', emoji: '🏠', detail: 'Chez vous, à Fréjus et communes alentour.' },
  { id: 'villa-marie', nom: 'Bibliothèque La Villa Marie (Fréjus)', emoji: '🏛️', detail: 'Dans l’espace de travail de la bibliothèque, idéal pour les petits groupes.' },
  { id: 'saint-raphael', nom: 'Bibliothèque de Saint-Raphaël', emoji: '📚', detail: 'Le dimanche de 13h30 à 17h30, uniquement à la bibliothèque de Saint-Raphaël.' },
]

export const reperesTarifaires = [
  {
    titre: 'Particuliers / étudiants (en ligne ou à domicile)',
    texte: 'Généralement 14 € à 22 €/h, soit environ 14–20 € en primaire et 16–22 € au collège/lycée.',
  },
  {
    titre: 'Organismes et cours à domicile déclarés',
    texte: 'Souvent 25 € à 45 €/h avant avantage fiscal, selon le niveau et le format (individuel ou petit groupe).',
  },
  {
    titre: 'Emploi direct via CESU',
    texte: 'Salaires nets minimums conventionnels de 11,93 €/h (primaire) et 12,20 €/h (collège/lycée), congés payés inclus, auxquels s’ajoutent les cotisations et éventuelles aides.',
  },
]

export const facteursPrix = [
  'Le niveau scolaire et les matières : le primaire coûte moins cher que le lycée ou les matières scientifiques/spécialisées.',
  'Le profil de l’intervenant : un étudiant ou intervenant débutant facture généralement moins qu’un enseignant expérimenté ou certifié.',
  'Le format et la zone géographique : les tarifs peuvent être plus élevés dans les zones touristiques ou tendues (littoral varois / Côte d’Azur).',
  'Le crédit d’impôt : pour les prestations éligibles de soutien scolaire à domicile, un crédit d’impôt de 50 % réduit de moitié le coût net (dans les plafonds légaux en vigueur).',
]

export const prixSeance = (typeSeance, niveau, dureeId) => {
  if (typeSeance === 'groupe') return tarifGroupe[dureeId]
  return grilleIndividuel[niveau][dureeId]
}
