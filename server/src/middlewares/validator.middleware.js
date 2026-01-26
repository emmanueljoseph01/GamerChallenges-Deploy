export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Affiche TOUTES les erreurs, pas juste la première
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
