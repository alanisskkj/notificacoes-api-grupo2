# 🔔 Notificações API

API REST para módulo de notificações por e-mail de uma plataforma de eventos.

![Node.js](https://img.shields.io/badge/Node.js-24+-green)

![Express](https://img.shields.io/badge/Express-4.x-blue)

![MariaDB](https://img.shields.io/badge/MariaDB-11.x-blue)

![Deploy](https://img.shields.io/badge/Deploy-Servidor%20SENAI-blueviolet)

**🌐 URL de Produção:** [http://10.137.146.202:3000/]

**📚 Documentação:** [http://10.137.146.202:3000/api-docs]

---

## 📋 Sobre o Projeto

Sistema de notificações por e-mail para uma plataforma de eventos.

Quando um participante se inscreve em um evento, recebe automaticamente

um e-mail de confirmação. O sistema também envia notificações de cancelamento.

**Desenvolvido como projeto da SA2** — SENAI "Santo Paschoal Crepaldi"

Curso: Técnico em Desenvolvimento de Sistemas

UCs: Programação Back-End + Projetos de Software

### Equipe

- [Alanis Venerruche] — [GitHub](https://github.com/alanisskkj)

- [Isabela Viana] — [GitHub](https://github.com/isabela-maya17)

- [Isabele Firmino] — [GitHub](https://github.com/is4gonzales)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 24+

- MySQL 8.0 ou MariaDB 11+

- Git

### Instalação

1. Clone o repositório:

   ```bash

   git clone https://github.com/alanisskkj/notificacoes-api-grupo2.git

   cd notificacoes-api-grupo2

   ```

Instale as dependências:

npm install

Configure o ambiente:

cp .env.example .env

# Edite o .env com suas credenciais do banco de dados

Crie o banco e execute as migrations:

npm run db:migrate

npm run db:seed

Inicie o servidor:

npm run dev

Acesse:

API: http://localhost:3000
Swagger: http://localhost:3000/api-docs

---

## 📚 Rotas da API

### Eventos

- Listar eventos: http://10.137.146.202:3000/eventos
- Criar evento: http://10.137.146.202:3000/eventos
- Atualizar evento: http://10.137.146.202:3000/eventos/{id}
- Deletar evento: http://10.137.146.202:3000/eventos/{id}
- Buscar evento por ID: http://10.137.146.202:3000/eventos/{id}
- Fazer upload do banner do evento: http://10.137.146.202:3000/eventos/{id}/banner

### Participantes

- Listar todos os participantes: http://10.137.146.202:3000/participantes
- Criar um novo participante: http://10.137.146.202:3000/participantes
- Buscar participante por ID: http://10.137.146.202:3000/participantes/{id}
- Atualizar um participante: http://10.137.146.202:3000/participantes/{id}
- Deletar um participante: http://10.137.146.202:3000/participantes/{id}

### Inscrições

- Listar todas as inscrições: http://10.137.146.202:3000/inscricoes
- Criar uma inscrição: http://10.137.146.202:3000/inscricoes
- Listar inscrições por evento: http://10.137.146.202:3000/inscricoes/evento/{eventoId}
- Cancelar inscrição: http://10.137.146.202:3000/inscricoes/{id}/cancelar
- Exportar inscrições em XML: http://10.137.146.202:3000/inscricoes/exportar/xml
- Buscar inscrição por ID: http://10.137.146.202:3000/inscricoes/{id}

### Notificações

- Buscar por ID: http://10.137.146.202:3000/notificacoes/{id}
- Enviar E-mail de teste: http://10.137.146.202:3000/notificacoes/teste-email
- Listar notificações: http://10.137.146.202:3000/notificacoes
- Estatistíca de envio:  http://10.137.146.202:3000/notificacoes/estatisticas
- Reenviar uma notificação: http://10.137.146.202:3000/notificacoes/{id}/reenviar

### Exportação

- Exportar eventos em XML: http://10.137.146.202:3000/exportar/eventos/xml
- Exportar eventos em JSON: http://10.137.146.202:3000/exportar/eventos/json
- Gerar relatório de inscrições: http://10.137.146.202:3000/exportar/relatorio/inscricoes
- Exportar inscrições em XML: http://10.137.146.202:3000/exportar/inscricoes/xml
- Exportar relatório de inscrições em CSV: http://10.137.146.202:3000/exportar/relatorio/inscricoes/csv- 

---

## 🛠️ Tecnologias

| Tecnologia           | Finalidade                     |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | Framework web                  |
| MariaDB              | Banco de dados                 |
| Sequelize            | ORM                            |
| Nodemailer + MailPit | Envio de e-mails (teste local) |
| Swagger              | Documentação                   |
| Multer               | Upload de arquivos             |

---

## 📁 Estrutura do Projeto

src/
│
├── config/
│ ├── cache.js
│ ├── database.js
│ ├── database.json
│ ├── upload.js
|
├── controllers/
│ ├── EventoController.js
│ ├── ParticipanteController.js
│ ├── InscricaoController.js
|
|── database/
│ ├── migrations/
│ ├── seeds/
|
|── errors/
│ ├── AppError.js
|
|── helpers/
│ ├── parseId.js
│ ├── validators.js
|
├── services/
│ ├── eventoService.js
│ ├── participanteService.js
│ ├── inscricaoService.js
│
├── models/
│ ├── Evento.js
│ ├── Participante.js
│ ├── Inscricao.js
│ └── Notificacao.js
│
├── routes/
│ ├── eventoRoutes.js
│ ├── participanteRoutes.js
│ ├── inscricaoRoutes.js
│ └── exportRoutes.js
│
├── middlewares/
│ ├── errorHandler.js
│ ├── cacheMiddleware.js
│ ├── logger.js
│ ├── notFound.js
│ ├── responseTime.js
│
├── app.js
|── server.js
└── swagger.js

---

## 🛠️ Tecnologias

| Tecnologia           | Finalidade                     |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | Framework web                  |
| MariaDB              | Banco de dados                 |
| Sequelize            | ORM                            |
| Nodemailer + MailPit | Envio de e-mails (teste local) |
| Swagger              | Documentação                   |
| Multer               | Upload de arquivos             |

---

## 📄 Licença
Projeto acadêmico — SENAI 2026

---

## 🧪 Testes Manuais Finais

Roteiro de testes **tanto no localhost quanto na URL de produção**:

| Teste | Local | Produção |

|---|---|---|

| `GET /` (raiz) | ✅ | ✅ |

| `GET /eventos` | ✅ | ✅ |

| `POST /eventos` | ✅ | ✅ |

| `GET /api-docs` (Swagger) | ✅ | ✅ |

| `POST /inscricoes` + e-mail | ✅ | ✅|

| `GET /notificacoes/estatisticas` | ✅ | ✅ |

---
