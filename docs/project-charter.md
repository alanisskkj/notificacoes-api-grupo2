# Project Charter — API de Notificações
## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos
## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.
## 3. Justificativa
O sistema resolve a necessidade de comunicação automática com participantes de eventos, garantindo que eles recebam confirmações e lembretes, reduzindo faltas e melhorando a organização.
## 4. Escopo
### Incluído:
- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem
### Não incluído:
- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications
## 5. Equipe
| Nome | Função/Responsabilidade |
|------|------------------------|
| Nome | Função |
|------|--------|
|Alanis | Back-end / Banco de dados |
|Isabela | Controllers / Rotas |
|Alanis | Testes / Documentação |
|Isabele| Deploy, integração e suporte |

## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo
Início: 03/03/2026 | 
Entrega final: [Ainda não definido]
## 8. Critérios de Sucesso
- [🆗] API funcional com todos os CRUDs
- [🆗] Persistência de dados em banco MySQL
- [🆗] Notificações por e-mail funcionando (simulado)
- [🆗] Documentação Swagger completa
- [🆗] Deploy realizado com sucesso
- [🆗] Projeto aprovado na apresentação

## 9. Critérios de Qualidade

| Aspecto | Critério | Como medir |
|--------|---------|-----------|
| Funcionalidade | Todos os endpoints funcionando corretamente | Testes no Postman |
| Organização | Estrutura MVC bem definida | Code review |
| Documentação | Swagger completo | Acesso em /api-docs |
| Versionamento | Todos os membros contribuindo | Histórico do GitHub |
| Manutenibilidade | Código limpo e legível | Boas práticas (Clean Code) |

