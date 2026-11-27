const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export function formaterDate(iso) {
  const d = new Date(iso + 'T12:00:00')
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`
}

export function creerDisponibilitesInitiales() {
  const creneaux = []
  const aujourdhui = new Date()
  for (let i = 1; i <= 21; i += 1) {
    const d = new Date(aujourdhui)
    d.setDate(aujourdhui.getDate() + i)
    const jour = d.getDay()
    if (jour === 3 || jour === 6) {
      creneaux.push({
        id: `${d.toISOString().slice(0, 10)}-14h00`,
        date: d.toISOString().slice(0, 10),
        heure: '14h00',
        places: 1,
      })
      creneaux.push({
        id: `${d.toISOString().slice(0, 10)}-16h00`,
        date: d.toISOString().slice(0, 10),
        heure: '16h00',
        places: 1,
      })
    } else if (jour === 1 || jour === 2 || jour === 4 || jour === 5) {
      creneaux.push({
        id: `${d.toISOString().slice(0, 10)}-17h30`,
        date: d.toISOString().slice(0, 10),
        heure: '17h30',
        places: 1,
      })
    }
  }
  return creneaux
}
