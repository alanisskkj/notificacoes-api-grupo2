# Relatório Técnico — API de Notificações 
**Grupo:** 2 
**Membros:** 
- Alanis Venerruche de Carvalho
- Isabela Dessia Viana
- Isabele Gonzales Firmino 
**Data:** 21/05/2026
--- 
## 1. Introdução 
O projeto consiste em uma plataforma de gerenciamento de eventos online, no qual permite que organizadores criem eventos e que participantes se inscrevam neles. O módulo específico é o Sistema de Notificações por e-mail, no qual ele deve:
- Enviar um e-mail de confirmação quando alguém se inscrever em um evento
- Enviar um e-mail de lembrete antes do evento acontecer
- Manter um histórico de todas as notificações enviadas

### 1.1 Objetivo do Projeto 
Gerência eventos, notificações, participantes e inscrições de forma automática. Permite cadastrar os mesmos e organizar no banco de dados.
Projetos que antes eram manuais passam a ser automatizados, o que reduz os erros e melhora a experiência do usuário.

--- 
## 2. Tecnologias Utilizadas 
| Tecnologia | Versão | Justificativa | 
| ---------- | ------ | --------------------------- | 
| Node.js | v18+ | [por que escolheram] | 
| Express.js | 4.x | [por que] | 
| MySQL | 8.0 | [por que — sinergia com BD] | 
| Sequelize | 6.x | [por que] | 
| ... | | | 
--- 
## 3. Arquitetura do Sistema 
### 3.1 Diagrama de Classes 
[Referência ao diagrama UML em docs/] 
### 3.2 Arquitetura em Camadas 
[Descreva brevemente: Routes → Controllers → Services → Models → MySQL] ### 3.3 Banco de Dados
[Quantas tabelas, relacionamentos principais] 
--- 
## 4. Funcionalidades Implementadas 
| Funcionalidade | Status | Bloco PBE | | --------------------------------- | ----------- | --------- | | CRUD de Eventos | ✅ Completo | 1 e 3 | | CRUD de Participantes | ✅ Completo | 1 e 3 | | Inscrições | ✅ Completo | 1 e 3 | | Middlewares e tratamento de erros | ✅ Completo | 2 | | Validação de dados | ✅ Completo | 2 | | Persistência MySQL | ✅ Completo | 3 | | Exportação JSON/XML | ✅ Completo | 3 | | Upload de arquivos | ✅ Completo | 3 | | Notificações por e-mail | [status] | 4 | | Deploy | [status] | 5 | | Documentação Swagger | [status] | 5 | 
--- 
## 5. Processo de Desenvolvimento 
### 5.1 Metodologia 
[Ágil com sprints de 2 semanas, Kanban no GitHub Projects] 
### 5.2 Divisão de Trabalho 
[Quem fez o quê — referência à matriz RACI] 
### 5.3 Controle de Versão 
[Quantos commits, como organizaram branches] 
--- 
## 6. Desafios e Soluções 
| Desafio | Como resolvemos | | ------------------------------- | ------------------------------------------- |
| [ex: conflitos de merge] | [ex: combinamos de sempre fazer pull antes] | | [ex: Sequelize logging confuso] | [ex: desativamos em produção] | 
--- 
## 7. Lições Aprendidas 
[O que cada membro aprendeu de mais importante durante o projeto] 
--- 
## 8. Próximos Passos (se o projeto continuasse) 
[O que fariam se tivessem mais tempo — autenticação, front-end, notificações push, etc.] --- 
## 9. Referências 
- [Documentação do Express.js](https://expressjs.com/) 
- [Documentação do Sequelize](https://sequelize.org/) 
- [Documentação do Nodemailer](https://nodemailer.com/) 