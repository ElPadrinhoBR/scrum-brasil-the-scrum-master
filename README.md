# SCRUM BRASIL — THE SCRUM MASTER ☕

**Scrum Brasil — The Scrum Master** é um jogo de navegador educacional e interativo (Serious Game) desenvolvido em **React, Vite e Tailwind CSS**, com estética retro pixel-art de 8-bits e sonorização chiptune gerada em tempo de execução via **Web Audio API**.

O jogador assume o papel de um **Scrum Master** recém-contratado pela fictícia startup *Nova Tech* para reerguer o desenvolvimento do **Pixflow** (uma plataforma de pagamentos via Pix voltada a microempresas brasileiras). O objetivo é gerenciar e evoluir uma equipe de 6 integrantes virtuais através de decisões e facilitação de eventos ágeis, equilibrando metas corporativas com a saúde da equipe.

---

## 🛠️ TECNOLOGIAS E ARQUITETURA

* **Frontend**: React 18 & TypeScript (para tipagem estrita de status de personagens, eventos e estados do Kanban)
* **Bundler & Dev Server**: Vite
* **Estilização**: Tailwind CSS (estilo pixelizado retro com fontes "Press Start 2P" e "Silkscreen")
* **Áudio**: Web Audio API (módulo `SoundManager.ts` sintetiza sons senoidais/quadrados 8-bit em tempo real sem carregar arquivos binários de mídia)
* **Salvamento**: `LocalStorage` com controle de versão
* **Pixel Art**: Componente React `<PixelCharacter />` renderiza avatares SVG dinâmicos por meio de tags `<rect>` e expressões faciais condicionais em tempo de execução.

### Estrutura de Diretórios

```text
src/
├── assets/             # Recursos estáticos (imagens, etc.)
├── components/
│   ├── characters/
│   │   └── PixelCharacter.tsx  # Desenha os avatares em SVG pixel art
│   ├── dialogue/
│   │   └── DialogueBox.tsx     # Caixa de diálogoVN, skip e histórico
│   ├── hud/
│   │   └── HUD.tsx             # Indicadores e meta da Sprint
│   ├── sprint/
│   │   ├── SprintBoard.tsx     # Kanban Interativo (to do -> done)
│   │   └── Retrospective.tsx   # Painel retro e melhorias
│   └── ui/
│       ├── RetroButton.tsx     # Botão 3D retro
│       ├── RetroCard.tsx       # Painel de dados retro
│       └── SoundManager.ts     # Sintetizador de áudio chiptune
├── data/
│   ├── characters.ts   # Metadados e catchphrases dos 6 personagens
│   ├── sprints.ts      # Diálogos, bifurcações e eventos das 8 Sprints
│   ├── skills.ts       # Lista de habilidades desbloqueáveis (SM)
│   └── achievements.ts # Conquistas tradicionais e memes ágeis
├── game/
│   ├── GameState.ts    # Tipagem global do estado de jogo
│   └── SaveSystem.ts   # Salvamento versionado em LocalStorage
├── pages/
│   ├── MainMenu.tsx    # Menu Principal e Conquistas
│   ├── GameScreen.tsx  # Tela de História e VN (fundos programáticos)
│   ├── TeamScreen.tsx  # Lista de Equipe e Árvore de Habilidades
│   ├── SprintBoardPage.tsx # Controle do Kanban e simulação diária
│   └── ResultsScreen.tsx   # Finais (S, A, B, C, D) e estatísticas
├── main.tsx
├── index.css
└── App.tsx
```

---

## 🎮 MECÂNICAS DE GAMEPLAY

1. **Atributos Globais (0-100)**:
   * **🎯 Valor**: Valor de negócio entregue ao cliente final.
   * **❤️ Moral**: Índice de felicidade e engajamento da equipe.
   * **🧪 Qualidade**: Robustez do código (alta qualidade reduz riscos).
   * **⚡ Velocidade**: Ritmo de entrega de cartões no Kanban.
   * **🤝 Confiança**: Confiança do time no processo e no Scrum Master.
   * **⚠️ Risco**: Probabilidade de bugs fatais (tenta manter o mais baixo possível!).

