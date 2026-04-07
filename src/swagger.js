const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gerenciamento de Eventos",
            version: "1.0.0",
            description:
                "API para gestão de eventos, participantes e inscrições com notificações por e-mail.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desenvolvimento",
            },
        ],
        components: {
            schemas: {},
        },
    },

    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;