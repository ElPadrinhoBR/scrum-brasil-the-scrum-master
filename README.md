# SCRUM BRASIL — THE SCRUM MASTER ☕

> 🎮 **Jogar Online (GitHub Pages):** [https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/](https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/)

**Scrum Brasil — The Scrum Master** é um jogo de navegador educacional e interativo (Serious Game) desenvolvido em **React, Vite e Tailwind CSS**, com estética retro pixel-art de 8-bits e sonorização chiptune gerada em tempo de execução via **Web Audio API**.

O jogador assume o papel de um **Scrum Master** recém-contratado pela fictícia startup *Nova Tech* para reerguer o desenvolvimento do **Pixflow** (uma plataforma de pagamentos via Pix voltada a microempresas brasileiras). O objetivo é gerenciar e evoluir uma equipe de 6 integrantes virtuais através de decisões e facilitação de eventos ágeis, equilibrando metas corporativas com a saúde da equipe.

---

## 🛠️ TECNOLOGIAS E ARQUITETURA

* **Frontend**: React 18 & TypeScript (tipagem estrita de personagens, eventos e estados do Kanban)
* **Bundler & Dev Server**: Vite com deploy automático para GitHub Pages via GitHub Actions
* **Estilização**: Tailwind CSS (estilo pixelizado retro com fontes "Press Start 2P" e "Silkscreen")
* **Áudio**: Web Audio API (módulo `SoundManager.ts` sintetiza sons senoidais/quadrados 8-bit sem arquivos externos)
* **Salvamento**: `LocalStorage` com controle de versão
* **Assets Visuais**: Backgrounds e avatares gerados com IA (pixel art 16:9 e retratos 1:1)
* **Pixel Art Dinâmica**: Componente `<PixelCharacter />` renderiza avatares SVG com expressões condicionais em tempo de execução

### Estrutura de Diretórios

```text
src/
├── components/
│   ├── characters/
│   │   └── PixelCharacter.tsx     # Avatares SVG com fallback de expressões PNG
│   ├── dialogue/
│   │   └── DialogueBox.tsx        # VN com typewriter, glossário ágil e avaliação de escolhas
│   ├── hud/
│   │   └── HUD.tsx                # HUD adaptativo (Campanha vs Sandbox)
│   ├── sprint/
│   │   ├── SprintBoard.tsx        # Kanban interativo (To Do → Done)
│   │   └── Retrospective.tsx      # Painel de Retro com Action Items
│   └── ui/
│       ├── RetroButton.tsx
│       ├── RetroCard.tsx
│       └── SoundManager.ts        # Sintetizador chiptune
├── data/
│   ├── characters.ts              # Metadados dos 6 personagens
│   ├── sprints.ts                 # Diálogos, bifurcações e eventos das 8 Sprints
│   ├── glossary.ts                # 39 termos ágeis com definições (glossário interativo)
│   ├── skills.ts                  # Habilidades desbloqueáveis do SM
│   └── achievements.ts            # 13 conquistas colecionáveis
├── game/
│   ├── GameState.ts               # Tipagem global do estado de jogo
│   ├── GameContext.tsx            # Lógica central do jogo e transições de fase
│   ├── SaveSystem.ts              # Salvamento versionado em LocalStorage
│   └── SandboxGenerator.ts        # Motor de geração procedural (Sandbox Infinito)
├── pages/
│   ├── MainMenu.tsx               # Menu com seleção de modo e conquistas
│   ├── GameScreen.tsx             # Visual Novel (backgrounds dinâmicos + sprites)
│   ├── SprintBoardPage.tsx        # Kanban e simulação diária
│   ├── TeamScreen.tsx             # Equipe e Árvore de Habilidades
│   └── ResultsScreen.tsx          # Finais S/A/B/C/D
├── main.tsx
├── index.css
└── App.tsx

public/
├── backgrounds/       # 6 backgrounds pixel-art gerados com IA (escritório, reunião, etc.)
└── characters/        # 6 retratos de personagens gerados com IA
```

---

## 🎮 MECÂNICAS DE GAMEPLAY

### Atributos Globais (0–100)
| Atributo | Descrição |
|---|---|
| 🎯 **Valor** | Valor de negócio entregue ao cliente final |
| ❤️ **Moral** | Índice de felicidade e engajamento da equipe |
| 🧪 **Qualidade** | Robustez do código (reduz riscos de bugs) |
| ⚡ **Velocidade** | Ritmo de entrega de cartões no Kanban |
| 🤝 **Confiança** | Confiança do time no processo e no Scrum Master |
| ⚠️ **Risco** | Probabilidade de bugs fatais (manter o mais baixo possível!) |

### Atributos Individuais
Cada um dos 6 membros da equipe possui níveis individuais de **Motivação**, **Estresse** (burnout se chegar a 100), **Confiança** e **Relacionamento** com o Scrum Master.

### Sistema de Progressão (XP & Níveis)
O jogador acumula XP por boas decisões e sobe de nível (Nível 1–5: até *Agile Coach*). Cada nível concede pontos para desbloquear habilidades como *Feedback Empático*, *Daily Eficiente* (-5% risco), *Foco em Valor* (+10% valor) e outras 8 habilidades ativas/passivas.

### Quadro Kanban Ativo
Nas Sprints, o jogador distribui histórias para os desenvolvedores na coluna *To Do*. A cada dia (3 dias por Sprint), a simulação avança automaticamente, movendo cartões pelas colunas conforme motivação individual e velocidade global.

