## Relatório Técnico — API de Notificações 
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
- Manter um histórico de todas as notificações enviadas.

## 1.1 Objetivo do Projeto 
Gerência eventos, notificações, participantes e inscrições de forma automática. Permite cadastrar os mesmos e organizar no banco de dados.
Projetos que antes eram manuais passam a ser automatizados, o que reduz os erros e melhora a experiência do usuário.
---

## 1.2 Escopo 
Incluído no projeto:
Cadastro de usuários
Cadastro e armazenamento de documentos técnicos
Consulta e pesquisa de documentos 
Organização das informações por categoria
Interface para visualização dos dados

Fora do escopo:
Integração com outros sistemas
Relatórios avançados
Notificação automática
Recursos extras que poderão ser adicionados em futuras versões;
---

## 2. Tecnologias Utilizadas 
# Infraestrutura e Dependências
## Ambiente de Desenvolvimento
- **OS:** Windows 10/11
- **Runtime:** Node.js v18+
- **IDE:** VS Code
- **Banco:** MySQL 8.0 (instalado na UC de BD)
- **Versionamento:** Git + GitHub
## Dependências do Projeto (package.json)
| Pacote | Versão | Finalidade |
|--------|--------|------------|
| express | ^4.x | Framework web |
| mysql2 | ^3.x | Driver MySQL |
| sequelize | ^6.x | ORM |
| swagger-jsdoc | ^6.x | Geração de docs |
| swagger-ui-express | ^5.x | UI do Swagger |
| dotenv | ^16.x | Variáveis de ambiente |
| cors | ^2.x | Compartilhamento de recursos |
| multer | ^1.x | Upload de arquivos |
| nodemailer | ^6.x | Envio de e-mail |
| node-cache | ^5.x | Cache em memória |
## Dependências de Desenvolvimento
| Pacote | Versão | Finalidade |
|--------|--------|------------|
| nodemon | ^3.x | Reinício automático |
| sequelize-cli | ^6.x | Migrations/Seeds |
## Serviços Externos
- **Mailtrap/Ethereal** — servidor de e-mail simulado (gratuito)
- **Render/Railway** — plataforma de deploy (gratuito)


## 3. Arquitetura do Sistema 
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


## 3.1 Diagrama de Classes 
Ao início do projeto, foi realizado a construção de um diagrama de classes UML, o qual foi usado como base para o projeto antes de realizar a codificação.
- Compreender a Situação de Aprendizagem (SA)
- Identificar as entidades do sistema
- Criar um diagrama de classes UML completo no draw.io

## 3.2 Arquitetura em Camadas 
Utilizamos a arquitetura de camadas para separar as responsabilidades e facilitar a organização:
-> Routes: responsável por mapear as URL direcionar as requisições para os controllers correspondentes. 
-> Controllers: recebem as requisições HTTP, extraem os dados enviados pelo cliente e chamam os services responsáveis pela lógica da aplicação. 
-> Services: concentram as regras de negócio, validação, integração e processamento das informações antes de acessar o banco de dados. 
-> Models: implementados com Sequelize, representam as tabelas do banco de dados e realizam as operações de persistência. 
-> MySQL: é utilizado como sistema gerenciador de banco de dados, armazenando eventos, participantes, inscrições e notificações de forma permanente e estruturada. 
---

## 3.3 Banco de Dados
O banco de dados foi desenvolvido em MySQL utilizando Sequelize como ORM. O sistema possui quatro tabelas principais: eventos, participantes, inscrições e notificações.
Os principais relacionamentos são:
-> Um evento possui várias inscrições;
-> Um participante possui várias inscrições;
-> Uma inscrição pode possuir várias notificações.
As associações foram implementadas com Sequelize, organizando e relacionando os dados.
---

## 4. Funcionalidades Implementadas 
| Funcionalidade | Status | Bloco PBE | | --------------------------------- | ----------- | --------- | | CRUD de Eventos | ✅ Completo | 1 e 3 | | CRUD de Participantes | ✅ Completo | 1 e 3 | | Inscrições | ✅ Completo | 1 e 3 | | Middlewares e tratamento de erros | ✅ Completo | 2 | | Validação de dados | ✅ Completo | 2 | | Persistência MySQL | ✅ Completo | 3 | | Exportação JSON/XML | ✅ Completo | 3 | | Upload de arquivos | ✅ Completo | 3 | | Notificações por e-mail | [status] | 4 | | Deploy | [status] | 5 | | Documentação Swagger | [status] | 5 | 

