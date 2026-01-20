<<<<<<< HEAD
/**
 * Fonction utilitaire pour envoyer une réponse réussie.
 * @param {Object} res - L'objet réponse Express.
 * @param {*} data - Les données à envoyer.
 * @param {number} status - Le code de statut HTTP (par défaut 200).
 */
export const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

/**
 * Fonction utilitaire pour gérer les erreurs.
 * @param {Object} res - L'objet réponse Express.
 * @param {Error} error - L'erreur à traiter.
 */
export const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Une erreur est survenue.' });
};
=======

>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
