# Auditoria de Qualidade — Sprint 2

**Data:** 14/05/2026  
**Revisores:**  
- Ana: Controllers  
- João: Services  
- Carlos: Rotas  
- Mariana: Documentação  

## Checklist de Qualidade

### Organização
- [x] Estrutura de pastas segue o padrão MVC + Services
- [x] Imports organizados
- [x] Nomes de variáveis claros

### Tratamento de Erros
- [ ] Todos os controllers usam try/catch + next(erro)
- [ ] Erros retornam formato padronizado
- [ ] Erros do Sequelize tratados

### Validações
- [ ] Todas as rotas POST/PUT têm validação
- [x] E-mails são validados
- [ ] IDs são parseados corretamente

### Documentação
- [ ] Swagger cobre todas as rotas
- [x] README atualizado
- [ ] .env.example completo

### Git
- [x] Todos os membros têm commits recentes
- [x] Mensagens de commit descritivas
- [x] .gitignore correto

## Dívidas Técnicas Encontradas

| # | Descrição                          | Arquivo              | Prioridade | Responsável |
|---|----------------------------------|----------------------|-----------|------------|
| 1 | Validação de dados incompleta     | usuarioController.js | Alta      | João       |
| 2 | Código duplicado em services      | notificacaoService.js| Média     | Carlos     |
| 3 | Falta tratamento de erros         | routes/notificacao.js| Alta      | Ana        |
| 4 | Swagger incompleto                | swagger.js           | Média     | Mariana    |