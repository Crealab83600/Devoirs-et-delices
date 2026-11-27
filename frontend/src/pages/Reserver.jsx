import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { matieres, durees, typesSeance } from '../data/matieres'
import { niveaux, prixSeance } from '../data/tarifs'
import { formaterDate } from '../data/disponibilites'
import { useApp } from '../context/AppContext'

export default function Reserver() {
  const { creneaux, reserver, eleve } = useApp()
  const [matiereId, setMatiereId] = useState(matieres[0].id)
  const [niveau, setNiveau] = useState(niveaux[0].id)
  const [typeSeance, setTypeSeance] = useState(typesSeance[0].id)
  const [dureeId, setDureeId] = useState(durees[0].id)
  const [creneauId, setCreneauId] = useState('')
  const [objectif, setObjectif] = useState('')
  const [confirmation, setConfirmation] = useState('')

  const creneauxLibres = useMemo(
    () =>
      [...creneaux]
        .filter((c) => c.places > 0)
        .sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure)),
    [creneaux],
  )

  const matiere = matieres.find((m) => m.id === matiereId)
  const duree = durees.find((d) => d.id === dureeId)
  const type = typesSeance.find((t) => t.id === typeSeance)
  const creneau = creneaux.find((c) => c.id === creneauId)
  const prix = prixSeance(typeSeance, niveau, dureeId)

  const jours = useMemo(() => {
    const groupes = new Map()
    creneauxLibres.forEach((c) => {
      if (!groupes.has(c.date)) groupes.set(c.date, [])
      groupes.get(c.date).push(c)
    })
    return [...groupes.entries()]
  }, [creneauxLibres])

  const envoyer = (e) => {
    e.preventDefault()
    if (!creneauId) return
    reserver({ matiereId, dureeId, niveau, typeSeance, creneauId, objectif })
    setConfirmation(
      `Votre demande de réservation (${matiere.nom}, ${type.label.toLowerCase()}, niveau ${niveau}, ${duree.label}, le ${formaterDate(creneau.date)} à ${creneau.heure}) a bien été envoyée. Elle sera confirmée très vite !`,
    )
    setCreneauId('')
    setObjectif('')
  }

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Réserver une séance</h1>
        <p>
          Choisissez la matière, le niveau, le type de séance et la durée, puis un créneau libre.
          Vous recevrez une confirmation, et le règlement se fait sur place.
        </p>
      </div>

      {confirmation && (
        <div className="message">
          ✅ {confirmation} <Link to="/mon-espace">Voir dans « Mon espace »</Link>
        </div>
      )}
      {!eleve && (
        <div className="message message-alerte">
          💡 Connectez-vous depuis la barre du haut (bouton « Se connecter ») pour que votre réservation soit associée à votre profil.
        </div>
      )}

      <div className="grille grille-2">
        <form className="carte" onSubmit={envoyer}>
          <h3 style={{ marginBottom: '1rem' }}>1. Votre demande</h3>

          <div className="champ">
            <label htmlFor="matiere">Matière</label>
            <select id="matiere" value={matiereId} onChange={(e) => setMatiereId(e.target.value)}>
              {matieres.map((m) => (
                <option key={m.id} value={m.id}>{m.emoji} {m.nom}</option>
              ))}
            </select>
          </div>

          <div className="champ">
            <label htmlFor="niveau">Niveau</label>
            <select id="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)}>
              {niveaux.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>

          <div className="champ">
            <label htmlFor="type-seance">Type de séance</label>
            <select id="type-seance" value={typeSeance} onChange={(e) => setTypeSeance(e.target.value)}>
              {typesSeance.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.emoji} {t.label}
                  {t.id === 'groupe' ? ' (tarif par élève)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="champ">
            <label htmlFor="duree">Durée</label>
            <select id="duree" value={dureeId} onChange={(e) => setDureeId(e.target.value)}>
              {durees.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {prixSeance(typeSeance, niveau, d.id)} €
                </option>
              ))}
            </select>
          </div>

          <div className="champ">
            <label htmlFor="objectif">Votre objectif (facultatif)</label>
            <textarea
              id="objectif"
              rows="3"
              placeholder="Ex : préparer le contrôle de fractions de jeudi"
              value={objectif}
              onChange={(e) => setObjectif(e.target.value)}
            />
          </div>

          <p className="prix-total">Total de la séance : {prix} €</p>
          <p className="note">💳 Paiement sur place, uniquement par carte bancaire (terminal de paiement).</p>
          <button className="btn btn-primaire" style={{ marginTop: '1rem' }} disabled={!creneauId}>
            Envoyer la demande de réservation
          </button>
        </form>

        <div className="carte">
          <h3 style={{ marginBottom: '1rem' }}>2. Choisissez un créneau libre</h3>
          {jours.length === 0 ? (
            <p className="note">Aucun créneau libre pour le moment — revenez bientôt !</p>
          ) : (
            <div className="calendrier">
              {jours.map(([date, slots]) => (
                <div key={date}>
                  <p className="note" style={{ fontWeight: 700, marginBottom: '0.4rem' }}>
                    📆 {formaterDate(date)}
                  </p>
                  {slots.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`jour-dispo ${creneauId === c.id ? 'choisi' : ''}`}
                      style={{ width: '100%', marginBottom: '0.5rem', textAlign: 'left', fontFamily: 'Quicksand' }}
                      onClick={() => setCreneauId(c.id)}
                    >
                      <span className="date-label">🕐 {c.heure}</span>
                      <br />
                      <span className="heure-label">{c.places} place{c.places > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
          <hr className="sep" />
          <p className="note">
            💡 Pensez aux <Link to="/tarifs">forfaits 5 ou 10 séances</Link> pour économiser, et à la{' '}
            <Link to="/gourmandises">formule gourmandise</Link> pour la fin de séance !
          </p>
        </div>
      </div>
    </div>
  )
}
