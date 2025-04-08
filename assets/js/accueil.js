//Imports
import navigation from "./components/navigation.js";
import modeNuit from "./components/navigation.js";

//Selections HTML
const grilleProduitsHTML = document.querySelector(".grilleProduits");
const imgFleurHTML = document.querySelector(".imgFleur");
const especeFleurHTML = document.querySelector(".especeFleur");
const uniteFleurHTML = document.querySelector(".uniteFleur");
const bouquetFleurHTML = document.querySelector(".bouquetFleur");
const enStockFleurHTML = document.querySelector(".enStockFleur");
const boutonTrieAlphaHTML = document.querySelector("[id=tri-alpha-croissant]");
const boutonTriePrixUnitHTML = document.querySelector("[id=tri-prix-unitaire]");
const boutonTriePrixBouqHTML = document.querySelector("[id=tri-prix-bouquet]");
//Creation du tableau d'objects pour chacunes des fleurs en vente dans le projet
//Source image: unsplash.com
//Creations de la liste de produits a vendre, des fleurs dans le cas present
const listeFleurs = [
  {
    id: 1,
    espece: "Aster Chinoise",
    prixUnitaire: 2,
    prixBouquet: 19,
    enStock: true,
    image: "assets/img/aster_chinoise.jpg",
  },
  {
    id: 2,
    espece: "Hydrangée Arborescente",
    prixUnitaire: 3,
    prixBouquet: 25,
    enStock: true,
    image: "assets/img/hydrangee_arborescente.jpg",
  },
  {
    id: 3,
    espece: "Marguerite de Paris",
    prixUnitaire: 1.5,
    prixBouquet: 20,
    enStock: false,
    image: "assets/img/marguerite_de_paris.jpg",
  },
  {
    id: 4,
    espece: "Tulippe de Jardin",
    prixUnitaire: 2,
    prixBouquet: 24,
    enStock: false,
    image: "assets/img/tulippe_de_jardin.jpg",
  },
  {
    id: 5,
    espece: "Rose Anglaise",
    prixUnitaire: 3.5,
    prixBouquet: 31,
    enStock: true,
    image: "assets/img/rose_anglaise.jpg",
  },
  {
    id: 6,
    espece: "Pivoine Chinoise",
    prixUnitaire: 4,
    prixBouquet: 18,
    enStock: true,
    image: "assets/img/pivoine_chinoise.jpg",
  },
];

//Fonctions
// //Fonction d'initialisation

function init() {
  navigation();
  afficherGrilleFleurs(listeFleurs);
  ajoutClicFiltre();
  modeNuit();
}
// //Ajout d'ecouteur d'evenement click sur les boutons de filtre
function ajoutClicFiltre() {
  boutonTrieAlphaHTML.addEventListener("click", clicAZ);
  boutonTriePrixUnitHTML.addEventListener("click", clicUnit);
  boutonTriePrixBouqHTML.addEventListener("click", clicBouquet);
}
// //Generation des articles de la page
// // //Creation d'une fonction qui transforme un array d'objets en parties individuelles
function afficherGrilleFleurs(grilleFleurs) {
  //Vider la liste
  grilleProduitsHTML.innerHTML = "";
  //Pour chaque élément de la liste, générer le html en conséquence
  for (let i = 0; i < grilleFleurs.length; i++) {
    const fleur = grilleFleurs[i];
    genererGrille(fleur);
  }
}
// // //Generation des elements HTML pour la grille de produits et injection dans le code
function genererGrille(fleur) {
  //Parcour des objets du tableau d'objet
  const fleurDetails = `<div class="fleurs" id="${fleur.id}">
    <h2 class="espece">${fleur.espece}</h2>
    </div>`;
  grilleProduitsHTML.insertAdjacentHTML("beforeend", fleurDetails);
  const elementGrille = grilleProduitsHTML.lastElementChild;
  //Ajouter un écouteur d'événement
  elementGrille.addEventListener("click", clicFleur);
}

//Fonction qui s'active avec le clique des noms de fleurs

function clicFleur(evenement) {
  const declencheur = evenement.currentTarget;
  let id = declencheur.id;
  id = Number(id);
  const clicFleur = rechercheElementFleurs(listeFleurs, id);
  afficherFleur(clicFleur);
}

// 3 fonctions qui s'actives avec le clic des boutons de filtres
function clicAZ(evenement) {
  //Récupérer le déclencheur
  const declencheur = evenement.currentTarget;
  //Récupérer le id
  let id = declencheur.id;
  // S'assurer que l'id est un nombre
  id = Number(id);
  //Trie Alphabetique
  const fleurAZ = trieAZ(listeFleurs);
  //Trouver la fleur
  afficherGrilleFleurs(fleurAZ);
}

function clicUnit() {
  const fleurUnit = triePrixUnit(listeFleurs);
  afficherGrilleFleurs(fleurUnit);
}

function clicBouquet() {
  const fleurBouquet = triePrixBouq(listeFleurs);
  afficherGrilleFleurs(fleurBouquet);
}

//Fonction qui affiche la portion detail des fleurs
function afficherFleur(fleur) {
  imgFleurHTML.src = fleur.image;
  imgFleurHTML.alt = fleur.espece;
  especeFleurHTML.textContent = `Espèce: ${fleur.espece}`;
  uniteFleurHTML.textContent = `Prix Unitaire:${fleur.prixUnitaire}$`;
  bouquetFleurHTML.textContent = `Prix Bouquet: ${fleur.prixBouquet}$`;
  if (fleur.enStock) {
    enStockFleurHTML.textContent = "En Stock";
  } else {
    enStockFleurHTML.textContent = "Rupture de Stock";
  }
}

//Fonction qui recherche les arrays d'objets pour un fleur portant un id en particulier
function rechercheElementFleurs(tableau, id) {
  id = Number(id);
  for (let i = 0; i < tableau.length; i++) {
    let elementTableau = tableau[i];
    let idElementTableau = elementTableau.id;
    if (id == idElementTableau) {
      return elementTableau;
    }
  }
}

//3 fonctions qui tries les elements de la grille de produits selon le filtre selectionner
function trieAZ(tableau) {
  let copie = [...tableau];
  copie.sort(function (a, b) {
    if (a.espece < b.espece) {
      return -1;
    } else if (a.espece > b.espece) {
      return 1;
    } else {
      return 0;
    }
  });
  return copie;
}
function triePrixUnit(tableau) {
  let copie = [...tableau];
  copie.sort(function (a, b) {
    if (a.prixUnitaire < b.prixUnitaire) {
      return -1;
    } else if (a.prixUnitaire > b.prixUnitaire) {
      return 1;
    } else {
      return 0;
    }
  });
  return copie;
}
function triePrixBouq(tableau) {
  let copie = [...tableau];
  copie.sort(function (a, b) {
    if (a.prixBouquet < b.prixBouquet) {
      return -1;
    } else if (a.prixBouquet > b.prixBouquet) {
      return 1;
    } else {
      return 0;
    }
  });
  return copie;
}
//Execution du code

init();
