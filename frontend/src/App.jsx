import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PanierFlottant from './components/PanierFlottant'
import Accueil from './pages/Accueil'
import Cours from './pages/Cours'
import Reserver from './pages/Reserver'
import Boutique from './pages/Boutique'
import MesCommandes from './pages/MesCommandes'
import MonEspace from './pages/MonEspace'
import Contact from './pages/Contact'
import Admin from './admin/Admin'
import './styles/global.css'

export default function App() {
  return (
    <AppShell />
  )
}

function AppShell() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/reserver" element={<Reserver />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/mon-espace" element={<MonEspace />} />
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
