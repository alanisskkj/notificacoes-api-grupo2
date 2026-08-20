# Matriz Técnica X Camada do Módulo de Notificações

## Integrantes:
- Alanis Venerruche de Carvalho 02
- Isabela Cristina Dessia Viana 09 
- Isabele Gonzales Firmino 10


# Tópico 12 - Guia 02 Técnicas de Teste
## 1. Por que regressão não é um "tipo" de teste, e sim uma estratégia?
Porque regressão não muda o teste que está sendo feito. Ela significa executar novamento teste que já existem depois de alguma alteraçãi no sistema, para verificar se algo que funcionava antes deixou de funcionar.
## 2. Dê um exemplo de teste de segurança no nível de integração e outro no nível de endpoint no módulo de vocês.
- Integração: verificar se as senhas salvas no banco de dados estão protegidas com hash e não armazenadas em texto puro.
- Endpoint: tentr acessar uma rota protegida sem enviar  token e verificar se o sistema retorna 401 (Não autorizado).
## 3. Por que um teste de performance sem requisito declarado não consegue reprovar nada?
Porque não existe um valor definido para dizer se o resultado está bom ou ruim. Por exemplo, medir que uma rota respondeu em 700 ms não permite dizer que ela falhou se não existir um requisito dizendo qual é o tempo máximo aceitável.
## 4. Qual a diferença prática entre "descartarmos a técnica X" e "não falamos a técnica X"
"Descartamos" significa que a técnica foi analisada e foi decidido não ultilizá-la, tendo uma justificativa. Já "não falamos" significa que a técnica foi simplesmente esquecida ou ignorada, sem avaliar se ela seria necessária.
## 5.Se vocês tivessem que abandonar uma das técnicas de alta prioridade do módulo, qual seria e o que vocês passariam a aceitar como risco?
Abandonar a recuperação, porque ela depende de situações de falha mais difícies de testar no ambiente atual. Nesse caso, é preciso aceitar o risco de que uma falha no banco ou no envio de e-mail possa causar algum problema que precise de intervenção para ser corrigido.


# Parte 1 - Matriz Técnica X Camada
| Camada / grupo de rotas | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
|-------------------------|-----------|-----------|-------------|-------------|----------|----------|
| Autenticação / JWT | Não aplicável | Não aplicável | Não aplicável | Não aplicável | Não aplicável | Não aplicável |
| Notificações | Média | Média | Média | Média | Baixa | Baixa |
| Eventos | Alta | Média | Média | Média | Baixa | Baixa |
| Participantes / inscrições | Alta | Alta | Alta | Alta | Alta | Alta |
| Envio de e-mail (Nodemailer/MailPit) | Média | Baixa | Média | Baixa | Fora do Escopo | Fora do Escopo |
| Camada de dados (models + MySQL) | Alta | Média | Alta | Média | Média | Alta |

## Justificativa:
*Autenticação / JWT*
- A API deste módulo não implementa autenticação por login, token ou sessão. Portanto, a técnica não é aplicável ao escopo atual.
- Em vez disso, o foco de risco está em operações de negócio e integridade, especialmente em inscrições e persistência no banco.

*Notificações*
- Notificações X Regressão - Média:
A criação e consulta de notificações precisam continuar funcionando após alterações na integração com e-mail e eventos.
- Notificações X Segurança - Média:
Há sensibilidade em dados de e-mail e conteúdo de mensagens, embora o risco seja menor do que nas inscrições.
- Notificações X Recuperação - Média:
Caso o envio falhe, o sistema precisa manter o registro da notificação e permitir reenvio ou diagnóstico.
- Notificações X Performance - Média:
O disparo de e-mails e a consulta de notificações podem sofrer picos, mas não são o principal gargalo do módulo.
- Notificações X Estresse - Baixa:
O volume de envio pode aumentar, mas não representa o centro do risco funcional da aplicação.
- Notificações X Paralelo - Baixa:
As notificações são emitidas em eventos isolados por inscrição, sem disputa direta por um mesmo recurso crítico.

*Eventos*
- Eventos X Regressão - Alta:
O cadastro, listagem e alteração de eventos são parte central do domínio. Qualquer falha afeta o fluxo principal de uso.
- Eventos X Segurança - Média:
Há validação de entrada e integridade dos dados, mas sem camada de autenticação/autorizações complexas no módulo atual.
- Eventos X Recuperação - Média:
A consistência dos dados do evento é importante para que não ocorram registros inconsistentes após falha de escrita.
- Eventos X Performance - Média:
Consulta e listagem de eventos podem crescer com a base, mas não é o maior gargalo.
- Eventos X Estresse - Baixa:
Picos de tráfego existem, mas não são tão críticos quanto os picos de inscrições.
- Eventos X Paralelo - Baixa:
Conflitos reais de escrita são pouco prováveis no mesmo registro em cenários normais.

