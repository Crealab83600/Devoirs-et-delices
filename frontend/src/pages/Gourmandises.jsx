import { Link } from 'react-router-dom'
import CakeCard from '../components/CakeCard'
import { reglesSanitaires } from '../data/gateaux'
import { useApp } from '../context/AppContext'

export default function Gourmandises() {
  const { gateaux, eleve, panier } = useApp()

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>🍰 Nos gourmandises</h1>
        <p>
          Des pâtisseries maison préparées avec soin, à réserver avant la séance et à récupérer
          à la fin du cours. Après l’effort, le réconfort !
        </p>
      </div>

      {!eleve && (
        <div className="message message-alerte">
          💡 Connectez-vous (bouton « Se connecter » en haut) pour réserver vos gourmandises.
        </div>
      )}

      <div className="grille grille-3">
        {gateaux.map((g) => (
          <CakeCard key={g.id} gateau={g} />
        ))}
      </div>

      <section className="carte" style={{ marginTop: '3rem' }}>
        <h3>🧼 Hygiène &amp; règles sanitaires</h3>
        <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.6rem' }}>
          {reglesSanitaires.map((r) => (
            <li key={r}>{r}</li>
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
