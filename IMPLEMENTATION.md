# IMPLEMENTATION.md — Scrum Brasil: The Scrum Master

> Rastreamento continuo de funcionalidades implementadas e proximas etapas planejadas.
> Atualizado automaticamente a cada ciclo de desenvolvimento.

---

## IMPLEMENTADO

### Core do Jogo
- [x] Motor de Visual Novel com dialogos, typewriter effect e historico
- [x] Sistema de escolhas com bifurcacoes e efeitos em metricas e XP
- [x] Glossario interativo (45 termos ageis clicaveis com definicoes)
- [x] Fases da Sprint: INTRO -> PLANNING -> DEVELOPMENT (3 dias) -> REVIEW -> RETROSPECTIVA
- [x] Modo Campanha (8 Sprints fixas) e Modo Sandbox (Sprints infinitas procedurais)
- [x] Sistema de XP, niveis (1-5) e Skill Points desbloqueaveis
- [x] 13 conquistas coleccionaveis com criterios de desbloqueio
- [x] Salvamento local (localStorage) com controle de versao de save

### Personagens e Avatares
- [x] 6 desenvolvedores com perfis, estresse, motivacao e especialidades
- [x] Escolha de Scrum Master: Roberto (perfil analitico) e Mariana (perfil empatico)
- [x] Componente PixelCharacter com sprites SVG e expressoes condicionais
- [x] HUD com avatar, nome e empresa do SM ativo

### Sistema de Empresas
- [x] Catalogo com 11 empresas jogaveis com segmentos, produtos e desafios unicos
- [x] Todas as empresas ATIVAS e selecionaveis no fluxo de novo jogo
- [x] Campanhas de historias independentes por empresa (companyStories.ts)
- [x] CORRECAO CRITICA: getCurrentSprintDef() exposto no contexto
        cada empresa carrega sua propria narrativa (nao mais a Novatech para todas)
- [x] Carregamento correto das historias da empresa na proxima Sprint (finishSprintReview)

Empresas disponíveis:
  novatech   | Novatech Solucoes   | Pixflow          | Fintech / Pix
  velocelog  | VeloceLog Express   | RouteFast        | Logtech / Last-Mile
  healthpulse| HealthPulse Digital | MedConnect       | Healthtech / LGPD
  agrosmart  | AgroSmart Terra     | SafraView        | Agrotech / IoT
  edunext    | EduNext Academy     | Aprenda+         | Edtech / Gamificacao
  cybershield| CyberShield Defesa  | ThreatWatcher    | Ciberseguranca / SOC
  safevault  | SafeVault Finance   | OpenBank Core    | Banco / Transformacao Agil
  foodfast   | FoodFast Delivery   | FoodFast App     | Foodtech / Marketplace
  autodrive  | AutoDrive Connected | FleetIntel       | Automotivo / OBD-II
  ecoenergy  | EcoEnergy Renovaveis| SolarTrade       | Cleantech / Energia Solar
  cloudcore  | CloudCore Infra     | KubeMaster       | DevOps / Multicloud

### Quadro Kanban
- [x] 5 colunas: Backlog -> To Do -> In Progress -> Review/QA -> Done
- [x] Botoes para mover cards entre colunas
- [x] Modal "Definir Backlog" (Titulo + Valor de Negocio + Story Points Fibonacci)
- [x] Atribuicao flexivel de desenvolvedores por card
- [x] Simulacao de progresso diario com animacoes

### Metricas Oscilantes
- [x] 6 metricas reativas: Valor, Moral, Qualidade, Velocidade, Confianca, Risco
- [x] Calculo dinamico a cada dia simulado e a cada decisao de dialogo
- [x] Badges animados +X (verde) e -X (vermelho) no HUD

### Modo Tutorial
- [x] 6 modulos interativos com navegacao por abas e pills
- [x] Botao "Tutorial / Como Jogar" no menu principal

