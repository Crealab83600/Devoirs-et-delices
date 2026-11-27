import { Link } from 'react-router-dom'

const valeurs = [
  {
    emoji: '🌱',
    titre: 'La patience d’abord',
    texte: 'Chaque élève progresse à son rythme. On ne va pas plus vite que la compréhension : on construit sur du solide.',
  },
  {
    emoji: '🎯',
    titre: 'Des objectifs clairs',
    texte: 'Après un diagnostic initial, chaque séance a un but précis, connu de l’élève et des parents.',
  },
  {
    emoji: '💬',
    titre: 'La transparence',
    texte: 'Un compte rendu après chaque séance : ce qui a été travaillé, les progrès et les points à suivre.',
  },
  {
    emoji: '🍰',
    titre: 'Le plaisir en récompense',
    texte: 'Parce qu’apprendre doit rester un plaisir, chaque séance peut se terminer par une gourmandise maison.',
  },
]

export default function APropos() {
  return (
    <div className="page container">
      <div className="entete-page">
        <h1>À propos</h1>
        <p>Devoirs &amp; Délices, c’est un projet familial né à Fréjus, dans le Var.</p>
      </div>

      <div className="grille grille-2">
        <section className="carte">
          <h3>📖 L’histoire</h3>
          <p className="note" style={{ marginTop: '0.5rem' }}>
            Devoirs &amp; Délices est né d’un constat simple : les élèves progressent mieux quand
            ils apprennent sereinement et quand l’effort est récompensé. Nous avons donc réuni
            deux passions : la pédagogie et la pâtisserie. D’un côté, un soutien scolaire exigeant
            et bienveillant, de l’autre, des gourmandises maison préparées avec soin.
          </p>
          <p className="note" style={{ marginTop: '0.5rem' }}>
            L’application vous permet de tout gérer au même endroit : réserver une séance,
            suivre les progrès et commander votre récompense gourmande.
          </p>
        </section>

        <section className="carte">
          <h3>👨‍🏫 L’équipe</h3>
          <p className="note" style={{ marginTop: '0.5rem' }}>
            Votre professeur particulier : passionné de transmission, il accompagne les élèves du
            primaire au lycée dans toutes les matières principales, à domicile à Fréjus et alentours,
            en petit groupe, à la bibliothèque La Villa Marie ou à la bibliothèque de Saint-Raphaël.
          </p>
          <p className="note" style={{ marginTop: '0.5rem' }}>
            Côté pâtisserie : des recettes testées et approuvées par les élèves (le brownie fondant
            remporte tous les suffrages après les devoirs de maths !).
          </p>
        </section>
      </div>

      <section>
        <h2 className="section-titre">💡 Notre méthode</h2>
        <div className="grille grille-2">
          {valeurs.map((v) => (
            <div key={v.titre} className="carte">
              <h3>{v.emoji} {v.titre}</h3>
              <p className="note">{v.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/reserver" className="btn btn-primaire">Venez essayer : réservez une séance découverte</Link>
      </p>
    </div>
  )
}
