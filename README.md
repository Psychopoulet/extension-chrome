# LinkedIn Company Tracker

Extension Chrome pour suivre des sociétés LinkedIn avec les statuts **banni**, **ESN** et **suspect**.

## Installation

```bash
npm install
npm run build
```

1. Ouvrir `chrome://extensions`
2. Activer le **mode développeur**
3. **Charger l'extension non empaquetée** → dossier `dist/`

## Développement

```bash
npm run dev
```

Vite regénère `dist/` à chaque modification. Actualiser l'extension dans `chrome://extensions` si besoin.

## Pages prises en charge

| Page | Comportement |
|------|--------------|
| `/company/{code}/` | Nom colorisé + tooltip, ou bouton **+** pour ajouter |
| `/jobs/search/` et `/jobs/search-results/` | Nom d'entreprise colorisé (liste + détail) + tooltip |
| `/jobs-tracker/` | Nom d'entreprise colorisé dans le suivi des emplois + tooltip |
| `/jobs/view/` | Nom d'entreprise colorisé + tooltip |

## Fonctionnalités

- Liste locale persistante (`chrome.storage.local`)
- Popup : ajout, modification, suppression, recherche, filtre par statut
- Sync automatique entre onglets LinkedIn ouverts
- Navigation SPA LinkedIn (pushState, mutations DOM)

## Test manuel

1. Ajouter une société via la popup (ex. `capgemini`, statut ESN, raison)
2. Ouvrir `linkedin.com/company/capgemini/` → nom jaune, bulle au survol
3. Ouvrir une recherche jobs contenant Capgemini → noms d'entreprise jaunes (liste + détail)
4. Modifier le statut dans la popup → les onglets LinkedIn se mettent à jour
5. Fermer et rouvrir Chrome → la liste est conservée

## Statuts visuels

| Statut | Couleur |
|--------|---------|
| banni | Rouge |
| ESN / suspect | Jaune |

Voir [PLAN.md](./PLAN.md) pour l'architecture complète.
