import { StatusCodes } from "http-status-codes";

/*
Ce middleware utilise les schema de validation
On remplace le parametre "schema" par le schema de validation correspondant
Exemple dans une route : router.post("/", isAuthenticated, validate(challengeSchema), challengeController.create

!!! On importe la fonction {validate} et les schema de validation  {challengeSchema}

*/

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Pour afficher tout les messages d'erreur et pas seulement le premier
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Données invalides",
        errors,
      });
    }

    next();
  };
};
