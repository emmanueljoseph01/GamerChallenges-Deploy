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
    const challenges = await Model.findAll();
res.status(StatusCodes.OK).json(challenges);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      data ? res.json(data) : res.status(404).end();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const [updated] = await Model.update(req.body, { where: { id: req.params.id } });
      updated ? res.json(await Model.findByPk(req.params.id)) : res.status(404).end();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Model.destroy({ where: { id: req.params.id } });
      res.status(204).end();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
});
