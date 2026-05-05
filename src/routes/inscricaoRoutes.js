const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

router.get("/", InscricaoController.index);

router.get("/exportar/xml", InscricaoController.exportarXML);

module.exports = router;
