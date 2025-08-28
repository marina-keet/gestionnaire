const API_URL = "http://localhost:3000/produits";
const form = document.getElementById("add-product-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    nom: document.getElementById("nom").value,
    description: document.getElementById("description").value,
    categorie: document.getElementById("categorie").value,
    prix: parseFloat(document.getElementById("prix").value),
    quantite: parseInt(document.getElementById("quantite").value)
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (!res.ok) throw new Error("Erreur lors de l'ajout");

    message.textContent = "Produit ajouté avec succès !";
    message.style.color = "green";

    // Reset du formulaire
    form.reset();

  } catch (err) {
    message.textContent = "Erreur : le produit n'a pas été ajouté.";
    message.style.color = "red";
    console.error(err);
  }
});
