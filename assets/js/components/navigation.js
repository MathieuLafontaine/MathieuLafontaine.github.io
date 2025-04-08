//Selection du texte du NAV afin de pouvoire remplacer celui-ci avec des elements de tableau.
let menu = document.querySelector(".nav__liste");
//Tableau du menu de navigation
const tableauMenu = ["Accueil", "Promo", "Contact", "Commande"];

//Fonctions

////Fonction d'initialisation
export default function init() {
  affichageNavigation();
}

////Fonction pour la generation du menu
function affichageNavigation() {
  for (let i = 0; i < tableauMenu.length; i++) {
    //formatte de l'element pour effectuer des verifications plus tard
    let pageFormattee = formatteHyperlien(`${tableauMenu[i]}`);
    let temporaire = `<li><a href="${pageFormattee}">${tableauMenu[i]}</a></li>`;
    menu.insertAdjacentHTML("beforeend", temporaire);
    //Creation d'un tableau avec la commande split qui divise l'URL a chacun des / de celui-ci
    const URL = document.URL;
    const tableauURL = URL.split("/");
    const elementURL = tableauURL[5];
    // //Conditionnelle qui permet de highlight la fonction active
    if (`${elementURL}` === `${pageFormattee}`) {
      menu.lastElementChild.style.textDecoration = "underline";
    }
  }
}

////Fonction pour le formattage du menu
function formatteHyperlien(hyperlien) {
  //Retirer les espaces au debut et a la fin
  hyperlien = hyperlien.trim();
  //Mettre en minuscule
  hyperlien = hyperlien.toLowerCase();
  //Remplacer les espaces
  hyperlien = hyperlien.replaceAll(" ", "");
  //Retirer les diacritiques avec normalize
  hyperlien = hyperlien.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  //Ajouter l'extension du fichier
  let cheminComplet = `${hyperlien}.html`;
  //Retourner le chemin complet
  return cheminComplet;
}