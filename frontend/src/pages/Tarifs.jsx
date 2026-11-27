import { Link } from 'react-router-dom'
import { niveaux, grilleIndividuel, tarifGroupe, forfaits, offresCommerciales, conditionsForfaits, moyensPaiement, lieux, reperesTarifaires, facteursPrix } from '../data/tarifs'

const euros = (n) => `${n} €`
const labelDuree = (d) => (d === '1h' ? '1 heure' : d === '1h30' ? '1 h 30' : '2 heures')

export default function Tarifs() {
  return (
    <div className="page container">
      <div className="entete-page">
        <h1>Nos tarifs</h1>
        <p>
          Une grille claire et transparente, pensée pour les familles de Fréjus et du Var.
          Le règlement se fait sur place, après la séance.
        </p>
      </div>

      <section>
        <h2 className="section-titre">👨‍🏫 Soutien scolaire individuel</h2>
        <div className="carte" style={{ overflowX: 'auto' }}>
          <table className="tableau">
            <thead>
              <tr>
                <th>Durée</th>
                {niveaux.map((n) => (
                  <th key={n.id}>{n.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['1h', '1h30', '2h'].map((d) => (
                <tr key={d}>
                  <td><strong>{labelDuree(d)}</strong></td>
                  {niveaux.map((n) => (
                    <td key={n.id}>{euros(grilleIndividuel[n.id][d])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="section-titre">👥 Soutien en petit groupe (2 à 4 élèves)</h2>
        <div className="carte">
          <table className="tableau">
            <thead>
              <tr><th>Durée</th><th>Tarif par élève</th></tr>
            </thead>
            <tbody>
              {['1h', '1h30', '2h'].map((d) => (
                <tr key={d}>
                  <td><strong>{labelDuree(d)}</strong></td>
                  <td>{euros(tarifGroupe[d])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="section-titre">🎟️ Forfaits avantageux</h2>
        <div className="carte" style={{ overflowX: 'auto' }}>
          <table className="tableau">
            <thead>
              <tr>
                <th>Forfait</th>
                {niveaux.map((n) => (
                  <th key={n.id}>{n.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forfaits.map((f) => (
                <tr key={f.id}>
                  <td><strong>{f.nom}</strong></td>
                  {niveaux.map((n) => (
                    <td key={n.id}>{euros(f.prix[n.id])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '1rem' }}>
            {conditionsForfaits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="section-titre">📊 Repères tarifaires du marché</h2>
        <div className="grille grille-2">
          {reperesTarifaires.map((r) => (
            <div key={r.titre} className="carte">
              <h3>{r.titre}</h3>
              <p className="note">{r.texte}</p>
            </div>
          ))}
        </div>
        <div className="carte" style={{ marginTop: '1.5rem' }}>
          <h3>⚖️ Ce qui fait varier le prix</h3>
          <ul className="note" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
            {facteursPrix.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="section-titre">🎁 Nos offres commerciales</h2>
        <div className="grille grille-2">
          {offresCommerciales.map((o) => (
            <div key={o.id} className="carte">
              <h3>{o.emoji} {o.nom}</h3>
              <p className="note">{o.avantage}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-titre">📍 Nos lieux</h2>
        <div className="grille grille-2" style={{ marginBottom: '2rem' }}>
          {lieux.map((l) => (
            <div key={l.id} className="carte">
              <h3>{l.emoji} {l.nom}</h3>
              <p className="note">{l.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-titre">💳 Moyens de paiement</h2>
        <div className="carte">
          <ul className="note" style={{ paddingLeft: '1.2rem' }}>
            {moyensPaiement.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="note" style={{ marginTop: '0.8rem' }}>
            Pas de paiement en ligne pour le moment : simple, sans frais ni commission.
            Un acompte en ligne pourra être ajouté plus tard si nécessaire.
          </p>
        </div>
      </section>

      <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/reserver" className="btn btn-primaire">Réserver une première séance</Link>
      </p>
    </div>
  )
}
