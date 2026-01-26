document.addEventListener('DOMContentLoaded', () => {

  fetch('../participate-challenge-modal.html')
    .then(res => {
      if (!res.ok) throw new Error('Modal participation introuvable');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('modalContainer');
      if (!container) return;

      container.insertAdjacentHTML('beforeend', html);

      const modal = document.getElementById('participateChallengeModal');
      const closeBtn = document.getElementById('closeParticipateChallenge');
      const form = document.getElementById('participateChallengeForm');
      const challengeNameEl = document.getElementById('participateChallengeName');

      if (!modal || !closeBtn || !form) {
        console.error('Éléments du modal participation manquants');
        return;
      }

      // Ouvrir le modal
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.participate-btn');
        if (!btn) return;

        const challengeName = btn.dataset.challenge || '';
        challengeNameEl.textContent = challengeName;

        // Afficher conformément au CSS (.modal.show)
        modal.classList.add('show');
        modal.classList.remove('hidden');
      });

      // Fermer
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
          modal.classList.add('hidden');
        }
      });

      // Submit (mock)
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('Participation envoyée');
        modal.classList.add('hidden');
        form.reset();
      });
    })
    .catch(err => console.error(err.message));
});