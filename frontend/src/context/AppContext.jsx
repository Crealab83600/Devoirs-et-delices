import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { gateauxInitiaux } from '../data/gateaux'
import { creerDisponibilitesInitiales } from '../data/disponibilites'

const CLE_STOCKAGE = 'devoirs-et-delices-v1'

const etatInitial = () => ({
  eleve: null,
  reservations: [],
  commandes: [],
  panier: { lignes: [], mode: 'fin-de-seance' },
  gateaux: gateauxInitiaux,
  creneaux: creerDisponibilitesInitiales(),
})

const AppContext = createContext(null)

function chargerEtat() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE)
    if (!brut) return etatInitial()
    const donnees = JSON.parse(brut)
    if (!donnees.creneaux || donnees.creneaux.length === 0) {
      donnees.creneaux = creerDisponibilitesInitiales()
    }
    return { ...etatInitial(), ...donnees }
  } catch {
    return etatInitial()
  }
}

export function AppProvider({ children }) {
  const [etat, setEtat] = useState(chargerEtat)

  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat))
  }, [etat])

  const value = useMemo(() => {
    const maj = (transformation) =>
      setEtat((etatActuel) => ({ ...etatActuel, ...transformation(etatActuel) }))

    return {
      ...etat,

      connexion: (nom, email) => maj(() => ({ eleve: { nom, email } })),
      deconnexion: () => maj(() => ({ eleve: null, panier: { lignes: [], mode: 'fin-de-seance' } })),

      reserver: ({ matiereId, dureeId, niveau, typeSeance, creneauId, objectif }) =>
        maj((e) => {
          const creneau = e.creneaux.find((c) => c.id === creneauId)
          if (!creneau || creneau.places < 1) return {}
          return {
            reservations: [
              ...e.reservations,
              {
                id: `res-${Date.now()}`,
                eleveNom: e.eleve ? e.eleve.nom : 'Élève invité',
                matiereId,
                dureeId,
                niveau,
                typeSeance,
                creneauId,
                date: creneau.date,
                heure: creneau.heure,
                lieu: creneau.lieu || 'Fréjus — domicile ou bibliothèque La Villa Marie',
                objectif: objectif || '',
                statut: 'en attente',
                commentaire: '',
              },
            ],
            creneaux: e.creneaux.map((c) =>
              c.id === creneauId ? { ...c, places: c.places - 1 } : c,
            ),
          }
        }),

      ajouterCommentaire: (reservationId, commentaire) =>
        maj((e) => ({
          reservations: e.reservations.map((r) =>
            r.id === reservationId ? { ...r, commentaire } : r,
          ),
        })),

      ajouterAuPanier: (gateauId) =>
        maj((e) => {
          const existante = e.panier.lignes.find((l) => l.gateauId === gateauId)
          const gateau = e.gateaux.find((g) => g.id === gateauId)
          if (!gateau) return {}
          const quantiteActuelle = existante ? existante.quantite : 0
          if (quantiteActuelle >= gateau.stock) return {}
          const lignes = existante
            ? e.panier.lignes.map((l) =>
                l.gateauId === gateauId ? { ...l, quantite: l.quantite + 1 } : l,
              )
            : [
                ...e.panier.lignes,
                { gateauId, nom: gateau.nom, prix: gateau.prix, emoji: gateau.emoji, quantite: 1 },
              ]
          return { panier: { ...e.panier, lignes } }
        }),

      retirerDuPanier: (gateauId) =>
        maj((e) => ({
          panier: {
            ...e.panier,
            lignes: e.panier.lignes
              .map((l) => (l.gateauId === gateauId ? { ...l, quantite: l.quantite - 1 } : l))
              .filter((l) => l.quantite > 0),
          },
        })),

      choisirModePanier: (mode) => maj((e) => ({ panier: { ...e.panier, mode } })),

      validerCommande: () =>
        maj((e) => {
          if (e.panier.lignes.length === 0) return {}
          const commande = {
            id: `cmd-${Date.now()}`,
            eleveNom: e.eleve ? e.eleve.nom : 'Élève invité',
            lignes: e.panier.lignes,
            total: e.panier.lignes.reduce((t, l) => t + l.prix * l.quantite, 0),
            mode: e.panier.mode,
            statut: 'en attente',
            dateCommande: new Date().toISOString().slice(0, 10),
          }
          const gateaux = e.gateaux.map((g) => {
            const ligne = e.panier.lignes.find((l) => l.gateauId === g.id)
            return ligne ? { ...g, stock: Math.max(0, g.stock - ligne.quantite) } : g
          })
          return {
            commandes: [...e.commandes, commande],
            gateaux,
            panier: { lignes: [], mode: 'fin-de-seance' },
          }
        }),

      confirmerReservation: (reservationId) =>
        maj((e) => ({
          reservations: e.reservations.map((r) =>
            r.id === reservationId ? { ...r, statut: 'confirmée' } : r,
          ),
        })),

      terminerReservation: (reservationId, commentaire) =>
        maj((e) => ({
          reservations: e.reservations.map((r) =>
            r.id === reservationId
              ? { ...r, statut: 'terminée', commentaire: commentaire || r.commentaire }
              : r,
          ),
        })),

      ajouterCreneau: (date, heure) =>
        maj((e) => ({
          creneaux: [
            ...e.creneaux,
            { id: `${date}-${heure}`, date, heure, places: 1 },
          ],
        })),

      supprimerCreneau: (creneauId) =>
        maj((e) => ({ creneaux: e.creneaux.filter((c) => c.id !== creneauId) })),

      ajouterGateau: (gateau) =>
        maj((e) => ({
          gateaux: [...e.gateaux, { ...gateau, id: `gateau-${Date.now()}` }],
        })),

      modifierStock: (gateauId, stock) =>
        maj((e) => ({
          gateaux: e.gateaux.map((g) => (g.id === gateauId ? { ...g, stock: Math.max(0, stock) } : g)),
        })),

      supprimerGateau: (gateauId) =>
        maj((e) => ({ gateaux: e.gateaux.filter((g) => g.id !== gateauId) })),

      confirmerCommande: (commandeId) =>
        maj((e) => ({
          commandes: e.commandes.map((c) =>
            c.id === commandeId ? { ...c, statut: 'confirmée' } : c,
          ),
        })),

      marquerPrete: (commandeId) =>
        maj((e) => ({
          commandes: e.commandes.map((c) =>
            c.id === commandeId ? { ...c, statut: 'prête' } : c,
          ),
        })),

      marquerRecuperee: (commandeId) =>
        maj((e) => ({
          commandes: e.commandes.map((c) =>
            c.id === commandeId ? { ...c, statut: 'récupérée' } : c,
          ),
        })),

      reinitialiser: () => setEtat(etatInitial()),
    }
  }, [etat])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
