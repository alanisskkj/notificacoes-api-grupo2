const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

router.get("/", InscricaoController.index);
router.get("/exportar/xml", InscricaoController.exportarXML);
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

router.post("/", InscricaoController.store); 
router.get("/:id", InscricaoController.show); 
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;