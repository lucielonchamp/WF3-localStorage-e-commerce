// Catalogue.js

// Onrécupère la liste des cards
const cardsList = document.getElementById('cardsList');

// Déclaration des fonction
function addToCart(card) {
  //console.log(card);

  // Construire l'objet des données
  let datasObject = {
    id: card.id,
    title: card.querySelector('.card-body h5').innerText.trim(),
    price: parseFloat(card.querySelector('.card-body .text-center').lastChild.textContent.trim().replace('$','')),
    image: card.querySelector('img').src,
  }

  //console.log(datasObject);

  // Conversion de l'objet en JSON (String)
  let datas = JSON.stringify(datasObject);
  
  // Stocker les datas dans le localStorage
  localStorage.setItem(card.id, datas);
}

// Déclaration des events
cardsList.onclick = function(e) {
  // Lorsqu'on click sur le bouton add to cart
  if (e.target.nodeName === "A" && e.target.classList.contains('btn-outline-dark')) {
    // Annule l'event par défaut
    e.preventDefault();
    // Appel de 
    addToCart(e.target.offsetParent);
  }
}