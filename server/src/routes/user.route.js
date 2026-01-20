import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

<<<<<<< HEAD
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

=======
// Route pour créer un utilisateur
router.post('/', createUser);

// Route pour récupérer tous les utilisateurs
router.get('/', getAllUsers);

// Route pour récupérer un utilisateur par ID
router.get('/:id', getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUser);

export default router;
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
