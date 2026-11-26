import database from "../config/database.js";

const Tarefa = database.db.define(
  "tarefa",
  {
    id: {
      type: database.db.Sequelize.UUID,
      primaryKey: true,
      defaultValue: database.db.Sequelize.UUIDV4,
    },
    title: {
      type: database.db.Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    status: {
      type: database.db.Sequelize.ENUM("pending", "done"),
      allowNull: false,
      defaultValue: "pending",
    },
    createdAt: {
      type: database.db.Sequelize.DATE,
      allowNull: false,
      defaultValue: database.db.Sequelize.NOW,
    },
    updatedAt: {
      type: database.db.Sequelize.DATE,
      allowNull: false,
      defaultValue: database.db.Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  },
);

export default Tarefa;
