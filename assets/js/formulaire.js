//============================
// Import
//============================

import navigation from "./components/navigation.js";

//============================
// Selections HTML et variables
//============================
const formHTML = document.querySelector("form");
const inputsHTML = formHTML.querySelectorAll("input[name], select[name]");
const summary = formHTML.querySelector(".summary");
const nextHTML = formHTML.querySelector("[data-direction='1']");
const backHTML = formHTML.querySelector("[data-direction='-1']");
const submitHTML = formHTML.querySelector("input[type='submit']");
const sectionsHTML = formHTML.querySelectorAll("[data-page]");

//Set de la variable page pour que la valeur par défault soit 1
let activePage = 1;
console.log(`${formHTML}`);
console.log(`${inputsHTML}`);
console.log(`${summary}`);

//============================
//Fonctions
//============================

//Fonction d'initialisation
function init() {
  manyListener();
  validateForm();
  pageShow(activePage);
  patternAdd();
  navigation();
}

//Fonction qui ajoute les divers eventlistener
function manyListener() {
  //Ecouteur d'évènement submit
  formHTML.addEventListener("submit", submitForm);

  //Ecouteur d'evenement pour changer de page
  nextHTML.addEventListener("click", pageChange);
  backHTML.addEventListener("click", pageChange);

  //Ecouteur d'evenement change pour chacun des inputs
  inputsHTML.forEach(function (fieldHTML) {
    fieldHTML.addEventListener("change", changeField);
    console.log("un event listener a ete ajouter");
  });
}

//============================
//Fonctions de validations
//============================

//Fonction qui empeche l'envoi du formulaire par default
function submitForm(event) {
  event.preventDefault();
  const messageHTML = document.querySelector(".message");

  if (formHTML.checkValidity()) {
    console.log("Le formulaire a été envoyé");

    //Ajout de la classe invisible a chacune des sections de la page afin d'afficher que le message
    sectionsHTML.forEach(function (fieldHTML) {
      if (!fieldHTML.classList.contains("boite-modale__invisible")) {
        fieldHTML.classList.add("boite-modale__invisible");
      }
    });
    //Ajout de la classe invisible a chacun des boutons
    nextHTML.classList.add("boite-modale__invisible");
    backHTML.classList.add("boite-modale__invisible");
    submitHTML.classList.add("boite-modale__invisible");
  }
  // Message qui apparait lors de l'envoi
  messageHTML.textContent =
    "Le formulaire a été envoyé avec succès! Merci beaucoup pour votre commande, celle-ci sera prête dans 1-2 jours ouvrables!";
}

//Fonction qui valide le formulaire
function validateForm() {
  const isValid = formHTML.checkValidity();

  //Bloque/activation du bouton submit si le formulaire est invalide OU si le user n'est pas sur la derniere page
  if (isValid == false || activePage !== sectionsHTML.length) {
    submitHTML.disabled = true;
  } else {
    submitHTML.removeAttribute("disabled");
  }
  return isValid;
}

//Fonction qui s'active quand un champ de formulaire est modifie
/**
 * @param {Event} event
 */
function changeField(event) {
  const fieldHTML = event.currentTarget;
  const fieldValue = fieldHTML.value;
  const fieldName = fieldHTML.name;

  //Validation du champ
  validateField(fieldHTML);

  if (fieldName === "text_message" || fieldName === "shipping") {
    fieldDisable(fieldHTML);
  }

  //appel de la fonction qui modifie le sommaire
  modifySummary(fieldHTML, fieldName, fieldValue);

  //Revalidation du formulaire quand un champ est modifie
  validateForm();
}

//Fonction qui verifie la validite des champs
function validateField(fieldHTML) {
  //Activation quand un champ est invalide
  if (!fieldHTML.checkValidity()) {
    //ajout de la classe invalid et retrait de la class valide
    fieldHTML.classList.add("invalid");
    fieldHTML.classList.remove("valid");

    //Message custom pour les champs avec les patterns
    if (fieldHTML.name === "address") {
      fieldHTML.setCustomValidity("Veuillez un nombre suivi du nom de votre rue (ex: 555, rue du pommier)");
    } else if (fieldHTML.name === "tel") {
      fieldHTML.setCustomValidity("Veuillez un numero de telephone valide (ex: (450) 345-1174)");
    } else if (fieldHTML.name === "postal_code") {
      fieldHTML.setCustomValidity("Veuillez un code postal valide (ex: M3M 3M3)");
    }

    //Affichage des message d'erreurs customs
    fieldHTML.reportValidity();
  }

  //Activation quand le champ est valide
  else {
    fieldHTML.classList.add("valid");
    fieldHTML.classList.remove("invalid");
    fieldHTML.setCustomValidity("");
  }
}

