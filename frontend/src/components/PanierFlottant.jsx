import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function PanierFlottant() {
  const { panier, retirerDuPanier, choisirModePanier, validerCommande, eleve, commandes } = useApp()
  const [ouvert, setOuvert] = useState(false)
  const [message, setMessage] = useState('')

  if (panier.lignes.length === 0) return null

  const total = panier.lignes.reduce((t, l) => t + l.prix * l.quantite, 0)

  const valider = () => {
    validerCommande()
    setMessage('')
  }

  const dejaUneCommande = commandes.some(
    (c) => c.eleveNom === (eleve ? eleve.nom : 'Élève invité') && c.statut !== 'récupérée',
  )

  return (
    <div className="panier-flottant">
      {ouvert ? (
        <div className="carte" style={{ width: 320, padding: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem' }}>🛒 Mon panier</h3>
            <button className="btn btn-secondaire btn-petit" onClick={() => setOuvert(false)}>✕</button>
          </div>
          {message && <div className="message" style={{ marginTop: '0.8rem' }}>{message}</div>}
          {panier.lignes.map((l) => (
            <div key={l.gateauId} className="ligne-panier">
              <span>{l.emoji} {l.nom} × {l.quantite}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong>{(l.prix * l.quantite).toFixed(2).replace('.', ',')} €</strong>
                <button className="btn btn-danger btn-petit" onClick={() => retirerDuPanier(l.gateauId)}>−</button>
              </span>
            </div>
          ))}
          <hr className="sep" />
          <p className="champ" style={{ marginBottom: '0.8rem' }}>
            <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Mode de commande</label>
            <select
              value={panier.mode}
              onChange={(e) => choisirModePanier(e.target.value)}
              style={{ border: '2px solid var(--rose-pale)', borderRadius: 10, padding: '0.5rem', fontFamily: 'Quicksand' }}
            >
              <option value="fin-de-seance">À récupérer à la fin de ma séance</option>
              <option value="precommande">Précommande (prochaine fournée)</option>
            </select>
          </p>
          <p className="prix-total" style={{ marginBottom: '0.8rem' }}>
            Total : {total.toFixed(2).replace('.', ',')} €
          </p>
          {dejaUneCommande && (
            <div className="message message-alerte" style={{ fontSize: '0.85rem' }}>
              Vous avez déjà une commande en cours : elle sera préparée à la suite.
            </div>
          )}
          {eleve ? (
            <button
              className="btn btn-choco"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                valider()
                setOuvert(false)
              }}
            >
              Confirmer ma commande 🎂
            </button>
          ) : (
            <Link to="/reserver" className="btn btn-primaire" style={{ width: '100%', justifyContent: 'center' }}>
              Connectez-vous ou réservez d’abord
            </Link>
          )}
        </div>
      ) : (
        <button className="btn btn-choco" onClick={() => setOuvert(true)}>
          🛒 {panier.lignes.reduce((t, l) => t + l.quantite, 0)} —{' '}
          {total.toFixed(2).replace('.', ',')} €
        </button>
      )}
    </div>
  )
}
