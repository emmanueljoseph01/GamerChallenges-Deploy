document.addEventListener("DOMContentLoaded", () => {
  // Charger le modal depuis un fichier externe
  const modalContainer = document.getElementById("modalContainer");
  
  // Injecter le fragment du modal de création UNIQUEMENT sur la page challenges
  (async () => {
    if (!modalContainer) return;
    const isChallengesPage = /\/challenge\/challenges\.html$/.test(location.pathname) || /challenges\.html$/.test(location.pathname);
    if (!isChallengesPage) return;
    if (document.getElementById('createChallengeModal')) return; // déjà présent

    const tryPaths = [
      '/client/create-challenges-modal.html',
      '../create-challenges-modal.html',
      './create-challenges-modal.html',
      '/create-challenges-modal.html'
    ];
    for (const p of tryPaths) {
      try {
        const res = await fetch(p);
        if (!res.ok) { console.debug('create modal fetch not ok', p, res.status); continue; }
        const html = await res.text();
        modalContainer.insertAdjacentHTML('beforeend', html);
        console.log('create-challenges-modal.html loaded from', p);
        break;
      } catch (e) {
        console.debug('fetch error for', p, e);
      }
    }
  })();
  fetch('/client/auth-modal.html')
    .then(response => response.text())
    .then(html => {
      
      modalContainer.insertAdjacentHTML('beforeend', html);

      // Sélection des éléments du modal
      const authModal = document.getElementById("authModal");
      const loginBtn = document.getElementById("loginBtn");
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
      // Ne jamais lier le bouton "Créer" au modal de connexion
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