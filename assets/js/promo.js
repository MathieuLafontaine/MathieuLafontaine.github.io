/*Import des fonctions d'executions des composantes*/

import modeNuit from "./components/modeNuit.js";
import navigation from "./components/navigation.js";
import boiteModale from "./components/boiteModale.js";
import carrousel from "./components/carrousel.js";
import ScrollAnimator from "./ScrollAnimator.js";
import logo from "./components/logo.js";

//============================
// Sélections HTML
//============================

const conteneurBoiteModale = document.querySelector("[data-boite-modale]");
const zonesHTML = document.querySelectorAll(".scroll__animator");

/**
 * Appel d'une fonction IIFE 
 * Appels de plusieurs fonctions qui sont les fonctions d'execution des composantes de la page promos
 * */
(function () {

  modeNuit();
  navigation();
  boiteModale(conteneurBoiteModale, "Abonnez-vous à l'infolettre");
  carrousel();
  logo();
  new ScrollAnimator(null, zonesHTML)

})();


