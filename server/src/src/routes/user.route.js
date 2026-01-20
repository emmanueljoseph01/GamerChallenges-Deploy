/**
 * Middleware pour logger les requêtes entrantes.
 * Affiche la méthode HTTP et l'URL de la requête.
 */
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Passe au middleware suivant
};
