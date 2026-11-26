import { Sequelize } from "sequelize";

class Database {
  constructor() {
    this.init();
  }

  init() {
    const required = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST"];
    const missing = required.filter((name) => !process.env[name]);

    if (missing.length > 0) {
      throw new Error(
        `Variaveis de banco ausentes: ${missing.join(", ")}. Consulte .env.example.`,
      );
    }

    this.db = new Sequelize({
      dialect: "postgres",
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      logging: process.env.DB_LOGGING === "true" ? console.log : false,
      dialectOptions:
        process.env.DB_SSL === "true"
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
              },
            }
          : {},
    });
  }
}

export default new Database();