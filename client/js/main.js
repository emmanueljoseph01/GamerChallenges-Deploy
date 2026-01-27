document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const authRequiredItems = document.querySelectorAll(".auth-required");
  const authGuestItems = document.querySelectorAll(".auth-guest");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");

  function updateNav() {
    const isConnected = !!localStorage.getItem("token");

    if (isConnected) {
      // Utilisateur connecté : On montre Profil + Deco, on cache Connexion
      authRequiredItems.forEach((el) => el.classList.remove("hidden"));
      authGuestItems.forEach((el) => el.classList.add("hidden"));
    } else {
      // Visiteur : On cache Profil + Deco, on montre Connexion
      authRequiredItems.forEach((el) => el.classList.add("hidden"));
      authGuestItems.forEach((el) => el.classList.remove("hidden"));
    }
  }

  // Gestion de la Déconnexion
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmLogout = confirm("Voulez-vous vraiment vous déconnecter ?");
      if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");

        alert("Déconnexion réussie !");
        updateNav();
        window.location.href = "./index.html"; // Retour accueil
      }
    });
  }

  // Ouvre le modal
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  updateNav();

  // MODAL POP-UP
  const authModal = document.getElementById("authModal");
  const closeModal = document.getElementById("closeModal");
  const switchToRegister = document.getElementById("switchToRegister");
  const switchToLogin = document.getElementById("switchToLogin");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const modalTitle = document.getElementById("modalTitle");

  if (!authModal) return;

  function openModal() {
    authModal.classList.add("show");
  }

  function closeModalFunc() {
    authModal.classList.remove("show");
    loginForm.reset();
    registerForm.reset();
    if (document.getElementById("loginError"))
      document.getElementById("loginError").textContent = "";
    if (document.getElementById("registerError"))
      document.getElementById("registerError").textContent = "";
  }

  if (closeModal) closeModal.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === authModal) closeModalFunc();
  });

  if (switchToRegister) {
    switchToRegister.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      modalTitle.textContent = "Créer un compte";
      switchToRegister.classList.add("hidden");
      switchToLogin.classList.remove("hidden");
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", () => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      modalTitle.textContent = "Connexion";
      switchToRegister.classList.remove("hidden");
      switchToLogin.classList.add("hidden");
    });
  }

  // API CONNEXION
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errorMsg = document.getElementById("loginError");
      errorMsg.textContent = "Connexion en cours...";

      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok)
          throw new Error(result.message || "Erreur de connexion");

        localStorage.setItem("token", result.token);
        if (result.user) localStorage.setItem("userId", result.user.id);

        closeModalFunc();
        updateNav(); // menu change instantanément
        alert("Ravi de vous revoir !");
        window.location.href = "./profil.html";
      } catch (error) {
        errorMsg.textContent = error.message;
      }
    });
  }

  // API INSCRIPTION
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errorMsg = document.getElementById("registerError");
      errorMsg.textContent = "Inscription en cours...";

      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        const result = await response.json();

        if (!response.ok)
          throw new Error(result.message || "Erreur inscription");

        alert("Compte créé ! Connectez-vous.");
        switchToLogin.click();
      } catch (error) {
        errorMsg.textContent = error.message;
      }
    });
  }
});
