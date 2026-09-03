# IMPLEMENTATION.md — Scrum Brasil: The Scrum Master

> Rastreamento contínuo de funcionalidades implementadas e próximas etapas planejadas.
> Atualizado automaticamente a cada ciclo de desenvolvimento.

---

## 1. IMPLEMENTADO

### Avatares Bonitos em Pixel Art & Expressões Faciais Dinâmicas
- [x] **Refatoração Completa do PixelCharacter**:
  - Traços detalhados em pixel art SVG nítido (*crispEdges*) com estética retrô / chibi / anime
  - Bochechas rosadas (*blush*) com intensidades reativas ao humor
  - Penteados, cabelos e acessórios exclusivos para os 8 personagens (Ana, Carlos, Júlia, Marcos, Beatriz, Rafael, Roberto e Mariana)
  - Uniformes e cores temáticas adaptadas ao setor da empresa ativa (ex: azul médico na HealthPulse, dark cyber na CyberShield, terno bancário na SafeVault, etc.)
- [x] **7 Expressões Emocionais Dinâmicas**:
  - `neutral`: Olhar focado, sereno e profissional
  - `happy`: Olhinhos sorridentes `^ ^`, boca aberta e bochechas coradas
  - `worried`: Sobrancelhas caídas, boca trêmula e gota de suor na testa
  - `angry`: Sobrancelhas cerradas, boca aberta furiosa e veia de raiva animada
  - `sad`: Olhos caídos, lágrima azul escorrendo pelo rosto
  - `surprised`: Olhões arregalados com reflexo de luz e boca em "O"
  - `confident`: Piscadinha esperta (*wink*), sorriso de canto e estrela dourada cintilante
- [x] **Normalização Inteligente de Personagens**:
  - Suporte a qualquer variação de grafia/acentuação (`'Ana'`, `'carlos'`, `'Júlia'`, `'Julia'`, etc.) evitando cair no fallback genérico
  - Quando o Scrum Master fala nas histórias de qualquer empresa, é exibido o avatar do personagem escolhido pelo jogador (**Roberto** ou **Mariana**) com a expressão facial correta
- [x] **Identidade Visual nas Caixas de Diálogo**: Cores temáticas e cargos corretos em todas as 11 empresas

### Rodapé Retro & Telemetria
- [x] **Versão do Jogo**: Exibição da versão ativa (`v1.2.0`) com badge retrô e luz verde pulsante
- [x] **Contador de Visitas**: Contador resiliente integrado via API pública (`counterapi.dev`) com fallback automático em `localStorage` e persistência por sessão

### Quadro Kanban (Totalmente Refatorado no Estilo Kanban Real)
- [x] 5 colunas clássicas: Backlog, To Do, In Progress (com WIP Limit), Review / QA e Done (com strikethrough e selo Entregue)
- [x] Barra de progresso da Sprint, cards com borda colorida e modal de criação com sequência Fibonacci

### Verificação e Validação das 11 Empresas (100% Funcionais)
- [x] Todas as 11 empresas jogáveis e ativas com histórias, metas, daily events e review independentes

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
| 2026-09-03 | Avatares pixel art bonitos com 7 expressões dinâmicas e uniformes por empresa | CONCLUÍDO |
| 2026-09-03 | Contador de visitas e versão v1.2.0 adicionados no rodapé (Footer.tsx) | CONCLUÍDO |
| 2026-09-03 | Quadro Kanban reestilizado (WIP limits, cards com accent border, barra de sprint) | CONCLUÍDO |
| 2026-09-03 | Validação automatizada de 100% das 11 empresas com scripts de teste | CONCLUÍDO |
| 2026-09-03 | Resolução do bug de narrativa fixa da Novatech em todas as empresas | CONCLUÍDO |
