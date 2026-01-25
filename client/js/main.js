document.addEventListener("DOMContentLoaded", () => {
  // Charger le modal depuis un fichier externe
  const modalContainer = document.getElementById("modalContainer");
  fetch('/client/auth-modal.html')
    .then(response => response.text())
    .then(html => {
      modalContainer.innerHTML = html;

      // Sélection des éléments du modal
      const authModal = document.getElementById("authModal");
      const loginBtn = document.getElementById("loginBtn");
      const createBtn = document.getElementById("createChallengeBtn");
      const closeModal = document.getElementById("closeModal");
      const switchToRegister = document.getElementById("switchToRegister");
      const switchToLogin = document.getElementById("switchToLogin");
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");
      const modalTitle = document.getElementById("modalTitle");

      // Fonctions d'ouverture/fermeture/switch
      function openModal() {
        authModal.classList.add("show");
        modalTitle.textContent = "Connexion";
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        switchToRegister.classList.remove("hidden");
        switchToLogin.classList.add("hidden");
      }
      function closeModalFunc() {
        authModal.classList.remove("show");
      }
      function showRegister() {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        modalTitle.textContent = "Créer un compte";
        switchToRegister.classList.add("hidden");
        switchToLogin.classList.remove("hidden");
      }
      function showLogin() {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        modalTitle.textContent = "Connexion";
        switchToRegister.classList.remove("hidden");
        switchToLogin.classList.add("hidden");
      }

      // Événements
      if (loginBtn) loginBtn.addEventListener("click", openModal);
      if (createBtn) createBtn.addEventListener("click", openModal);
      if (closeModal) closeModal.addEventListener("click", closeModalFunc);
      if (switchToRegister) switchToRegister.addEventListener("click", showRegister);
      if (switchToLogin) switchToLogin.addEventListener("click", showLogin);

      // Fermer le modal si clic en dehors
      window.addEventListener("click", (e) => {
        if (e.target === authModal) closeModalFunc();
      });
    })
    .catch(err => console.error("Erreur lors du chargement du modal :", err));
});