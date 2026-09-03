# ☕ SCRUM BRASIL — THE SCRUM MASTER (v1.2.1)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/)
[![Versão](https://img.shields.io/badge/Versão-1.2.1-brightgreen.svg)](https://github.com/ElPadrinhoBR/scrum-brasil-the-scrum-master)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

> 🎮 **Jogue Grátis no Navegador (sem cadastro ou download):**  
> 🔗 **[https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/](https://elpadrinhobr.github.io/scrum-brasil-the-scrum-master/)**

---

## 📌 SOBRE O PROJETO

**Scrum Brasil: The Scrum Master** é um RPG retrô e Serious Game educacional desenvolvido para transformar a aprendizagem de metodologias ágeis (Scrum, Kanban e Lean) em uma experiência imersiva e prática.

Criado originalmente com foco nos estudantes e profissionais de Tecnologia da Informação e Gestão Ágil da Universidade Cruzeiro do Sul, o jogador assume a liderança servidora de equipes de engenharia de software para enfrentar dilemas reais do mercado: conflitos entre desenvolvedores e Product Owner, pressão de diretoria, bugs críticos em produção, burnouts, conformidade com a LGPD, débitos técnicos e volatilidade de escopo.

---

## 🚀 PRINCIPAIS RECURSOS E MECÂNICAS (NOVIDADES DA v1.2.1)

### 1. 👥 Escolha de Personagem Scrum Master
No início de cada jornada, o jogador pode escolher entre dois avatares com ilustrações retrô oficiais e habilidades distintas:
* **👨‍💼 Roberto**: Perfil analítico e facilitador. Focado em métricas ágeis, gráficos de Burndown, cadência de entregas e remoção técnica de bloqueios.
* **👩‍💼 Mariana**: Perfil empático e transformador. Focada em liderança servidora, inteligência emocional, gestão de conflitos interpessoais e alinhamento de negócios com a PO.

### 2. 🌍 Time Diverso com 11 Profissionais Especialistas
O squad conta com representatividade de gênero e etnias, refletindo a diversidade do ecossistema de tecnologia brasileiro:
* **Ana**: Product Owner orientada a negócio, métricas e escopo de valor.
* **Carlos**: Fullstack Developer focado em arquitetura limpa e robustez de backend.
* **Júlia**: Frontend Developer criativa e especialista em microinterações.
* **Marcos**: QA Engineer detalhista focado em cobertura de testes e homologação rigorosa.
* **Dandara**: Senior QA Specialist (mulher negra) focada em testes automatizados, segurança e acessibilidade digital.
* **Tainá**: QA Lead (mulher indígena) especialista em testes de carga, resiliência e estresse sob pressão.
* **Kofi**: Backend Developer (homem negro) especialista em arquitetura distribuída de microsserviços.
* **Kenji**: Mobile & UI Developer (homem nipo-brasileiro) mestre em tempos de resposta rápidos e usabilidade.
* **Aline**: DevSecOps Engineer (mulher parda) integrando segurança e entregas ágeis contínuas.
* **Beatriz**: UX/UI Designer defensora incansável da experiência do usuário final.
* **Rafael**: DevOps & SRE pragmático focado em estabilidade de servidores, CI/CD e monitoramento.

### 3. 📋 Quadro Kanban Autêntico com Regras Ágeis Reais
* **Fluxo Contínuo com Auto-Avanço**: Ao selecionar o responsável por uma história na coluna **To Do**, ela avança automaticamente para **In Progress**.
* **Transição Automática para Review**: Ao concluir 100% do progresso diário de desenvolvimento, o card transita automaticamente para a coluna de **Review**.
* **Regra de Ouro: Exclusividade de QA no Review**: Somente profissionais de QA (**Marcos, Dandara ou Tainá**) possuem capacidade técnica para assumir, inspecionar e aprovar histórias na coluna de Review. Desenvolvedores de código não podem revisar suas próprias entregas para garantir a Definition of Done.
* **Persistência no Concluído**: Histórias entregues recebem efeito de entrega com strikethrough, selo permanente "Entregue ✓" e somam Story Points e Valor de Negócio em tempo real no rodapé do quadro.
* **Definir Novas Histórias no Backlog**: Modal completo para criar User Stories personalizadas com pontuação na sequência Fibonacci (1, 2, 3, 5, 8) e Valor de 1 a 10.

### 4. 🏢 Catálogo de 11 Empresas e Desafios Reais com Cenários Oficiais
Todas as 11 empresas possuem campanhas individuais com histórias temáticas, diálogos com terminologias reais e cenários ilustrados oficiais em formato 16:9:

| Empresa | Segmento | Produto Principal | Cenário Ilustrado Oficial |
|---|---|---|---|
| **Novatech Soluções** | Fintech | *Pixflow* (Pagamentos Pix PMEs) | Escritório central de startup tech |
| **VeloceLog Express** | Logtech | *RouteFast* (Roteirizador com IA) | Centro de despacho logístico e mapas de rota |
| **HealthPulse Digital** | Healthtech | *MedConnect* (Telemedicina & LGPD) | Clínica de operações de telemedicina e telemetria |
| **AgroSmart Terra** | Agrotech | *SafraView* (Sensores e IoT Rural) | Central de comando da fazenda com lavouras e drones |
| **CyberShield Defesa** | Cibersegurança | *ThreatWatcher* (SOC & Ameaças) | War room de defesa cibernética com radares e ameaças globais |
| **SafeVault Finance** | Banco Tradicional | *OpenBank Core* (Transição Ágil) | Diretoria executiva bancária de Open Finance |
| **FoodFast Delivery** | Foodtech | *FoodFast App* & Painel KDS | Central de delivery e pedidos gastronômicos |
| **AutoDrive Connected** | Automotivo / IoT | *FleetIntel* (Telemetria Veicular) | Centro de diagnóstico e telemetria automotiva |
| **EcoEnergy Renováveis** | Cleantech | *SolarTrade* (Compensação Solar) | Sala de controle e compensação de energia solar |
| **CloudCore Infra** | DevOps / Cloud | *KubeMaster* (Multicloud GitOps) | Datacenter multicloud moderno com racks e LEDs |
| **EduNext Academy** | Edtech | *Aprenda+* (Gamificação Escolar) | Laboratório de inovação educacional |

### 5. 📈 Métricas Oscilantes e Reativas no HUD
* **🎯 VALOR**: Benefício de negócio acumulado na Sprint.
* **❤️ MORAL**: Ânimo da equipe, afetado por sobrecargas e decisões de liderança.
* **🧪 QUALIDADE**: Rigor técnico, ampliado pelas homologações de QA.
* **⚡ VELOCIDADE**: Vazão e throughput diário de entrega.
* **🤝 CONFIANÇA**: Credibilidade perante PO e diretoria executiva.
* **⚠️ RISCO**: Probabilidade de incidentes e débitos técnicos.

### 6. 👥 Telemetria & Contador de Visitas Resiliente
* Rodapé retrô integrado exibindo a versão ativa (`v1.2.1`) e **contador dinâmico de visualizações de página** com persistência no navegador a cada recarregamento (F5).

---

## 🛠️ ARQUITETURA E TECNOLOGIAS

* **Frontend**: React 18 & TypeScript (strict mode)
* **Build Tool**: Vite 5
* **Estilização**: Tailwind CSS com tema retrô customizado e fontes 8-bit (*Press Start 2P*, *Silkscreen*)
* **Áudio**: Web Audio API sintetizando efeitos sonoros chiptune dinamicamente sem dependências externas
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

# 5. Para compilar a versão de produção
npm run build
```

---

## 📄 LICENÇA

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.
