document.addEventListener("DOMContentLoaded", async () => {
  // Si connecté ou pas
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("Vous devez être connecté pour voir cette page.");
    window.location.href = "./index.html";
    return;
  }

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const displayUsername = document.getElementById("displayUsername");
  const avatarImg = document.getElementById("avatarImg");

  // Pour stock les prochaines données
  let originalData = {
    username: "",
    email: "",
    birthdate: "",
  };

  // Recup des données
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erreur chargement profil");

    const user = await response.json();

    // Emplacement pour modifer les données du profil
    usernameInput.value = user.username;
    emailInput.value = user.email;
    birthdateInput.value = user.birthdate;
    displayUsername.textContent = user.username;

    if (user.profil_image) {
      avatarImg.src = user.profil_image;
    }

    // ON SAUVEGARDE LES DONNÉES ICI
    originalData.username = user.username;
    originalData.email = user.email;
    originalData.birthdate = user.birthdate;
  } catch (error) {
    console.error(error);
    alert("Impossible de charger votre profil.");
  }

  // GESTION MODE ÉDITION / ANNULATION
  const btnModify = document.getElementById("btnModify");
  const btnSave = document.getElementById("btnSave");
  const btnCancel = document.getElementById("btnCancel");
  const inputs = [usernameInput, emailInput];

  // Activer le mode édition
  if (btnModify) {
    btnModify.addEventListener("click", () => {
      inputs.forEach((input) => (input.disabled = false)); // Déverrouille
      btnModify.classList.add("hidden");
      btnSave.classList.remove("hidden");
      btnCancel.classList.remove("hidden");
    });
  }

  // Annuler l'édition
  if (btnCancel) {
    btnCancel.addEventListener("click", (e) => {
      e.preventDefault();

      usernameInput.value = originalData.username;
      emailInput.value = originalData.email;
      birthdateInput.value = originalData.birthdate;

      // On reverrouille les champs
      inputs.forEach((input) => (input.disabled = true));

      btnSave.classList.add("hidden");
      btnCancel.classList.add("hidden");
      btnModify.classList.remove("hidden");
    });
  }

  // Sauvegarde des modifications
  const profileForm = document.getElementById("profileForm");

  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedData = {
        username: usernameInput.value,
        email: emailInput.value,
        // birthdate: birthdateInput.value, // Decommenter le birthdate:... si on veut modifier la donnée dans profil
      };

      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de la mise à jour");
        }

        alert("Profil mis à jour avec succès !");

        originalData = updatedData;
        displayUsername.textContent = updatedData.username;

        // On repasse en mode lecture seule
        inputs.forEach((input) => (input.disabled = true));
        btnSave.classList.add("hidden");
        btnCancel.classList.add("hidden");
        btnModify.classList.remove("hidden");
      } catch (error) {
        console.error(error);
        alert("Erreur : " + error.message);
      }
    });
  }

  // Deconnexion
  const logoutBtn = document.getElementById("logoutAction");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Se déconnecter ?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        window.location.href = "./index.html";
      }
    });
  }
  /* ------------ Animation d'apparition du profil ------------ */
  const profilHeader = document.querySelector(".profil-header");
  if (profilHeader) {
    profilHeader.classList.add("fade-in");
  }
});
