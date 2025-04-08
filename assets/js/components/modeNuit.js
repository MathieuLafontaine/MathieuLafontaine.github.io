// Variables
let animation;

// Sélection HTML
const conteneurModeHTML = document.querySelector("[data-mode-conteneur]");
const boutonsModeHTML = document.querySelectorAll("[data-mode-option]");

export default function init() {
  //Récupérer ce que le theme precedant dans le localStorage et mettre une valeur par default
  const modeEnregistre = localStorage.getItem("theme") || "jour";

  changerMode(modeEnregistre);
  //Ajout d'un ecouteur de click pour les boutons de themes
  conteneurModeHTML.addEventListener("click", auClicMode);
}

/**
 * Fonction qui sert à activer les fonctions nécessaires pour changers les modes jours et nuits lors du click de l'icône
 * @param {Event} Click de l'icone du bouton
 */

function auClicMode(evenement) {

  const modeClic = evenement.target;
  const boutonMode = modeClic.closest("[data-mode-option]");

  //Conditionnelle placee si le bouton est clique
  if (boutonMode) {

    //On recupere le mode choisi
    const mode = boutonMode.dataset.modeOption;

    //On enregistre le mode dans le localStorage
    enregistrerMode(mode);
  }
}

/**
 * Fonction qui sert à modifier l'apparence des boutons mode jour et nuit ET à animer ceux-ci
 * @param {String} mode - mode "nuit" ou "jour"
 * @returns {animation} - Animation qui fait tourner les icones de jour et nuit au load de la page et lors du click
 */

function changerApparenceBoutons(nouveauMode) {

  boutonsModeHTML.forEach(function (boutonHTML) {

    const mode = boutonHTML.dataset.modeOption;
    //on cache l'ancien bouton
    boutonHTML.classList.toggle("boite-modale__invisible", mode == nouveauMode);

    //Activation de l'animation de rotation
    animation = boutonHTML.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }, { transform: "rotate(0deg)" }],
      {
        duration: 1000,
        iterations: 2,
      }
    );
    return animation;
  });
}

/**
 * Fonction qui sert à modifier le mode de nuit à jour
 * @param {String} mode - mode "nuit" ou "jour"
 */
function changerMode(mode) {

  document.body.dataset.theme = mode;
  changerApparenceBoutons(mode);

}

/**
 * Fonction qui sert à changer la donnée storée dans le local storage pour
 * le mode jour et nuit et activer le changement de mode
 * @param {String} nouveauMode - "nuit" ou "jour"
 */
function enregistrerMode(nouveauMode) {

  changerMode(nouveauMode);
  localStorage.setItem("theme", nouveauMode);
  
}
