# IMPLEMENTATION.md — Scrum Brasil: The Scrum Master

> Rastreamento contínuo de funcionalidades implementadas e próximas etapas planejadas.
> Atualizado automaticamente a cada ciclo de desenvolvimento.

---

## 1. IMPLEMENTADO

### Rodapé Retro & Telemetria
- [x] **Versão do Jogo**: Exibição da versão ativa (`v1.2.0`) com badge retrô e luz verde pulsante
- [x] **Contador de Visitas**: Contador resiliente integrado via API pública (`counterapi.dev`) com fallback automático em `localStorage` e persistência por sessão
- [x] Rodapé responsivo, discreto e adaptado a todas as telas do jogo (`Footer.tsx`)

### Quadro Kanban (Totalmente Refatorado no Estilo Kanban Real)
- [x] 5 colunas clássicas com cores e identidade visual distintas:
  - **Backlog**: Cinza ardósia (#1a1a28), borda slate-600
  - **To Do**: Azul escuro (#101828), borda blue-700
  - **In Progress**: Âmbar (#231c0a), borda amber-600, indicador pulsante e alerta de WIP Limit
  - **Review / QA**: Roxo (#1c1528), borda purple-600, barra de progresso do card
  - **Concluído (Done)**: Esmeralda (#0d2018), borda emerald-600, texto riscado e selo "Entregue ✓"
- [x] Barra superior de progresso da Sprint com porcentagem calculada em tempo real (ex: `2/4 (50%)`)
- [x] Cards no estilo Kanban físico com borda lateral colorida (accent border), badge de Fibonacci (`sp`) e Valor de Negócio (`V`)
- [x] Avatar circular com a inicial do desenvolvedor responsável e indicação de estresse/motivação
- [x] Botões rápidos de transição entre colunas (`◀` e `▶`) permitindo mover cards para qualquer etapa
- [x] Coluna "Concluído" com efeito de tarefa entregue, checkmark e som de sucesso ao completar
- [x] Rodapé de cada coluna calculando o total de Story Points e Valor acumulado
- [x] Modal "Definir História no Backlog" com input de texto, range de Valor (1–10) e botões de Fibonacci (1, 2, 3, 5, 8)

### Verificação e Validação das 11 Empresas (100% Funcionais com Campanhas Próprias)
- [x] **Novatech Soluções** (`novatech`): Pixflow (Fintech / Pix) — Meta: Estruturar MVP
- [x] **VeloceLog Express** (`velocelog`): RouteFast (Logtech / IA) — Meta: 500 entregas simultâneas em SP
- [x] **HealthPulse Digital** (`healthpulse`): MedConnect (Healthtech / LGPD) — Meta: Teleconsulta criptografada
- [x] **AgroSmart Terra** (`agrosmart`): SafraView (Agrotech / IoT) — Meta: Sensores de solo e Bluetooth Mesh
- [x] **EduNext Academy** (`edunext`): Aprenda+ (Edtech / Gamificação) — Meta: Trilhas adaptativas para ano letivo
- [x] **CyberShield Defesa** (`cybershield`): ThreatWatcher (Cibersegurança) — Meta: Contenção de ransomware em <60s
- [x] **SafeVault Finance** (`safevault`): OpenBank Core (Banco Legado) — Meta: APIs de Open Finance sem queda de caixa
- [x] **FoodFast Delivery** (`foodfast`): FoodFast App (Foodtech) — Meta: Rastreamento em mapa e despacho de pedidos
- [x] **AutoDrive Connected** (`autodrive`): FleetIntel (Automotivo / CAN bus) — Meta: Telemetria de motores e freios
- [x] **EcoEnergy Renováveis** (`ecoenergy`): SolarTrade (Cleantech) — Meta: Liquidação de créditos solares
- [x] **CloudCore Infrastructure** (`cloudcore`): KubeMaster (DevOps) — Meta: Clusters Kubernetes multicloud

### Correção de Fluxo Narrativo
- [x] `getCurrentSprintDef()` exposto no `GameContext` e consumido no `GameScreen`
- [x] Diálogos de Planning, Daily Events (dias 1, 2 e 3) e Review carregados diretamente da empresa selecionada
- [x] Conclusão de Sprint (`finishSprintReview`) carrega histórias da empresa ativa

### Personagens e Avatares
- [x] Escolha de Scrum Master: Roberto (analítico) e Mariana (empática)
- [x] 6 desenvolvedores do time com especialidades, estresse e motivação dinâmicos
- [x] Sprites SVG retro com expressões faciais dinâmicas

### Métricas Oscilantes
- [x] 6 métricas ativas: Valor, Moral, Qualidade, Velocidade, Confiança e Risco
- [x] Flutuação dinâmica por dia simulado com badges animados no HUD

---

## 2. EM DESENVOLVIMENTO / PRÓXIMAS ETAPAS

### Alta Prioridade
- [ ] **Expansão de Sprints por Empresa**: Adicionar Sprints 2 e 3 para as 10 empresas
- [ ] **Eventos de Crise / Boss Fight Temáticos**:
  - *VeloceLog*: Falha massiva de GPS às vésperas da Black Friday
  - *CyberShield*: Tentativa de invasão com sequestro de dados ao vivo
  - *HealthPulse*: Auditoria surpresa da ANPD sobre prontuários
- [ ] **Filtros e Drag-and-Drop no Kanban**: Permitir arrastar os cards entre as colunas além dos botões de avanço

### Média Prioridade
- [ ] **Desbloqueio Progressivo de Empresas**: Começar com 3 empresas e desbloquear as demais ao atingir nota A
- [ ] **Conquistas Temáticas por Vertical**: Ex: "Auditor Implacável" (HealthPulse), "Piloto Automático" (AutoDrive)
- [ ] **Estatísticas e Gráfico Burndown**: Visualização gráfica do burn-down ao longo dos 3 dias da Sprint

### Baixa Prioridade
- [ ] Ranking online / Leaderboard global
- [ ] Modo multiplayer ou sala cooperativa para treinamento corporativo
- [ ] Integração com LMS educacional (Moodle/Canvas)

---

## 3. HISTÓRICO DE CORREÇÕES

| Data | Correção | Status |
|---|---|---|
| 2026-09-03 | Contador de visitas e versão v1.2.0 adicionados no rodapé (Footer.tsx) | CONCLUÍDO |
| 2026-09-03 | Quadro Kanban reestilizado (WIP limits, cards com accent border, barra de sprint) | CONCLUÍDO |
| 2026-09-03 | Validação automatizada de 100% das 11 empresas com scripts de teste | CONCLUÍDO |
| 2026-09-03 | Resolução do bug de narrativa fixa da Novatech em todas as empresas | CONCLUÍDO |
| 2026-09-03 | Geração de IMPLEMENTATION.md na raiz para rastreamento de features | CONCLUÍDO |
