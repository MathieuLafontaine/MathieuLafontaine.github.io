//============================
// Selections HTML et variables
//============================

const boutonsHTML = document.querySelectorAll("[data-direction]");
const bannieresHTML = document.querySelectorAll("[data-ordre]");

//Variable pour bouger le carrousel. Elle est appelee plus loin dans le code

let intervalle;
let animation;
let banniereActive = 1;

//============================
// Fonctions
//============================

//Execution

export default function init() {

  /*Ajout des event listeners qui pourront animer et changer les images du carrousel*/
  boutonsHTML.forEach(function (boutonHTML) {
    boutonHTML.addEventListener("click", changerClickCarrousel);
    boutonHTML.addEventListener("mouseenter", zoomBoutons);
    boutonHTML.addEventListener("mouseleave", stopZoom);
  });

  compterCarrousel();
}

/**
 * Fonction qui active la fonction changerAutoCarrousel après un intervalle de 8s
 * @returns {Function} changerAutoCarrousel - Après 8s
 */

function compterCarrousel() {

  intervalle = setInterval(changerAutoCarrousel, 8000);
  return intervalle;
}

/**
 * Fonction augmente la variable banniere active, puis active la fonction show
 * @returns {Function} changerAutoCarrousel - Après 8s
 */

function changerAutoCarrousel() {
  banniereActive++;
  banniereShow(banniereActive);
}

/**
 * Fonction qui augmente la variable bannière lors du click des boutons, puis active la fonction show
 * @param {Event} click - click d'un des boutons flèches du carrousel
 */
function changerClickCarrousel(event) {
  const boutonHTML = event.currentTarget;
  let direction = Number(boutonHTML.getAttribute("data-direction"));

  if (direction === 1) {
    banniereActive++;
    banniereShow(banniereActive);
  } else {
    banniereActive--;
    banniereShow(banniereActive);
  }

  //Clear de l'interval presentement actif afin d'eviter que le carrousel bouge deux fois dans un cours intervalle
  //du au compteur presentement actif
  clearInterval(intervalle);
  compterCarrousel();
}

/**
 * Fonction qui change l'image du carrousel selon le numéro de la variable banniereActive
 * @param {Number} numeroBanniere - variable banniereActive, déterminée par l'intervalle et le click des flèches du carrousel
 */

function banniereShow(numeroBanniere) {

  //On loop le carrousel afin que dès que l'on sort des limites, nous retournons au début ou à la fin dépendant du bouton cliqué ou
  //du mouvement automatique
  if (numeroBanniere > bannieresHTML.length) {

    numeroBanniere = 1;

  } 
  else if (numeroBanniere < 1) {

    numeroBanniere = bannieresHTML.length;

  }

  banniereActive = numeroBanniere;
  /* console.log(`${banniereActive}`); */

  for (let i = 0; i < bannieresHTML.length; i++) {

    let banniereHTML = bannieresHTML[i];

    if (banniereActive != i + 1) {

      banniereHTML.classList.add("invisible");
      /* console.log("Nous avons ajouter invisible"); */
    } 
    else {

      banniereHTML.classList.remove("invisible");
      /*console.log("nous avons retirer invisible"); */

    }
  }
}

/**
 * Fonction qui active l'animation du zoom des boutons
 * @param {Event} mouseenter - hover sur les boutons du carrousel
 * @returns {Animation} animation - zoom sur les boutons du carrousel, se répète infiniments tant que le curseur demeure sur le bouton
 */

function zoomBoutons(event) {

  let boutonHTML = event.currentTarget;
  
  animation = boutonHTML.animate([{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }], {
    duration: 1000,
    easing: "ease-out",
    iterations: Infinity,
  });
  return animation;
}

/**
 * Fonction qui arrête l'animation du zoom des boutons
 * @param {Event} mouseleave - arrêt du hover sur les boutons du carrousel
 */
function stopZoom(event) {
  let boutonHTML = event.currentTarget;

  if (animation) {
    animation.cancel();
  }
}
