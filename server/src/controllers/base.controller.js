import { StatusCodes } from "http-status-codes";

export const baseController = (Model) => ({
  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      return res.status(StatusCodes.CREATED).json(item);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const items = await Model.findAll();
      return res.status(StatusCodes.OK).json(items);
    } catch (error) {
      next(error);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);

      if (!item) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Ressource introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(item);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const element = await Model.findByPk(req.params.id);

      if (!element) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Ressource introuvable",
        });
      }

      await element.update(req.body);
      return res.status(StatusCodes.OK).json(element);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deletedCount = await Model.destroy({
        where: { id: req.params.id },
      });

      if (!deletedCount) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Impossible de supprimer : ressource introuvable" });
      }

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },
});
