import { Link } from 'react-router-dom'
import { matieres, durees, objectifsParMatiere, documents, typesSeance } from '../data/matieres'
import { niveaux } from '../data/tarifs'
import { formaterDate } from '../data/disponibilites'
import { useApp } from '../context/AppContext'

export default function MonEspace() {
  const { eleve, reservations } = useApp()

  if (!eleve) {
    return (
      <div className="page container" style={{ textAlign: 'center' }}>
        <div className="entete-page">
          <h1>Mon espace</h1>
          <p>Connectez-vous depuis la barre du haut pour retrouver vos séances et votre progression.</p>
        </div>
        <Link to="/reserver" className="btn btn-primaire">Réserver une première séance</Link>
      </div>
    )
  }

  const mesReservations = reservations.filter((r) => r.eleveNom === eleve.nom)
  const seancesPassees = mesReservations.filter((r) => r.statut === 'terminée')
  const aVenir = mesReservations.filter((r) => r.statut !== 'terminée')
  const matieresSuivies = [...new Set(mesReservations.map((r) => r.matiereId))]

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Bonjour {eleve.nom} ! 👋</h1>
        <p>Bienvenue dans votre espace : séances, objectifs, documents et commentaires.</p>
      </div>

      <div className="grille grille-3" style={{ marginBottom: '2.5rem' }}>
        <div className="carte stat">
          <div className="valeur">{mesReservations.length}</div>
          <div className="libelle">Séances réservées</div>
        </div>
        <div className="carte stat">
          <div className="valeur">{seancesPassees.length}</div>
          <div className="libelle">Séances effectuées</div>
        </div>
        <div className="carte stat">
          <div className="valeur">{matieresSuivies.length}</div>
          <div className="libelle">Matières travaillées</div>
        </div>
      </div>

      <section>
        <h2 className="section-titre">🔜 Séances à venir</h2>
        {aVenir.length === 0 ? (
          <div className="carte">
            <p className="note">Aucune séance prévue.</p>
            <Link to="/reserver" className="btn btn-primaire btn-petit" style={{ marginTop: '0.8rem' }}>
              Réserver une séance
            </Link>
          </div>
        ) : (
          <div className="grille grille-2">
            {aVenir.map((r) => {
              const m = matieres.find((x) => x.id === r.matiereId)
              const d = durees.find((x) => x.id === r.dureeId)
              return (
                <article key={r.id} className="carte">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{m.emoji} {m.nom}</h3>
                    <span className={`badge badge-${r.statut.replace(' ', '-')}`}>{r.statut}</span>
                  </div>
                  <p className="note">
                    📆 {formaterDate(r.date)} à {r.heure} · ⏱️ {d.label}
                  </p>
                  <p className="note">
                    {r.typeSeance === 'groupe' ? '👥 Petit groupe' : '👨‍🏫 Individuel'}
                    {' '}· Niveau {niveaux.find((n) => n.id === r.niveau)?.label}
                  </p>
                  {r.objectif && <p className="note">🎯 Objectif : {r.objectif}</p>}
                  {r.statut === 'confirmée' && (
                    <p className="note" style={{ marginTop: '0.5rem' }}>
                      🍰 Pensez à passer commande à la <Link to="/boutique">boutique</Link> pour récupérer votre gourmandise à la fin de la séance !
                    </p>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="section-titre">✅ Séances effectuées &amp; commentaires</h2>
        {seancesPassees.length === 0 ? (
          <div className="carte"><p className="note">Vos séances terminées apparaîtront ici avec les commentaires.</p></div>
        ) : (
          <div className="grille grille-2">
            {seancesPassees.map((r) => {
              const m = matieres.find((x) => x.id === r.matiereId)
              return (
                <article key={r.id} className="carte">
                  <h3>{m.emoji} {m.nom}</h3>
                  <p className="note">📆 {formaterDate(r.date)} à {r.heure}</p>
                  {r.commentaire ? (
                    <div className="message" style={{ marginTop: '0.6rem' }}>💬 {r.commentaire}</div>
                  ) : (
                    <p className="note">Pas encore de commentaire pour cette séance.</p>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="section-titre">🎯 Mes objectifs scolaires</h2>
        <div className="grille grille-2">
          {matieresSuivies.length === 0 ? (
            <div className="carte"><p className="note">Réservez une séance pour définir vos objectifs.</p></div>
          ) : (
            matieresSuivies.map((id) => (
              <div key={id} className="carte">
                <h3>{matieres.find((m) => m.id === id).nom}</h3>
                <ul className="note" style={{ paddingLeft: '1.2rem' }}>
                  {objectifsParMatiere[id].map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="section-titre">📄 Documents &amp; exercices</h2>
        <div className="grille grille-2">
          {documents.map((doc) => (
            <div key={doc.titre} className="carte" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.8rem' }}>📄</span>
              <div>
                <strong>{doc.titre}</strong>
                <p className="note">{doc.matiere} · {doc.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
