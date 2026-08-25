# 1. Identificação
## Sistema: Módulo de Notificações — Plataforma de Eventos
Versão:
Repositório: https://github.com/alanisskkj/notificacoes-api-grupo2
Grupo / integrantes: 
Grupo 2
Alanis Venerruche de Carvalho - 02
Isabela Cristina Dessia Viana - 09
Isabele Gonzales Firmino - 10
Data de elaboração: 20/08/2026
Última revisão: 20/08/2026


# Objetivo e Escopo:
## 2.1 Objetivo
Este plano de teste tem como objetivo verificar se a API de gerenciamento de eventos, participantes, inscrições e notificações funciona corretamente, atendendo às regras de negócio, às validações e aos fluxos de comunicação por e-mail previstos para a entrega do sistema.

## 2.2 Dentro do Escopo
| Funcionalidade / camada | Níveis previstos |
| --- | --- |
| CRUD de eventos | Testes de API, testes de integração, testes de validação de regras de negócio |
| CRUD de participantes | Testes de API, testes de integração, testes de consistência de dados |
| Gestão de inscrições | Testes de API, testes de integração, testes de regras de negócio e cancelamento |
| Envio de notificações por e-mail | Testes de integração com serviço de e-mail, testes de template e validação de mensagens |
| Observadores/eventos de domínio | Testes de integração entre operações e disparadores de eventos |
| Tratamento de erros e respostas HTTP | Testes de API, testes de casos negativos, testes de mensagens de erro |
| Persistência em banco de dados e migrations | Testes de integração com banco, validação de constraints e dados iniciais |
| Exportação de dados em XML/JSON/CSV | Testes funcionais de geração e estrutura do arquivo |
| Cache e middleware de requisições | Testes de comportamento de performance e consistência de respostas |
| Swagger/documentação da API | Verificação de endpoints, parâmetros e exemplos disponibilizados |

A abrangência inclui os fluxos principais da aplicação disponíveis na API REST, com foco em confirmar se:
- Eventos podem ser cadastrados, listados, consultados, atualizados e excluídos corretamente;
- Participante e inscrições respeitam regras de relacionamento e integridade;
- O processo de confirmação/cancelamento de inscrição gera as notificações esperadas;
- Os erros de validação, ausência de dados e conflitos de regra são retornados de forma adequada;
- Os endpoints de exportação geram conteúdo consistente e utilizável por cliente externo.

## 2.3 Fora do Escopo
| O que não será testado | Motivo |
| --- | --- |
| Interface web ou front-end do sistema | O projeto em análise é uma API back-end; a interface visual não faz parte do escopo do módulo testado |
| Testes de carga, stress e performance de alto volume | Não há requisito formal de benchmark nem infraestrutura de teste dedicada para esse nível de validação |
| Testes de segurança avançada (pen-test, injeção sofisticada, fuzzing) | O plano está focado em comportamento funcional e de integração da aplicação, não em auditoria de segurança completa |
| Testes de compatibilidade entre navegadores e dispositivos móveis | A solução não possui interface cliente e não prevê suporte multi-device como requisito principal |
| Testes de deploy em ambiente de produção | A validação será conduzida no ambiente de desenvolvimento/teste da aplicação, sem escopo de operação de produção |
| Teste de backup, recuperação e manutenção de banco em cenários de falha de infraestrutura | Essa área está fora do objetivo do módulo de notificações e não é requisito do plano atual |
| Validação de regras de negócio externas ao módulo (por exemplo, CRM, sistema financeiro, integração com ERP) | A API atua como módulo independente e não possui dependências externas de negócio dentro do escopo do projeto |


# 3. Itens a testar
Os intens foram definidos de form específica para que cada um possa posteriormente gerar casos de teste

| # | Item a testar | Camada | Arquivo/rota de origem |
|---|---|---|---|
| 1 | Listagem de eventos futuros utilizando filtro de data | Service / integração | `EventoService` |
| 2 | Cadastro de evento com dados válidos | Controller / endpoint | `/eventos` |
| 3 | Consulta de eventos com paginação | Service / endpoint | `/eventos` |
| 4 | Tratamento de erro ao buscar eventos | Controller / endpoint | `/eventos` |
| 5 | Cadastro de participante com dados válidos | Controller / endpoint | `/participantes` |
| 6 | Validação de dados obrigatórios de participante | Controller / endpoint | `/participantes` |
| 7 | Cadastro de inscrição vinculando participante e evento | Controller / integração | `/inscricoes` |
| 8 | Validação de inscrição com evento ou participante inexistente | Service / integração | `/inscricoes` |
| 9 | Consulta de inscrições cadastradas | Controller / endpoint | `/inscricoes` |
| 10 | Exportação de eventos para XML | Integração / endpoint | `/exportar/eventos/xml` |
| 11 | Exportação de inscrições para XML com seus detalhes | Integração / endpoint | `/exportar/inscricoes/xml` |
| 12 | Tratamento de erro durante a exportação XML | Controller / endpoint | `/exportar` |
| 13 | Persistência dos dados de eventos no MySQL | Model / integração | `EventoModel` |
| 14 | Tratamento de erros de comunicação com o banco de dados | Integração | Sequelize / MySQL |


