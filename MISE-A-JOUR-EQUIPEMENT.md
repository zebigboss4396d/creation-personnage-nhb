# Correction du catalogue et de la fiche classique — 18 octobre 2026

## Installation sur le site GitHub

Décompresser l’archive puis envoyer ses fichiers dans le dépôt `creation-personnage-nhb` avec **Add file → Upload files**, en remplaçant les fichiers existants. Les deux nouveaux modules `equipment-routing.js` et `equipment-quantities.js` doivent être ajoutés avec les fichiers modifiés. Enregistrer avec **Commit changes**, attendre la publication GitHub Pages et recharger le site.

La mise à jour concerne le créateur de personnages, pas le site de background.

## Répartition sur la fiche classique

- Page 1 : protections triées par torse, pieds/jambes, mains/bras, tête, puis bouclier ; vêtements ordinaires après les protections.
- Page 2 : sacs à dos, besaces, autres contenants et bourses dans leurs lignes respectives ; aucun doublon dans les objets spéciaux.
- Camping : tente, matelas et couverture dans leurs cases ; éclairage, feu et matériel de bivouac dans les lignes en dessous.
- Objets spéciaux : objets enchantés, artefacts, bijoux magiques et vêtements à effets particuliers tels que les capes concernées ; plus aucun classement par défaut du matériel ordinaire dans cet encart.
- Animaux, montures et véhicules : Machins précieux.
- Munitions et nourriture identiques : une entrée avec quantité, par exemple « Flèche de base ×5 ». Le panier recalcule les quantités et le prix total après chaque ajout ou retrait. Les munitions occupent les lignes d’armes disponibles après les armes ; l’annexe conserve toujours l’inventaire complet.

Les emplacements du modèle original sont en nombre limité. Les entrées dépassant le nombre de lignes disponibles restent détaillées dans l’annexe de création jointe au PDF. Les livres et ingrédients sans case dédiée dans le modèle classique y sont également conservés.

## Catalogue

- Choix explicite Épée, Sabre ou Rapière pour les quatre entrées regroupées ; nom exact repris au panier et au PDF. Prix et effets inchangés.
- Dégâts, PR, modificateurs et rupture présentés en blocs distincts. Les précisions complètes du tableau restent consultables.
- Rupture affichée sous la forme « Rupt: 1 à x » lorsque le tableau indique une plage de rupture.
- PR absente d’une protection : PR 0.
- Livres ordinaires et connaissances supprimés du choix pour tous les profils.
- Manuels de départ de magie et de culte conservés selon le métier et l’affiliation.

## Contrôles réalisés

Tests des actions d’ajout/retrait du panier, regroupement des quantités et conservation des variantes d’armes ; contrôle des destinations du matériel et de la PR 0 ; génération d’une fiche classique remplie ; contrôle des champs PDF interactifs et de leurs apparences ; rendu et inspection des deux premières pages.

Le rendu interactif dans un navigateur n’a pas été testé dans cet environnement. Aucun fichier n’a été envoyé directement dans le dépôt GitHub : l’archive doit y être importée.
