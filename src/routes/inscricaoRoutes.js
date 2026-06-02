const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         evento_id:
 *           type: integer
 *         participante_id:
 *           type: integer
 *         status:
 *           type: string
 *       example:
 *         id: 1
 *         evento_id: 1
 *         participante_id: 1
 *         status: ativa
 */

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/exportar/xml:
 *   get:
 *     summary: Exportar inscrições em XML
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: XML gerado com sucesso
 */
router.get("/exportar/xml", InscricaoController.exportarXML);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições por evento
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma inscrição
 *     tags: [Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: integer
 *               participanteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes/{id}:
 *   get:
 *     summary: Buscar inscrição por ID
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição encontrada
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/:id", InscricaoController.show);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar inscrição
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição cancelada
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;