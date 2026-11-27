import { Link } from 'react-router-dom'
import { matieres } from '../data/matieres'
import { useApp } from '../context/AppContext'

const etapes = [
  { titre: 'Avant le cours', texte: 'Vous réservez une séance (par exemple 1 h de mathématiques) en deux clics.' },
  { titre: 'Pendant le cours', texte: 'On travaille ensemble sur les exercices et les difficultés, à votre rythme.' },
  { titre: 'Après le cours', texte: 'On ouvre la boutique : brownie, cookie, tartelette… il n’y a plus qu’à choisir !' },
  { titre: 'Commande & récupération', texte: 'Vous commandez, c’est confirmé, et vous récupérez votre gourmandise à la fin de la séance.' },
]

export default function Accueil() {
  const { gateaux } = useApp()
  const vedettes = gateaux.slice(0, 3)

  return (
    <div className="page">
      <section className="hero container">
        <h1>📖 Devoirs &amp; Délices 🍰</h1>
        <p className="slogan">« Apprendre avec plaisir, savourer avec gourmandise ! »</p>
        <p>
          Deux univers réunis en une seule application : le <strong>soutien scolaire</strong> et la{' '}
          <strong>pâtisserie faite maison</strong>. Vous réservez un cours particulier, vous progressez,
          puis vous dégustez une gourmandise artisanale préparée avec soin.
        </p>
        <div className="actions">
          <Link to="/reserver" className="btn btn-primaire">📅 Réserver une séance</Link>
          <Link to="/boutique" className="btn btn-secondaire">🍰 Découvrir la boutique</Link>
        </div>
      </section>

      <div className="container">
        <section>
          <h2 className="section-titre">💡 Le concept</h2>
          <div className="grille grille-3">
            <div className="carte">
              <h3>🎓 Pour les élèves</h3>
              <p className="note">
                Des cours adaptés à votre niveau, des objectifs clairs et des exercices sur mesure —
                le tout dans une ambiance chaleureuse et sans pression.
              </p>
            </div>
            <div className="carte">
              <h3>👨‍👩‍👧 Pour les parents</h3>
              <p className="note">
                Un suivi transparent : séances effectuées, matières travaillées, commentaires après
                chaque séance et progression visible.
              </p>
            </div>
            <div className="carte">
              <h3>🧁 La touche gourmande</h3>
              <p className="note">
                À la fin de chaque séance, découvrez les pâtisseries maison disponibles et réservez
                votre récompense bien méritée.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-titre">🗓️ Comment ça se passe ?</h2>
          <div className="grille grille-2 etapes">
            {etapes.map((e, i) => (
              <div key={e.titre} className="carte etape">
                <span className="numero">{i + 1}</span>
                <div>
                  <h3>{e.titre}</h3>
                  <p className="note">{e.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-titre">📚 Nos matières</h2>
          <div className="grille grille-3">
            {matieres.map((m) => (
              <div key={m.id} className="carte">
                <h3>{m.emoji} {m.nom}</h3>
                <p className="note">{m.description}</p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>{m.tarifHoraire} € / heure</strong>
                </p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/cours" className="btn btn-primaire">Voir tous les cours et tarifs</Link>
          </p>
        </section>

        <section>
          <h2 className="section-titre">🍰 Les gourmandises du moment</h2>
          <div className="grille grille-3">
            {vedettes.map((g) => (
              <div key={g.id} className="carte carte-gateau">
                <div className="visuel" aria-hidden="true">{g.emoji}</div>
                <h3>{g.nom}</h3>
                <p className="prix">{g.prix.toFixed(2).replace('.', ',')} €</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/boutique" className="btn btn-primaire">Voir toute la boutique</Link>
          </p>
        </section>
      </div>
    </div>
  )
}
