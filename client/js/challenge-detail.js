document.addEventListener("DOMContentLoaded", async () => {
  // On recup l'ID dans l'URL
  const params = new URLSearchParams(window.location.search);
  const challengeId = params.get("id");

  const loadingMsg = document.getElementById("loadingMessage");
  const contentSection = document.getElementById("challengeContent");

  if (!challengeId) {
    loadingMsg.innerHTML =
      "<p style='color:red'>Erreur : Aucun défi sélectionné.</p>";
    return;
  }

  try {
    // On recup les détails du challenge
    const response = await fetch(
      `http://localhost:3000/api/challenges/${challengeId}/details`,
    );

    if (!response.ok) throw new Error("Impossible de charger ce challenge.");

    const challenge = await response.json();

    document.getElementById("detailTitle").textContent = challenge.title;
    document.getElementById("detailDesc").textContent = challenge.description;
    document.getElementById("detailRules").textContent =
      challenge.rules || "Aucune règle spécifiée.";

    // Si pas de nom de jeu/user
    document.getElementById("detailGame").textContent = challenge.Game
      ? challenge.Game.title
      : "Jeu inconnu";
    document.getElementById("detailCreator").textContent = challenge.User
      ? challenge.User.username
      : "Utilisateur supprimé";

    // 4. Afficher les participations
    const participationsDiv = document.getElementById("participationsList");

    if (challenge.Participations && challenge.Participations.length > 0) {
      let html = "";
      challenge.Participations.forEach((part) => {
        html += `
                    <div class="challenge-card" style="margin-bottom:10px; background:#2a2d31;">
                        <strong>${part.title}</strong> par ${part.User ? part.User.username : "Anonyme"}<br>
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
      "<p style='color:red'>Erreur : Ce challenge n'existe pas ou a été supprimé.</p>";
  }
});
