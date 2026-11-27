import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const libellesStatut = {
  'en attente': 'badge-attente',
  confirmée: 'badge-confirmee',
  prête: 'badge-prete',
  récupérée: 'badge-recuperee',
}

export default function MesCommandes() {
  const { commandes, eleve } = useApp()

  const mesCommandes = eleve
    ? commandes.filter((c) => c.eleveNom === eleve.nom)
    : commandes

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Mes commandes</h1>
        <p>
          Suivez vos gourmandises : de la commande à la récupération à la fin de la séance.
        </p>
      </div>

      {!eleve && (
        <div className="message message-alerte">
          Connectez-vous pour retrouver uniquement vos commandes.
        </div>
      )}

      {mesCommandes.length === 0 ? (
        <div className="carte" style={{ textAlign: 'center' }}>
          <p>Aucune commande pour le moment.</p>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/boutique" className="btn btn-primaire">Aller à la boutique 🍰</Link>
          </p>
        </div>
      ) : (
        <div className="grille grille-2">
          {mesCommandes.map((c) => (
            <article key={c.id} className="carte">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Commande du {c.dateCommande}</h3>
                <span className={`badge ${libellesStatut[c.statut] || ''}`}>{c.statut}</span>
              </div>
              {c.lignes.map((l) => (
                <div key={l.gateauId} className="ligne-panier">
                  <span>{l.emoji} {l.nom} × {l.quantite}</span>
                  <strong>{(l.prix * l.quantite).toFixed(2).replace('.', ',')} €</strong>
                </div>
              ))}
              <hr className="sep" />
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="note">
                  {c.mode === 'fin-de-seance'
                    ? '🎯 À récupérer à la fin de la séance'
                    : '📬 Précommande (prochaine fournée)'}
                </span>
                <span className="prix-total">{c.total.toFixed(2).replace('.', ',')} €</span>
              </p>
              <p className="note">💳 À régler sur place à la récupération : carte bancaire ou chèque.</p>
            </article>
          ))}
        </div>
      )}

      <section className="carte" style={{ marginTop: '2.5rem' }}>
        <h3>🔄 Le parcours d’une commande</h3>
        <ol className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
          <li><strong>En attente</strong> : votre commande est reçue et attend confirmation.</li>
          <li><strong>Confirmée</strong> : les pâtisseries sont réservées pour vous.</li>
          <li><strong>Prête</strong> : tout est préparé et emballé.</li>
          <li><strong>Récupérée</strong> : dégustation time ! 🎉</li>
        </ol>
      </section>
    </div>
  )
}
