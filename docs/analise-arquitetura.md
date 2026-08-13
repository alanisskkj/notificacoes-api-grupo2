# Integrantes:
- Alanis Venerruche Carvalho 
- Isabela Cristina Dessia Viana
- Isabele Gonzales Firmino

# 1. Inventário da arquitetura:
| Camada | Arquivos encontrados | Responsabilidade | 
|--------|----------------------|------------------|
| Rotas | eventoRoutes.js, exportRoutes.js, inscricaoRoutes.js, notificacaoRoutes.js, participanteRoutes.js | Definem os endpoints HTTP e conectam cada requisição ao controller correto. |
| Controllers | EventoController.js, InscricaoController.js, ParticipanteController.js | Recebem a requisição, extraem dados e delegam a lógica para os services. | 
| Services | EmailService.js, EventoService.js, InscricaoService.js, NotificacaoService.js, ParticipanteService.js | Contêm a regra de negócio, como criar, listar, atualizar e validar entidades do sistema. | 
| Models | EventoModel.js, index.js, InscricaoModel.js, NotificacaoModel.js, ParticipanteModel.js | Representam as tabelas e os relacionamentos do banco, mapeando os dados da aplicação. | 
| Middlewares | cacheMiddleware.js, errorHandler.js, logger.js, notFound.js, responseTime.js | Interceptam requisições para cache, autenticação/observabilidade, tratamento de erro e respostas padrão. |
| Configuração / .env | cache.js, database.js, database.json, upload.js | Centralizam configurações de banco, cache, upload e variáveis de ambiente da aplicação. |

## Perguntas complementares:
1. Quantos arquivos existem em cada camada?
Rotas: 5;
Controllers: 3;
Services: 5;
Models: 5; 
Middlewares: 5; 
Configuração: 4. 
Todos esses arquivos totalizam em 27.
2. As responsabilidades estão de fato separadas, ou existe camada fazendo o trabalho de outra?
(Ex.: controller acessando o model direto, sem passar por service.)
Sim, os controllers são atribuídos aos services, services acessam models e executam a regra de negócio, os models definem a estrutura e a persistência do banco, e os middlewares cuidam da infraestrutura e comportamento.
Entretanto, as responsabilidades não estão totalmente separadas, mas sim de maneira parcial. Em exportRoutes, há uso direto de Evento, Inscrição e Participante com findAll, além disso, o upload do banner faz acesso direto ao model com Evento.findByPk e update. o controller deixa de ser o ponto de entrada e o service deixa de centralizar a regra de negócio. 
Portanto, a arquitetura está parcialmente separada, mas não totalmente correta.
3. Onde está a comunicação com o banco de dados?
A comunicação com o banco de dados ocorre em database.js, que cria a instânca do Sequelize, e em index.js, que monta os relacionamentos entre modelos e exporta as entidades.
Os arquivos: EventoModel.js, ParticipanteModel.js, InscricaoModel.js, NotificacaoModel.js usam Sequelize para executar operações como findAll, findByPk, create, update, destroy.
Em resumo, a conexão com o banco fica databse.js, e as operações de persistência ficam nos models e services.
4. Onde está a comunicação com o serviço de e-mail (Nodemailer/MailPit)?
A comunicação com o e-mail está em EmailService.js, e o gatilho HTTP fica na rota de notificações.


