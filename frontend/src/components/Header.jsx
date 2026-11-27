import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const liens = [
  { to: '/', label: 'Accueil' },
  { to: '/cours', label: 'Nos cours' },
  { to: '/reserver', label: 'Réserver' },
  { to: '/boutique', label: 'Boutique' },
  { to: '/mes-commandes', label: 'Mes commandes' },
  { to: '/mon-espace', label: 'Mon espace' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { eleve, connexion, deconnexion } = useApp()
  const [nom, setNom] = useState('')
  const [ouvert, setOuvert] = useState(false)

  const seConnecter = (e) => {
    e.preventDefault()
    if (nom.trim()) {
      connexion(nom.trim(), `${nom.trim().toLowerCase().replace(/\s+/g, '.')}@exemple.fr`)
      setNom('')
      setOuvert(false)
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOuvert(false)}>
          <span className="emoji">📖🍰</span>
          <span>Devoirs &amp; Délices</span>
        </Link>
        <nav className="nav-liens">
          {liens.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'actif' : '')}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'actif' : '')}>
            Administration
          </NavLink>
        </nav>
        {eleve ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-confirmee">👋 {eleve.nom}</span>
            <button className="btn btn-secondaire btn-petit" onClick={deconnexion}>
              Déconnexion
            </button>
          </div>
        ) : ouvert ? (
          <form onSubmit={seConnecter} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              autoFocus
              placeholder="Votre prénom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              style={{ border: '2px solid var(--rose)', borderRadius: 12, padding: '0.4rem 0.7rem', fontFamily: 'Quicksand' }}
            />
            <button className="btn btn-primaire btn-petit" type="submit">Entrer</button>
          </form>
        ) : (
          <button className="btn btn-primaire btn-petit" onClick={() => setOuvert(true)}>
            Se connecter
          </button>
        )}
      </div>
    </header>
  )
}
