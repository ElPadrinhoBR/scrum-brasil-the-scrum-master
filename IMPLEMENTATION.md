# IMPLEMENTATION.md — Scrum Brasil: The Scrum Master (v1.2.1)

> Rastreamento contínuo de funcionalidades implementadas e próximas etapas planejadas.
> Atualizado automaticamente a cada ciclo de desenvolvimento.

---

## 1. IMPLEMENTADO (v1.2.1)

### Diversidade de Personagens & Capacidades de Especialidade
- [x] **Expansão do Time para 11 Membros (Diversidade de Gêneros e Etnias)**:
  - **Dandara**: Senior QA Specialist (Mulher negra) — especialista em automação e acessibilidade
  - **Tainá**: QA Lead (Mulher indígena) — especialista em testes de carga e resiliência
  - **Kofi**: Backend Developer (Homem negro) — arquitetura distribuída e escalabilidade
  - **Kenji**: Mobile & UI Developer (Homem nipo-brasileiro) — microinterações e tempos de resposta
  - **Aline**: DevSecOps Engineer (Mulher parda) — segurança defensiva e infraestrutura como código
  - **Ana**: Product Owner
  - **Carlos**: Backend Developer
  - **Júlia**: Frontend Developer
  - **Marcos**: QA Engineer
  - **Beatriz**: UX/UI Designer
  - **Rafael**: DevOps Engineer
- [x] **Suporte a Avatares com Características Visuais Próprias**:
  - Penteados autênticos (box-braids com contas douradas, cabelo liso comprido com franja e grafismos, fade degradê com risca, repicado anime tech, cachos volumosos com bandana)
  - Tons de pele e sombras específicas por etnia

### Regras Ágeis do Kanban & Exclusividade de QA
- [x] **Auto-Avanço de To Do para In Progress**: Ao atribuir um responsável por uma história na coluna `todo`, ela transita automaticamente para `progress`
- [x] **Transição Automática para Review**: Ao atingir 100% de desenvolvimento diário, o card vai automaticamente para `review`
- [x] **Regra de Ouro: Exclusividade de QA no Review**:
  - Somente profissionais de QA (**Marcos, Dandara ou Tainá**) têm capacidade técnica para assumir e homologar histórias na coluna `review`
  - Modal de atribuição desabilita e bloqueia desenvolvedores não-QA com aviso visual
  - Se um dev terminar o código, a história vai para `review` e desatribui para aguardar um QA
  - Na simulação diária, o card em `review` só avança para `done` se um QA for o responsável pela homologação
- [x] **Persistência no Concluído**: Cards em `done` ficam permanentemente fixados com texto tachado, selo "Entregue ✓" e somam os pontos no rodapé da coluna

### Versão e Documentação
- [x] Versão atualizada para **1.2.1** no `package.json`, `Footer.tsx` e `README.md`
- [x] `README.md` amplamente atualizado com a tabela de diversidade de desenvolvedores, regras de QA no Kanban e badges

---

## 2. EM DESENVOLVIMENTO / PRÓXIMAS ETAPAS

### Alta Prioridade
- [ ] **Expansão do Glossário Técnico**: Adicionar mais 40 termos ágeis e de engenharia de software
- [ ] **Expansão de Sprints por Empresa**: Adicionar Sprints 2 e 3 para as 10 empresas
- [ ] **Eventos de Crise / Boss Fight Temáticos**: Desafios críticos no 2º e 3º dia da Sprint

### Média Prioridade
- [ ] **Desbloqueio Progressivo de Empresas**: Iniciar com 3 empresas e liberar as demais por mérito
- [ ] **Conquistas Temáticas por Vertical**: Badges exclusivos por setor
- [ ] **Gráfico Burndown da Sprint**: Linha visual da queima de pontos

---

## 3. HISTÓRICO DE CORREÇÕES

| Data | Correção | Status |
|---|---|---|
| 2026-09-03 | Lançamento v1.2.1: 11 membros com diversidade, exclusividade de QA no review e auto-avanço no Kanban | CONCLUÍDO |
| 2026-09-03 | Imagens reais PNG geradas para Roberto, Mariana e cenários de todas as 11 empresas | CONCLUÍDO |
| 2026-09-03 | Contador de visitas agora incrementa a cada recarregamento da página (F5) | CONCLUÍDO |
| 2026-09-03 | Avatares pixel art com expressões dinâmicas e uniformes por empresa | CONCLUÍDO |
| 2026-09-03 | Resolução do bug de narrativa fixa da Novatech em todas as empresas | CONCLUÍDO |
