import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PanierFlottant from './components/PanierFlottant'
import Accueil from './pages/Accueil'
import Services from './pages/Services'
import Matieres from './pages/Matieres'
import Tarifs from './pages/Tarifs'
import Reserver from './pages/Reserver'
import Gourmandises from './pages/Gourmandises'
import MesCommandes from './pages/MesCommandes'
import MonEspace from './pages/MonEspace'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Admin from './admin/Admin'
import './styles/global.css'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/services" element={<Services />} />
            <Route path="/matieres" element={<Matieres />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/reserver" element={<Reserver />} />
            <Route path="/gourmandises" element={<Gourmandises />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/mon-espace" element={<MonEspace />} />
            <Route path="/apropos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Accueil />} />
          </Routes>
        </main>
        <Footer />
        <PanierFlottant />
      </div>
    </HashRouter>
  )
}