# 4. Análise de risco

A probabilidade (P) e o impacto (I) foram avaliados sepradamente. O risco é calculado pela multiplicação **P x I**

| # | Item | P | I | Risco (P×I) | Grau | Decisão | Justificativa |
|---|---|---:|---:|---:|---|---|---|
| 1 | Cadastro de inscrição vinculando participante e evento | 4 | 5 | 20 | C | Mitigar | Um erro no relacionamento pode gerar inscrições incorretas e comprometer os dados da plataforma. |
| 2 | Validação de inscrição com evento ou participante inexistente | 4 | 5 | 20 | C | Mitigar | Dados inválidos podem gerar registros inconsistentes no banco. |
| 3 | Listagem de eventos futuros utilizando filtro de data | 4 | 4 | 16 | C | Mitigar | Uma filtragem incorreta pode apresentar eventos errados aos usuários. |
| 4 | Exportação de inscrições para XML com seus detalhes | 3 | 5 | 15 | A | Mitigar | A exportação incorreta pode gerar perda ou distorção das informações utilizadas por outros processos. |
| 5 | Persistência dos dados de eventos no MySQL | 3 | 5 | 15 | A | Mitigar | Falhas de persistência podem causar perda de dados cadastrados. |
| 6 | Exportação de eventos para XML | 3 | 4 | 12 | A | Mitigar | O arquivo exportado precisa manter os dados corretos e uma estrutura XML válida. |
| 7 | Tratamento de erros de comunicação com o banco de dados | 3 | 4 | 12 | A | Mitigar | Falhas no banco podem impedir operações importantes da aplicação. |
| 8 | Cadastro de evento com dados válidos | 3 | 4 | 12 | A | Mitigar | É uma funcionalidade básica para o funcionamento da plataforma. |
| 9 | Consulta de eventos com paginação | 3 | 3 | 9 | M | Mitigar | Paginação incorreta pode causar resultados incompletos ou repetidos. |
| 10 | Validação de dados obrigatórios de participante | 3 | 3 | 9 | M | Mitigar | A ausência de validação pode permitir registros incompletos. |
| 11 | Cadastro de participante com dados válidos | 2 | 4 | 8 | M | Mitigar | Dados incorretos de participantes podem afetar inscrições futuras. |
| 12 | Consulta de inscrições cadastradas | 2 | 4 | 8 | M | Mitigar | Uma consulta incorreta pode apresentar informações erradas sobre inscrições. |
| 13 | Tratamento de erro ao buscar eventos | 2 | 3 | 6 | M | Mitigar | O sistema precisa responder adequadamente quando ocorre uma falha na consulta. |
| 14 | Tratamento de erro durante a exportação XML | 2 | 3 | 6 | M | Mitigar | O erro deve ser informado corretamente sem gerar uma resposta inválida. |


# 5. Técnicas e níveis selecionados 
| Item / camada | Nível(is) | Técnica(s) | Justificativa |
|---|---|---|---|
| Cadastro de eventos | Unitário e endpoint | Particionamento de equivalência e tabela de decisão | Permite verificar entradas válidas e inválidas e diferentes regras de cadastro. |
| Listagem de eventos | Unitário, integração e endpoint | Particionamento de equivalência | Permite verificar diferentes quantidades de registros e parâmetros de consulta. |
| Eventos futuros | Unitário e integração | Análise de valor-limite | Datas próximas do limite atual podem apresentar erros de filtragem. |
| Paginação | Unitário e endpoint | Análise de valor-limite | Primeira página, página vazia e valores próximos aos limites precisam ser verificados. |
| Cadastro de participantes | Unitário e endpoint | Particionamento de equivalência | Permite separar dados válidos de dados inválidos. |
| Inscrições | Unitário, integração e endpoint | Tabela de decisão | Existem diferentes combinações entre evento e participante válidos ou inválidos. |
| Relacionamento evento/participante/inscrição | Integração | Teste de integração | É necessário verificar se as entidades se relacionam corretamente no banco. |
| Tratamento de erros | Unitário e endpoint | Teste baseado em cenários | Permite verificar respostas esperadas para diferentes situações de erro. |
| Exportação de eventos XML | Integração e endpoint | Particionamento de equivalência | Verifica exportação com registros e sem registros. |
| Exportação de inscrições XML | Integração e endpoint | Tabela de decisão | Permite verificar diferentes situações de inscrições e seus relacionamentos. |
| Persistência no banco | Integração | Teste de integração | Verifica se os dados enviados pela aplicação são realmente persistidos. |
| Rotas da API | Endpoint | Teste funcional e análise de valor-limite | Verifica status HTTP, dados retornados e entradas nos limites esperados. |   
## 5.1 Alguma prioridade mudou em relação à matriz da semana passada? Se sim, qual e por quê?
Sim, a prioridade foi ajusada em relação à matriz da semana anterior porque a análise de risco mostrou que as funcionalidades relacionadas ás **incrições, relacionamentos entre entidades, filtragem de eventos e exportações XML** possuem maior impacto caso apresentem falhas.
Por isso, esses itens serão atacados primeiro, mesmo que algumas funcionalodades anteriormentes tivessem prioridades semelhantes.

