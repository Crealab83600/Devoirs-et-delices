import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { matieres, durees } from '../data/matieres'
import { formaterDate } from '../data/disponibilites'
import { useApp } from '../context/AppContext'

export default function Reserver() {
  const { creneaux, reserver, eleve } = useApp()
  const [matiereId, setMatiereId] = useState(matieres[0].id)
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
  const creneau = creneaux.find((c) => c.id === creneauId)
  const total = matiere && duree ? matiere.tarifHoraire * duree.heures : 0

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
    reserver({ matiereId, dureeId, creneauId, objectif })
    setConfirmation(
      `Votre demande de réservation (${matiere.nom}, ${duree.label}, le ${formaterDate(creneau.date)} à ${creneau.heure}) a bien été envoyée. Elle sera confirmée très vite !`,
    )
    setCreneauId('')
    setObjectif('')
  }

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Réserver une séance</h1>
        <p>Choisissez la matière, la durée puis un créneau libre dans le calendrier. La séance sera confirmée après validation.</p>
      </div>

      {confirmation && <div className="message">✅ {confirmation} <Link to="/mon-espace">Voir dans « Mon espace »</Link></div>}
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
                <option key={m.id} value={m.id}>{m.emoji} {m.nom} — {m.tarifHoraire} €/h</option>
              ))}
            </select>
          </div>

          <div className="champ">
            <label htmlFor="duree">Durée</label>
            <select id="duree" value={dureeId} onChange={(e) => setDureeId(e.target.value)}>
              {durees.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {(matiere.tarifHoraire * d.heures).toFixed(2).replace('.', ',')} €
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

          <p className="prix-total">Total estimé : {total.toFixed(2).replace('.', ',')} €</p>
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
        </div>
      </div>
    </div>
  )
}
