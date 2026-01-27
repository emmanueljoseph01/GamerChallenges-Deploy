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
        `http://localhost:3000/api/challenges/${challengeId}/details`,
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
        let html = "";
        challenge.Participations.forEach((part) => {
          html += `
            <div class="challenge-card" style="margin-bottom:10px; background:#2a2d31;">
                <h4>${part.title}</h4>
                <p>Par <strong>${part.User ? part.User.username : "Anonyme"}</strong></p>
                <p>${part.description || ""}</p>
                <a href="${part.video_url}" target="_blank" style="color:#50e3c2;">Voir la vidéo</a>
            </div>
          `;
        });
        participationsDiv.innerHTML = html;
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

  // 3. Gestion du bouton "Participer" (Visible uniquement si connecté)
  if (token && userId) {
    if (btnParticipate) {
      btnParticipate.classList.remove("hidden");

      // Clic sur le bouton -> Ouvre le modal
      btnParticipate.addEventListener("click", () => {
        document.getElementById("participateModal").classList.add("show");
      });
    }
  }

  // 4. Gestion du Formulaire de Participation
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
        user_id: userId,
        challenge_id: challengeId,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/participations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          },
        );

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
});
