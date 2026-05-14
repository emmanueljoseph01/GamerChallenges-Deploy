import request from "supertest";
import { expect, test } from "vitest";
import app from "../src/app.js";

// Création (POST) — connecté requis, sans token → refus
test("création challenge sans token → 401", async () => {
  const res = await request(app).post("/api/challenges").send({
    title: "Mon challenge",
    description: "",
    rules: "Règles assez longues",
    game_id: 1,
  });
  expect(res.status).toBe(401);
});

// Modification (PATCH) — propriétaire ou admin, sans token → refus
test("modification challenge sans token → 401", async () => {
  const res = await request(app)
    .patch("/api/challenges/1")
    .send({ title: "Nouveau titre" });
  expect(res.status).toBe(401);
});

// Suppression (DELETE) — admin, sans token → refus
test("suppression challenge sans token → 401", async () => {
  const res = await request(app).delete("/api/challenges/1");
  expect(res.status).toBe(401);
});
