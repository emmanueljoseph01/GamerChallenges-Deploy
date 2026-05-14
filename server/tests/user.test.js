import request from "supertest";
import { expect, test } from "vitest";
import app from "../src/app.js";

test("création user sans token → 401", async () => {
  const res = await request(app).post("/api/users").send({
    username: "nouveau",
    email: "nouveau@example.com",
    password: "12345678",
    birthdate: "2000-01-01",
  });
  expect(res.status).toBe(401);
});

test("modification user sans token → 401", async () => {
  const res = await request(app)
    .patch("/api/users/1")
    .send({ username: "autre" });
  expect(res.status).toBe(401);
});

test("suppression user sans token → 401", async () => {
  const res = await request(app).delete("/api/users/1");
  expect(res.status).toBe(401);
});
