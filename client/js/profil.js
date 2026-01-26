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
const allButtons = document.querySelectorAll(".button, .button-profil, .button-action");

allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("clicked");
        setTimeout(() => btn.classList.remove("clicked"), 150);
    });
});

/* ------------ Confirmation avant déconnexion ------------ */

// Quand on clique sur déconnexsion on affiche une fenêtre de confirmation.
// Si l'utilisateur confirme, on le redirige vers l'acceuil.
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Voulez-vous vous déconnecter ?");
        if (confirmLogout) {
            window.location.href = "../index.html";
        }
    });
}

/* ------------ Message après sauvegarde ------------ */

// Quand on clique sur enregistrer un message s'affiche.
const saveBtn = document.querySelector(".button:nth-child(2)");

if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        alert("Les modifications sont enregistrées !");
    });
}

/* ------------ Redirection : créer un challenge ------------ */
const btnCreateChallenge = document.getElementById("btnCreateChallenge");

if (btnCreateChallenge) {
    btnCreateChallenge.addEventListener("click", () => {
        window.location.href = "./create-challenge.html";
    });
}

/* ------------ Redirection : créer un challenge ------------ */
const editProfilBtn = document.querySelector(".profil-action .button-profil:first-child");
const editButtonsContainer = document.querySelector(".button-container");
const cancelBtn = document.querySelector(".button-container .button:nth-child(3)");
const saveBtn2 = document.querySelector(".button-container .button:nth-child(2)");
const uploadBtn = document.querySelector(".button-action");

if (editProfilBtn) {
    editProfilBtn.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "flex";
        if (uploadBtn) uploadBtn.computedStyleMap.display = "inline-block";
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "none";
        if (uploadBtn) uploadBtn.computedStyleMap.display = "none";
    });
}

if (saveBtn2) {
    saveBtn2.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "none";
        if (uploadBtn) uploadBtn.computedStyleMap.display = "none";
    });
}

if (editProfilBtn && editButtonsContainer) {
    editProfilBtn.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "flex";
    })
}

if (cancelBtn && editButtonsContainer) {
    cancelBtn.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "none";
    });
}

if (saveBtn2 && editButtonsContainer) {
    saveBtn2.addEventListener("click", () => {
        editButtonsContainer.computedStyleMap.display = "none";
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

