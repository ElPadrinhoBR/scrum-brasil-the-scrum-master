# IMPLEMENTATION.md — Scrum Brasil: The Scrum Master

> Rastreamento contínuo de funcionalidades implementadas e próximas etapas planejadas.
> Atualizado automaticamente a cada ciclo de desenvolvimento.

---

## 1. IMPLEMENTADO

### Imagens Reais dos Personagens e Fundos de Todas as Empresas
- [x] **Retratos Reais dos Personagens de Escolha**:
  - `roberto.png`: Ilustração retrô de alta qualidade de Roberto (Scrum Master homem com óculos modernos e blazer azul marinho)
  - `mariana.png`: Ilustração retrô de alta qualidade de Mariana (Scrum Master mulher com ondas morenas e suéter burgundy)
  - Integrados tanto no menu de seleção (`MainMenu.tsx`) quanto nos diálogos do jogo
- [x] **Fundos Reais em PNG para Todas as 11 Empresas**:
  - `escritorio.png`: Novatech Soluções (Sede da startup Pixflow)
  - `velocelog.png`: VeloceLog Express (Centro de despacho logístico e mapas de rota)
  - `healthpulse.png`: HealthPulse Digital (Centro médico de teleconsulta e telemetria)
  - `agrosmart.png`: AgroSmart Terra (Central da fazenda inteligente com drones e sensores)
  - `cybershield.png`: CyberShield Defesa (SOC war room com mapas globais de ameaça)
  - `safevault.png`: SafeVault Finance (Diretoria executiva bancária)
  - `cloudcore.png`: CloudCore Infrastructure (Datacenter multicloud com racks e LEDs)
  - `edunext.png`: EduNext Academy (Laboratório de tecnologia educacional)
  - `foodfast.png`: FoodFast Delivery (Central de pedidos e despacho)
  - `autodrive.png`: AutoDrive Connected (Oficina e telemetria automotiva)
  - `ecoenergy.png`: EcoEnergy Renováveis (Sala de controle de usinas solares)
- [x] **Substituição dos Bonequinhos Básicos**:
  - O componente `PixelCharacter` agora prioriza sempre os arquivos PNG de alta qualidade de cada funcionário e Scrum Master, com badges animados de expressão sobrepostos

### Rodapé Retro & Contador de Visitas Dinâmico
- [x] **Contador de Visitas Funcional**:
  - Incremento a cada visualização/recarregamento da página (F5)
  - Persistência permanente em `localStorage`
- [x] **Versão do Jogo**: Exibição da versão ativa (`v1.2.0`) com badge retrô e luz verde pulsante

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
| 2026-09-03 | Imagens reais PNG geradas para Roberto, Mariana e backgrounds de todas as 11 empresas | CONCLUÍDO |
| 2026-09-03 | Contador de visitas agora incrementa a cada recarregamento da página (F5) | CONCLUÍDO |
| 2026-09-03 | Avatares pixel art bonitos com expressões dinâmicas e uniformes por empresa | CONCLUÍDO |
| 2026-09-03 | Contador de visitas e versão v1.2.0 adicionados no rodapé (Footer.tsx) | CONCLUÍDO |
| 2026-09-03 | Quadro Kanban reestilizado (WIP limits, cards com accent border, barra de sprint) | CONCLUÍDO |
| 2026-09-03 | Validação automatizada de 100% das 11 empresas com scripts de teste | CONCLUÍDO |
| 2026-09-03 | Resolução do bug de narrativa fixa da Novatech em todas as empresas | CONCLUÍDO |
