# ☕ SCRUM BRASIL — THE SCRUM MASTER

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

> 🎮 **Jogue Grátis no Navegador (sem cadastro ou download):**  
> 🔗 **[https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/](https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/)**

---

## 📌 SOBRE O PROJETO

**Scrum Brasil: The Scrum Master** é um RPG retrô e Serious Game educacional desenvolvido para transformar a aprendizagem de metodologias ágeis (Scrum, Kanban e Lean) em uma experiência imersiva e prática.

Criado originalmente com foco nos estudantes e profissionais de Tecnologia da Informação e Gestão Ágil, o jogador assume a liderança servidora de equipes de engenharia de software para enfrentar dilemas reais do mercado: conflitos entre desenvolvedores e Product Owner, pressão de diretoria, bugs críticos em produção, burnouts, conformidade com a LGPD, débitos técnicos e volatilidade de escopo.

---

## 🚀 PRINCIPAIS RECURSOS E MECÂNICAS

### 1. 👥 Escolha de Personagem Scrum Master
No início de cada jornada, o jogador pode escolher entre dois avatares com habilidades e perfis distintos:
* **👨‍💼 Roberto**: Perfil analítico e facilitador. Focado em métricas ágeis, gráficos de Burndown, cadência de entregas e remoção técnica de bloqueios.
* **👩‍💼 Mariana**: Perfil empático e transformador. Focada em liderança servidora, inteligência emocional, gestão de conflitos interpessoais e alinhamento de negócios com a PO.

### 2. 🏢 Catálogo de 11 Empresas e Desafios Reais
O jogador pode liderar squads em 11 empresas de diferentes setores da economia, cada uma com produtos, arquiteturas e desafios ágeis autênticos:

| Empresa | Segmento | Produto Principal | Desafio Central de Gestão Ágil |
|---|---|---|---|
| **Novatech Soluções** | Fintech | *Pixflow* (Pagamentos Pix PMEs) | Conflito entre velocidade e débito técnico em pagamentos instantâneos. |
| **VeloceLog Express** | Logtech | *RouteFast* (Roteirizador com IA) | Queda de sinal GPS em trânsito e SLAs rígidos de entregas urbanas. |
| **HealthPulse Digital** | Healthtech | *MedConnect* (Telemedicina) | Conformidade estrita com LGPD, auditorias ANS e segurança de prontuários. |
| **AgroSmart Terra** | Agrotech | *SafraView* (Sensores e IoT Rural) | Hardware atrasado na alfândega e telemetria satelital em lavouras remotas. |
| **EduNext Academy** | Edtech | *Aprenda+* (Gamificação Escolar) | Prazo inegociável de volta às aulas e sobrecarga de 500k alunos simultâneos. |
| **CyberShield Defesa** | Cibersegurança | *ThreatWatcher* (SOC & Ameaças) | Plantões noturnos, fadiga de alarmes e contenção de ransomware em 60s. |
| **SafeVault Finance** | Banco Tradicional | *OpenBank Core* (Transição Ágil) | Burocracia de comitês CAB cascata e migração de sistemas legados. |
| **FoodFast Delivery** | Foodtech | *FoodFast App* & Painel KDS | Concorrente agressivo exigindo pivots semanais e tempo de espera de motoboys. |
| **AutoDrive Connected** | Automotivo / IoT | *FleetIntel* (Telemetria Veicular) | Tolerância zero a falhas em pista e ruído elétrico no barramento CAN bus. |
| **EcoEnergy Renováveis** | Cleantech | *SolarTrade* (Compensação Solar) | Resoluções da Aneel mudando trimestralmente e precisão tributária. |
| **CloudCore Infra** | DevOps / Cloud | *KubeMaster* (Multicloud GitOps) | Engenharia de caos, failover em 14 segundos e redução de atrito Dev vs Ops. |

### 3. 📋 Quadro Kanban Completo com Gestão de Backlog
* **5 Colunas Interativas**: `Backlog`, `To Do`, `In Progress`, `Review / QA` e `Done (Pronto)`.
* **Definir Novas Histórias**: Botão `➕ Definir Backlog` para criar User Stories personalizadas com Título, Valor de Negócio (1 a 10) e Story Points na sequência Fibonacci (1, 2, 3, 5, 8).
* **Movimentação Livre de Status**: Botões rápidos `◀` e `▶` nos cards para avançar ou recuar histórias entre as colunas.
* **Atribuição Flexível**: Painel retrô para alocar desenvolvedores considerando motivação e nível de estresse.