# 2. Mapa das Rotas:
| # | Método | Caminho | Exige token? | Controller | Service | Models | Efeito colateral |
|---|--------|---------|--------------|------------|---------|--------|-----------------|
| 1 | GET | /exportar/eventos/xml | Não | — | — | Evento | Exporta todos os eventos em XML |
| 2 | GET | /exportar/eventos/json | Não | — | — | Evento | Exporta todos os eventos em JSON |
| 3 | GET | /exportar/relatorio/inscricoes | Não | — | — | Evento, Inscricao, Participante | Gera relatório de inscrições |
| 4 | GET | /exportar/inscricoes/xml | Não | — | — | Inscricao, Evento, Participante | Exporta inscrições em XML |
| 5 | GET | /exportar/relatorio/inscricoes/csv | Não | — | — | Inscricao, Evento, Participante | Exporta relatório de inscrições em CSV |
| 6 | GET | /eventos | Não | EventoController | EventoService | Evento | Lista todos os eventos |
| 7 | POST | /eventos | Não | EventoController | EventoService | Evento | Cria um evento |
| 8 | PUT | /eventos/{id} | Não | EventoController | EventoService | Evento | Atualiza um evento pelo ID |
| 9 | DELETE | /eventos/{id} | Não | EventoController | EventoService | Evento | Deleta um evento pelo ID |
| 10 | GET | /eventos/{id} | Não | EventoController | EventoService | Evento | Busca um evento por ID |
| 11 | POST | /eventos/{id}/banner | Não | — | EventoService | Evento | Faz upload do banner do evento |
| 12 | GET | /participantes | Não | ParticipanteController | ParticipanteService | Participante | Lista todos os participantes |
| 13 | POST | /participantes | Não | ParticipanteController | ParticipanteService | Participante | Cria um novo participante |
| 14 | GET | /participantes/{id} | Não | ParticipanteController | ParticipanteService | Participante | Busca participante por ID |
| 15 | PUT | /participantes/{id} | Não | ParticipanteController | ParticipanteService | Participante | Atualiza um participante por ID |
| 16 | DELETE | /participantes/{id} | Não | ParticipanteController | ParticipanteService | Participante | Deleta um participante |
| 17 | GET | /inscricoes | Não | InscricaoController | InscricaoService | Inscricao | Lista todas as inscrições |
| 18 | POST | /inscricoes | Não | InscricaoController | InscricaoService | Inscricao | Cria uma nova inscrição |
| 19 | GET | /inscricoes/evento/{eventoId} | Não | InscricaoController | InscricaoService | Inscricao, Evento, Participante | Lista as inscrições de um evento |
| 20 | PATCH | /inscricoes/{id}/cancelar | Não | InscricaoController | InscricaoService | Inscricao | Cancela uma inscrição |
| 21 | GET | /inscricoes/exportar/xml | Não | InscricaoController | InscricaoService | Inscricao, Evento, Participante | Exporta inscrições em XML |
| 22 | GET | /inscricoes/{id} | Não | InscricaoController | InscricaoService | Inscricao | Busca inscrição por ID |
| 23 | GET | /notificacoes/{id} | Não | — | NotificacaoService | Notificacao | Busca notificação por ID |
| 24 | POST | /notificacoes/teste-email | Não | — | EmailService | Notificacao | Envia e-mail de teste |
| 25 | GET | /notificacoes | Não | — | NotificacaoService | Notificacao | Lista notificações |
| 26 | GET | /notificacoes/estatisticas | Não | — | NotificacaoService | Notificacao | Exibe estatísticas de envio |
| 27 | POST | /notificacoes/{id}/reenviar | Não | — | NotificacaoService | Notificacao | Reenvia uma notificação |


# 3. Que nível de teste cabe onde?
| # | Comportamento a verificar | Nível | Por que este nível |
|---|---|---|---|
| 1 | Criar participante com e-mail inválido | Endpoint | Verifica a resposta HTTP e se a API retorna o erro de validação corretamente. |
| 2 | Criar uma inscrição para um evento | Integração | Precisa verificar se a inscrição foi realmente gravada no banco de dados. |
| 3 | Enviar confirmação de inscrição por e-mail | Integração | Envolve o banco de dados, o Observer e o serviço de envio de e-mail. |
| 4 | Criar evento sem nome | Endpoint | Verifica a requisição HTTP e se a API impede o cadastro de um evento inválido. |
| 5 | Calcular a taxa de envio das notificações | Unitário | É uma regra que pode ser testada apenas com os dados fornecidos, sem precisar de banco ou rede. |


## 4. Análise
### 4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê?
A funcionalidade que causaria maior problema seria o envio das notificações por e-mail. Se falhasse silenciosamente, os participantes poderiam realizar inscrições normalmente, mas não receberiam a confirmação da inscrição.

### 4.2 Quais pontos do módulo dependem de algo externo ao código de vocês?
O módulo depende do MySQL para armazenar os dados, do serviço de e-mail para enviar as notificações, das variáveis de ambiente para as configurações e do relógio do sistema para registrar as datas de envio.

### 4.3 Escolham uma função ou método que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede.
Uma função que pode ser testada como regra de negócio é `obterEstatisticas()`, localizada no arquivo `src/services/NotificacaoService.js`, principalmente o cálculo da taxa de envio das notificações.

### 4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz?
Uma parte que ainda precisa de mais análise é o funcionamento dos observers e do `EventEmitter`, principalmente para entender quando cada evento é disparado e como ele chega até o envio da notificação.


## 5. Desafio Extra
### Rota de maior risco
A rota de maior risco é `POST /inscricoes`.

**Probabilidade de conter um defeito:** alta, porque a rota envolve o cadastro da inscrição, validações, relacionamento entre participante e evento e o disparo de notificações.

**Impacto se falhar:** alto, pois pode gerar inscrições incorretas ou impedir que o participante receba a confirmação por e-mail.

### Rota de menor risco
A rota de menor risco é `GET /notificacoes/:id`.

**Probabilidade de conter um defeito:** baixa, porque a rota apenas consulta uma notificação pelo ID.

**Impacto se falhar:** baixo, pois não altera dados do sistema nem envia ou cancela notificações.
