import { expect, test } from "vitest";
import {
  challengeSchema,
  challengeUpdateSchema,
} from "../src/validations/challenge.validation.js";

test("schéma création : données valides", () => {
  const payload = {
    title: "Défi valide",
    description: "",
    rules: "Au moins dix caractères.",
    game_id: 1,
  };
  const { error, value } = challengeSchema.validate(payload);
  expect(error).toBe(undefined);
  expect(value).toEqual(payload);
});

test("schéma création : titre trop court", () => {
  const { error } = challengeSchema.validate({
    title: "AB",
    description: "",
    rules: "Au moins dix caractères.",
    game_id: 1,
  });
  expect(error.message).toContain("3 caractères");
});

test("schéma création : règles trop courtes", () => {
  const { error } = challengeSchema.validate({
    title: "Titre ok",
    description: "",
    rules: "court",
    game_id: 1,
  });
  expect(error.message).toContain("10 caractères");
});

test("schéma création : game_id manquant", () => {
  const { error } = challengeSchema.validate({
    title: "Titre ok",
    description: "",
    rules: "Au moins dix caractères.",
  });
  expect(error.message).toContain("jeu");
});

test("schéma mise à jour : aucun champ → erreur", () => {
  const { error } = challengeUpdateSchema.validate({});
  expect(error.message).toMatch(/at least 1 key/);
});

test("schéma mise à jour : un champ suffit", () => {
  const { error, value } = challengeUpdateSchema.validate({
    title: "Nouveau titre",
  });
  expect(error).toBe(undefined);
  expect(value.title).toBe("Nouveau titre");
});
