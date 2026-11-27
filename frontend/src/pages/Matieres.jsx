import { Link } from 'react-router-dom'
import { matieres } from '../data/matieres'
import { grilleIndividuel, niveaux } from '../data/tarifs'

export default function Matieres() {
  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Nos matières</h1>
        <p>
          Du primaire au lycée, toutes les matières principales sont couvertes.
          Les tarifs dépendent du niveau : consultez la grille complète sur la page Tarifs.
        </p>
      </div>

      <div className="grille grille-2">
        {matieres.map((m) => (
          <article key={m.id} className="carte">
            <h3 style={{ fontSize: '1.4rem' }}>{m.emoji} {m.nom}</h3>
            <p className="note">{m.description}</p>
            <div style={{ marginTop: '0.6rem' }}>
              {m.niveaux.map((n) => (
                <span key={n} className="etiquette">{n}</span>
              ))}
            </div>
            <p className="note" style={{ marginTop: '0.6rem' }}>
              À partir de {grilleIndividuel[niveaux[0].id]['1h']} € / heure ({niveaux[0].label})
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/reserver" className="btn btn-primaire btn-petit">Réserver ce cours</Link>
            </div>
          </article>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/tarifs" className="btn btn-choco">Voir la grille tarifaire complète</Link>
      </p>
    </div>
  )
}
