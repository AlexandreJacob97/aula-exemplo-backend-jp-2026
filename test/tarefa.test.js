import test from "node:test";
import assert from "node:assert/strict";

process.env.DB_NAME = "test";
process.env.DB_USER = "test";
process.env.DB_PASSWORD = "test";
process.env.DB_HOST = "localhost";

const {
  validateStatus,
  validateTitle,
  MAX_TITLE_LENGTH,
} = await import("../src/service/tarefa.js");

test("titulo da tarefa e obrigatorio e limitado", () => {
  assert.throws(() => validateTitle(""), /titulo/);
  assert.throws(
    () => validateTitle("a".repeat(MAX_TITLE_LENGTH + 1)),
    /maximo/,
  );
  assert.equal(validateTitle("  Estudar  "), "Estudar");
});

test("status aceita somente pending ou done", () => {
  assert.doesNotThrow(() => validateStatus("pending"));
  assert.doesNotThrow(() => validateStatus("done"));
  assert.throws(() => validateStatus("concluida"), /pending.*done/);
});
