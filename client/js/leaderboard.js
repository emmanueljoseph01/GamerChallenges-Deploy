// leaderboard.js
document.addEventListener("DOMContentLoaded", () => {
    const tableRowsContainer = document.querySelector("main.container");
    
    if (!tableRowsContainer) return;

    const tableHeader = tableRowsContainer.querySelector(".table-header");

    users.forEach(user => {
        const row = document.createElement("div");
        row.classList.add("table-row");
        row.innerHTML = `
            <div class="col"><div class="member">${user.avatar}</div></div>
            <div class="col"><div class="data-card" data-challenge-name>${user.challenge}</div></div>
            <div class="col"><div class="data-card small" data-votes>${user.votes}</div></div>
            <div class="col"><div class="data-card small" data-defis>${user.defis}</div></div>
        `;
        tableHeader.insertAdjacentElement("afterend", row);
    });
});