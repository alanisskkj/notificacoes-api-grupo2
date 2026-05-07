const express = require("express");
const router = express.Router();

const EventoController = require("../controllers/EventoController");
const upload = require("../config/upload");
const { Evento } = require("../models");
const cacheMiddleware = require('../middlewares/cacheMiddleware');


/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         data:
 *           type: string
 *         local:
 *           type: string
 *         capacidade:
 *           type: integer
 *         banner:
 *           type: string
 */

router.get("/futuros", EventoController.listarFuturos);

router.get('/', cacheMiddleware(30), EventoController.index);

router.get('/:id', cacheMiddleware(60), EventoController.show);

router.get("/", EventoController.index);

router.get("/:id", EventoController.show);

router.post("/", EventoController.store);

router.put("/:id", EventoController.update);

router.delete("/:id", EventoController.destroy);

router.post("/:id/banner", upload.single("banner"), async (req, res, next) => {
  try {
    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({
        erro: "Evento não encontrado",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        erro: "Nenhum arquivo enviado",
      });
    }

    const caminho = `/uploads/${req.file.filename}`;

    await evento.update({
      banner: caminho,
    });

    res.json({
      mensagem: "Banner atualizado com sucesso",
      banner: caminho,
    });

  } catch (erro) {
    next(erro);
  }
});

module.exports = router;