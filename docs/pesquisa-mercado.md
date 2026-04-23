# Pesquisa de Mercado — Serviços de Notificação

## Serviços de E-mail Transacional

| Serviço     | Plano Gratuito           | Preço Inicial | Diferenciais                    |
|------------|--------------------------|--------------|--------------------------------|
| SendGrid   | 100 emails/dia           | US$ 15/mês   | API robusta, templates         |
| Mailgun    | 5.000/mês (3 meses)      | US$ 35/mês   | Foco em desenvolvedores        |
| Amazon SES | 62.000/mês (via EC2)     | US$ 0.10/1000| Alta escalabilidade e baixo custo |
| Mailtrap   | 500/mês (teste)          | US$ 15/mês   | Ambiente sandbox para testes   |

## Como o nosso projeto se compara?

Nosso projeto implementa um sistema básico de notificações via API REST, permitindo o envio de mensagens e cadastro de usuários.

Comparação:
- Similar:
  - Uso de API para envio de notificações
  - Estrutura baseada em requisições HTTP
- Diferente:
  - Não possui escalabilidade real ainda
  - Não possui filas (queue system)
  - Não possui templates avançados
  - Não possui integração com múltiplos canais (SMS, push, etc.)

## O que poderíamos adotar no futuro?

- Integração com serviços como SendGrid ou Amazon SES
- Implementação de filas (RabbitMQ ou Kafka)
- Sistema de templates de e-mail
- Logs e monitoramento de envio
- Retry automático em falhas
- Suporte a múltiplos canais (email, SMS, push)