const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const logger = require("./middlewares/logger");
app.use(logger);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const cors = require("cors");
app.use(cors());

const notFound = require("./middlewares/notFound");
app.use(notFound);

const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        documentacao: "/api-docs",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",
        },
    });
});
module.exports = app;