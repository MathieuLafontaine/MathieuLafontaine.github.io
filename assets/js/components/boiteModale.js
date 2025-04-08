//============================
// Sélections HTML
//============================

const contenuHTML = document.querySelector(".contenu__principal");

//============================
// Variables
//============================

let boutonHTML;
let elementHTML;
let conteneurHTML;

//============================
// Fonctions
//============================

//Export de init
export default function init(conteneur, message) {
  conteneurHTML = conteneur;

  //Affichage de la boite modale seulement si le local storage ne contient pas la valeur infolettre
  if (!localStorage.getItem("infolettre")) {

    injecterHTML(message);

    //Timer de 5 secondes avant que la boite modale s'affiche
    setTimeout(afficherModale, 5000);
  }
}

/**
 * Fonction servant à prévenir le défaut du formulaire afin que l'infolettre se ferme à la place
 * (prévient la gestion de la donnée)
 * @param {Event} click - click sur le bouton submit de la boite modale
 */
function onClicSubmit(event) {

  //console.log(evenement.defaultPrevented);
  event.preventDefault();
  //console.log(evenement.defaultPrevented);

  animerFermetureModale();
  localStorage.setItem("infolettre", true);

}

/**
 * Fonction servant à injecter le HTML de la boite modale dans le conteneur de celle-ci
 * @param {String} message que l'on desire afficher
 */
function injecterHTML(message) {

  let gabarit = `
    <div class="boite-modale boite-modale__invisible">
        <div class="bouton__modale">x</div>
        <p>${message}</p>
        <form>
          <input type="email" id="email" name="email"/>
          <button type="submit" class="bouton">Soumettre</button>
        </form>
    </div>`;

  //Insertion du html à l'intérieur de la div data-boite-modale (set dans le fichier promo.js)
  conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
  elementHTML = document.querySelector(".boite-modale");
  boutonHTML = document.querySelector(".bouton__modale");
  let tempoHTML = document.querySelector(".boite-modale form");

  //ajout des event listeners sur chacun des boutons de la boite modale
  tempoHTML.addEventListener("submit", onClicSubmit);
  boutonHTML.addEventListener("click", animerFermetureModale);
}

/**
 * Fonction servant à animer la boite modale lors de sa fermeture, puis d'activer la fonction de retrait de la boite modale
 * @param {Event} click - click du bouton OU de la
 */

function animerFermetureModale(event) {

  elementHTML.classList.add("boite-modale__fermeture");
  setTimeout(cacherModale, 2000);

}

/**
 * Fonction servant à cacher la boite modale après l'animation de fermeture
 */
function cacherModale() {
  
  elementHTML.classList.add("boite-modale__invisible");
  //console.log("invisible a ete ajouter");

  //Retrait de flouttage du background
  contenuHTML.classList.remove("blurry");
}

/**
 * Fonction qui sert a afficher la boite modale
 */
function afficherModale() {

  elementHTML.classList.remove("boite-modale__invisible");

  //ajout du flouttage du background
  contenuHTML.classList.add("blurry");
}
