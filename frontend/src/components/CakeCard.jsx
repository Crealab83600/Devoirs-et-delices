import { useApp } from '../context/AppContext'

export default function CakeCard({ gateau }) {
  const { ajouterAuPanier, eleve } = useApp()
  const enRupture = gateau.stock <= 0

  return (
    <article className="carte carte-gateau">
      <div className="visuel" aria-hidden="true">{gateau.emoji}</div>
      <h3>{gateau.nom}</h3>
      <p className="prix">{gateau.prix.toFixed(2).replace('.', ',')} €</p>
      <p className="note">{gateau.description}</p>
      <div className="allergenes">
        <span className="etiquette">⚠️ Allergènes :</span>
        {gateau.allergenes.map((a) => (
          <span key={a} className="etiquette">{a}</span>
        ))}
      </div>
      {gateau.precommande && (
        <span className="badge badge-attente">Sur précommande</span>
      )}
      <p className="note">
        {enRupture
          ? 'Rupture de stock — pensez à la précommande !'
          : `${gateau.stock} disponible${gateau.stock > 1 ? 's' : ''}`}
      </p>
      <button
        className="btn btn-primaire"
        disabled={enRupture || !eleve}
        onClick={() => ajouterAuPanier(gateau.id)}
      >
        {!eleve ? 'Connectez-vous pour commander' : enRupture ? 'Épuisé' : 'Ajouter au panier'}
      </button>
    </article>
  )
}