//============================
//Fonctions de manipulations du formulaire
//============================

//Fonction qui active et desactive les champs tel et address
function fieldDisable(fieldHTML) {
  //selections html des champs qui peuvent etre disabled
  const telHTML = formHTML.querySelector("[name='tel']");
  const addressHTML = formHTML.querySelector("[name='address']");
  const cityHTML = formHTML.querySelector("[name='city']");
  const postalCodeHTML = formHTML.querySelector("[name='postal_code']");

  //Ajout/retrait de disabled et required si la case est cochee ou non
  if (fieldHTML.name === "text_message") {
    if (fieldHTML.checked) {
      telHTML.disabled = false;
      telHTML.required = true;
    } else {
      telHTML.disabled = true;
      telHTML.required = false;
    }
  }

  //ajout/retrait de disabled si la cueillette sur place est choisie.
  //Puisque le span de l'addresse est set pour etre trois champs totaux, on desactive les trois
  if (fieldHTML.name === "shipping") {
    if (fieldHTML.options[fieldHTML.selectedIndex].text === "Cueillette sur place") {
      addressHTML.disabled = true;
      addressHTML.required = false;
      cityHTML.disabled = true;
      cityHTML.required = false;
      postalCodeHTML.disabled = true;
      postalCodeHTML.required = false;
    } else {
      addressHTML.disabled = false;
      addressHTML.required = true;
      cityHTML.disabled = false;
      cityHTML.required = true;
      postalCodeHTML.disabled = false;
      postalCodeHTML.required = true;
    }
  }
}

//Fonction qui modifier les resumes selon les champs entres
function modifySummary(fieldHTML, fieldName, fieldValue) {
  if (fieldName === "first_name") {
    const spanHTML = summary.querySelector(`[data-field="first_name"]`);
    spanHTML.textContent = fieldValue;
    console.log(fieldValue);
  }
  if (fieldName === "last_name") {
    const spanHTML = summary.querySelector(`[data-field="last_name"]`);
    spanHTML.textContent = fieldValue;
  }

  if (fieldName === "shipping") {
    const spanHTML = summary.querySelector(`[data-field="shipping"]`);
    const addressHTML = summary.querySelector(".summary_address");

    //Selection du texte dans le select plutot que le value. C'est un peu plus visuel pour moi de voir l'option que le chiffre
    spanHTML.textContent = fieldHTML.options[fieldHTML.selectedIndex].text;

    //Ajout de la classe invisible au bas du resume si le choix de livraison est locale
    //On ajoute invisible seulement lorsque la classe n'y est pas deja. Sinon nous aurons plusieurs fois la classe invisible
    //et cela nous empechera de la retirer lorsque necessaire
    if (
      fieldHTML.options[fieldHTML.selectedIndex].text === "Cueillette sur place" &&
      !addressHTML.classList.contains("boite-modale__invisible")
    ) {
      addressHTML.classList.add("boite-modale__invisible");
    } else {
      addressHTML.classList.remove("boite-modale__invisible");
    }
  }

  //Cheminement similaire pour le champ text_message, mais on cache ou non le sommaire du telephone en consequant du choix choisi
  if (fieldName === "text_message") {
    const telHTML = summary.querySelector(".summary_tel");
    if (!fieldHTML.checked && !telHTML.classList.contains("boite-modale__invisible")) {
      telHTML.classList.add("boite-modale__invisible");
    } else {
      telHTML.classList.remove("boite-modale__invisible");
    }
  }

  //Meme chose que pour text_message, on cache le resume a la fin si le champ est vide
  if (fieldName === "tel") {
    const spanHTML = summary.querySelector(`[data-field="tel"]`);
    const telHTML = summary.querySelector(".summary_tel");
    spanHTML.textContent = fieldValue;

    //Puisque tel devient required quand l'option est cochee, on peut verifier si le span est vide pour determiner si on
    // ajoute invisible ou non dans le summary pour le telephone
    //Ceci est important car le resume affichera un tel vide a la fin
    if (spanHTML.textContent != "") {
      telHTML.classList.remove("boite-modale__invisible");
    }

    //On ajoute invisible seulement lorsque la classe n'y est pas deja. Sinon nous aurons plusieurs fois la classe invisible
    //et cela nous empechera de la retirer lorsque necessaire
    else if (!telHTML.classList.contains("boite-modale__invisible")) {
      telHTML.classList.add("boite-modale__invisible");
    }
  }
  if (fieldName === "address" || fieldName === "postal_code" || fieldName === "city") {
    const spanHTML = summary.querySelector(`[data-field="${fieldName}"]`);
    const addressHTML = summary.querySelector(".summary_address");
    spanHTML.textContent = fieldValue;

    //Similairement a tel, nous voulons seulement que le resume affiche l'addresse que lorsque le champ est rempli
    if (spanHTML.textContent != "") {
      addressHTML.classList.remove("boite-modale__invisible");
    } else if (!addressHTML.classList.contains("boite-modale__invisible")) {
      addressHTML.classList.add("boite-modale__invisible");
    }
  }
}

