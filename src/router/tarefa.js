import express from "express";
import ControllerTarefa from "../controller/tarefa.js";

const router = express.Router();

router.get("/", ControllerTarefa.listar);
router.get("/:id", ControllerTarefa.buscar);
router.post("/", ControllerTarefa.criar);
router.put("/:id", ControllerTarefa.alterar);
router.patch("/:id", ControllerTarefa.atualizarParcialmente);
router.delete("/:id", ControllerTarefa.deletar);

export default router;
