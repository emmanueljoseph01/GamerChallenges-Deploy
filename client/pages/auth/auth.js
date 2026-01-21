 /* auth.js
 * Gestion de l'authentification côté client
 * Projet étudiant GamerChallenges
 * 
 * Ce fichier gère :
 * - l'ouverture / fermeture des popups (modales)
 * - la soumission des formulaires login / register
 * - une simulation de connexion / inscription
 * - le stockage utilisateur (localStorage) */
 
document.addEventListener("DOMContentLoaded", () => {

    /* RÉCUPÉRATION DES ÉLÉMENTS */

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    const openLoginBtn = document.querySelector("[data-open-login]");
    const openRegisterBtn = document.querySelector("[data-open-register]");

    const closeButtons = document.querySelectorAll("[data-close-modal]");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");


    /* OUVERTURE DES MODALES */

    if (openLoginBtn && loginModal) {
        openLoginBtn.addEventListener("click", () => {
            loginModal.showModal();
        });
    }

    if (openRegisterBtn && registerModal) {
        openRegisterBtn.addEventListener("click", () => {
            registerModal.showModal();
        });
    }


    /* FERMETURE DES MODALES */

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });


    /* CONNEXION (LOGIN)*/

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // empêche le rechargement de la page

            const email = loginForm.querySelector("#login-email").value;
            const password = loginForm.querySelector("#login-password").value;

            // Vérification simple (simulation)
            if (email === "" || password === "") {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            // Simulation utilisateur connecté
            const user = {
                email: email,
                pseudo: email.split("@")[0]
            };

            // Stockage local (simulation de session)
            localStorage.setItem("user", JSON.stringify(user));

            alert("Connexion réussie !");

            // Fermeture de la modale
            if (loginModal) {
                loginModal.close();
            }

            // Ici on reste sur la même page volontairement
        });
    }


    /* INSCRIPTION (REGISTER) */

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const pseudo = registerForm.querySelector("#register-pseudo").value;
            const email = registerForm.querySelector("#register-email").value;
            const password = registerForm.querySelector("#register-password").value;

            if (pseudo === "" || email === "" || password === "") {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            // Simulation inscription réussie
            const newUser = {
                pseudo: pseudo,
                email: email
            };

            localStorage.setItem("user", JSON.stringify(newUser));

            alert("Inscription réussie ! Vous êtes maintenant connecté.");

            if (registerModal) {
                registerModal.close();
            }
        });
    }

});