import { useState } from 'react'
import { matieres, durees, typesSeance } from '../data/matieres'
import { niveaux } from '../data/tarifs'
import { formaterDate } from '../data/disponibilites'
import { useApp } from '../context/AppContext'

const badges = {
  'en attente': 'badge-attente',
  confirmée: 'badge-confirmee',
  terminée: 'badge-terminee',
  prête: 'badge-prete',
  récupérée: 'badge-recuperee',
}

const onglets = ['Statistiques', 'Élèves & séances', 'Disponibilités', 'Pâtisseries', 'Commandes']

export default function Admin() {
  const app = useApp()
  const {
    reservations, commandes, gateaux, creneaux, eleve,
    confirmerReservation, terminerReservation, ajouterCreneau, supprimerCreneau,
    ajouterGateau, modifierStock, supprimerGateau,
    confirmerCommande, marquerPrete, marquerRecuperee, reinitialiser,
  } = app

  const [onglet, setOnglet] = useState(onglets[0])
  const [commentaire, setCommentaire] = useState('')
  const [nouveauCreneau, setNouveauCreneau] = useState({ date: '', heure: '14h00' })
  const [nouveauGateau, setNouveauGateau] = useState({
    nom: '', emoji: '🧁', prix: '', description: '', allergenes: '', stock: '', precommande: false,
  })

  const matiereDe = (id) => matieres.find((m) => m.id === id)
  const dureeDe = (id) => durees.find((d) => d.id === id)

  const revenusCours = reservations
    .filter((r) => r.statut === 'terminée')
    .reduce((t, r) => {
      const m = matiereDe(r.matiereId)
      const d = dureeDe(r.dureeId)
      return m && d ? t + m.tarifHoraire * d.heures : t
    }, 0)

  const revenusVentes = commandes
    .filter((c) => c.statut === 'récupérée')
    .reduce((t, c) => t + c.total, 0)

  const commandesEnCours = commandes.filter((c) => c.statut !== 'récupérée')
  const reservationsEnAttente = reservations.filter((r) => r.statut === 'en attente')
  const nomsEleves = [...new Set(reservations.map((r) => r.eleveNom)
    .concat(commandes.map((c) => c.eleveNom)))]

  const ajouterUnGateau = (e) => {
    e.preventDefault()
    if (!nouveauGateau.nom || !nouveauGateau.prix) return
    ajouterGateau({
      nom: nouveauGateau.nom,
      emoji: nouveauGateau.emoji || '🧁',
      prix: parseFloat(nouveauGateau.prix.replace(',', '.')) || 0,
      description: nouveauGateau.description,
      allergenes: nouveauGateau.allergenes
        ? nouveauGateau.allergenes.split(',').map((a) => a.trim()).filter(Boolean)
        : [],
      stock: parseInt(nouveauGateau.stock, 10) || 0,
      precommande: nouveauGateau.precommande,
    })
    setNouveauGateau({ nom: '', emoji: '🧁', prix: '', description: '', allergenes: '', stock: '', precommande: false })
  }

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>⚙️ Administration</h1>
        <p>
          Votre espace personnel : gérer les élèves, organiser les cours, tenir la boutique et
          suivre les revenus. {eleve ? `Connecté en tant que ${eleve.nom}.` : ''}
        </p>
      </div>

      <div className="onglets">
        {onglets.map((o) => (
          <button key={o} className={onglet === o ? 'actif' : ''} onClick={() => setOnglet(o)}>
            {o}
          </button>
        ))}
      </div>

      {onglet === 'Statistiques' && (
        <div>
          <div className="grille grille-3" style={{ marginBottom: '2rem' }}>
            <div className="carte stat">
              <div className="valeur">{(revenusCours + revenusVentes).toFixed(2).replace('.', ',')} €</div>
              <div className="libelle">Revenus totaux</div>
            </div>
            <div className="carte stat">
              <div className="valeur">{revenusCours.toFixed(2).replace('.', ',')} €</div>
              <div className="libelle">Revenus des cours</div>
            </div>
            <div className="carte stat">
              <div className="valeur">{revenusVentes.toFixed(2).replace('.', ',')} €</div>
              <div className="libelle">Revenus des pâtisseries</div>
            </div>
          </div>
          <div className="grille grille-3">
            <div className="carte stat">
              <div className="valeur">{reservations.length}</div>
              <div className="libelle">Réservations</div>
            </div>
            <div className="carte stat">
              <div className="valeur">{commandes.length}</div>
              <div className="libelle">Commandes reçues</div>
            </div>
            <div className="carte stat">
              <div className="valeur">{nomsEleves.length}</div>
              <div className="libelle">Élèves inscrits</div>
            </div>
          </div>
          <hr className="sep" />
          <button className="btn btn-danger" onClick={() => reinitialiser()}>
            Réinitialiser les données de démonstration
          </button>
        </div>
      )}

      {onglet === 'Élèves & séances' && (
        <div className="carte">
          <h3 style={{ marginBottom: '1rem' }}>
            Réservations {reservationsEnAttente.length > 0 && <span className="badge badge-attente">{reservationsEnAttente.length} en attente</span>}
          </h3>
          {reservations.length === 0 ? (
            <p className="note">Aucune réservation pour le moment.</p>
          ) : (
            <table className="tableau">
              <thead>
                <tr>
                  <th>Élève</th><th>Matière</th><th>Date</th><th>Statut</th><th>Commentaire</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.eleveNom}</strong><br /><span className="note">{r.objectif}</span></td>
                    <td>{matiereDe(r.matiereId)?.nom} · {dureeDe(r.dureeId)?.label}</td>
                    <td>{niveaux.find((n) => n.id === r.niveau)?.label || '—'}</td>
                    <td>{typesSeance.find((t) => t.id === r.typeSeance)?.label || 'Individuel'}</td>
                    <td>{formaterDate(r.date)}<br /><span className="note">{r.heure}</span></td>
                    <td><span className={`badge ${badges[r.statut]}`}>{r.statut}</span></td>
                    <td>{r.commentaire || <span className="note">—</span>}</td>
                    <td className="actions-cell">
                      {r.statut === 'en attente' && (
                        <button className="btn btn-primaire btn-petit" onClick={() => confirmerReservation(r.id)}>
                          Confirmer
                        </button>
                      )}
                      {r.statut === 'confirmée' && (
                        <button className="btn btn-choco btn-petit" onClick={() => terminerReservation(r.id, commentaire)}>
                          Terminer
                        </button>
                      )}
                      {r.statut === 'terminée' && (
                        <span className="note">Séance terminée ✅</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="champ" style={{ marginTop: '1.2rem', maxWidth: 420 }}>
            <label>Commentaire à joindre en terminant une séance</label>
            <textarea
              rows="2"
              placeholder="Ex : très bons progrès sur les fractions, à consolider jeudi."
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </div>
        </div>
      )}

      {onglet === 'Disponibilités' && (
        <div>
          <form className="carte" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}
            onSubmit={(e) => {
              e.preventDefault()
              if (nouveauCreneau.date && nouveauCreneau.heure) {
                ajouterCreneau(nouveauCreneau.date, nouveauCreneau.heure)
              }
            }}>
            <div className="champ" style={{ marginBottom: 0 }}>
              <label htmlFor="date-creneau">Nouvelle date de disponibilité</label>
              <input id="date-creneau" type="date" required value={nouveauCreneau.date}
                onChange={(e) => setNouveauCreneau({ ...nouveauCreneau, date: e.target.value })} />
            </div>
            <div className="champ" style={{ marginBottom: 0 }}>
              <label htmlFor="heure-creneau">Heure</label>
              <select id="heure-creneau" value={nouveauCreneau.heure}
                onChange={(e) => setNouveauCreneau({ ...nouveauCreneau, heure: e.target.value })}>
                {['10h00', '14h00', '16h00', '17h30', '18h30'].map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primaire" type="submit">Ajouter le créneau</button>
          </form>

          <div className="carte">
            <h3 style={{ marginBottom: '1rem' }}>Créneaux proposés ({creneaux.length})</h3>
            <table className="tableau">
              <thead>
                <tr><th>Date</th><th>Heure</th><th>Places</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {[...creneaux]
                  .sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure))
                  .map((c) => (
                    <tr key={c.id}>
                      <td>{formaterDate(c.date)}</td>
                      <td>{c.heure}</td>
                      <td>{c.places}</td>
                      <td>
                        <button className="btn btn-danger btn-petit" onClick={() => supprimerCreneau(c.id)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {onglet === 'Pâtisseries' && (
        <div>
          <form className="carte" style={{ marginBottom: '1.5rem' }} onSubmit={ajouterUnGateau}>
            <h3 style={{ marginBottom: '1rem' }}>➕ Ajouter une pâtisserie</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="champ" style={{ flex: '1 1 160px' }}>
                <label>Nom</label>
                <input required placeholder="Ex : Éclair au café" value={nouveauGateau.nom}
                  onChange={(e) => setNouveauGateau({ ...nouveauGateau, nom: e.target.value })} />
              </div>
              <div className="champ" style={{ flex: '0 1 90px' }}>
                <label>Emoji</label>
                <input placeholder="🧁" value={nouveauGateau.emoji}
                  onChange={(e) => setNouveauGateau({ ...nouveauGateau, emoji: e.target.value })} />
              </div>
              <div className="champ" style={{ flex: '0 1 110px' }}>
                <label>Prix (€)</label>
                <input required inputMode="decimal" placeholder="2,50" value={nouveauGateau.prix}
                  onChange={(e) => setNouveauGateau({ ...nouveauGateau, prix: e.target.value })} />
              </div>
              <div className="champ" style={{ flex: '0 1 100px' }}>
                <label>Stock</label>
                <input type="number" min="0" placeholder="5" value={nouveauGateau.stock}
                  onChange={(e) => setNouveauGateau({ ...nouveauGateau, stock: e.target.value })} />
              </div>
              <div className="champ" style={{ flex: '1 1 220px' }}>
                <label>Allergènes (séparés par des virgules)</label>
                <input placeholder="Gluten, Œufs, Lait" value={nouveauGateau.allergenes}
                  onChange={(e) => setNouveauGateau({ ...nouveauGateau, allergenes: e.target.value })} />
              </div>
            </div>
            <div className="champ">
              <label>Description</label>
              <textarea rows="2" placeholder="Une gourmandise à décrire avec appétit…"
                value={nouveauGateau.description}
                onChange={(e) => setNouveauGateau({ ...nouveauGateau, description: e.target.value })} />
            </div>
            <label className="note" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <input type="checkbox" checked={nouveauGateau.precommande}
                onChange={(e) => setNouveauGateau({ ...nouveauGateau, precommande: e.target.checked })} />
              Disponible uniquement en précommande
            </label>
            <button className="btn btn-primaire" type="submit">Ajouter à la boutique</button>
          </form>

          <div className="carte">
            <h3 style={{ marginBottom: '1rem' }}>Stocks ({gateaux.length} produits)</h3>
            <table className="tableau">
              <thead>
                <tr><th>Produit</th><th>Prix</th><th>Stock</th><th>Précommande</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {gateaux.map((g) => (
                  <tr key={g.id}>
                    <td>{g.emoji} <strong>{g.nom}</strong></td>
                    <td>{g.prix.toFixed(2).replace('.', ',')} €</td>
                    <td>
                      <input type="number" min="0" value={g.stock}
                        onChange={(e) => modifierStock(g.id, parseInt(e.target.value, 10) || 0)}
                        style={{ width: 70, border: '2px solid var(--rose-pale)', borderRadius: 8, padding: '0.3rem 0.5rem', fontFamily: 'Quicksand' }} />
                    </td>
                    <td>{g.precommande ? 'Oui' : 'Non'}</td>
                    <td>
                      <button className="btn btn-danger btn-petit" onClick={() => supprimerGateau(g.id)}>
                        Retirer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {onglet === 'Commandes' && (
        <div className="carte">
          <h3 style={{ marginBottom: '1rem' }}>
            Commandes {commandesEnCours.length > 0 && <span className="badge badge-attente">{commandesEnCours.length} en cours</span>}
          </h3>
          <p className="note">💳 Paiement encaissé sur place, uniquement par carte bancaire avec terminal de paiement.</p>
          {commandes.length === 0 ? (
            <p className="note">Aucune commande pour le moment.</p>
          ) : (
            <table className="tableau">
              <thead>
                <tr><th>Élève</th><th>Gourmandises</th><th>Total</th><th>Mode</th><th>Statut</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {commandes.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.eleveNom}</strong><br /><span className="note">{c.dateCommande}</span></td>
                    <td>
                      {c.lignes.map((l) => (
                        <div key={l.gateauId}>{l.emoji} {l.nom} × {l.quantite}</div>
                      ))}
                    </td>
                    <td><strong>{c.total.toFixed(2).replace('.', ',')} €</strong></td>
                    <td>{c.mode === 'fin-de-seance' ? 'Fin de séance' : 'Précommande'}</td>
                    <td><span className={`badge ${badges[c.statut]}`}>{c.statut}</span></td>
                    <td className="actions-cell">
                      {c.statut === 'en attente' && (
                        <button className="btn btn-primaire btn-petit" onClick={() => confirmerCommande(c.id)}>Confirmer</button>
                      )}
                      {c.statut === 'confirmée' && (
                        <button className="btn btn-choco btn-petit" onClick={() => marquerPrete(c.id)}>Prête</button>
                      )}
                      {c.statut === 'prête' && (
                        <button className="btn btn-secondaire btn-petit" onClick={() => marquerRecuperee(c.id)}>Récupérée</button>
                      )}
                      {c.statut === 'récupérée' && <span className="note">Terminée 🎉</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