### Glossário Ágil Interativo
Termos técnicos dentro dos diálogos (ex: *Daily Scrum*, *Definition of Done*, *Velocity*, *Retrospective*) aparecem destacados em laranja. Ao clicar, uma janela modal exibe a definição completa do termo — o jogo **ensina enquanto você joga**.

### Sistema de Avaliação de Escolhas
Cada decisão de diálogo exibe um painel de feedback após a escolha com avaliação **BOM / MEDIANO / RUIM** e uma explicação pedagógica sobre a prática ágil correta, fundamentada nos princípios do Scrum Guide.

### Contador de Prazo / Modo Sandbox
No **Modo Campanha**, o HUD exibe um contador regressivo de semanas até o lançamento final do produto. No **Modo Sandbox Infinito**, o contador é substituído por `♾️ SPRINTS: ILIMITADAS`.

---

## 🎭 MODOS DE JOGO

### 🏢 Modo Campanha
A jornada narrativa linear da startup **Nova Tech** com 8 Sprints fixas, personagens originais e história completa até o deploy final do Pixflow. Inclui 4 "Boss Sprints" com antagonistas únicos.

| Sprint | Desafio |
|---|---|
| Sprint 1 | Apresentação e formação da equipe |
| Sprint 2 | Bugs críticos e deploys apressados |
| Sprint 3 🔴 | **Boss: Dr. Cláudio — O Microgerente** |
| Sprint 4 | Dívida Técnica vs Novas Funcionalidades |
| Sprint 5 🔴 | **Boss: O Cliente Impossível** |
| Sprint 6 🔴 | **Boss: A Sprint Eterna (burnout)** |
| Sprint 7 🔴 | **Boss: Produção em Chamas (sexta-feira)** |
| Sprint 8 🔴 | **Boss Final: A Diretoria** |

### ♾️ Modo Sandbox Infinito
Sprints ilimitadas geradas **proceduralmente** pelo motor `SandboxGenerator.ts`. A cada Sprint:
- **User Stories únicas** geradas combinando verbos × features × componentes técnicos (centenas de variações)
- **Cenários de Planning** aleatórios (negociação de escopo, spikes técnicos)
- **Daily Events únicos** sorteados (bloqueios de API, debates de qualidade, conflitos interpessoais)
- **Sprint Review dinâmica** adaptada ao desempenho real da equipe

---

## 🌍 SUPORTE A IDIOMAS *(Em desenvolvimento)*

- 🇧🇷 Português (padrão)
- 🇺🇸 English *(Em breve)*
- 🇪🇸 Español *(Em breve)*

---

## 🚀 INSTRUÇÕES PARA EXECUTAR LOCALMENTE

### Requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* npm

### Instalar e executar
```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento com Hot Reload
npm run dev
# → Acesse http://localhost:5173

# Gerar build de produção
npm run build
# → Arquivos otimizados em ./dist
```

### Deploy Automático (GitHub Pages)
Qualquer push para a branch `main` dispara automaticamente o workflow `.github/workflows/deploy.yml`, que compila o projeto e publica na URL pública do GitHub Pages.

---

## 🗺️ ROADMAP

| Status | Feature |
|---|---|
| ✅ | MVP — Menu, typewriter, sons 8-bit, backgrounds CSS |
| ✅ | Sistema de status globais e individuais (6 atributos) |
| ✅ | Salvamento em LocalStorage versionado |
| ✅ | 8 Sprints completas com 4 Bosses e bifurcações narrativas |
| ✅ | Kanban dinâmico com simulação de progresso diário |
| ✅ | Árvore de Habilidades com 8 habilidades ativas/passivas |
| ✅ | 13 Conquistas colecionáveis |
| ✅ | Glossário ágil interativo (39 termos clicáveis nos diálogos) |
| ✅ | Sistema de avaliação de escolhas (BOM / MEDIANO / RUIM) |
| ✅ | Backgrounds e avatares de personagens gerados com IA |
| ✅ | Input de nome customizado de Scrum Master |
| ✅ | Contador de prazo regressivo por Sprint no HUD |
| ✅ | **Modo Sandbox Infinito** com geração procedural de histórias |
| ✅ | Deploy automático via GitHub Actions para GitHub Pages |
| 🔄 | **Mini-game de Estimation Poker** na Sprint Planning |
| 🔄 | **Suporte a múltiplos idiomas** (Inglês e Espanhol) |
| 🔄 | Árvore de conquistas expandida e conquistas secretas |
| 🔄 | Perfil de Scrum Master persistente entre partidas |

---

## 👥 PERSONAGENS

| Personagem | Papel | Arquétipo |
|---|---|---|
| **Ana Lima** | Product Owner | Exigente mas estratégica — foca em valor de negócio |
| **Carlos Souza** | Dev Backend | Perfeccionista — prioriza qualidade acima de tudo |
| **Júlia Santos** | Dev Frontend | Criativa e veloz — conflito com prazos apertados |
| **Marcos Oliveira** | QA Engineer | Metódico — não aceita código sem testes |
| **Beatriz Costa** | UX Designer | Defensora da experiência do usuário |
| **Rafael Mendes** | DevOps | Pragmático — garante estabilidade em produção |

---

## 📄 LICENÇA

Este projeto está licenciado sob a licença **MIT** — consulte o arquivo [LICENSE](LICENSE) para detalhes.
