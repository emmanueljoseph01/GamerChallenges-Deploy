document.addEventListener("DOMContentLoaded", () => {
  const challengesContainer = document.getElementById("challengesContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // Variablepour stocker tous les challenges une fois chargés
  let allChallenges = [];

  // AFFICHAGE
  function renderChallenges(challengesList) {
    challengesContainer.innerHTML = ""; // On vide la liste

    if (challengesList.length === 0) {
      challengesContainer.innerHTML =
        "<p style='text-align:center; width:100%;'>Aucun challenge trouvé.</p>";
      return;
    }

    challengesList.forEach((challenge) => {
      const card = document.createElement("div");
      card.classList.add("challenge-card");

      const gameName = challenge.Game ? challenge.Game.title : "Jeu inconnu";
      const creatorName = challenge.User ? challenge.User.username : "Anonyme";

      // Coupe la description si trop longue
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
  }

  // RÉCUPÉRATION DES DONNÉES (API)
  async function fetchChallenges() {
    try {
      const response = await fetch(`${API_URL}/challenges`);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des challenges");
      }

      allChallenges = await response.json();

      renderChallenges(allChallenges);
    } catch (error) {
      console.error("Erreur :", error);
      challengesContainer.innerHTML =
        "<p class='error-message'>Impossible de charger les challenges.</p>";
    }
  }

  // LOGIQUE DE RECHERCHE
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filtered = allChallenges.filter((challenge) => {
      // Recherche dans le Titre du défi
      const matchTitle = challenge.title.toLowerCase().includes(searchTerm);
      // Recherche dans le Nom du Jeu
      const matchGame =
        challenge.Game &&
        challenge.Game.title.toLowerCase().includes(searchTerm);

      return matchTitle || matchGame;
    });

    renderChallenges(filtered);
  }

  // Écouteur sur le bouton "Rechercher"
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  // Si bouton "Entrée" sa lance la recherche directement
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
      handleSearch();
    });
  }

  // MODALE DE CRÉATION
  const createModal = document.getElementById("createChallengeModal");
  const openBtn = document.getElementById("openCreateModalBtn");
  const closeBtn = document.getElementById("closeCreateModal");
  const createForm = document.getElementById("createChallengeForm");
  const gameSelect = document.getElementById("newGame");

  if (openBtn) {
    openBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour créer un défi !");
        return;
      }
      createModal.classList.add("show");

      if (gameSelect.options.length <= 1) {
        try {
          const res = await fetch(`${API_URL}/games`);
          const games = await res.json();
          games.forEach((game) => {
            const option = document.createElement("option");
            option.value = game.id;
            option.textContent = game.title;
            gameSelect.appendChild(option);
          });
        } catch (err) {
          console.error("Erreur chargement jeux", err);
        }
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      createModal.classList.remove("show");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === createModal) createModal.classList.remove("show");
  });

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
        const response = await fetch(`${API_URL}/challenges`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erreur création");

        alert("Défi créé avec succès !");
        createModal.classList.remove("show");
        createForm.reset();

        fetchChallenges();
      } catch (error) {
        console.error(error);
        errorMsg.textContent = "Erreur création.";
      }
    });
  }

  fetchChallenges();
});