//Fonction pour changer les pages
/**
 * @param {Event} event
 */
function pageChange(event) {
  const buttonPageHTML = event.currentTarget;

  //activation seulement quand on click sur next et que ne nous sommes pas sur la derniere page
  if (buttonPageHTML === nextHTML && activePage < sectionsHTML.length) {
    //On augmente la page active afin d'etablir sur quelle page nous sommes
    activePage++;
  }

  //activation seulement quand on click sur back et que ne nous sommes pas sur la derniere page
  else if (buttonPageHTML === backHTML && activePage > 1) {
    //On reduit la page active afin d'etablirt sur quelle page nous sommes
    activePage--;
  }

  //Console.log pour verifier nous sommes sur quelle page
  console.log(`Page: ${activePage}`);

  //Appel de la fonction pageShow pour cachers les sections autres que la page active
  pageShow(activePage);

  //Revalidation du formulaire lors du changement de section
  validateForm();
}

//Fonction pour l'affichage des pages

function pageShow(page) {
  //Il y a fort probablement un facon plus efficace de cacher les sections, mais de cette facon
  //Je m'assure que j'ajoute et retire la classe invisible dans la meme boucle.
  for (let i = 0; i < sectionsHTML.length; i++) {
    let sectionHTML = sectionsHTML[i];
    if (page != i + 1) {
      if (!sectionHTML.classList.contains("boite-modale__invisible")) {
        sectionHTML.classList.add("boite-modale__invisible");
        console.log("Nous avons ajouter boite-modale__invisible");
      }
    } else {
      sectionHTML.classList.remove("boite-modale__invisible");
      console.log("nous avons retirer boite-modale__invisible");
    }
  }

  //Activation et desactivation des bouton suivant et precedant selon la page active
  if (page === 1) {
    backHTML.disabled = true;
  } else {
    backHTML.disabled = false;
  }

  if (page === sectionsHTML.length) {
    nextHTML.disabled = true;
  } else {
    nextHTML.disabled = false;
  }
}

//Creation d'une fonction qui ajoute les patterns requis pour le tel, address et le code postal
//La fonction a ete cree puisqu'une erreur apparait dans la console concernant un flav \v
//Malheureusement, cela semble etre une erreur de compatibilite avec mon navigateur. Le champ est valide ou invalide tout de meme...
function patternAdd() {
  const telHTML = formHTML.querySelector("[name='tel']");
  const postalCodeHTML = formHTML.querySelector("[name='postal_code']");
  const addressHTML = formHTML.querySelector("[name='address']");

  telHTML.setAttribute("pattern", "^\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}$");
  postalCodeHTML.setAttribute("pattern", "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$");
  addressHTML.setAttribute("pattern", "^\\d+[ ,]?[\\w\\d\\s-,.]+");
}

//Execution
init();

//J'ai tente du mieux que je peux d'espacer mon code avec des commentaires, mais malheureusement, depuis l'installation de prettier, je ne suis pas en mesure d'espacer mon
//code. Des que je mets un espace et sauvegarde, elle est immediatement retiree...
