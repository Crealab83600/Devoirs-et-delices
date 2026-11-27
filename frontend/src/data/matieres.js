export const matieres = [
  {
    id: 'maths',
    nom: 'Mathématiques',
    emoji: '🔢',
    description:
      'Calcul, géométrie, fractions, problèmes : on reprend les bases du programme et on progresse étape par étape.',
    tarifHoraire: 15,
    niveaux: ['Primaire', 'Collège', 'Lycée'],
  },
  {
    id: 'francais',
    nom: 'Français',
    emoji: '📚',
    description:
      'Lecture, orthographe, grammaire, rédaction : gagner en aisance à l’écrit et à l’oral.',
    tarifHoraire: 14,
    niveaux: ['Primaire', 'Collège'],
  },
  {
    id: 'anglais',
    nom: 'Anglais',
    emoji: '🇬🇧',
    description:
      'Vocabulaire, conjugaison, expression écrite et orale : progresser en douceur et sans stress.',
    tarifHoraire: 14,
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'sciences',
    nom: 'Sciences (SVT / Physique)',
    emoji: '🔬',
    description:
      'Comprendre les notions du cours, refaire les expériences clés et préparer les contrôles.',
    tarifHoraire: 16,
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'histoire',
    nom: 'Histoire & Géographie',
    emoji: '🗺️',
    description:
      'Méthodes de révision, repères chronologiques, cartes et croquis : réviser efficacement.',
    tarifHoraire: 14,
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'methode',
    nom: 'Méthodologie & Organisation',
    emoji: '🧠',
    description:
      'Apprendre à apprendre : planner de révision, prise de notes, mémorisation et gestion du temps.',
    tarifHoraire: 13,
    niveaux: ['Primaire', 'Collège', 'Lycée'],
  },
]

export const durees = [
  { id: '1h', label: '1 heure', heures: 1 },
  { id: '1h30', label: '1 h 30', heures: 1.5 },
  { id: '2h', label: '2 heures', heures: 2 },
]

export const objectifsParMatiere = {
  maths: ['Maîtriser les fractions', 'Réussir les problèmes ouverts', 'Préparer le prochain contrôle'],
  francais: ['Mieux orthographier', 'Structurer une rédaction', 'Lire avec fluidité'],
  anglais: ['Enrichir le vocabulaire', 'Oser parler à l’oral', 'Comprendre les consignes'],
  sciences: ['Comprendre les notions clés', 'Rédiger un compte rendu', 'Réviser les définitions'],
  histoire: ['Mémoriser les dates', 'Réussir l’étude de documents', 'Soigner les croquis'],
  methode: ['Organiser son planner', 'Mémoriser durablement', 'Travailler sans se disperser'],
}

export const documents = [
  { titre: 'Fiche méthode — Résoudre un problème de maths', matiere: 'Mathématiques', type: 'PDF' },
  { titre: 'Exercices d’orthographe (niveau collège)', matiere: 'Français', type: 'PDF' },
  { titre: 'Liste de vocabulaire anglais — Unité 3', matiere: 'Anglais', type: 'PDF' },
  { titre: 'Planner de révision imprimable', matiere: 'Méthodologie', type: 'PDF' },
]
