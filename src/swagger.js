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

        paths: {


            "/exportar/eventos/xml": {
                get: {
                    summary: "Exporta eventos em formato XML",
                    tags: ["Exportação"],
                    responses: {
                        200: {
                            description: "Arquivo XML gerado com sucesso"
                        }
                    }
                }
            },

            "/exportar/eventos/json": {
                get: {
                    summary: "Exporta eventos em formato JSON",
                    tags: ["Exportação"],
                    responses: {
                        200: {
                            description: "Lista de eventos em JSON"
                        }
                    }
                }
            },

            "/exportar/relatorio/inscricoes": {
                get: {
                    summary: "Gera relatório de inscrições",
                    tags: ["Exportação"],
                    responses: {
                        200: {
                            description: "Relatório gerado com sucesso"
                        }
                    }
                }
            },

            "/eventos": {

                get: {
                    summary: "Listar eventos",
                    tags: ["Eventos"],
                    responses: {
                        200: {
                            description: "Lista de eventos"
                        }
                    }
                },

                post: {
                    summary: "Criar evento",
                    tags: ["Eventos"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Evento"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Evento criado com sucesso"
                        }
                    }
                }
            },

            "/eventos/{id}": {

                put: {
                    summary: "Atualizar evento",
                    tags: ["Eventos"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Evento"
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Evento atualizado"
                        },

                        404: {
                            description: "Evento não encontrado"
                        }
                    }
                },

                delete: {
                    summary: "Deletar evento",
                    tags: ["Eventos"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        204: {
                            description: "Evento deletado"
                        },

                        404: {
                            description: "Evento não encontrado"
                        }
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
                            schema: {
                                type: "string"
                            }
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
                        201: {
                            description: "Banner enviado com sucesso"
                        },

                        404: {
                            description: "Evento não encontrado"
                        }
                    }
                }
            },

            "/participantes": {

                get: {
                    summary: "Listar participantes",
                    tags: ["Participantes"],
                    responses: {
                        200: {
                            description: "Lista de participantes"
                        }
                    }
                },

                post: {
                    summary: "Criar participante",
                    tags: ["Participantes"],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Participante"
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Participante criado"
                        }
                    }
                }
            },

            "/participantes/{id}": {

                get: {
                    summary: "Buscar participante por ID",
                    tags: ["Participantes"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Participante encontrado"
                        },

                        404: {
                            description: "Participante não encontrado"
                        }
                    }
                },

                put: {
                    summary: "Atualizar participante",
                    tags: ["Participantes"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Participante atualizado"
                        }
                    }
                },

                delete: {
                    summary: "Excluir participante",
                    tags: ["Participantes"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        204: {
                            description: "Participante removido"
                        }
                    }
                }
            },

            "/inscricoes": {

                get: {
                    summary: "Listar inscrições",
                    tags: ["Inscrições"],
                    responses: {
                        200: {
                            description: "Lista de inscrições"
                        }
                    }
                },

                post: {
                    summary: "Criar inscrição",
                    tags: ["Inscrições"],
                    responses: {
                        201: {
                            description: "Inscrição criada"
                        }
                    }
                }
            },

            "/inscricoes/evento/{eventoId}": {

                get: {
                    summary: "Listar inscrições por evento",
                    tags: ["Inscrições"],

                    parameters: [
                        {
                            name: "eventoId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Inscrições do evento"
                        }
                    }
                }
            },

            "/inscricoes/{id}/cancelar": {

                patch: {
                    summary: "Cancelar inscrição",
                    tags: ["Inscrições"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Inscrição cancelada"
                        }
                    }
                }
            },


            "/notificacoes/{id}": {

                get: {
                    summary: "Buscar notificação por ID",
                    tags: ["Notificações"],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Notificação encontrada"
                        }
                    }
                }
            },

            "/notificacoes/teste-email": {

                post: {
                    summary: "Enviar e-mail de teste",
                    tags: ["Notificações"],

                    responses: {
                        200: {
                            description: "E-mail enviado com sucesso"
                        }
                    }
                }
            }
        },

        components: {
            schemas: {

                Evento: {
                    type: "object",
                },

                Participante: {
                    type: "object",
                },

                Inscricao: {
                    type: "object",
                },

                Notificacao: {
                    type: "object",
                },

                Erro: {
                    type: "object",
                }
            },
        },
    },

    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
