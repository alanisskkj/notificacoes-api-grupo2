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
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                Evento: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        nome: {
                            type: "string",
                            example: "Workshop de Tecnologia",
                        },
                        descricao: {
                            type: "string",
                            example: "Workshop sobre desenvolvimento de APIs.",
                        },
                        data: {
                            type: "string",
                            format: "date-time",
                            example: "2026-09-15T14:00:00Z",
                        },
                        local: {
                            type: "string",
                            example: "SENAI Osvaldo Cruz",
                        },
                        capacidade: {
                            type: "integer",
                            example: 100,
                        },
                        banner: {
                            type: "string",
                            example: "banner-evento.jpg",
                        },
                    },
                },

                Participante: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        nome: {
                            type: "string",
                            example: "João da Silva",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com",
                        },
                        telefone: {
                            type: "string",
                            example: "(18) 99999-9999",
                        },
                    },
                },

                Inscricao: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        eventoId: {
                            type: "integer",
                            example: 1,
                        },
                        participanteId: {
                            type: "integer",
                            example: 1,
                        },
                        status: {
                            type: "string",
                            example: "confirmada",
                        },
                        dataInscricao: {
                            type: "string",
                            format: "date-time",
                            example: "2026-08-25T13:00:00Z",
                        },
                    },
                },

                Notificacao: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        destinatario: {
                            type: "string",
                            format: "email",
                            example: "usuario@email.com",
                        },
                        assunto: {
                            type: "string",
                            example: "Inscrição confirmada",
                        },
                        mensagem: {
                            type: "string",
                            example: "Sua inscrição foi realizada com sucesso.",
                        },
                        status: {
                            type: "string",
                            example: "enviada",
                        },
                    },
                },

                Erro: {
                    type: "object",
                    properties: {
                        mensagem: {
                            type: "string",
                            example: "Erro ao realizar a operação.",
                        },
                    },
                },
            },
        },

        paths: {
            "/exportar/eventos/xml": {
                get: {
                    summary: "Exporta eventos em formato XML",
                    tags: ["Exportação"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Arquivo XML gerado com sucesso",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/exportar/eventos/json": {
                get: {
                    summary: "Exporta eventos em formato JSON",
                    tags: ["Exportação"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista de eventos em JSON",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/exportar/relatorio/inscricoes": {
                get: {
                    summary: "Gera relatório de inscrições",
                    tags: ["Exportação"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Relatório gerado com sucesso",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/eventos": {
                get: {
                    summary: "Listar eventos",
                    tags: ["Eventos"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista de eventos",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },

                post: {
                    summary: "Criar evento",
                    tags: ["Eventos"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Evento",
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Evento criado com sucesso",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/eventos/{id}": {
                put: {
                    summary: "Atualizar evento",
                    tags: ["Eventos"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Evento",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Evento atualizado",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Evento não encontrado",
                        },
                    },
                },

                delete: {
                    summary: "Deletar evento",
                    tags: ["Eventos"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        204: {
                            description: "Evento deletado",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Evento não encontrado",
                        },
                    },
                },
            },

            "/eventos/{id}/banner": {
                post: {
                    summary: "Faz o upload do banner de um evento",
                    tags: ["Eventos"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        banner: {
                                            type: "string",
                                            format: "binary",
                                        },
                                    },
                                    required: ["banner"],
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Banner enviado com sucesso",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Evento não encontrado",
                        },
                    },
                },
            },

            "/participantes": {
                get: {
                    summary: "Listar participantes",
                    tags: ["Participantes"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista de participantes",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },

                post: {
                    summary: "Criar participante",
                    tags: ["Participantes"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Participante",
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Participante criado",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/participantes/{id}": {
                get: {
                    summary: "Buscar participante por ID",
                    tags: ["Participantes"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Participante encontrado",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Participante não encontrado",
                        },
                    },
                },

                put: {
                    summary: "Atualizar participante",
                    tags: ["Participantes"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Participante",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Participante atualizado",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Participante não encontrado",
                        },
                    },
                },

                delete: {
                    summary: "Excluir participante",
                    tags: ["Participantes"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        204: {
                            description: "Participante removido",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Participante não encontrado",
                        },
                    },
                },
            },

            "/inscricoes": {
                get: {
                    summary: "Listar inscrições",
                    tags: ["Inscrições"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista de inscrições",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },

                post: {
                    summary: "Criar inscrição",
                    tags: ["Inscrições"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Inscricao",
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Inscrição criada",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/inscricoes/evento/{eventoId}": {
                get: {
                    summary: "Listar inscrições por evento",
                    tags: ["Inscrições"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "eventoId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Inscrições do evento",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },

            "/inscricoes/{id}/cancelar": {
                patch: {
                    summary: "Cancelar inscrição",
                    tags: ["Inscrições"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Inscrição cancelada",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Inscrição não encontrada",
                        },
                    },
                },
            },

            "/notificacoes/{id}": {
                get: {
                    summary: "Buscar notificação por ID",
                    tags: ["Notificações"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Notificação encontrada",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                        404: {
                            description: "Notificação não encontrada",
                        },
                    },
                },
            },

            "/notificacoes/teste-email": {
                post: {
                    summary: "Enviar e-mail de teste",
                    tags: ["Notificações"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "E-mail enviado com sucesso",
                        },
                        401: {
                            description: "Não autorizado",
                        },
                    },
                },
            },
        },
    },

    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;