import { useState } from 'react'

export default function Contact() {
  const [envoye, setEnvoye] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', sujet: 'Question sur les cours', message: '' })

  const maj = (champ) => (e) => setForm({ ...form, [champ]: e.target.value })

  const envoyer = (e) => {
    e.preventDefault()
    setEnvoye(true)
  }

  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Contact</h1>
        <p>Une question sur les cours, les gourmandises ou une allergie particulière ? Écrivez-nous ou appelez-nous !</p>
      </div>

      <div className="grille grille-2">
        <form className="carte" onSubmit={envoyer}>
          {envoye && (
            <div className="message">
              ✅ Merci {form.nom || 'à vous'} ! Votre message a bien été envoyé, une réponse arrivera très vite.
            </div>
          )}
          <div className="champ">
            <label htmlFor="nom">Votre nom</label>
            <input id="nom" required value={form.nom} onChange={maj('nom')} placeholder="Ex : Camille" />
          </div>
          <div className="champ">
            <label htmlFor="email">Votre e-mail</label>
            <input id="email" type="email" required value={form.email} onChange={maj('email')} placeholder="vous@exemple.fr" />
          </div>
          <div className="champ">
            <label htmlFor="sujet">Sujet</label>
            <select id="sujet" value={form.sujet} onChange={maj('sujet')}>
              <option>Question sur les cours</option>
              <option>Réservation d’une séance</option>
              <option>Commande de pâtisseries</option>
              <option>Allergie / régime alimentaire</option>
              <option>Autre question</option>
            </select>
          </div>
          <div className="champ">
            <label htmlFor="message">Votre message</label>
            <textarea id="message" rows="5" required value={form.message} onChange={maj('message')} placeholder="Bonjour, je voudrais…" />
          </div>
          <button className="btn btn-primaire" type="submit">Envoyer le message ✉️</button>
        </form>

        <div>
          <div className="carte" style={{ marginBottom: '1.5rem' }}>
            <h3>📍 Informations pratiques</h3>
            <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
              <li>📍 Fréjus (Var) : séances à domicile ou à la bibliothèque La Villa Marie ; le dimanche, à la bibliothèque de Saint-Raphaël.</li>
              <li>📞 Téléphone : à compléter</li>
              <li>✉️ E-mail : <a href="mailto:raphaelmaury83600@gmail.com">raphaelmaury83600@gmail.com</a></li>
              <li>Séances du lundi au samedi, après l’école et le mercredi.</li>
              <li>💳 Paiement sur place : carte bancaire (terminal) ou chèque.</li>
              <li>Gourmandises à récupérer à la fin de la séance.</li>
              <li>🔒 Aucune coordonnée bancaire ne circule sur ce site : le paiement se fait uniquement en personne.</li>
            </ul>
          </div>
          <div className="carte">
            <h3>⚠️ Allergies &amp; sécurité alimentaire</h3>
            <p className="note" style={{ marginTop: '0.5rem' }}>
              Signalez-nous toute allergie : les allergènes de chaque gourmandise sont indiqués sur la page
              Nos gourmandises, et nous vous conseillerons les douceurs adaptées. Pour les obligations
              d’étiquetage et de déclaration d’activité alimentaire, consultez economie.gouv.fr.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