### Cenarios / Backgrounds
- [x] 6 cenarios retro originais (SVG): escritorio, reuniao, desenvolvimento, cafeteria, servidores, diretoria
- [x] 4 cenarios adicionais: war_room, home_office, treinamento, lab_inovacao
- [x] 10 cenarios exclusivos por empresa (um para cada empresa)
- [x] Sistema hibrido: carrega PNG de public/backgrounds/ ou fallback para SVG

### Modo IA - Situacoes Infinitas
- [x] Suporte a Gemini, Claude e GPT via chave de API configuravel
- [x] Campo de texto livre para digitar o modelo exato
- [x] Anti-repeticao de situacoes por hash de titulos recentes
- [x] Progressao por nivel (Iniciante -> Expert)
- [x] Auto-reparo de JSON truncado e retry automatico

### Infraestrutura
- [x] React 18 + TypeScript + Tailwind CSS + Vite 5
- [x] Web Audio API (sons chiptune sem arquivos externos)
- [x] Deploy automatizado via GitHub Actions -> GitHub Pages
- [x] README.md completo e atualizado
- [x] i18n: Portugues, Ingles e Espanhol

---

## EM DESENVOLVIMENTO / PROXIMAS ETAPAS

### Alta Prioridade
- [ ] Mais Sprints por Empresa: cada empresa tem 1 Sprint de conteudo, expandir para 3-8 Sprints unicas
- [ ] Eventos Boss/Crise por Empresa: evento dramatico especifico
        ex: VeloceLog = apagao de GPS na Black Friday
        ex: CyberShield = ataque de ransomware em horario de pico
- [ ] Personagens Exclusivos por Empresa: personagens adicionais
        ex: gerente conservador do banco na SafeVault
- [ ] Tela de Resultados por Empresa: final diferente e narrativa de encerramento especifica

### Media Prioridade
- [ ] Sistema de Progressao entre Empresas: desbloquear novas empresas ao completar campanhas
- [ ] Conquistas Exclusivas por Empresa: badges especificos por vertical
        ex: Agronomo Digital para AgroSmart
- [ ] Dificuldades de Campanha: Facil / Medio / Dificil

### Baixa Prioridade / Futuro
- [ ] Leaderboard Online: ranking de jogadores por empresa e nota final
- [ ] Editor de Situacoes: ferramenta para professores criarem cenarios sem codigo
- [ ] Modo Cooperativo: 2 jogadores gerenciando a mesma Sprint
- [ ] App Mobile Nativo: versao React Native para iOS e Android
- [ ] Sistema de Missoes Diarias: desafios novos gerados todo dia
- [ ] Integracao com Moodle/Canvas: exportacao de relatorio de desempenho para LMS

---

## BUGS CONHECIDOS E CORRECOES RECENTES

2026-09-03 | Todas as empresas exibiam a narrativa da Novatech | CORRIGIDO
2026-09-03 | Language nao exportado de LanguageContext        | CORRIGIDO
2026-09-03 | JSON truncado da IA causando erro               | CORRIGIDO
2026-09-03 | Situacoes do Modo IA se repetindo              | CORRIGIDO

---

## ARQUIVOS CHAVE

src/data/companies.ts          - Catalogo das 11 empresas
src/data/companyStories.ts     - Campanhas/historias por empresa (NOVO)
src/data/sprints.ts            - 8 Sprints originais Novatech/Pixflow
src/game/GameContext.tsx       - Logica central + getCurrentSprintDef() exposto (CORRIGIDO)
src/game/modular/SituationRegistry.ts - Sistema modular de eventos (NOVO)
src/pages/MainMenu.tsx         - Fluxo: Nome -> Personagem -> Empresa -> Modo (ATUALIZADO)
src/pages/GameScreen.tsx       - VN com backgrounds dinamicos (CORRIGIDO)
src/pages/TutorialPage.tsx     - Modo Tutorial interativo (NOVO)
src/components/characters/PixelCharacter.tsx - Sprites Roberto e Mariana (ATUALIZADO)
src/components/hud/HUD.tsx     - Metricas oscilantes + badges (ATUALIZADO)
src/components/sprint/SprintBoard.tsx - Kanban 5 colunas (ATUALIZADO)
