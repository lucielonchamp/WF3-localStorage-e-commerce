const panier = document.getElementById("panier");

// Vérification de contenu du localStorage
if (localStorage.length > 0) {
  // On construit le tableau panier
  panier.innerHTML = `
  <table class="table">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Photo</th>
            <th scope="col">Produit</th>
            <th scope="col">Prix</th>
            <th scope="col"></th>
          </tr>
      </thead>
      <tbody id="panierProduits"></tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-end">Prix total :</th>
          <th id="panierTotal">0</th>
        </tr>
      </tfoot>
  </table>
  `;

  // On affiche les datas du localStorage dans le tableau panier
  const panierProduits = panier.querySelector("#panierProduits");
  const panierTotal = panier.querySelector("#panierTotal");
  let count = 0;
  let totalPrice = 0;

  for (let key in localStorage) {
    let item = localStorage.getItem(key);

    if (item) {
      // Conversion des datas (item) en JSON (Object) avec parse
      let itemObject = JSON.parse(item);

      // Incrémentation du numéro de produit
      count++;

      // Addition du prix de chaque produit au prix total du panier
      totalPrice += itemObject.price;

      // Afficher le produit parmis la liste
      panierProduits.innerHTML += `
      <tr id="${itemObject.id}">
        <th scope="row">${count}</th>
        <td>
          <img class="w-25" src="${itemObject.image}">
        </td>
        <td>${itemObject.title}</td>
        <td>$${itemObject.price.toFixed(2)}</td>
        <td><button class="delItem">X</button></td>
      </tr>
      `;
    }
  }

  panierProduits.onclick = function (e) {
    if (e.target.classList.contains("delItem")) {
      let itemProduit = e.target.parentElement.parentElement;

      // Suppression du localStorage
      localStorage.removeItem(itemProduit.id);

      // Suppression du DOM
      itemProduit.remove();
    }
  };

  // Affichage du prix total du panier
  panierTotal.innerText = "$" + totalPrice.toFixed(2);
} else {
  // On affiche le message d'un panier vide
  panier.innerHTML = `
  <p class="text-center">Votre panier est vide pour le moment...</p>
  `;
}
