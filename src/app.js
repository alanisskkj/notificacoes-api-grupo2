const express = require("express");
const cors = require("cors");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// ROTAS
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
const exportRoutes = require("./routes/exportRoutes");

// MIDDLEWARES
const responseTime = require("./middlewares/responseTime");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(express.json());
app.use(cors());
app.use(responseTime);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ============================================
// DOCUMENTAÇÃO
// ============================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// ROTAS
// ============================================
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use("/exportar", exportRoutes);

// ============================================
// ROTA RAIZ
// ============================================
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Eventos",
    versao: "1.0.0",
    docs: "/api-docs",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
      exportacao: "/exportar",
      uploads: "/uploads"
    },
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;