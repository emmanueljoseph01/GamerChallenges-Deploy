document.addEventListener("DOMContentLoaded", () => {
    // --------- Sélection des éléments ---------
    const authModal = document.getElementById("authModal");
    const createBtn = document.getElementById("createChallengeBtn");
    const loginBtn = document.getElementById("loginBtn"); // Assurez-vous que votre lien a cet ID
    const closeModal = document.getElementById("closeModal");
   

    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const modalTitle = document.getElementById("modalTitle");

    // --------- Fonctions ---------

    // Ouvrir le modal
    function openModal() {
        authModal.classList.add("show");
        modalTitle.textContent = "Connexion";
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        switchToRegister.classList.remove("hidden");
        switchToLogin.classList.add("hidden");
    }

    // Fermer le modal
    function closeModalFunc() {
        authModal.classList.remove("show");
    }

    // Switch vers inscription
    function showRegister() {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        modalTitle.textContent = "Créer un compte";
        switchToRegister.classList.add("hidden");
        switchToLogin.classList.remove("hidden");
    }

    // Switch vers connexion
    function showLogin() {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        modalTitle.textContent = "Connexion";
        switchToRegister.classList.remove("hidden");
        switchToLogin.classList.add("hidden");
    }

    // Événements 

    // Ouvrir le modal sur clic
    if (createBtn) createBtn.addEventListener("click", openModal);
    if (loginBtn) loginBtn.addEventListener("click", openModal);

    // Fermer le modal
    if (closeModal) closeModal.addEventListener("click", closeModalFunc);

    // Switch Connexion / Inscription
    if (switchToRegister) switchToRegister.addEventListener("click", showRegister);
    if (switchToLogin) switchToLogin.addEventListener("click", showLogin);

    // Menu Burger
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");

    if (burger && menu) {
        burger.addEventListener("click", () => {
            menu.classList.toggle("open");
        });
    }
});

