import CakeCard from '../components/CakeCard'
import { informationsAllergenes } from '../data/gateaux'
import { useApp } from '../context/AppContext'

export default function Boutique() {
  const { gateaux, eleve, panier } = useApp()

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>🍰 La boutique de gourmandises</h1>
        <p>
          Des pâtisseries artisanales préparées avec soin, à récupérer à la fin de votre séance
          ou en précommande. Toutes les saveurs du moment sont là !
        </p>
      </div>

      {!eleve && (
        <div className="message message-alerte">
          💡 Connectez-vous (bouton « Se connecter » en haut) pour ajouter des gourmandises à votre panier.
        </div>
      )}

      <div className="grille grille-3">
        {gateaux.map((g) => (
          <CakeCard key={g.id} gateau={g} />
        ))}
      </div>

      <section className="carte" style={{ marginTop: '3rem' }}>
        <h3>⚠️ Sécurité alimentaire &amp; allergènes</h3>
        <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.6rem' }}>
          {informationsAllergenes.map((info) => (
            <li key={info}>{info}</li>
          ))}
        </ul>
      </section>

      {panier.lignes.length > 0 && (
        <p className="note" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          🛒 Votre panier vous attend en bas de l’écran pour finaliser la commande.
        </p>
      )}
    </div>
  )
}
