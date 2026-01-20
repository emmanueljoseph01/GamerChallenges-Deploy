/**
 * Middleware pour valider les données d'un défi.
 */
export const validateChallenge = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Le titre et la description sont obligatoires.' });
  }
  next(); // Si les données sont valides, passe au contrôleur
};
