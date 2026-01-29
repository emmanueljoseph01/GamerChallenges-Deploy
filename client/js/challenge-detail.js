document.addEventListener("DOMContentLoaded", async () => {
  //on recup l'id depuis l'url
  const params = new URLSearchParams(window.location.search);
  const challengeId = params.get("id");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const loadingMsg = document.getElementById("loadingMessage");
  const contentSection = document.getElementById("challengeContent");
  const btnParticipate = document.getElementById("btnParticipate");

  if (!challengeId) {
    loadingMsg.innerHTML =
      "<p class='error-message'>Erreur : Aucun défi sélectionné.</p>";
    return;
  }

  // On charge les challenges
  async function loadChallengeDetails() {
    try {
      const response = await fetch(
        `${API_URL}/challenges/${challengeId}/details`,
      );

      if (!response.ok) throw new Error("Impossible de charger ce challenge.");

      const challenge = await response.json();

      document.getElementById("detailTitle").textContent = challenge.title;
      document.getElementById("detailDesc").textContent = challenge.description;
      document.getElementById("detailRules").textContent =
        challenge.rules || "Aucune règle spécifiée.";

      document.getElementById("detailGame").textContent = challenge.Game
        ? challenge.Game.title
        : "Jeu inconnu";
      document.getElementById("detailCreator").textContent = challenge.User
        ? challenge.User.username
        : "Utilisateur supprimé";

      // Affichage des participations
      const participationsDiv = document.getElementById("participationsList");

      if (challenge.Participations && challenge.Participations.length > 0) {
        participationsDiv.innerHTML = ""; // On vide d'abord

        challenge.Participations.forEach((part) => {
          // Calcul du nombre de votes
          const voteCount = part.Votes ? part.Votes.length : 0;

          const card = document.createElement("div");
          card.classList.add("participation-card");

          card.innerHTML = `
                <div class="participation-header">
                    <div>
                        <h4>${part.title}</h4>
                        <p>Par <strong>${part.User ? part.User.username : "Anonyme"}</strong></p>
                        <p>${part.description || ""}</p>
                        <a href="${part.video_url}" target="_blank" class="participation-link">Voir la vidéo</a>
                    </div>
                    
                    <div class="vote-section">
                        <button class="vote-btn" onclick="voteForParticipation(${part.id})">
                            <p class="vote-btn-text">Voter</p>
                        </button>
                        <span class="vote-count">${voteCount}</span>
                    </div>
                </div>
          `;
          participationsDiv.appendChild(card);
        });
      } else {
        participationsDiv.innerHTML =
          "<p>Aucune participation pour le moment. Sois le premier !</p>";
      }

      loadingMsg.style.display = "none";
      contentSection.classList.remove("hidden");
    } catch (error) {
      console.error(error);
      loadingMsg.innerHTML =
        "<p class='error-message'>Erreur : Ce challenge n'existe pas.</p>";
    }
  }

  // Bouton participer
  if (btnParticipate) {
    btnParticipate.classList.remove("hidden");

    btnParticipate.addEventListener("click", () => {
      // Si PAS connect > Alert + Pop-up de connexion
      if (!token || !userId) {
        alert("Vous devez être connecté pour participer !");
        window.openAuthModal();
        return;
      }
      document.getElementById("participateModal").classList.add("show");
    });
  }

  // Formulaire de Participation
  const participateForm = document.getElementById("participateForm");
  const closeParticipateBtn = document.getElementById("closeParticipateModal");
  const participateModal = document.getElementById("participateModal");

  // Fermeture modal
  if (closeParticipateBtn) {
    closeParticipateBtn.addEventListener("click", () => {
      participateModal.classList.remove("show");
    });
  }

  // Envoi du formulaire
  if (participateForm) {
    participateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errorMsg = document.getElementById("participateError");
      errorMsg.textContent = "";

      const titleValue = document.getElementById("partTitle").value;
      const videoValue = document.getElementById("partVideo").value;
      const descValue = document.getElementById("partDesc").value;

      const data = {
        title: titleValue,
        video_url: videoValue,
        description: descValue,
        challenge_id: challengeId,
      };

      try {
        const response = await fetch(`${API_URL}/participations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erreur lors de l'envoi");

        alert("Participation envoyée avec succès !");
        participateForm.reset();
        participateModal.classList.remove("show");

        window.location.reload();
      } catch (error) {
        console.error(error);
        errorMsg.textContent =
          "Impossible d'envoyer la participation. Vérifie l'URL.";
      }
    });
  }
  loadChallengeDetails();

  window.voteForParticipation = async (participationId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("Connecte-toi pour voter !");
      window.openAuthModal();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/votes/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          participation_id: participationId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors du vote");
      }
      // recharge juste le vote pour voir le compteur augmenter
      loadChallengeDetails();
    } catch (error) {
      console.error(error);
      alert("Vous avez déjà voté");
    }
  };
});
