import { StatusCodes } from "http-status-codes";
export const errorHandler = (err, req, res, next) => {
    console.error('Erreur :', err);

    let customError = {

    // Si statusCode dans controller on le prend, sinon 500
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Erreur Interne du Serveur',
    }

    if (err.name === 'SequelizeValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = err.errors.map((e) => e.message).join(', ');
    }

    // Pour les doublons
    if (err.name === 'SequelizeUniqueConstraintError') {
        customError.statusCode = StatusCodes.CONFLICT;
        customError.message = 'Cette valeur existe déjà.';
    }

    // FK invalide, si un user_id n'existe pas
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = 'Ressource inexistante.';
    }

    res.status(customError.statusCode).json({
        success: false,
        status: customError.statusCode,
        message: customError.message,
        //en mode dev on affiche, sinon rien (pour éviter une faille de sécu)
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
};