document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardContent = document.getElementById("leaderboardContent");

  try {
    // On appelle la nouvelle route optimisée
    const response = await fetch(`${API_URL}/users/leaderboard`);
    if (!response.ok) throw new Error("Impossible de charger le classement");

    const users = await response.json();

    leaderboardContent.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("div");
      row.classList.add("table-row");

      let rankClass = "rank-other";
      let rankDisplay = `#${index + 1}`;

      if (index === 0) {
        rankDisplay = "🥇";
        rankClass = "rank-gold";
      }
      if (index === 1) {
        rankDisplay = "🥈";
        rankClass = "rank-silver";
      }
      if (index === 2) {
        rankDisplay = "🥉";
        rankClass = "rank-bronze";
      }

      const avatarSrc = user.profil_image || "https://via.placeholder.com/150";

      row.innerHTML = `
        <div class="col user-info">
            <span class="rank ${rankClass}">${rankDisplay}</span>
            <div class="member">
                <img src="${avatarSrc}" alt="avatar">
            </div>
            <span class="username">${user.username}</span>
        </div>
        
        <div class="col stats">
            <div class="data-card small" title="Nombre de défis relevés">
               ⚔️ ${user.nbDefis} <span class="mobile-label">Défis</span>
            </div>
        </div>
        
        <div class="col stats">
            <div class="data-card small" style="border-color: #ee217c;" title="Votes reçus">
               ❤️ ${user.nbVotes} <span class="mobile-label">Votes</span>
            </div>
        </div>
    `;
      leaderboardContent.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    leaderboardContent.innerHTML =
      "<p style='text-align:center; color:#ff4d4d;'>Erreur lors du chargement.</p>";
  }
});
