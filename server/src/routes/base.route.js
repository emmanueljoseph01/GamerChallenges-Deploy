import express from 'express';

const router = express.Router();

// Middleware pour vérifier l'authentification (exemple)
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route de test
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