2. **Atributos Individuais**:
   * Cada membro do time possui níveis individuais de **Motivação**, **Estresse** (risco de burnout se chegar a 100), **Confiança** e **Relacionamento** com o Scrum Master.

3. **Árvore de Habilidades**:
   * O jogador acumula XP por boas ações e sobe de nível (até Nível 5: *Agile Coach*). Cada nível concede pontos para desbloquear habilidades como *Feedback Empático* (permite fazer mentoria individual na tela da equipe para reduzir estresse), *Daily Eficiente* (-5% risco diário), e *Foco em Valor* (+10% valor).

4. **Quadro Kanban Ativo**:
   * Nas Sprints, o jogador distribui as histórias para os desenvolvedores na coluna *To Do*. A cada dia (são 3 dias de desenvolvimento por Sprint), o jogador simula o progresso, vendo as histórias fluírem pelas colunas conforme a motivação individual e velocidade global.

5. **As 8 Sprints e Desafios (Bosses)**:
   * **Sprint 1**: Apresentação e formação da equipe.
   * **Sprint 2**: Lidando com bugs críticos e deploys apressados.
   * **Sprint 3 (Boss 1 — O Microgerente)**: Dr. Cláudio tenta invadir a Daily e desviar escopos.
   * **Sprint 4**: Negociando Dívida Técnica vs Novas Funcionalidades com Ana.
   * **Sprint 5 (Boss 2 — O Cliente Impossível)**: Alterações de layout de última hora no dashboard.
   * **Sprint 6 (Boss 3 — A Sprint Eterna)**: Cansaço extremo na equipe e prazos antecipados.
   * **Sprint 7 (Boss 4 — Produção em Chamas)**: O servidor de produção cai na sexta-feira de tarde.
   * **Sprint 8 (Boss Final — A Diretoria)**: Deploy nacional final e avaliação da diretoria.

---

## 🚀 INSTRUÇÕES PARA EXECUTAR LOCALMENTE

### Requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* npm (gerenciador de pacotes padrão do Node)

### Passo 1: Instalar dependências
No terminal da raiz do projeto, execute:
```bash
npm install
```

### Passo 2: Executar em ambiente de desenvolvimento
Para subir o servidor local com Hot Reload automático do Vite, execute:
```bash
npm run dev
```
Abra o link fornecido no terminal (geralmente `http://localhost:5173`) no seu navegador.

### Passo 3: Gerar build de produção
Para validar a tipagem TypeScript e criar os arquivos otimizados finais de HTML/CSS/JS prontos para hospedagem estática (Vercel, Netlify, GitHub Pages, etc.), execute:
```bash
npm run build
```
Os arquivos finais serão gerados na pasta `./dist`.

---

## 🗺️ ROADMAP DE EVOLUÇÃO

* [x] **Primeiro MVP**: Menu Principal, introdução narrativa, 1 background animado em CSS, caixa de diálogos com efeito typewriter e som retro.
* [x] **Mecânicas Principais**: Sistema de status globais e individuais, salvamento no LocalStorage, tela de resultados com 5 finais (S, A, B, C, D).
* [x] **Eventos de Scrum**: Sprint Planning, Daily Scrum simulada de 3 dias, Kanban dinâmico e Sprint Retrospective interativa.
* [x] **Árvore de Habilidades**: 8 habilidades ativas/passivas baseadas em agilidade e facilitação.
* [x] **8 Sprints Completas**: Inclusão de 4 Bosses de processos ágeis e 13 conquistas colecionáveis.
* [ ] **Futuras Expansões**:
  * Adicionar mini-games de pareamento de cartões na Planning.
  * Suporte a múltiplos idiomas (Inglês/Espanhol).
  * Modo Sandbox infinito com geração procedural de histórias de usuário.

---

## 📄 LICENÇA

Este projeto está licenciado sob a licença **MIT** - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
