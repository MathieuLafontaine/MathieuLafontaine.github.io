//============================
// Selection HTML
//============================

let logoHTML = document.querySelector(".logo");

/*Export*/
export default function init(){
    slideLogo();
}

//============================
// Fonctions
//============================

/**
 * Fonction qui fait slide le logo vers la droit au load de la page en ajoutant
 * la classe logo__slide
 */

function slideLogo(){
    logoHTML.classList.add("logo__slide");
}
