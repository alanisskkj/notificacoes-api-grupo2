# Documentação de Arquitetura — API de Notificações
## 1. Visão Geral
A API de Notificações é um módulo back-end REST responsável por gerenciar o envio
de notificações por e-mail para participantes de eventos em uma plataforma de eventos.
## 2. Arquitetura em Camadas
Cliente (Postman/Browser)
│
▼
[Middlewares] → express.json, cors, responseTime, cacheMiddleware
│
▼
[Routes] → Mapeamento de URLs para Controllers
│
▼
[Controllers] → Recebe req, chama Service, monta res
│
▼
[Services] → Validação, regras de negócio
│
▼
[Models (Sequelize)] → Acesso ao banco de dados
│
▼
[MySQL] → Persistência
## 3. Entidades e Relacionamentos

| Entidade     | Tabela         | Descrição                                  |
|--------------|----------------|--------------------------------------------|
| Evento       | eventos        | Representa um evento na plataforma         |
| Participante | participantes  | Pessoa cadastrada                          |
| Inscrição    | inscricoes     | Relação participante ↔ evento              |
| Notificação  | notificacoes   | E-mail enviado ou a enviar                 |

### Relacionamentos:

- Evento 1 → N Inscrição  
- Participante 1 → N Inscrição  
- Inscrição 1 → N Notificação  

---

## 4. Endpoints da API

### Eventos

| Método | Rota                    | Descrição            |
|--------|-------------------------|----------------------|
| GET    | /eventos                | Listar (paginado)   |
| GET    | /eventos/:id            | Buscar por ID       |
| POST   | /eventos                | Criar               |
| PUT    | /eventos/:id            | Atualizar           |
| DELETE | /eventos/:id            | Deletar             |
| POST   | /eventos/:id/banner     | Upload de imagem    |

---

### Participantes

| Método | Rota                      | Descrição          |
|--------|---------------------------|--------------------|
| GET    | /participantes            | Listar             |
| GET    | /participantes/:id        | Buscar por ID      |
| POST   | /participantes            | Criar              |
| PUT    | /participantes/:id        | Atualizar          |
| DELETE | /participantes/:id        | Deletar            |

---

### Inscrições

| Método | Rota                          | Descrição                  |
|--------|--------------------------------|----------------------------|
| GET    | /inscricoes                   | Listar                    |
| POST   | /inscricoes                   | Criar inscrição           |
| DELETE | /inscricoes/:id               | Cancelar inscrição        |

---

### Notificações

| Método | Rota                          | Descrição                  |
|--------|--------------------------------|----------------------------|
| GET    | /notificacoes                 | Listar notificações       |
| POST   | /notificacoes                 | Criar notificação         |
| POST   | /notificacoes/enviar          | Enviar e-mails            |

---

### Exportação

| Método | Rota                          | Descrição                  |
|--------|--------------------------------|----------------------------|
| GET    | /exportar/inscricoes          | Exportar dados (CSV/JSON) |

---

## 5. Tecnologias e Justificativa

| Tecnologia | Justificativa |
|-----------|--------------|
| Node.js   | Runtime JavaScript no servidor, já conhecido pela equipe |
| Express.js| Framework leve e flexível para APIs REST |
| MySQL     | Banco relacional, integração com disciplina de BD |
| Sequelize | ORM que facilita queries e migrations |
| Swagger   | Documentação interativa da API |

## 6. Estrutura de Pastas
src/
│
├── config/
├── controllers/
│ ├── eventoController.js
│ ├── participanteController.js
│ ├── inscricaoController.js
│ └── notificacaoController.js
│
├── services/
│ ├── eventoService.js
│ ├── participanteService.js
│ ├── inscricaoService.js
│ └── notificacaoService.js
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
│ └── notificacaoRoutes.js
│
├── middlewares/
│ ├── errorHandler.js
│ ├── cacheMiddleware.js
│
├── app.js
└── server.js

---

## 7. Variáveis de Ambiente

| Variável   | Descrição              | Exemplo           |
|-----------|------------------------|------------------|
| PORT      | Porta do servidor      | 3000             |
| DB_HOST   | Host do MySQL          | localhost        |
| DB_USER   | Usuário do banco       | root             |
| DB_PASS   | Senha do banco         | 123456           |
| DB_NAME   | Nome do banco          | notificacoes_db  |
| JWT_SECRET| Chave de autenticação  | segredo123       |

---

> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)