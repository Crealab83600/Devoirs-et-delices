import { Link } from 'react-router-dom'
import { matieres, durees } from '../data/matieres'

export default function Cours() {
  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Nos cours particuliers</h1>
        <p>
          Des séances adaptées du primaire au lycée, animées avec patience et bonne humeur.
          Choisissez votre matière, réservez votre créneau… et terminez par une gourmandise !
        </p>
      </div>

      <div className="grille grille-2">
        {matieres.map((m) => (
          <article key={m.id} className="carte">
            <h3 style={{ fontSize: '1.4rem' }}>{m.emoji} {m.nom}</h3>
            <p className="note">{m.description}</p>
            <p style={{ marginTop: '0.6rem' }}>
              <strong>{m.tarifHoraire} € / heure</strong>
              {' — '}
              {durees.map((d) => `${d.label} : ${(m.tarifHoraire * d.heures).toFixed(2).replace('.', ',')} €`).join(' · ')}
            </p>
            <div style={{ marginTop: '0.6rem' }}>
              {m.niveaux.map((n) => (
                <span key={n} className="etiquette">{n}</span>
              ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/reserver" className="btn btn-primaire btn-petit">
                Réserver ce cours
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section style={{ marginTop: '3rem' }} className="carte">
        <h3>💬 Bon à savoir</h3>
        <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
          <li>La première séance est l’occasion de faire connaissance et de définir vos objectifs.</li>
          <li>Les tarifs s’entendent par heure de cours, à domicile ou en visio.</li>
          <li>Un résumé et des exercices sont fournis après chaque séance, dans « Mon espace ».</li>
          <li>Après la séance, la boutique vous attend pour une récompense gourmande 🍰.</li>
        </ul>
      </section>
    </div>
  )
}
