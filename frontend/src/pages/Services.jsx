import { Link } from 'react-router-dom'
import { services } from '../data/matieres'
import { lieux } from '../data/tarifs'

export default function Services() {
  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Nos services</h1>
        <p>
          Quatre façons de progresser, de l’accompagnement régulier à la préparation intensive
          des examens — à domicile ou à la bibliothèque La Villa Marie de Fréjus.
        </p>
      </div>

      <div className="grille grille-2">
        {services.map((s) => (
          <article key={s.id} className="carte">
            <h3 style={{ fontSize: '1.4rem' }}>{s.emoji} {s.nom}</h3>
            <p className="note">{s.description}</p>
            <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.6rem' }}>
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/reserver" className="btn btn-primaire btn-petit">Réserver</Link>
            </div>
          </article>
        ))}
      </div>

      <section>
        <h2 className="section-titre">📍 Nos lieux</h2>
        <div className="grille grille-2">
          {lieux.map((l) => (
            <div key={l.id} className="carte">
              <h3>{l.emoji} {l.nom}</h3>
              <p className="note">{l.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="carte" style={{ marginTop: '3rem' }}>
        <h3>🎁 Séance découverte</h3>
        <p className="note" style={{ marginTop: '0.5rem' }}>
          Vous ne connaissez pas encore Devoirs &amp; Délices ? La première séance est l’occasion
          de faire connaissance, d’évaluer les besoins et de définir des objectifs — sans engagement.
          Voir aussi nos <Link to="/tarifs">offres commerciales</Link> (parrainage, forfait famille, stages…).
        </p>
      </section>
    </div>
  )
}
