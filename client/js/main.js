const API_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const isLegalPage = window.location.pathname.includes("/legal/");
  const basePath = isLegalPage ? ".." : ".";

  // HEADER
  async function loadHeader() {
    const headerPlaceholder = document.querySelector("header.header-bar");
    if (!headerPlaceholder) return;

    headerPlaceholder.innerHTML = `
        <div class="site-header">
            <img src="${basePath}/assets/images/logo.png" alt="logo" class="logo" />
            <h1 class="site-title">GamerChallenge</h1>
        </div>
        
        <div class="burger-menu" id="burgerBtn">☰</div>
        
        <nav class="menu" id="navMenu">
          <ul>
            <li><a href="${basePath}/index.html">Accueil</a></li>
            <li><a href="${basePath}/challenges.html">Défis</a></li>
            <li><a href="${basePath}/leaderboard.html">Classement</a></li>
            <li class="auth-required hidden"><a href="${basePath}/profil.html">Profil</a></li>
            <li class="auth-required hidden"><a href="#" id="logoutBtn">Déconnexion</a></li>
            <li class="auth-guest"><a href="#" id="loginBtn">Connexion</a></li>
          </ul>
        </nav>
    `;

    initMenuLogic();
  }

  // FOOTER
  async function loadFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    //
    const legalPath = isLegalPage ? "." : "./legal";

    footer.innerHTML = `
        <p><a href="${legalPath}/legal-notice.html">Mentions légales</a></p>
        <p><a href="${legalPath}/privacy-policy.html">Politique de confidentialité</a></p>
        <p><a href="${legalPath}/terms-of-service.html">Conditions générales de ventes (CGU)</a></p>
        <p class="footer-name">© 2026 GamerChallenge</p>
    `;
  }

  // MODALE D'AUTH
  function loadAuthModal() {
    // 1. On vérifie si la modale existe.
    // Si elle n'existe PAS (cas des pages Legal), on l'injecte.
    if (!document.getElementById("authModal")) {
      const modalHTML = `
      <div class="modal" id="authModal">
        <div class="modal-content">
          <span class="close-modal" id="closeModal">&times;</span>
          <h2 id="modalTitle">Connexion</h2>
  
          <form id="loginForm">
            <label for="loginEmail">Adresse Email</label>
            <input type="email" name="email" id="loginEmail" placeholder="Email" required />
  
            <label for="loginPassword">Mot de passe</label>
            <input type="password" name="password" id="loginPassword" placeholder="Mot de passe" required />
  
            <p id="loginError" class="error-message"></p>
            <button type="submit">Se connecter</button>
          </form>
  
          <form id="registerForm" class="hidden">
              <label for="regUser">Nom d'utilisateur</label>
              <input type="text" name="username" id="regUser" placeholder="Pseudo" required />

              <label for="regEmail">Adresse Email</label>
              <input type="email" name="email" id="regEmail" placeholder="Email" required />

              <label for="regPass">Mot de passe</label>
              <input type="password" name="password" id="regPass" placeholder="Mot de passe" required />

              <label for="regDate">Date de naissance</label>
              <input type="date" name="birthdate" id="regDate" required />

              <div class="form-checkbox-group">
                  <input type="checkbox" id="regConsent" name="consent" required />
                  <label for="regConsent" class="consent-label">
                      J'accepte la <a href="./legal/privacy-policy.html" target="_blank">politique de confidentialité</a>
                  </label>
              </div>

              <p id="registerError" class="error-message"></p>
              <button type="submit">S’inscrire</button>
          </form>
  
          <p class="switch-text">
            <span id="switchToRegister">Créer un compte</span>
            <span id="switchToLogin" class="hidden">Déjà un compte ?</span>
          </p>
        </div>
      </div>`;

      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    initAuthLogic();
  }

  //LOGIQUE Navbar PC/Mobile
  function initMenuLogic() {
    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (burgerBtn && navMenu) {
      const newBurgerBtn = burgerBtn.cloneNode(true);
      burgerBtn.parentNode.replaceChild(newBurgerBtn, burgerBtn);

      newBurgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        newBurgerBtn.textContent = navMenu.classList.contains("active")
          ? "✕"
          : "☰";
      });
    }

    // Gestion Auth (Connecté / Pas connecté)
    const token = localStorage.getItem("token");
    const authRequiredItems = document.querySelectorAll(".auth-required");
    const authGuestItems = document.querySelectorAll(".auth-guest");

    if (token) {
      authRequiredItems.forEach((el) => el.classList.remove("hidden"));
      authGuestItems.forEach((el) => el.classList.add("hidden"));
    } else {
      authRequiredItems.forEach((el) => el.classList.add("hidden"));
      authGuestItems.forEach((el) => el.classList.remove("hidden"));
    }

    // Boutons Login / Logout
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Déconnexion ?")) {
          localStorage.clear();
          window.location.href = isLegalPage ? "../index.html" : "./index.html";
        }
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    }
  }

  // LOGIQUE AUTHENTIFICATION (Modale)
  function openModal() {
    const authModal = document.getElementById("authModal");
    if (authModal) authModal.classList.add("show");
  }

  function closeModalFunc() {
    const authModal = document.getElementById("authModal");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (authModal) authModal.classList.remove("show");
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();

    const loginError = document.getElementById("loginError");
    const registerError = document.getElementById("registerError");
    if (loginError) loginError.textContent = "";
    if (registerError) registerError.textContent = "";
  }

  function initAuthLogic() {
    const authModal = document.getElementById("authModal");
    const closeModal = document.getElementById("closeModal");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const modalTitle = document.getElementById("modalTitle");

    if (closeModal) closeModal.addEventListener("click", closeModalFunc);

    if (authModal) {
      window.addEventListener("click", (e) => {
        if (e.target === authModal) closeModalFunc();
      });
    }

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

    // Soumission Login
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const errorMsg = document.getElementById("loginError");
        errorMsg.textContent = "Connexion en cours...";

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          if (!response.ok)
            throw new Error(result.message || "Erreur de connexion");

          localStorage.setItem("token", result.token);
          if (result.user) {
            localStorage.setItem("userId", result.user.id);
            localStorage.setItem("user", JSON.stringify(result.user));
          }

          closeModalFunc();
          initMenuLogic();
          alert("Ravi de vous revoir !");

          if (window.location.pathname.includes("profil.html")) {
            window.location.reload();
          }
        } catch (error) {
          errorMsg.textContent = error.message;
        }
      });
    }

    // Soumission Register
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const errorMsg = document.getElementById("registerError");
        const consentCheckbox = document.getElementById("regConsent");

        if (!consentCheckbox.checked) {
          errorMsg.textContent =
            "Vous devez accepter la politique de confidentialité.";
          return;
        }
        errorMsg.textContent = "Inscription en cours...";

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          if (!response.ok)
            throw new Error(result.message || "Erreur inscription");

          alert("Compte créé ! Connectez-vous.");
          if (switchToLogin) switchToLogin.click();
        } catch (error) {
          errorMsg.textContent = error.message;
        }
      });
    }
  }

  window.openAuthModal = openModal;

  await loadHeader();
  await loadFooter();
  loadAuthModal();
});