### 4. 📈 Métricas Oscilantes e Reativas no HUD
Durante a simulação dos dias e a tomada de decisões, 6 indicadores vitais variam em tempo real com feedback animado (`▲ +X` verde e `▼ -X` vermelho):
* **🎯 VALOR**: Volume de benefício de negócio entregue ao cliente através de histórias concluídas.
* **❤️ MORAL**: Satisfação e ânimo da equipe. Sofre penalidade quando desenvolvedores passam de 60% de estresse.
* **🧪 QUALIDADE**: Rigor técnico e cobertura de testes. Sobe com Code Review; cai em entregas apressadas.
* **⚡ VELOCIDADE**: Throughput sustentável de trabalho do time por ciclo.
* **🤝 CONFIANÇA**: Credibilidade perante stakeholders e diretoria executiva.
* **⚠️ RISCO**: Probabilidade de incidentes, retrabalho ou falha na meta da Sprint.

### 5. 🎓 Modo Tutorial Interativo ("Como Jogar")
Acessível diretamente pelo Menu Principal, guia novos facilitadores através de 6 módulos didáticos:
1. *O Papel do Scrum Master* (Liderança servidora, proteção do time e remoção de impedimentos).
2. *As 6 Métricas Oscilantes* (Como equilibrar saúde do projeto e entregas).
3. *O Ciclo da Sprint no Jogo* (Planning, 3 Dias com Daily Scrum, Review e Retrospectiva).
4. *Dominando o Quadro Kanban* (Do refinamento no Backlog até a Definition of Done).
5. *Gestão dos Desenvolvedores* (Perfis de Ana, Carlos, Júlia, Marcos, Beatriz e Rafael).
6. *Estratégias de Vitória* (Como alcançar a graduação de Agile Coach Lendário).

### 6. 🤖 Modo IA — Situações Adversas Infinitas
Integração nativa com LLMs (**Google Gemini**, **Anthropic Claude** e **OpenAI GPT**) via chaves de API:
* **Geração Procedural Contínua**: Situações únicas com anti-repetição de temas e títulos.
* **Progressão por Nível**: De Iniciante até Expert com base nas rodadas acumuladas.
* **Glossário Técnico Clicável (45 Termos)**: Termos técnicos sublinhados por cor (Scrum, Kanban, Engenharia, Gestão e Produto) que abrem definições e exemplos de uso ao clique.
* **Robustez**: Mecanismo de auto-reparo de JSON truncado e retry automático.

### 7. 📚 Gestão Ágil & Leitura em Voz Alta (TTS)
* Centro de estudos completo sobre Scrum, Kanban, Lean, métricas ágeis e mercado de trabalho.
* Tabela salarial do mercado brasileiro e guia de certificações (PSM, CSM, PMI-ACP).
* Suporte a Text-to-Speech (Web Speech API) para escutar os conteúdos em voz alta.

### 8. 🌍 Suporte Multilíngue (i18n)
* Interface com alternância instantânea entre **Português (Brasil)** 🇧🇷, **Inglês** 🇺🇸 e **Espanhol** 🇪🇸.

---

## 🛠️ ARQUITETURA E TECNOLOGIAS

* **Frontend**: React 18 & TypeScript (strict mode)
* **Build Tool**: Vite 5
* **Estilização**: Tailwind CSS com tema retrô customizado e fontes 8-bit (*Press Start 2P*, *Silkscreen*)
* **Áudio**: Web Audio API sintetizando efeitos sonoros chiptune dinamicamente sem arquivos externos
* **Persistência**: `localStorage` com controle de integridade de versão de save
* **Deploy**: CI/CD automatizado via GitHub Actions publicando no GitHub Pages

---

## 💻 EXECUÇÃO LOCAL

Para rodar o projeto na sua máquina:

```bash
# 1. Clone o repositório
git clone https://github.com/ElPadrinhoBR/scrum-brasil-the-scrum-master.git

# 2. Acesse a pasta do projeto
cd scrum-brasil-the-scrum-master

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no seu navegador!

Para gerar a versão otimizada de produção:

```bash
npm run build
```

---

## 📜 LICENÇA

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

*Desenvolvido com carinho para inspirar estudantes e profissionais de tecnologia na jornada da liderança ágil.* 🚀
