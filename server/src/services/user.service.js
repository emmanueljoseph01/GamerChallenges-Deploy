import argon2 from "argon2";
import { QueryTypes } from "sequelize";
import { Participation, Role, sequelizeClient, User, Vote } from "../models/index.model.js";

export class UserService {
  async create(payload) {
    const hashedPassword = await argon2.hash(payload.password);

    const user = await User.create({
      ...payload,
      password: hashedPassword,
    });

    return await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async findAll() {
    return await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        { model: Role },
        {
          model: Participation,
          include: [{ model: Vote }],
        },
      ],
    });
  }

  async findOne(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async update(id, payload) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const { role_id, password, profil_image, ...allowedUpdates } = payload;

    if (password) {
      allowedUpdates.password = await argon2.hash(password);
    }

    await user.update(allowedUpdates);

    return await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }

  async getLeaderboard() {
    const rows = await sequelizeClient.query(
      `
      SELECT
        utilisateur.id,
        utilisateur.username,
        utilisateur.profil_image,
        COUNT(DISTINCT participation.id) AS nb_defis,
        COUNT(DISTINCT vote.id) AS nb_votes
      FROM users AS utilisateur
      LEFT JOIN participations AS participation ON participation.user_id = utilisateur.id
      LEFT JOIN votes AS vote ON vote.participation_id = participation.id
      GROUP BY utilisateur.id, utilisateur.username, utilisateur.profil_image
      ORDER BY COUNT(DISTINCT participation.id) DESC, COUNT(DISTINCT vote.id) DESC
      LIMIT 25
      `,
      { type: QueryTypes.SELECT }
    );

    return rows.map((row) => ({
      id: row.id,
      username: row.username,
      profil_image: row.profil_image,
      nbDefis: Number(row.nb_defis),
      nbVotes: Number(row.nb_votes),
    }));
  }
}

export const userService = new UserService();