*Participantes / Inscrições*
- Participantes / Inscrições X Regressão - Alta:
É a funcionalidade central do sistema e qualquer quebra afeta diretamente o negócio.
- Participantes / Inscrições X Segurança - Alta:
Os dados de participantes e inscrições devem ser validados e protegidos para evitar inconsistências, duplicidade e acessos indevidos à informação.
- Participantes / Inscrições X Recuperação - Alta:
A operação precisa manter consistência em caso de falha durante a criação ou cancelamento de uma inscrição.
- Participantes / Inscrições X Performance - Alta:
Picos de acesso e listagem de inscrições exigem resposta eficiente da API.
- Participantes / Inscrições X Estresse - Alta:
É a operação com maior probabilidade de picos de demanda e deve ser testada sob carga.
- Participantes / Inscrições X Paralelo - Alta:
Múltiplos usuários podem tentar se inscrever na última vaga ao mesmo tempo, exigindo controle de concorrência no banco.

*Envio de e-mail (Nodemailer / MailPit)*
- Envio de e-mail X Performance - Baixa:
Na prática, esse componente é executado em ambiente de testes ou desenvolvimento e não é o foco principal de teste de carga da API.
- Envio de e-mail X Estresse - Fora do Escopo:
O SMTP em ambiente local ou simulado não deve ser submetido a carga extrema e o gargalo não é da aplicação principal.
- Envio de e-mail X Paralelo - Fora do Escopo:
As mensagens são tratadas em fluxo isolado e não disputam um recurso compartilhado crítico do sistema.

*Camada de dados (models + MySQL)*
- Camada de dados X Regressão - Alta:
Mudanças em schemas, migrations e consultas SQL podem afetar toda a aplicação.
- Camada de dados X Recuperação - Alta:
É essencial garantir a integridade dos dados em caso de falha durante operações de escrita.
- Camada de dados X Paralelo - Alta:
Avalia o comportamento do pool de conexões do MySQL e locks quando há concorrência de acessos simultâneos.

# Parte 2 - Escopo

## 2.1 Técnicas que ficam dentro do escopo
| Técnica | Ferramenta prevista | Em que nível será aplicada |
|---|---|---|
| **Regressão** | Jest e Supertest | Unitário, integração e endpoint |
| **Segurança** | Jest, Supertest e MySQL | Integração e endpoint |
| **Recuperação** | Docker, MySQL, MailPit e Supertest | Integração e endpoint |
| **Performance** | Supertest | Endpoint |
| **Estresse** | k6 ou similar | Endpoint e integração |
| **Paralelo** | Jest + banco em ambiente controlado | Integração |

## 2.2 Técnicas que ficam fora do escopo
| Técnica descartada | Motivo | Tipo de motivo |
|---|---|---|
| **Nenhuma neste módulo** | O sistema possui cenários reais de concorrência e carga, especialmente em inscrições e banco de dados. | **Não se aplica ao sistema** |

## 2.3 Riscos aceitos
 **Estresse**
Ao não realizar testes de estresse, o projeto aceita o risco de não conhecer o limite de carga do sistema, especialmente nas inscrições e no banco.

 **Paralelo**
O risco de concorrência aumenta em cenários de última vaga; por isso, a ausência de testes paralelos reforça a necessidade de validação de transações e locks.

# Parte 3 - Verificações de segurança

| # | O que verificar | Nível | Resultado esperado |
|---|---|---|---|
| **1** | Acessar uma rota protegida sem enviar token. | Endpoint | O sistema deve retornar **401 Unauthorized** e impedir o acesso. |
| **2** | Tentar acessar um recurso pertencente a outro usuário. | Endpoint | O sistema deve retornar **403 Forbidden** ou **404 Not Found**, conforme a regra implementada. |
| **3** | Verificar como a senha está armazenada no banco de dados. | Integração | A senha deve estar armazenada usando **hash**, nunca em texto puro. |

# Parte 4 - Regressão no calendário

## 4.1 Em que momento o grupo vai rodar a suíte completa 
O grupo executa o comando npm test completo em três momentos definidos:
1. Antes de cada commit
2. Ao final de cada aula de desenvolvimento
3. Antes de realizar a mesclagem

## 4.2 Quem no grupo é responsavel por verificar que a suíte passando antes de uma entrega?
Todo ogrupo compartilha a responsabilidade, mas o desenvolvedor responsável pela entrega do dia.

## 4.3 O que o grupo faz se, na véspera de uma entrega, a suíte acusar falha em um teste que antes passava?
1. Bloquear a entrega: Nenhuma funcionalidade nova é enviada até que o teste volta a passar
2. Identificar a causa: Comparar o último commit que passava nos testes com as alterações mais recentes.
3. Decisão rápida: Se a correção levar mais de 15 minutos, o código novo que causou a quebra deve ser desfeito, garantindo uma entraga estável e funcional no prazo.