# 6. Critérios de entrada e de saída 
## 6.1 Critérios de entrada
- [ ] Ambiente de desenvolvimento configurado com Node.js, banco de dados e dependências do projeto.
- [ ] Código das rotas, controllers, services e models disponível para execução.
- [ ] Banco de dados de teste criado e separado do banco utilizado no desenvolvimento.
- [ ] Framework de testes configurado no projeto.
- [ ] Variáveis de ambiente necessárias para os testes configuradas.
- [ ] Endpoints principais disponíveis para execução.
- [ ] Dados de teste definidos para eventos, participantes e inscrições.
## 6.2 Critérios de saída
- [ ] **100% dos itens classificados como risco alto ou crítico executados.**
- [ ] Pelo menos 90% dos testes planejados executados.
- [ ] Todos os testes críticos devem estar passando ou possuir defeito registrado e documentado.
- [ ] Nenhum defeito crítico permanecer sem registro e análise.
- [ ] Suíte de testes executada com resultado registrado antes de cada entrega.

# 7. Ambiente e Ferramentas
| Item | Definição |
| --- | --- |
| Runtime Node.js versão | Node.js 24.x, em ambiente compatível com a aplicação e com suporte à execução local da API |
| Banco de dados de teste | Banco MySQL/MariaDB isolado, separado do ambiente de desenvolvimento, com dados de teste controlados e reinicializáveis |
| Framework de teste | Jest + Supertest para automação de testes de API e validação de rotas e respostas HTTP |
| Teste de endpoint | Execução de requisições HTTP via Postman/Insomnia e testes automatizados para verificar status, payload e regras da API |
| Serviço de e-mail nos testes | Mailpit ou SMTP local de teste para capturar e-mails enviados sem afetar contas reais |
| Variáveis de ambiente específicas | `NODE_ENV=test`, `DB_HOST_TEST`, `DB_NAME_TEST`, `DB_USER_TEST`, `DB_PASS_TEST`, `SMTP_HOST`, `SMTP_PORT`, `MAIL_USER`, `MAIL_PASS` e demais credenciais necessárias ao ambiente de teste |
| Onde a suíte será executada | Localmente no ambiente de desenvolvimento do grupo, utilizando banco e configurações de teste isoladas |

## 7.1 O banco de teste será o mesmo do ambiente de desenvolvimento?
Não. O banco de teste deve ser diferente do banco de desenvolvimento.

Se o mesmo banco for utilizado, o risco é alto porque os testes podem sobrescrever dados reais, corromper registros em uso, gerar falsos positivos ou negativos e impedir a análise correta do comportamento da aplicação. Além disso, alterações de teste podem interferir no ambiente de desenvolvimento, afetando a operação normal e prejudicando a confiabilidade do relatório final.

## 8 Cronograma 
| Etapa | Datas previstas | Responsável | Entrega |
|---|---|---|---|
| Configuração do ambiente Jest | 27/08/2026 | Grupo | Jest configurado e executando |
| Testes unitários (services e models) | 03/09/2026 a 17/09/2026 | Grupo | Suíte unitária inicial |
| Banco de teste e testes de integração | 24/09/2026 a 01/10/2026 | Grupo | Banco de teste e testes de integração |
| Testes de endpoint (Supertest) | 08/10/2026 a 15/10/2026 | Grupo | Testes das principais rotas |
| Mocks e testes E2E | 22/10/2026 | Grupo | Mocks e cenários E2E |
| Relatório final da formativa | 29/10/2026 | Grupo | Relatório final |
| Revisão e correção da suíte | 05/11/2026 | Grupo | Suíte revisada |
| Suíte completa em execução | Até 11/11/2026 | Grupo | Suíte pronta antes da avaliação |
| Início da avaliação somativa individual | 12/11/2026 | — | Marco da avaliação |

---