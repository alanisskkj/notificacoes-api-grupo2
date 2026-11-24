const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const CentralNotificacaoService = require("../services/CentralNotificacaoService");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AvisoCentral:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         canal:
 *           type: string
 *           enum: [PUSH, EMAIL]
 *         titulo:
 *           type: string
 *         texto:
 *           type: string
 *         lida:
 *           type: boolean
 *         hora:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /central-notificacoes:
 *   get:
 *     summary: Listar avisos da Central de Notificações
 *     tags: [Central de Notificações]
 *     responses:
 *       200:
 *         description: Lista de avisos
 */
router.get("/", async (req, res, next) => {
    try {
        res.json(await CentralNotificacaoService.listar());
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /central-notificacoes:
 *   post:
 *     summary: Criar um aviso na Central de Notificações
 *     tags: [Central de Notificações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [canal, titulo, texto, lida]
 *             properties:
 *               canal:
 *                 type: string
 *                 enum: [PUSH, EMAIL]
 *               titulo:
 *                 type: string
 *               texto:
 *                 type: string
 *               lida:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Aviso criado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou ausente
 */
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const aviso = await CentralNotificacaoService.criar(req.body);
        res.status(201).json(aviso);
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /central-notificacoes/{id}:
 *   patch:
 *     summary: Marcar um aviso como lido
 *     tags: [Central de Notificações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lida]
 *             properties:
 *               lida:
 *                 type: boolean
 *                 enum: [true]
 *     responses:
 *       200:
 *         description: Aviso atualizado
 *       404:
 *         description: Aviso não encontrado
 */
router.patch("/:id", authMiddleware, async (req, res, next) => {
    try {
        const id = CentralNotificacaoService.validarId(req.params.id);
        const aviso = await CentralNotificacaoService.marcarComoLida(
            id,
            req.body,
        );
        res.json(aviso);
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /central-notificacoes/{id}:
 *   delete:
 *     summary: Excluir um aviso
 *     tags: [Central de Notificações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Aviso excluído
 *       404:
 *         description: Aviso não encontrado
 */
router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const id = CentralNotificacaoService.validarId(req.params.id);
        await CentralNotificacaoService.excluir(id);
        res.status(204).end();
    } catch (erro) {
        next(erro);
    }
});

module.exports = router;
