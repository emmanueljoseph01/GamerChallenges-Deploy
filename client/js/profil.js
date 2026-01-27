/* ------------ Prévisualisation de l'avatar ------------ */

const inputPhoto = document.getElementById("photo");
const avatar = document.querySelector(".avatar");

// vérifier que les éléments existent avant d'ajouter des évènements.
// Quand l'utilisateur choisit un fichier dans l'input, on récupère le premier fichier sélectionné.
// Si un fichier existe, on met à jour la source de l'image.
if (inputPhoto && avatar) {
  inputPhoto.addEventListener("change", () => {
    const file = inputPhoto.files[0];
    if (file) {
      avatar.src = URL.createObjectURL(file);
    }
  });
}

/* ------------ Animation du clic sur les boutons ------------ */

// Pour chaque bouton trouvé, on ajoute un effet visuel au clic.
// On ajoute la classe "clicked" pour l'effet de réduction.
// L'effet est retiré après 150 ms pour revenir à la normale.
const allButtons = document.querySelectorAll(
  ".button, .button-profil, .button-action",
);

allButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 150);
  });
});

/* ------------ Confirmation avant déconnexion ------------ */

// Quand on clique sur déconnexsion on affiche une fenêtre de confirmation.
// Si l'utilisateur confirme, on le redirige vers l'acceuil.
const logoutBtn = document.getElementById("logoutAction");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmLogout = confirm("Voulez-vous vraiment vous déconnecter ?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");

      // 2. Redirection vers l'accueil
      alert("Déconnexion réussie !");
      window.location.href = "./index.html"; // Redirection accueil
    }
  });

  /* ------------ Redirection : créer un challenge ------------ */
  const btnCreateChallenge = document.getElementById("btnCreateChallenge");

  if (btnCreateChallenge) {
    btnCreateChallenge.addEventListener("click", () => {
      window.location.href = "./create-challenge.html";
    });
  }

  /* ------------ Gestion des boutons Modifier / Annuler ------------ */

  const editProfilBtn = document.querySelector(
    ".profil-action .button-profil:first-child",
  ); // Bouton "Modifier mon profil"
  const editButtonsContainer = document.querySelector(".button-container"); // Conteneur des boutons Enregistrer/Annuler
  const cancelBtn = document.querySelector(
    ".button-container .button:nth-child(3)",
  ); // Bouton Annuler

  const saveBtn = document.querySelector(
    ".button-container .button:nth-child(2)",
  );

  // Quand on clique sur "Modifier mon profil"
  if (editProfilBtn && editButtonsContainer) {
    editProfilBtn.addEventListener("click", () => {
      editButtonsContainer.style.display = "flex";
    });
  }

  // Quand on clique sur "Annuler"
  if (cancelBtn && editButtonsContainer) {
    cancelBtn.addEventListener("click", () => {
      editButtonsContainer.style.display = "none";
    });
  }

  // Quand on clique sur "Enregistrer"
  if (saveBtn && editButtonsContainer) {
    saveBtn.addEventListener("click", () => {
      editButtonsContainer.style.display = "none";
    });
  }

  /* ------------ Animation d'apparition du profil ------------ */

  // Quand la page est complètement chargée, on récupère le bloc principal du profil.
  // Si trouvé, on lui ajoute la classe qui déclenche l'animation CSS.
  window.addEventListener("load", () => {
    const profilHeader = document.querySelector(".profil-header");
    if (profilHeader) {
      profilHeader.classList.add("fade-in");
    }
  });
}