## 5. Processo de Desenvolvimento 
# 1. Planejamento
- 1.1 Levantamento de requisitos
- 1.2 Diagrama de classes UML
- 1.3 Definição de tecnologias
- 1.4 Configuração do ambiente
# 2. Desenvolvimento — Base
- 2.1 Estrutura MVC do projeto
- 2.2 CRUD de Eventos
- 2.3 CRUD de Participantes
- 2.4 Inscrições
- 2.5 Middlewares e tratamento de erros
- 2.6 Camada de Services
- 2.7 Validações
# 3. Desenvolvimento — Persistência
- 3.1 Configuração do MySQL
- 3.2 Models Sequelize
- 3.3 Migrations e Seeds
- 3.4 Migração do CRUD para banco
- 3.5 Upload de arquivos
- 3.6 Exportação JSON/XML
- 3.7 Cache
## 4. Desenvolvimento — Notificações
- 4.1 Configuração do Nodemailer
- 4.2 Templates de e-mail
- 4.3 Envio de confirmação
- 4.4 Envio de lembretes
- 4.5 Histórico de notificações
## 5. Finalização
- 5.1 Documentação Swagger completa
- 5.2 Testes finais
- 5.3 Deploy
- 5.4 README e documentação
- 5.5 Apresentação

### 5.1 Metodologia 
O projeto foi desenvolvido utilizando metodologia ágil, com organização das atividades no GitHub. As tarefas foram distribuídas e acompanhadas pelo GitHub, permitindo controlar o andamento do desenvolvimento,organizar etapas e acompanhar a evolução do projeto durante sua execução.


### 5.2 Divisão de Trabalho 
| Nome | Função/Responsabilidade |
|------|------------------------|
| Isabele | Líder técnico, responsável pelo banco e pela construção do código |
| Isabela | Responsável pelo banco de dados |
| Alanis | Responsável pelos testes e documentação do projeto |


### 5.3 Controle de Versão 
O controle de versão do projeto foi realizado utilizando Git e GitHub durante todo o desenvolvimento. O grupo realizou commits frequentes para registrar alterações, correções e novas funcionalidades implementadas na API. 
--- 

## 6. Desafios e Soluções 
# Análise de Riscos
| # | Risco | Probabilidade | Impacto | Ação |
|---|------|--------------|--------|------|
| 1 | Falta de membro | Média | Médio | Dividir tarefas |
| 2 | Erro no Git | Média | Médio | Fazer pull sempre |
| 3 | Banco não funcionar | Média | Médio | Testar antes |
| 4 | Falta de tempo | Baixa | Baixo | Priorizar |
| 5 | Bugs no código | Médio | Médio | Testes |

## MoSCoW
- Must: CRUD + Banco
- Should: Emails
- Could: Cache
- Won’t: Front-end


## 7. Lições Aprendidas 
Aprendemos conceitos importantes relacionados a desenvolvimento de back-end.
Com a utilização de criação de APIs REST com Node.js e Express, organização de projetos utilizando arquitetura MVC + Services, utilização do Sequelize para integração com banco de dados MySQL e criação de migrations e relacionamentos entre tabelas. 
Proporcionou aprendizado sobre as revisões de códigos para realizarmos os testes da API e enviarmos ao GitHub no fim de cada fase.
--- 

## 8. Próximos Passos (se o projeto continuasse) 
Caso o projeto tivesse continuidade, seriam implementadas novas funcionalidades, como sistema de autenticação de usuários, melhorias no front-end para tornar a interface mais intuitiva, implementação de notificação push, otimização do desempenho do aplicativo e edição de novos recursos para melhorar a experiência dos usuários.


## 9. Referências 
- [Documentação do Express.js](https://expressjs.com/) 
- [Documentação do Sequelize](https://sequelize.org/) 
- [Documentação do Nodemailer](https://nodemailer.com/) 