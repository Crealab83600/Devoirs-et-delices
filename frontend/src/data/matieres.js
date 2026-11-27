export const typesSeance = [
  { id: 'individuel', label: 'Soutien individuel', emoji: '👨‍🏫' },
  { id: 'groupe', label: 'Petit groupe (2 à 4 élèves)', emoji: '👥' },
]

export const matieres = [
  {
    id: 'maths',
    nom: 'Mathématiques',
    emoji: '🔢',
    description:
      'Calcul, géométrie, fractions, problèmes : on reprend les bases du programme et on progresse étape par étape.',
    niveaux: ['Primaire', 'Collège', 'Lycée'],
  },
  {
    id: 'francais',
    nom: 'Français',
    emoji: '📚',
    description:
      'Lecture, orthographe, grammaire, rédaction : gagner en aisance à l’écrit et à l’oral.',
    niveaux: ['Primaire', 'Collège'],
  },
  {
    id: 'anglais',
    nom: 'Anglais',
    emoji: '🇬🇧',
    description:
      'Vocabulaire, conjugaison, expression écrite et orale : progresser en douceur et sans stress.',
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'sciences',
    nom: 'Sciences (SVT / Physique)',
    emoji: '🔬',
    description:
      'Comprendre les notions du cours, refaire les expériences clés et préparer les contrôles.',
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'histoire',
    nom: 'Histoire & Géographie',
    emoji: '🗺️',
    description:
      'Méthodes de révision, repères chronologiques, cartes et croquis : réviser efficacement.',
    niveaux: ['Collège', 'Lycée'],
  },
  {
    id: 'methode',
    nom: 'Méthodologie & Organisation',
    emoji: '🧠',
    description:
      'Apprendre à apprendre : planner de révision, prise de notes, mémorisation et gestion du temps.',
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

export const services = [
  {
    id: 'soutien-individuel',
    nom: 'Soutien individuel',
    emoji: '👨‍🏫',
    description:
      'Des séances en tête-à-tête adaptées au rythme de l’élève : on identifie les lacunes, on reprend les bases et on progresse sur les points travaillés en classe.',
    points: ['Diagnostic initial personnalisé', 'Rythme adapté à l’élève', 'Exercices sur mesure'],
  },
  {
    id: 'aide-aux-devoirs',
    nom: 'Aide aux devoirs',
    emoji: '✏️',
    description:
      'Un accompagnement régulier pour instaurer de bonnes habitudes de travail : compréhension des consignes, organisation du travail et autonomie.',
    points: ['Sessions après l’école', 'Méthode et organisation', 'Suivi régulier des devoirs'],
  },
  {
    id: 'preparation-examens',
    nom: 'Préparation aux examens',
    emoji: '🎓',
    description:
      'Des programmes ciblés pour le brevet et le bac : révisions efficaces, annales corrigées et simulations dans les conditions réelles.',
    points: ['Annales et sujets types', 'Plannings de révision', 'Simulations chronométrées'],
  },
]
