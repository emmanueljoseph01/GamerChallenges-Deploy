import request from "supertest";
import { expect, test } from "vitest";
import app from "../src/app.js";

test("logout OK", async () => {
  const res = await request(app).post("/api/auth/logout");
  expect(res.status).toBe(200);
});

test("login email invalide → 400", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "nope", password: "12345678" });
  expect(res.status).toBe(400);
});

test("/me sans token → 401", async () => {
  const res = await request(app).get("/api/auth/me");
  expect(res.status).toBe(401);
});
