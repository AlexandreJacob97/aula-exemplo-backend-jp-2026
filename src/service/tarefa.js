import Tarefa from "../model/tarefa.js";

const MAX_TITLE_LENGTH = 100;

function validateTitle(value) {
  if (typeof value !== "string") {
    throw new Error("Favor informar um titulo valido.");
  }

  const title = value.trim();
  if (!title) {
    throw new Error("Favor informar o titulo.");
  }
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(`O titulo pode ter no maximo ${MAX_TITLE_LENGTH} caracteres.`);
  }

  return title;
}

function validateStatus(value) {
  if (value !== undefined && value !== "pending" && value !== "done") {
    throw new Error('O status deve ser "pending" ou "done".');
  }
}

class ServiceTarefa {
  async buscarTodas(status) {
    validateStatus(status);
    const options = { order: [["createdAt", "DESC"]] };
    if (status) {
      options.where = { status };
    }
    return Tarefa.findAll(options);
  }

  async buscarPorId(id) {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      throw new Error("Tarefa nao encontrada.");
    }
    return tarefa;
  }

  async criar(title, status = "pending") {
    validateStatus(status);
    return Tarefa.create({
      title: validateTitle(title),
      status,
    });
  }

  async alterar(id, title, status) {
    validateStatus(status);
    const tarefa = await this.buscarPorId(id);

    if (title === undefined) {
      throw new Error("Favor informar o titulo.");
    }

    tarefa.title = validateTitle(title);
    if (status !== undefined) {
      tarefa.status = status;
    }
    await tarefa.save();
    return tarefa;
  }

  async atualizarParcialmente(id, fields) {
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      throw new Error("Favor informar os dados da tarefa.");
    }
    if (fields.title === undefined && fields.status === undefined) {
      throw new Error("Informe pelo menos o titulo ou o status.");
    }

    validateStatus(fields.status);
    const tarefa = await this.buscarPorId(id);

    if (fields.title !== undefined) {
      tarefa.title = validateTitle(fields.title);
    }
    if (fields.status !== undefined) {
      tarefa.status = fields.status;
    }

    await tarefa.save();
    return tarefa;
  }

  async deletar(id) {
    const tarefa = await this.buscarPorId(id);
    await tarefa.destroy();
  }
}

export { MAX_TITLE_LENGTH, validateTitle, validateStatus };
export default new ServiceTarefa();
