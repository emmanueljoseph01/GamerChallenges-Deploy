document.addEventListener("DOMContentLoaded", () => {
    // Sélecteur de la grille
    const container = document.getElementById("participationsGrid");
    if (!container) return;
    container.className = "participations";

    // Utiliser les participations mockées si présentes
    let data = [];
    if (typeof participations !== "undefined") {
      data = participations;
    }

    data.forEach(user => {
      const card = document.createElement("div");
      card.className = "participation-card";
      card.innerHTML = `
        <img src="${user.avatar}" alt="Avatar de ${user.pseudo}" class="avatar-img">
        <p><strong>${user.pseudo}</strong></p>
        <a href="${user.video_url}" target="_blank" class="video-link">Voir la vidéo</a>
      `;
      container.appendChild(card);
    });
});


