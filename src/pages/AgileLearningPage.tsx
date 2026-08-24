import React, { useState } from 'react';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';

interface AgileLearningPageProps {
  onBack: () => void;
}

type Section = 'overview' | 'scrum' | 'kanban' | 'other' | 'market' | 'manager';

const SECTIONS: { id: Section; icon: string; label: string }[] = [
  { id: 'overview', icon: '🗺️', label: 'Visão Geral' },
  { id: 'scrum', icon: '🔄', label: 'Scrum' },
  { id: 'kanban', icon: '📋', label: 'Kanban' },
  { id: 'other', icon: '🧩', label: 'Outras Técnicas' },
  { id: 'market', icon: '💼', label: 'Mercado de TI' },
  { id: 'manager', icon: '🏆', label: 'Gestor de TI' },
];

export const AgileLearningPage: React.FC<AgileLearningPageProps> = ({ onBack }) => {
  const [section, setSection] = useState<Section>('overview');

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text p-4 md:p-6 select-none max-w-5xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-pressstart text-lg md:text-2xl text-retro-accent uppercase">📚 Gestão Ágil</h1>
          <p className="text-[9px] text-retro-dimmed font-pressstart mt-1">Centro de Aprendizado · Do Zero ao Excelente Gestor de TI</p>
        </div>
        <RetroButton variant="secondary" onClick={onBack} className="text-[9px] uppercase shrink-0">
          ← Voltar
        </RetroButton>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`px-3 py-2 font-pressstart text-[8px] border-2 transition-all uppercase ${
              section === s.id
                ? 'border-retro-accent bg-retro-panel text-retro-accent'
                : 'border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-4">

        {/* ═══════════════════ OVERVIEW ═══════════════════ */}
        {section === 'overview' && (
          <div className="space-y-4">
            <RetroCard title="🗺️ O que é Gestão Ágil?" className="border-retro-accent">
              <p className="text-sm font-sans text-slate-300 leading-relaxed mb-4">
                <strong className="text-white">Gestão Ágil</strong> é uma abordagem de gerenciamento de projetos e equipes que valoriza a <strong className="text-retro-accent">adaptação contínua</strong> ao invés de planos rígidos. Nasceu no desenvolvimento de software com o <em>Manifesto Ágil (2001)</em>, mas hoje se expande para finanças, marketing, RH e toda empresa que precisa entregar valor mais rápido.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: '🔄 Scrum', desc: 'Framework de sprints curtas com papéis definidos. O mais usado no mundo.', color: 'border-blue-500' },
                  { title: '📋 Kanban', desc: 'Visualização do fluxo de trabalho em colunas para eliminar gargalos.', color: 'border-green-500' },
                  { title: '🚀 SAFe', desc: 'Scaled Agile Framework para grandes empresas com múltiplos times.', color: 'border-yellow-500' },
                  { title: '🔬 XP (Extreme Programming)', desc: 'Práticas técnicas rigorosas: TDD, pair programming, CI/CD.', color: 'border-purple-500' },
                ].map((item) => (
                  <div key={item.title} className={`border-2 ${item.color} bg-slate-950/40 p-3 rounded`}>
                    <div className="font-pressstart text-[9px] text-white mb-1">{item.title}</div>
                    <p className="text-[10px] font-sans text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="📜 O Manifesto Ágil (2001)" className="border-retro-blue">
              <p className="text-[10px] font-sans text-slate-300 mb-3">17 desenvolvedores se reuniram em Utah (EUA) e criaram os 4 valores fundamentais:</p>
              <div className="space-y-2">
                {[
                  { left: '👤 Indivíduos e interações', right: 'mais que processos e ferramentas' },
                  { left: '💻 Software funcionando', right: 'mais que documentação abrangente' },
                  { left: '🤝 Colaboração com o cliente', right: 'mais que negociação de contratos' },
                  { left: '🔄 Responder a mudanças', right: 'mais que seguir um plano' },
                ].map((v) => (
                  <div key={v.left} className="flex items-center gap-2 bg-slate-900/50 p-2 rounded border border-slate-800">
                    <span className="text-[10px] font-semibold text-retro-accent font-sans shrink-0">{v.left}</span>
                    <span className="text-[9px] text-slate-500 font-sans shrink-0">►</span>
                    <span className="text-[10px] text-slate-400 font-sans">{v.right}</span>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="💡 Por que aprender Gestão Ágil?" className="border-retro-green">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { stat: '83%', desc: 'das empresas Fortune 500 já adotaram alguma prática ágil' },
                  { stat: '3x', desc: 'mais velocidade de entrega em projetos ágeis vs tradicionais' },
                  { stat: 'R$18k+', desc: 'salário médio de um Scrum Master sênior no Brasil (2024)' },
                ].map((s) => (
                  <div key={s.stat} className="bg-slate-900/60 border border-retro-green/40 p-3 rounded text-center">
                    <div className="font-pressstart text-xl text-retro-green mb-1">{s.stat}</div>
                    <p className="text-[9px] font-sans text-slate-300">{s.desc}</p>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
        )}

        {/* ═══════════════════ SCRUM ═══════════════════ */}
        {section === 'scrum' && (
          <div className="space-y-4">
            <RetroCard title="🔄 O que é Scrum?" className="border-retro-blue">
              <p className="text-sm font-sans text-slate-300 leading-relaxed mb-3">
                Scrum é um <strong className="text-white">framework leve</strong> que ajuda pessoas, times e organizações a gerar valor por meio de soluções adaptativas para problemas complexos. Não é uma metodologia completa — é um framework intencional que você preenche com suas práticas.
              </p>
              <p className="text-[10px] font-sans text-retro-dimmed">📖 Criado por Ken Schwaber e Jeff Sutherland · Documentado no Scrum Guide (revisão mais recente: 2020)</p>
            </RetroCard>

            <RetroCard title="👥 Os 3 Papéis do Scrum" className="border-retro-accent">
              <div className="space-y-3">
                {[
                  {
                    role: '🧭 Scrum Master',
                    color: 'border-retro-accent',
                    desc: 'Serve o time removendo impedimentos, facilitando eventos e ensinando o Scrum. NÃO é gerente — é um líder-servidor.',
                    duties: ['Facilita Daily Scrums, Planning, Reviews e Retrospectives', 'Remove impedimentos organizacionais', 'Protege o time de interferências externas', 'Promove melhoria contínua do processo'],
                  },
                  {
                    role: '📦 Product Owner',
                    color: 'border-retro-purple',
                    desc: 'Maximiza o valor do produto gerenciando o Product Backlog. É a voz do cliente dentro do time.',
                    duties: ['Prioriza o Product Backlog (backlog refinement)', 'Define e comunica o Product Goal', 'Aceita ou rejeita incrementos na Sprint Review', 'Negocia escopo com stakeholders'],
                  },
                  {
                    role: '⚙️ Developers',
                    color: 'border-retro-green',
                    desc: 'Todos os membros que trabalham para criar o incremento. Auto-organizados e multi-funcionais.',
                    duties: ['Criam o Sprint Backlog', 'Desenvolvem o Incremento a cada Sprint', 'Adaptam seu plano diariamente na Daily', 'Responsáveis pela qualidade conforme DoD'],
                  },
                ].map((r) => (
                  <div key={r.role} className={`border-2 ${r.color} bg-slate-950/40 p-4 rounded`}>
                    <div className="font-pressstart text-[10px] text-white mb-2">{r.role}</div>
                    <p className="text-[10px] font-sans text-slate-300 mb-2">{r.desc}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {r.duties.map((d) => <li key={d} className="text-[9px] font-sans text-slate-400">{d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="📅 Os 5 Eventos do Scrum" className="border-retro-purple">
              <div className="space-y-2">
                {[
                  { event: '🗓️ Sprint', time: '1 a 4 semanas', desc: 'Container de todos os outros eventos. Duração fixa (timebox). Nunca cancelada sem razão extrema.' },
                  { event: '📋 Sprint Planning', time: 'até 8h por Sprint de 1 mês', desc: 'O time define O QUE será feito (Sprint Goal) e COMO será feito (Sprint Backlog).' },
                  { event: '☀️ Daily Scrum', time: '15 min/dia', desc: 'Sincronização diária do time. Cada dev responde: O que fiz? O que farei? Há impedimentos?' },
                  { event: '🔍 Sprint Review', time: 'até 4h por Sprint de 1 mês', desc: 'O time apresenta o Incremento. Stakeholders dão feedback. Backlog pode ser reordenado.' },
                  { event: '🪞 Sprint Retrospective', time: 'até 3h por Sprint de 1 mês', desc: 'O time inspeciona a si mesmo: Pessoas, relações, processos e ferramentas. Define 1 melhoria concreta.' },
                ].map((e) => (
                  <div key={e.event} className="bg-slate-900/50 border border-slate-800 p-3 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-pressstart text-[9px] text-retro-accent">{e.event}</span>
                      <span className="text-[8px] font-pressstart text-retro-dimmed">{e.time}</span>
                    </div>
                    <p className="text-[10px] font-sans text-slate-300">{e.desc}</p>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="📦 Os 3 Artefatos do Scrum" className="border-retro-green">
              {[
                { artifact: '📜 Product Backlog', owner: 'Product Owner', desc: 'Lista ordenada de tudo que pode ser necessário no produto. Nunca está "pronto" — evolui continuamente.' },
                { artifact: '📋 Sprint Backlog', owner: 'Developers', desc: 'O Sprint Goal + itens selecionados do Product Backlog + plano de como entregar o Incremento.' },
                { artifact: '✅ Incremento', owner: 'Scrum Team', desc: 'Soma de todos os itens do backlog concluídos na Sprint conforme a Definition of Done. Deve ser utilizável.' },
              ].map((a) => (
                <div key={a.artifact} className="bg-slate-900/50 border border-slate-800 p-3 rounded mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-pressstart text-[9px] text-white">{a.artifact}</span>
                    <span className="text-[8px] text-retro-dimmed font-mono">owner: {a.owner}</span>
                  </div>
                  <p className="text-[10px] font-sans text-slate-300">{a.desc}</p>
                </div>
              ))}
            </RetroCard>
          </div>
        )}

        {/* ═══════════════════ KANBAN ═══════════════════ */}
        {section === 'kanban' && (
          <div className="space-y-4">
            <RetroCard title="📋 O que é Kanban?" className="border-retro-green">
              <p className="text-sm font-sans text-slate-300 leading-relaxed mb-3">
                Kanban é um método de <strong className="text-white">gestão visual do fluxo de trabalho</strong> criado na Toyota nos anos 1950. A palavra japonesa <em>看板</em> significa "sinal visual" ou "cartão". O objetivo é tornar o trabalho visível para identificar gargalos e melhorar continuamente.
              </p>
              <p className="text-[10px] font-sans text-retro-dimmed">⚠️ Kanban NÃO é só um quadro de post-its! É um sistema completo de melhoria contínua.</p>
            </RetroCard>

            <RetroCard title="🏗️ Os 6 Princípios do Kanban" className="border-retro-accent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { n: '1', p: 'Visualizar o trabalho', d: 'Torne todo trabalho visível no quadro. Nada pode ser feito "na cabeça".' },
                  { n: '2', p: 'Limitar o WIP', d: 'Work In Progress limitado evita sobrecarga e multitarefa destrutiva.' },
                  { n: '3', p: 'Gerenciar o fluxo', d: 'Foco em fazer trabalho fluir suavemente da esquerda para a direita.' },
                  { n: '4', p: 'Políticas explícitas', d: 'Critérios claros de "pronto" (DoD) para cada coluna do quadro.' },
                  { n: '5', p: 'Feedback loops', d: 'Reuniões regulares de revisão: Daily Kanban, retrospectivas, replenishment.' },
                  { n: '6', p: 'Melhoria colaborativa', d: 'A equipe inteira participa das mudanças de processo de forma evolutiva.' },
                ].map((p) => (
                  <div key={p.n} className="bg-slate-900/50 border border-slate-800 p-3 rounded">
                    <div className="font-pressstart text-[9px] text-retro-green mb-1">#{p.n} {p.p}</div>
                    <p className="text-[9px] font-sans text-slate-300">{p.d}</p>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="📊 Kanban vs Scrum: Qual usar?" className="border-retro-blue">
              <div className="overflow-x-auto">
                <table className="w-full text-[9px] font-sans border-collapse">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="border border-slate-700 p-2 text-left text-retro-accent font-pressstart text-[8px]">Critério</th>
                      <th className="border border-slate-700 p-2 text-left text-retro-blue font-pressstart text-[8px]">Scrum</th>
                      <th className="border border-slate-700 p-2 text-left text-retro-green font-pressstart text-[8px]">Kanban</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Ciclos', 'Sprints fixas (1-4 semanas)', 'Fluxo contínuo sem timebox'],
                      ['Papéis', 'SM, PO, Developers definidos', 'Sem papéis obrigatórios'],
                      ['Mudanças', 'Protegida dentro da Sprint', 'Permitida a qualquer momento'],
                      ['Métricas', 'Velocity, burndown', 'Lead Time, Throughput, CFD'],
                      ['Melhor para', 'Novos produtos, features grandes', 'Suporte, manutenção, operações'],
                      ['Nível de estrutura', 'Alto — muitos eventos prescritos', 'Baixo — altamente flexível'],
                    ].map(([c, s, k]) => (
                      <tr key={c} className="border-b border-slate-800 hover:bg-slate-900/30">
                        <td className="border border-slate-700 p-2 text-slate-400 font-semibold">{c}</td>
                        <td className="border border-slate-700 p-2 text-slate-300">{s}</td>
                        <td className="border border-slate-700 p-2 text-slate-300">{k}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RetroCard>
          </div>
        )}

        {/* ═══════════════════ OUTRAS TÉCNICAS ═══════════════════ */}
        {section === 'other' && (
          <div className="space-y-4">
            {[
              {
                title: '🚀 SAFe — Scaled Agile Framework',
                color: 'border-yellow-500',
                intro: 'O SAFe escala o Scrum para grandes organizações com dezenas ou centenas de times. Organiza o trabalho em 3 ou 4 níveis: Team, Program, Large Solution e Portfolio.',
                points: [
                  'Usado por empresas como IBM, Intel e Siemens',
                  'Introduz o conceito de Agile Release Train (ART) — múltiplos times sincronizados',
                  'PI Planning: evento trimestral onde todos os times planejam juntos (1-2 dias)',
                  'Certificação: SAFe Scrum Master (SSM), SAFe Agilist (SA)',
                ],
              },
              {
                title: '🧪 XP — Extreme Programming',
                color: 'border-purple-500',
                intro: 'XP foca nas práticas de engenharia de software. Complementa o Scrum com técnicas técnicas rigorosas para garantir qualidade e sustentabilidade do código.',
                points: [
                  'TDD (Test Driven Development): escreva os testes antes do código',
                  'Pair Programming: dois devs num computador — qualidade dobrada',
                  'Integração Contínua (CI): merge de código múltiplas vezes por dia',
                  'Refactoring: melhoria contínua do código sem mudar o comportamento',
                  'Small releases: entregar em ciclos muito curtos (dias, não meses)',
                ],
              },
              {
                title: '🎯 OKRs — Objectives & Key Results',
                color: 'border-retro-accent',
                intro: 'OKRs são um framework de definição e acompanhamento de metas, popularizado pelo Google. Conecta os objetivos estratégicos da empresa às atividades diárias dos times.',
                points: [
                  'Objective: meta qualitativa e inspiradora ("Ser o app de pagamentos mais rápido do Brasil")',
                  'Key Results: métricas quantificáveis (3-5 por objetivo) que medem progresso',
                  'Ciclos trimestrais de revisão alinhados com o planejamento estratégico',
                  'Usado junto com Scrum/Kanban para dar direção ao Product Backlog',
                ],
              },
              {
                title: '🔁 Lean & Kaizen',
                color: 'border-retro-green',
                intro: 'Lean (da Toyota Production System) foca em eliminar desperdícios. Kaizen significa "melhoria contínua". São a base filosófica de todo o movimento ágil.',
                points: [
                  '7 tipos de desperdício no software: defeitos, espera, retrabalho, features não usadas...',
                  'Value Stream Mapping: mapeia o fluxo de valor do código até o usuário final',
                  'Kaizen: pequenas melhorias frequentes realizadas por TODOS — não só a gestão',
                  'Gemba Walk: ir ao local onde o trabalho acontece para entender a realidade',
                ],
              },
            ].map((tech) => (
              <RetroCard key={tech.title} title={tech.title} className={tech.color}>
                <p className="text-[10px] font-sans text-slate-300 mb-3 leading-relaxed">{tech.intro}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {tech.points.map((p) => <li key={p} className="text-[9px] font-sans text-slate-400">{p}</li>)}
                </ul>
              </RetroCard>
            ))}
          </div>
        )}

        {/* ═══════════════════ MERCADO ═══════════════════ */}
        {section === 'market' && (
          <div className="space-y-4">
            <RetroCard title="💼 Mercado de TI Ágil no Brasil e no Mundo" className="border-retro-accent">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {[
                  { stat: '#1', label: 'Scrum é o framework ágil mais adotado no mundo', color: 'text-retro-accent' },
                  { stat: '94%', label: 'das empresas relatam benefícios após adotar agilidade', color: 'text-retro-green' },
                  { stat: '580k+', label: 'profissionais certificados em Scrum no mundo (2024)', color: 'text-retro-blue' },
                ].map((s) => (
                  <div key={s.stat} className="bg-slate-900/60 border border-slate-700 p-3 rounded text-center">
                    <div className={`font-pressstart text-xl ${s.color} mb-1`}>{s.stat}</div>
                    <p className="text-[9px] font-sans text-slate-300">{s.label}</p>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="💰 Salários e Oportunidades (Brasil 2024)" className="border-retro-green">
              <div className="space-y-2">
                {[
                  { role: '🧭 Scrum Master Júnior', salary: 'R$ 5.000 – R$ 8.000/mês', xp: '0-2 anos', cert: 'PSM I / CSM' },
                  { role: '🧭 Scrum Master Pleno', salary: 'R$ 8.000 – R$ 14.000/mês', xp: '2-5 anos', cert: 'PSM II / A-CSM' },
                  { role: '🧭 Scrum Master Sênior', salary: 'R$ 14.000 – R$ 22.000/mês', xp: '5+ anos', cert: 'PSM III / CSP-SM' },
                  { role: '📦 Product Owner Pleno', salary: 'R$ 9.000 – R$ 16.000/mês', xp: '3-6 anos', cert: 'PSPO / CSPO' },
                  { role: '🚀 Agile Coach', salary: 'R$ 18.000 – R$ 35.000/mês', xp: '7+ anos', cert: 'ICP-ACC / CAL' },
                  { role: '🏗️ RTE (SAFe)', salary: 'R$ 20.000 – R$ 40.000/mês', xp: '8+ anos', cert: 'RTE / SAFe Agilist' },
                ].map((r) => (
                  <div key={r.role} className="bg-slate-900/50 border border-slate-800 p-3 rounded flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <div className="font-pressstart text-[9px] text-white">{r.role}</div>
                      <div className="text-[8px] text-retro-dimmed font-mono mt-0.5">exp: {r.xp} · cert: {r.cert}</div>
                    </div>
                    <div className="font-pressstart text-[10px] text-retro-green shrink-0">{r.salary}</div>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="🎓 Principais Certificações" className="border-retro-blue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { cert: 'PSM I / II / III', org: 'Scrum.org', cost: 'US$ 150 / 250 / 500', desc: 'Mais respeitada tecnicamente. Prova difícil, sem treinamento obrigatório.' },
                  { cert: 'CSM / A-CSM', org: 'Scrum Alliance', cost: 'US$ 200 + curso', desc: 'Muito popular em EUA e Europa. Exige treinamento presencial/online de 2 dias.' },
                  { cert: 'PSPO I / II', org: 'Scrum.org', cost: 'US$ 200', desc: 'Para Product Owners. Foco em maximização de valor e estratégia de produto.' },
                  { cert: 'SAFe Agilist', org: 'Scaled Agile', cost: 'US$ 995', desc: 'Para líderes de transformação ágil em grandes organizações com SAFe.' },
                  { cert: 'PMI-ACP', org: 'PMI', cost: 'US$ 495', desc: 'Reconhecida globalmente. Abrange múltiplos frameworks ágeis (Scrum, Kanban, XP...).' },
                  { cert: 'ICP-ACC', org: 'ICAgile', cost: 'Variável', desc: 'Para Agile Coaches. Reconhecida internacionalmente em coaching de times.' },
                ].map((c) => (
                  <div key={c.cert} className="bg-slate-900/50 border border-slate-700 p-3 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-pressstart text-[9px] text-retro-accent">{c.cert}</span>
                      <span className="text-[8px] text-retro-dimmed font-mono">{c.cost}</span>
                    </div>
                    <div className="text-[8px] text-retro-dimmed mb-1">Emissora: {c.org}</div>
                    <p className="text-[9px] font-sans text-slate-300">{c.desc}</p>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
        )}

        {/* ═══════════════════ COMO SER UM EXCELENTE GESTOR ═══════════════════ */}
        {section === 'manager' && (
          <div className="space-y-4">
            <RetroCard title="🏆 Como se Tornar um Excelente Gestor de TI" className="border-retro-accent">
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                Ser um excelente Gestor de TI vai muito além de conhecer frameworks e ferramentas. Exige uma combinação de <strong className="text-retro-accent">habilidades técnicas</strong>, <strong className="text-white">inteligência emocional</strong> e <strong className="text-retro-green">visão estratégica de negócio</strong>.
              </p>
            </RetroCard>

            <RetroCard title="📍 Roadmap do Gestor Ágil (Passo a Passo)" className="border-retro-blue">
              <div className="space-y-3">
                {[
                  {
                    step: '1', phase: 'FUNDAÇÃO', color: 'border-slate-500 text-slate-300',
                    items: [
                      'Domine um framework ágil (comece pelo Scrum Guide — é gratuito e tem 13 páginas)',
                      'Obtenha a certificação PSM I (prova online, US$ 150, passa com 85%+)',
                      'Pratique: encontre um time open source ou projeto voluntário para aplicar',
                      'Leia: "Scrum: A Arte de Fazer o Dobro do Trabalho na Metade do Tempo" (Jeff Sutherland)',
                    ],
                  },
                  {
                    step: '2', phase: 'HABILIDADES DE FACILITAÇÃO', color: 'border-blue-500 text-blue-300',
                    items: [
                      'Aprenda a facilitar reuniões: técnicas de Liberating Structures, World Café, Fishbowl',
                      'Pratique escuta ativa: 80% ouvir, 20% falar em reuniões de facilitação',
                      'Domine ferramentas: Miro, Confluence, Jira, Azure DevOps, Linear',
                      'Coaching básico: perguntas poderosas ao invés de dar respostas diretas',
                    ],
                  },
                  {
                    step: '3', phase: 'GESTÃO DE PESSOAS', color: 'border-purple-500 text-purple-300',
                    items: [
                      'Aprenda sobre segurança psicológica (Amy Edmondson — Project Aristotle do Google)',
                      'One-on-Ones semanais com cada membro do time — ouça, não avalie',
                      'Modelo Situational Leadership: adapte seu estilo para cada pessoa e contexto',
                      'Feedbacks estruturados: SBI (Situation-Behavior-Impact) ou Feedback Canvas',
                    ],
                  },
                  {
                    step: '4', phase: 'VISÃO DE PRODUTO E NEGÓCIO', color: 'border-green-500 text-green-300',
                    items: [
                      'Entenda finanças básicas de TI: TCO, ROI, custo de oportunidade, dívida técnica',
                      'Aprenda métricas de produto: NPS, DAU/MAU, Churn, LTV, CAC',
                      'Estude o modelo de negócio da empresa onde trabalha (como ela ganha dinheiro?)',
                      'OKRs: conecte o backlog de produto aos objetivos estratégicos da empresa',
                    ],
                  },
                  {
                    step: '5', phase: 'LIDERANÇA ESTRATÉGICA', color: 'border-yellow-500 text-yellow-300',
                    items: [
                      'Aprenda a criar casos de negócio para justificar investimentos em tecnologia',
                      'Comunicação executiva: apresentar métricas de time para a diretoria em linguagem de negócio',
                      'Escalabilidade ágil: estude SAFe, LeSS ou Spotify Model para múltiplos times',
                      'Mentalidade de Product Thinking: não construa features, construa soluções para problemas reais',
                    ],
                  },
                  {
                    step: '6', phase: 'EXCELÊNCIA E IMPACTO', color: 'border-retro-accent text-retro-accent',
                    items: [
                      'Contribua com a comunidade: meetups, artigos no LinkedIn, mentorias gratuitas',
                      'Construa um portfólio de cases: resultados mensuráveis (ex: "reduzi time to market em 40%")',
                      'Certificações avançadas: PSM III, Agile Coach (ICP-ACC), Management 3.0',
                      'Seja um agente de transformação cultural — não apenas de processos',
                    ],
                  },
                ].map((s) => (
                  <div key={s.step} className={`border-2 ${s.color.split(' ')[0]} bg-slate-950/40 p-4 rounded`}>
                    <div className={`font-pressstart text-[10px] ${s.color.split(' ')[1]} mb-2`}>
                      FASE {s.step}: {s.phase}
                    </div>
                    <ul className="list-disc pl-4 space-y-1">
                      {s.items.map((i) => <li key={i} className="text-[9px] font-sans text-slate-300">{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="📚 Biblioteca do Gestor Ágil" className="border-retro-green">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { book: 'Scrum: A Arte de Fazer o Dobro', author: 'Jeff Sutherland', why: 'O criador do Scrum explica o método com casos reais.' },
                  { book: 'The Phoenix Project', author: 'Gene Kim', why: 'Romance que ensina DevOps e Lean aplicados a TI.' },
                  { book: 'Accelerate', author: 'Nicole Forsgren', why: 'Pesquisa científica sobre o que torna times de TI de alto desempenho.' },
                  { book: 'Management 3.0', author: 'Jurgen Appelo', why: 'Como liderar e motivar times ágeis modernos.' },
                  { book: 'A Startup Enxuta', author: 'Eric Ries', why: 'Build-Measure-Learn como filosofia de produto.' },
                  { book: 'Inspired', author: 'Marty Cagan', why: 'Como os melhores PMs constroem produtos que as pessoas amam.' },
                ].map((b) => (
                  <div key={b.book} className="bg-slate-900/50 border border-slate-800 p-3 rounded">
                    <div className="font-pressstart text-[9px] text-white mb-0.5">📖 {b.book}</div>
                    <div className="text-[8px] text-retro-dimmed font-mono mb-1">por {b.author}</div>
                    <p className="text-[9px] font-sans text-slate-300">{b.why}</p>
                  </div>
                ))}
              </div>
            </RetroCard>

            <RetroCard title="💡 Os 10 Comportamentos do Gestor de TI Excelente" className="border-retro-purple">
              <div className="space-y-2">
                {[
                  '🧩 Serve o time — remove obstáculos em vez de criar mais regras',
                  '🎯 Foca em resultados e valor entregue, não em horas trabalhadas',
                  '🔄 Abraça a incerteza e muda de plano sem drama quando necessário',
                  '💬 Comunica com clareza e frequência — sem ambiguidade ou microgestão',
                  '📊 Toma decisões baseadas em dados, não em intuição ou política',
                  '❤️ Investe no desenvolvimento humano da equipe com 1:1s e feedbacks reais',
                  '🛡️ Protege o time de pressões externas desnecessárias',
                  '🌱 Cria um ambiente psicologicamente seguro onde errar = aprender',
                  '🌍 Pensa no usuário final — cada decisão técnica tem impacto humano',
                  '🚀 Continua aprendendo — o mercado muda, o excelente gestor muda junto',
                ].map((b) => (
                  <div key={b} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded border border-slate-800">
                    <p className="text-[10px] font-sans text-slate-300">{b}</p>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
        )}
      </div>
    </div>
  );
};
