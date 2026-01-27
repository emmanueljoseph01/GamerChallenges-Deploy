document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardContent = document.getElementById("leaderboardContent");

  try {
    const response = await fetch("http://localhost:3000/api/users");
    if (!response.ok) throw new Error("Impossible de charger le classement");

    let users = await response.json();
    users = users.map((user) => {
      const nbDefis = user.Participations ? user.Participations.length : 0;

      let nbVotes = 0;
      if (user.Participations) {
        user.Participations.forEach((participation) => {
          if (participation.Votes) {
            nbVotes += participation.Votes.length;
          }
        });
      }

      return { ...user, nbDefis, nbVotes };
    });

    // TRI DU CLASSEMENT
    users.sort((a, b) => {
      if (b.nbDefis !== a.nbDefis) {
        return b.nbDefis - a.nbDefis;
      }
      // Si égalité on fait selon le nombre de vote
      return b.nbVotes - a.nbVotes;
    });

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
                <div class="col">
                    <span class="rank ${rankClass}" style="margin-right:15px; font-size:1.2rem; width:30px;">${rankDisplay}</span>
                    <div class="member">
                        <img src="${avatarSrc}" alt="avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
                    </div>
                    <span style="margin-left: 10px; font-weight:bold;">${user.username}</span>
                </div>
                
                <div class="col">
                    <div class="data-card small">${user.nbDefis}</div>
                </div>
                
                <div class="col">
                    <div class="data-card small" style="border-color: #ee217c;">${user.nbVotes}</div>
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
