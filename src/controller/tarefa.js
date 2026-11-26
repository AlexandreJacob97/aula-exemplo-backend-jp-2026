import ServiceTarefa from "../service/tarefa.js";

function serializeTask(tarefa) {
  const task = typeof tarefa.toJSON === "function" ? tarefa.toJSON() : tarefa;
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt ? new Date(task.createdAt).getTime() : Date.now(),
  };
}

class ControllerTarefa {
  async listar(request, response) {
    try {
      const tarefas = await ServiceTarefa.buscarTodas(request.query.status);
      response.json(tarefas.map(serializeTask));
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  async buscar(request, response) {
    try {
      const tarefa = await ServiceTarefa.buscarPorId(request.params.id);
      response.json(serializeTask(tarefa));
    } catch (error) {
      response.status(404).json({ message: error.message });
    }
  }

  async criar(request, response) {
    try {
      const tarefa = await ServiceTarefa.criar(request.body?.title, request.body?.status);
      response.status(201).json(serializeTask(tarefa));
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async alterar(request, response) {
    try {
      const tarefa = await ServiceTarefa.alterar(
        request.params.id,
        request.body?.title,
        request.body?.status,
      );
      response.json(serializeTask(tarefa));
    } catch (error) {
      const status = error.message === "Tarefa nao encontrada." ? 404 : 400;
      response.status(status).json({ message: error.message });
    }
  }

  async atualizarParcialmente(request, response) {
    try {
      const tarefa = await ServiceTarefa.atualizarParcialmente(
        request.params.id,
        request.body,
      );
      response.json(serializeTask(tarefa));
    } catch (error) {
      const status = error.message === "Tarefa nao encontrada." ? 404 : 400;
      response.status(status).json({ message: error.message });
    }
  }

  async deletar(request, response) {
    try {
      await ServiceTarefa.deletar(request.params.id);
      response.status(204).send();
    } catch (error) {
      response.status(404).json({ message: error.message });
    }
  }
}

export default new ControllerTarefa();
