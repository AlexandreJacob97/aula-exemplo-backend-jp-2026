# API REST de tarefas

Backend em Node.js, Express e PostgreSQL para o gerenciamento de tarefas.

## Configuração

1. Copie `.env.example` para `.env`.
2. Preencha as variáveis do banco PostgreSQL.
3. Instale as dependências existentes:

```text
npm install
```

4. Inicie o servidor:

```text
npm run dev
```

Por padrão, a API fica em `http://localhost:3000`.

## Endpoints

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/api/tarefas` | Lista todas as tarefas |
| GET | `/api/tarefas?status=pending` | Lista tarefas pendentes |
| GET | `/api/tarefas?status=done` | Lista tarefas concluídas |
| GET | `/api/tarefas/:id` | Consulta uma tarefa |
| POST | `/api/tarefas` | Cria uma tarefa |
| PUT | `/api/tarefas/:id` | Atualiza título e, opcionalmente, status |
| PATCH | `/api/tarefas/:id` | Atualiza parcialmente título ou status |
| DELETE | `/api/tarefas/:id` | Exclui uma tarefa |

Exemplo de criação:

```json
{
  "title": "Estudar API REST",
  "status": "pending"
}
```

Os status válidos são `pending` e `done`. O título é obrigatório e possui até 100 caracteres.

## Testes

```text
npm test
```
