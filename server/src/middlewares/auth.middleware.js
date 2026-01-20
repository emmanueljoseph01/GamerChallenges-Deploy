/**
 * Middleware pour vérifier si un utilisateur est authentifié.
 * (Exemple simplifié : on vérifie juste la présence d'un header "Authorization")
 */
export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Non autorisé : token manquant.' });
  }
  // Ici, tu pourrais vérifier la validité du token (ex: JWT)
  next(); // Si tout est OK, passe au middleware suivant
};
