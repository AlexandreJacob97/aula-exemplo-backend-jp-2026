import express from "express";
import pessoaRouter from "./src/router/pessoa.js";
import tarefaRouter from "./src/router/tarefa.js";
import database from "./src/config/database.js";
import "./src/model/tarefa.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "100kb" }));

app.use((request, response, next) => {
  const developmentOrigins =
    process.env.NODE_ENV === "production"
      ? []
      : [
          "http://localhost:5173",
          "http://localhost:8080",
          "http://127.0.0.1:5173",
          "http://127.0.0.1:8080",
        ];
  const configuredOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([...developmentOrigins, ...configuredOrigins]);

  if (!request.headers.origin || allowedOrigins.has(request.headers.origin)) {
    response.header("Access-Control-Allow-Origin", request.headers.origin || "*");
  }
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use("/api", pessoaRouter);
app.use("/api/tarefas", tarefaRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Rota nao encontrada." });
});

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({ message: "JSON invalido." });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "Erro interno do servidor." });
});

database.db
  .sync({ force: false })
  .then(() => {
    app.listen(port, "127.0.0.1", () => {
      console.log(`Servidor ouvindo em http://localhost:${port}`);
      console.log(`API de tarefas: http://localhost:${port}/api/tarefas`);
    });
  })
  .catch((error) => {
    console.error("Nao foi possivel conectar ao banco de dados:", error.message);
    process.exitCode = 1;
  });