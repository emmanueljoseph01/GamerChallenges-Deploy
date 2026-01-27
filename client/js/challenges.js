document.addEventListener("DOMContentLoaded", () => {
  const challengesContainer = document.getElementById("challengesContainer");

  // Listes des challenges
  async function fetchChallenges() {
    try {
      const response = await fetch("http://localhost:3000/api/challenges");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des challenges");
      }

      const challenges = await response.json();

      if (challenges.length === 0) {
        challengesContainer.innerHTML =
          "<p>Aucun challenge disponible pour le moment.</p>";
        return;
      }

      challengesContainer.innerHTML = "";

      challenges.forEach((challenge) => {
        const card = document.createElement("div");
        card.classList.add("challenge-card");

        const gameName = challenge.Game ? challenge.Game.title : "Jeu inconnu";
        const creatorName = challenge.User
          ? challenge.User.username
          : "Anonyme";

        // Max 100car pour la description
        const shortDesc =
          challenge.description.length > 100
            ? challenge.description.substring(0, 100) + "..."
            : challenge.description;

        card.innerHTML = `
                    <h3>${challenge.title}</h3>
                    <p class="challenge-meta">Jeu : <strong>${gameName}</strong> | Par : ${creatorName}</p>
                    <p>${shortDesc}</p>
                    <button class="button" onclick="window.location.href='./challenge-detail.html?id=${challenge.id}'">
                        Voir le détail
                    </button>
                `;

        challengesContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Erreur :", error);
      challengesContainer.innerHTML =
        "<p class='error-message'>Impossible de charger les challenges.</p>";
    }
  }

  // DOM Creation
  const createModal = document.getElementById("createChallengeModal");
  const openBtn = document.getElementById("openCreateModalBtn");
  const closeBtn = document.getElementById("closeCreateModal");
  const createForm = document.getElementById("createChallengeForm");
  const gameSelect = document.getElementById("newGame");

  // Ouvrir le modal
  if (openBtn) {
    openBtn.addEventListener("click", async () => {
      // Si l'utilisateur connecté
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour créer un défi !");
        return;
      }

      createModal.classList.add("show");

      // Charger la liste des jeux
      if (gameSelect.options.length <= 1) {
        try {
          const res = await fetch("http://localhost:3000/api/games");
          const games = await res.json();

          games.forEach((game) => {
            const option = document.createElement("option");
            option.value = game.id;
            option.textContent = game.title;
            gameSelect.appendChild(option);
          });
        } catch (err) {
          console.error("Erreur chargement jeux", err);
          alert("Impossible de charger la liste des jeux.");
        }
      }
    });
  }

  // Fermer le modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      createModal.classList.remove("show");
    });
  }

  // Fermer en cliquant en dehors
  window.addEventListener("click", (e) => {
    if (e.target === createModal) createModal.classList.remove("show");
  });

  // Formulaire de Creation
  if (createForm) {
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errorMsg = document.getElementById("createError");
      errorMsg.textContent = "";

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const formData = new FormData(createForm);
      const data = Object.fromEntries(formData.entries());

      data.user_id = userId;

      try {
        const response = await fetch("http://localhost:3000/api/challenges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erreur lors de la création");

        alert("Défi créé avec succès !");
        createModal.classList.remove("show");
        createForm.reset();

        // On recharge la liste pour voir le nouveau defi
        fetchChallenges();
      } catch (error) {
        console.error(error);
        errorMsg.textContent =
          "Impossible de créer le défi. Vérifiez les champs.";
      }
    });
  }

  fetchChallenges();
});
