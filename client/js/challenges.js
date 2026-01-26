document.addEventListener("DOMContentLoaded", () => {
    // Gestion du pop-up connexion
    const authModal = document.getElementById("authModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeModal = document.getElementById("closeModal");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const modalTitle = document.getElementById("modalTitle");

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
    if (loginBtn) loginBtn.addEventListener("click", function(e) { e.preventDefault(); openModal(); });
    if (closeModal) closeModal.addEventListener("click", closeModalFunc);
    if (switchToRegister) switchToRegister.addEventListener("click", showRegister);
    if (switchToLogin) switchToLogin.addEventListener("click", showLogin);

    const navHome = document.getElementById("nav-home");
    const navChallenges = document.getElementById("nav-challenges");
    const navLeaderboard = document.getElementById("nav-leaderboard");

    function goTo(page) {
        window.location.href = page;
    }

    if (navHome) {
        navHome.addEventListener("click", (e) => {
            e.preventDefault();
            goTo("index.html");
        });
    }

    if (navChallenges) {
        navChallenges.addEventListener("click", (e) => {
            e.preventDefault();
            goTo("challenges.html");
        });
    }

    if (navLeaderboard) {
        navLeaderboard.addEventListener("click", (e) => {
            e.preventDefault();
            goTo("leaderboard.html");
        });
    }

});