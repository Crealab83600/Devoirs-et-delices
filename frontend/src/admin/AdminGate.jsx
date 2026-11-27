import { useState } from 'react'
import { ADMIN_CODE } from './code'

const CLE = 'dd-admin-autorise'

export default function AdminGate({ children }) {
  const [autorise, setAutorise] = useState(() => sessionStorage.getItem(CLE) === '1')
  const [code, setCode] = useState('')
  const [erreur, setErreur] = useState(false)

  if (autorise) return children

  const valider = (e) => {
    e.preventDefault()
    if (code === ADMIN_CODE) {
      sessionStorage.setItem(CLE, '1')
      setAutorise(true)
    } else {
      setErreur(true)
    }
  }

  return (
    <div className="page container" style={{ maxWidth: 480 }}>
      <div className="entete-page">
        <h1>⚙️ Administration</h1>
        <p>Espace privé réservé au gestionnaire de la plateforme.</p>
      </div>
      <form className="carte" onSubmit={valider}>
        <div className="champ">
          <label htmlFor="code-admin">Code d’accès</label>
          <input
            id="code-admin"
            type="password"
            autoFocus
            value={code}
            onChange={(e) => { setCode(e.target.value); setErreur(false) }}
            placeholder="Entrez le code d’accès"
          />
        </div>
        {erreur && (
          <div className="message message-alerte">Code incorrect. Réessayez.</div>
        )}
        <button className="btn btn-choco" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
          Déverrouiller 🔐
        </button>
        <p className="note" style={{ marginTop: '1rem' }}>
          🔒 Ce code est un premier filtre pour les visiteurs. Pour une protection réelle
          (comptes et mots de passe chiffrés côté serveur), il faudra un backend —
          indispensable également pour les paiements en ligne.
        </p>
      </form>
    </div>
  )
}
