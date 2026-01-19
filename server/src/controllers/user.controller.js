import { User } from '../models/user.model.js';

// Obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Créer un nouvel utilisateur
export const createUser = async (req, res) => {
    try {
        const { username, email, password, birthdate, role_id } = req.body;
        
        if (!username || !email || !password || !birthdate) {
            return res.status(400).json({ 
                message: 'Le nom d\'utilisateur, l\'email, le mot de passe et la date de naissance sont obligatoires' 
            });
        }
        
        const newUser = await User.create({
            username,
            email,
            password,
            birthdate,
            role_id: role_id || 1 // Par défaut, rôle utilisateur
        });
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        await user.update({
            username,
            email
        });
        
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        await user.destroy();
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};