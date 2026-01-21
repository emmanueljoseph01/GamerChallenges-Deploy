import { StatusCodes } from "http-status-codes";
export const baseController = (Model) => ({
  create: async (req, res) => {
    try {
      res.status(StatusCodes.CREATED).json(await Model.create(req.body));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      res.status(StatusCodes.OK).res.json(await Model.findAll());
    } catch (error) {
      next(error);
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      data ? res.json(data) : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res) => {
    try {
      const [updated] = await Model.update(req.body, { where: { id: req.params.id } });
      updated ? res.json(await Model.findByPk(req.params.id)) : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Model.destroy({ where: { id: req.params.id } });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
});
