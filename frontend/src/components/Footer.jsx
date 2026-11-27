import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h4>📖🍰 Devoirs &amp; Délices</h4>
          <p>Apprendre avec plaisir,<br />savourer avec gourmandise !</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <p>
            <Link to="/services">Nos services</Link><br />
            <Link to="/tarifs">Nos tarifs</Link><br />
            <Link to="/reserver">Réserver une séance</Link><br />
            <Link to="/gourmandises">Nos gourmandises</Link>
          </p>
        </div>
        <div>
          <h4>📍 Fréjus &amp; Saint-Raphaël</h4>
          <p>
            Séances à domicile, à La Villa Marie<br />
            (Fréjus) ou à la bibliothèque de<br />
            Saint-Raphaël. Paiement : CB ou chèque.
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            📞 <a href="tel:+33650021565">06 50 02 15 65</a><br />
            ✉️ raphaelmaury83600@gmail.com
          </p>
        </div>
        <div>
          <h4>Sécurité alimentaire</h4>
          <p>
            Allergènes indiqués sur chaque fiche produit.<br />
            Renseignez-vous sur les règles d’étiquetage et la<br />
            déclaration d’activité alimentaire sur economie.gouv.fr.
          </p>
        </div>
      </div>
      <div className="container footer-bas">
        © {new Date().getFullYear()} Devoirs &amp; Délices — Soutien scolaire &amp; pâtisseries maison.
      </div>
    </footer>
  )
}
