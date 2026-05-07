const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gerenciamento de Eventos",
            version: "1.0.0",
            description: "API para gestão de eventos, participantes e inscrições com notificações por e-mail.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desenvolvimento",
            },
        ],
        paths: {
            "/exportar/eventos/xml": {
                get: {
                    summary: "Exporta eventos em formato XML",
                    tags: ["Exportação"],
                    responses: {
                        200: { description: "Arquivo XML gerado com sucesso" }
                    }
                }
            },
            "/exportar/eventos/json": {
                get: {
                    summary: "Exporta eventos em formato JSON",
                    tags: ["Exportação"],
                    responses: {
                        200: { description: "Lista de eventos em JSON" }
                    }
                }
            },
            "/exportar/relatorio/inscricoes": {
                get: {
                    summary: "Gera relatório de inscrições",
                    tags: ["Exportação"],
                    responses: {
                        200: { description: "Relatório gerado com sucesso" }
                    }
                }
            },
            "/eventos/{id}/banner": {
                post: {
                    summary: "Faz o upload do banner de um evento",
                    tags: ["Eventos"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "ID do evento",
                            schema: { type: "string" }
                        }
                    ],
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        banner: {
                                            type: "string",
                                            format: "binary"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: "Banner enviado com sucesso" },
                        404: { description: "Evento não encontrado" }
                    }
                }
            }
        },
        components: {
            schemas: {},
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;