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
 *
 *     Erro:
 *       type: object
 *       properties:
 *         erro:
 *           type: object
 *           properties:
 *             tipo:
 *               type: string
 *               example: NotFoundError
 *             mensagem:
 *               type: string
 *               example: Evento não encontrado
 *             statusCode:
 *               type: integer
 *               example: 404
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get('/', cacheMiddleware(30), EventoController.index);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', cacheMiddleware(60), EventoController.show);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado
 */
router.post("/", EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       404:
 *         description: Evento não encontrado
 */
router.put("/:id", EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Deletar evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento deletado
 *       404:
 *         description: Evento não encontrado
 */
router.delete("/:id", EventoController.destroy);

/**
 * @swagger
 * /eventos/{id}/banner:
 *   post:
 *     summary: Fazer upload do banner do evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do banner (JPEG, PNG, GIF, WebP — máx 5MB)
 *     responses:
 *       200:
 *         description: Banner atualizado
 *       400:
 *         description: Nenhum arquivo enviado ou tipo inválido
 *       404:
 *         description: Evento não encontrado
 */
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