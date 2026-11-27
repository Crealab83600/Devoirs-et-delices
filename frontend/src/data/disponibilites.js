const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export const HORAIRES = ['13h30', '14h30', '15h30', '16h30']

export const LIEU_FREJUS = 'Fréjus — domicile ou bibliothèque La Villa Marie'
export const LIEU_SAINT_RAPHAEL = 'Bibliothèque de Saint-Raphaël'

export function formaterDate(iso) {
  const d = new Date(iso + 'T12:00:00')
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`
}

export function creerDisponibilitesInitiales() {
  const creneaux = []
  const aujourdhui = new Date()
  for (let i = 1; i <= 28; i += 1) {
    const d = new Date(aujourdhui)
    d.setDate(aujourdhui.getDate() + i)
    const jour = d.getDay()
    if (jour === 3 || jour === 6) {
      HORAIRES.forEach((heure) => {
        creneaux.push({
          id: `${d.toISOString().slice(0, 10)}-${heure}`,
          date: d.toISOString().slice(0, 10),
          heure,
          lieu: LIEU_FREJUS,
          places: 1,
        })
      })
    } else if (jour === 0) {
      HORAIRES.forEach((heure) => {
        creneaux.push({
          id: `${d.toISOString().slice(0, 10)}-${heure}`,
          date: d.toISOString().slice(0, 10),
          heure,
          lieu: LIEU_SAINT_RAPHAEL,
          places: 1,
        })
      })
    }
  }
  return creneaux
}
