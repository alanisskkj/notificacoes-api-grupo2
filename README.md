# API de Eventos

API REST desenvolvida com Node.js, Express, Sequelize e MySQL para gerenciamento de eventos, participantes e inscrições.

# 🚀 Tecnologias

- Node.js
- Express
- MySQL
- Sequelize
- Swagger
- Multer
- Node-Cache

# 🔧 Scripts

| Comando | Descrição |
|----------|------------|
| `npm start` | Inicia o servidor (produção) |
| `npm run dev` | Inicia com Nodemon |
| `npm run db:migrate` | Executa migrations pendentes |
| `npm run db:migrate:undo` | Desfaz última migration |
| `npm run db:seed` | Executa seeds |
| `npm run db:reset` | Reseta banco completo |

# 🗄️ Banco de Dados

- **SGBD:** MySQL
- **ORM:** Sequelize

## 📋 Tabelas

- eventos
- participantes
- inscricoes
- notificacoes

# 📁 Estrutura do Projeto

src/

├── config/ → Banco de dados, upload, cache

├── controllers/ → Recebe requisições

├── database/

│ ├── migrations/ → Versionamento do banco

│ └── seeders/ → Dados iniciais

├── middlewares/ → Logger, CORS, erros

├── models/ → Models Sequelize

├── routes/ → Rotas da API

├── services/ → Regras de negócio

├── swagger.js → Swagger/OpenAPI

├── app.js → Configuração Express

└── server.js → Inicialização

## ✅ Eventos

- CRUD completo
- Paginação
- Busca
- Ordenação
- Eventos futuros
- Upload de banner

## ✅ Inscrições

- CRUD completo
- Relatórios

## ✅ Exportação

- XML
- JSON
- CSV
