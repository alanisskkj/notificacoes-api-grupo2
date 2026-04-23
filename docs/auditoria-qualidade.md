# Auditoria de Qualidade — Sprint 2

**Data:** 14/05/2026  
**Revisores:**  
- Alanis: Controllers  
- Isabele: Services  
- Isabela: Rotas  
- Alanis: Documentação  

## Checklist de Qualidade

### Organização
- [x] Estrutura de pastas segue o padrão MVC + Services
- [x] Imports organizados
- [x] Nomes de variáveis claros

### Tratamento de Erros
- [x] Todos os controllers usam try/catch + next(erro)
- [x] Erros retornam formato padronizado
- [x] Erros do Sequelize tratados

### Validações
- [x] Todas as rotas POST/PUT têm validação
- [x] E-mails são validados
- [x] IDs são parseados corretamente

### Documentação
- [x] Swagger cobre todas as rotas
- [x] README atualizado
- [x] .env.example completo

### Git
- [x] Todos os membros têm commits recentes
- [x] Mensagens de commit descritivas
- [x] .gitignore correto

## Dívidas Técnicas Encontradas

| # | Descrição                          | Arquivo              | Prioridade | Responsável |
|---|----------------------------------|----------------------|-----------|------------|
| 2 | Código duplicado em services      | notificacaoService.js| Média     | Isabele     |
| 3 | Falta tratamento de erros         | routes/notificacao.js| Alta      | Isabela        |
| 4 | Swagger incompleto                | swagger.js           | Média     | Alanis    |