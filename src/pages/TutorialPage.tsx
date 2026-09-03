import React, { useState } from 'react';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';

interface TutorialPageProps {
  onBack: () => void;
  onStartGame?: () => void;
}

interface TutorialStep {
  id: string;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  bullets: Array<{ title: string; desc: string; icon: string }>;
  proTip: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'role',
    title: '1. Seu Papel: O Scrum Master',
    badge: 'LIDERANÇA SERVIDORA',
    icon: '🧭',
    summary: 'Você não é o chefe e não dita o que fazer. Como Scrum Master, sua missão é servir a equipe, remover impedimentos, proteger o foco da Sprint e garantir que o processo ágil gere valor real.',
    bullets: [
      {
        icon: '🛡️',
        title: 'Protetor do Time',
        desc: 'Proteja os desenvolvedores contra mudanças bruscas de escopo no meio da Sprint e pressões destrutivas de stakeholders.',
      },
      {
        icon: '🚧',
        title: 'Removedor de Bloqueios',
        desc: 'Identifique impedimentos diários (falta de acessos, APIs fora do ar, conflitos) e resolva-os antes que atrasem a entrega.',
      },
      {
        icon: '🤝',
        title: 'Facilitador Empático',
        desc: 'Promova diálogos transparentes entre a Product Owner (Ana) e os engenheiros, equilibrando valor de negócio e qualidade técnica.',
      },
    ],
    proTip: 'Dica de Ouro: Ouvir ativamente antes de tomar decisões nas conversas diárias aumenta a confiança e a moral do time!',
  },
  {
    id: 'metrics',
    title: '2. As 6 Métricas Oscilantes',
    badge: 'SAÚDE DO PROJETO',
    icon: '📊',
    summary: 'No topo da tela (HUD), você monitora 6 indicadores que oscilam dinamicamente a cada decisão, entrega ou problema que acontece no dia a dia.',
    bullets: [
      {
        icon: '🎯',
        title: 'VALOR (0-100)',
        desc: 'Mede o retorno de negócio entregue ao cliente. Sobe ao finalizar histórias para "Done" de alto valor.',
      },
      {
        icon: '❤️',
        title: 'MORAL (0-100)',
        desc: 'O ânimo e satisfação da equipe. Desce com sobrecarga, estresse (>70) ou cobranças autoritárias.',
      },
      {
        icon: '🧪',
        title: 'QUALIDADE (0-100)',
        desc: 'Confiabilidade do código e ausência de bugs. Sobe ao passar por Code Review e testes; cai em sprints apressadas.',
      },
      {
        icon: '⚡',
        title: 'VELOCIDADE (0-100)',
        desc: 'O ritmo sustentável de entrega do time. Melhora com foco, bom planejamento e tarefas com WIP controlado.',
      },
      {
        icon: '🤝',
        title: 'CONFIANÇA (0-100)',
        desc: 'A credibilidade da equipe perante a diretoria e stakeholders. Aumenta ao cumprir o Sprint Goal acordado.',
      },
      {
        icon: '⚠️',
        title: 'RISCO (0-100)',
        desc: 'Probabilidade de fracasso ou atraso. Sobe com débitos técnicos, tarefas não atribuídas e devs esgotados.',
      },
    ],
    proTip: 'Se o Risco passar de 70% ou a Moral cair abaixo de 30%, o time entra em colapso e as tarefas levam o dobro do tempo!',
  },
  {
    id: 'cycle',
    title: '3. O Ciclo da Sprint no Jogo',
    badge: 'RITMO ÁGIL',
    icon: '🔄',
    summary: 'Cada Sprint simula 2 semanas de trabalho condensadas em 4 fases interativas onde você toma decisões estratégicas:',
    bullets: [
      {
        icon: '📋',
        title: 'Planejamento (Planning)',
        desc: 'Defina o Sprint Goal com a PO e atribua os desenvolvedores aos cards na coluna "To Do" do Kanban.',
      },
      {
        icon: '☀️',
        title: 'Desenvolvimento (3 Dias)',
        desc: 'Cada dia começa com a Daily Scrum na aba "História", trazendo um evento ou dilema real. Em seguida, vá à aba "Kanban" e simule o dia!',
      },
      {
        icon: '🔍',
        title: 'Revisão da Sprint (Review)',
        desc: 'Apresente as entregas concluídas aos stakeholders e receba feedback de mercado sobre o produto.',
      },
      {
        icon: '🪞',
        title: 'Retrospectiva (Retro)',
        desc: 'Inspecione o processo e escolha 1 ação de melhoria contínua para turbinar o time na Sprint seguinte.',
      },
    ],
    proTip: 'Nunca finalize o Planning com cartões sem desenvolvedor atribuído, caso contrário ninguém trabalhará neles!',
  },
  {
    id: 'kanban',
    title: '4. Dominando o Quadro Kanban',
    badge: 'FLUXO VISUAL',
    icon: '📋',
    summary: 'O Kanban torna o trabalho visível e permite acompanhar a evolução das tarefas ao longo de 5 colunas essenciais:',
    bullets: [
      {
        icon: '📦',
        title: '1. Backlog',
        desc: 'Repositório geral de histórias e ideias para o produto. Você pode criar novas histórias a qualquer momento!',
      },
      {
        icon: '📝',
        title: '2. To Do',
        desc: 'Itens puxados do Backlog selecionados para a Sprint atual que já possuem desenvolvedor atribuído.',
      },
      {
        icon: '⚙️',
        title: '3. In Progress',
        desc: 'Tarefas sendo ativamente codadas pelos engenheiros. O progresso aumenta na simulação diária.',
      },
      {
        icon: '👀',
        title: '4. Review / QA',
        desc: 'Código finalizado passando por homologação e testes de qualidade antes de ir para produção.',
      },
      {
        icon: '✅',
        title: '5. Done (Pronto)',
        desc: 'Histórias 100% concluídas que atendem à Definition of Done e agregam Valor ao Pixflow!',
      },
    ],
    proTip: 'Você pode mover cartões manualmente entre as colunas usando os botões ◀ e ▶ nos cards caso precise reorganizar o fluxo!',
  },
  {
    id: 'team',
    title: '5. Gerenciando os Desenvolvedores',
    badge: 'PESSOAS > PROCESSOS',
    icon: '👥',
    summary: 'Cada desenvolvedor da equipe possui características, habilidades e níveis de motivação e estresse próprios:',
    bullets: [
      {
        icon: '🍊',
        title: 'Ana Lima (Product Owner)',
        desc: 'Exigente e focada em negócios. Quer entregas rápidas e escopo completo, mas respeita argumentos bem fundamentados.',
      },
      {
        icon: '🟢',
        title: 'Carlos Souza (Backend)',
        desc: 'Perfeccionista e metódico. Ama código limpo e arquitetura sólida. Odeia soluções improvisadas e gambiarras.',
      },
      {
        icon: '🟣',
        title: 'Júlia Santos (Frontend)',
        desc: 'Criativa e focada na experiência do usuário. Fica desmotivada com microgerenciamento e tarefas repetitivas.',
      },
      {
        icon: '⚙️',
        title: 'Marcos (QA) & Rafael (DevOps)',
        desc: 'Os guardiões da estabilidade. Marcos caça bugs antes do cliente ver; Rafael garante deploys e servidores no ar.',
      },
    ],
    proTip: 'Devs com estresse alto (>70%) produzem 30% mais devagar e correm sério risco de burnout na Retrospectiva!',
  },
  {
    id: 'strategy',
    title: '6. Dicas para Vencer a Campanha',
    badge: 'ESTRATÉGIA VENCEDORA',
    icon: '🏆',
    summary: 'Para chegar ao final da Sprint 8 com o Pixflow lançado com sucesso e se tornar um Agile Coach Lendário:',
    bullets: [
      {
        icon: '⚖️',
        title: 'Equilibre Valor e Dívida Técnica',
        desc: 'Não entregue apenas features visíveis. Reserve tempo para refatoração e testes antes que os bugs travem o progresso.',
      },
      {
        icon: '🎯',
        title: 'Proteja o Sprint Goal',
        desc: 'É melhor entregar 3 histórias bem feitas com o objetivo cumprido do que 6 pela metade cheias de defeitos.',
      },
      {
        icon: '💡',
        title: 'Use o Glossário Clicável',
        desc: 'Nas conversas e situações, clique nos termos técnicos sublinhados para aprender e reforçar os conceitos para o mercado.',
      },
    ],
    proTip: 'A cada nível de XP conquistado, você sobe de cargo: de Iniciante até Agile Coach!',
  },
];

export const TutorialPage: React.FC<TutorialPageProps> = ({ onBack, onStartGame }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = TUTORIAL_STEPS[currentStepIndex];

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(19,19,38,0.3)_1px,transparent_1px),linear-gradient(to_right,rgba(19,19,38,0.3)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-2 border-b-4 border-retro-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <h1 className="font-pressstart text-base md:text-xl text-retro-accent uppercase">
                Modo Tutorial: Como Jogar
              </h1>
            </div>
            <p className="text-[10px] text-retro-dimmed font-pressstart mt-1">
              Guia Completo para se tornar um Scrum Master de Elite
            </p>
          </div>

          <div className="flex gap-2">
            <RetroButton variant="secondary" onClick={onBack} className="text-[9px] uppercase">
              ← Menu
            </RetroButton>
            {onStartGame && (
              <RetroButton variant="success" onClick={onStartGame} className="text-[9px] uppercase">
                ▶ Jogar Agora
              </RetroButton>
            )}
          </div>
        </div>

        {/* Step Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
          {TUTORIAL_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-2 border-2 text-left transition-all rounded ${
                currentStepIndex === idx
                  ? 'border-retro-accent bg-slate-900 shadow-md'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="text-sm">{s.icon}</div>
              <div className="font-pressstart text-[8px] text-white truncate mt-1">
                Passo {idx + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <RetroCard className="p-4 md:p-6 space-y-4 border-retro-accent/60 bg-[#121224]/90 shadow-retro-lg">
          {/* Card Title & Badge */}
          <div className="flex flex-wrap justify-between items-center gap-2 border-b-2 border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-slate-900 border border-slate-700 rounded">
                {step.icon}
              </span>
              <div>
                <h2 className="font-pressstart text-sm md:text-base text-white">
                  {step.title}
                </h2>
                <span className="text-[8px] font-pressstart text-retro-purple uppercase tracking-wider">
                  {step.badge}
                </span>
              </div>
            </div>
            <div className="text-[9px] font-pressstart text-retro-dimmed">
              {currentStepIndex + 1} de {TUTORIAL_STEPS.length}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3 bg-slate-950/70 border border-retro-border rounded">
            <p className="text-xs md:text-sm font-sans text-slate-200 leading-relaxed">
              {step.summary}
            </p>
          </div>

          {/* Bullets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {step.bullets.map((b, idx) => (
              <div
                key={idx}
                className="border border-slate-800 bg-[#0c0c18] p-3 rounded flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{b.icon}</span>
                    <span className="font-pressstart text-[9px] text-retro-accent">
                      {b.title}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pro Tip Box */}
          <div className="border-2 border-yellow-500/40 bg-yellow-950/20 p-3 rounded flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <span className="font-pressstart text-[9px] text-yellow-400 uppercase">
                Conselho de Agile Coach:
              </span>
              <p className="text-xs font-sans text-yellow-100/90 mt-0.5 leading-relaxed">
                {step.proTip}
              </p>
            </div>
          </div>

          {/* Bottom Step Controls */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <RetroButton
              variant="secondary"
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="text-[9px] uppercase"
            >
              ◀ Anterior
            </RetroButton>

            <div className="flex gap-1.5">
              {TUTORIAL_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                    currentStepIndex === idx ? 'bg-retro-accent scale-125' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {currentStepIndex < TUTORIAL_STEPS.length - 1 ? (
              <RetroButton
                variant="primary"
                onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                className="text-[9px] uppercase"
              >
                Próximo ▶
              </RetroButton>
            ) : (
              <RetroButton
                variant="success"
                onClick={onStartGame || onBack}
                className="text-[9px] uppercase"
              >
                {onStartGame ? '🚀 Iniciar Jogo' : '✅ Concluir'}
              </RetroButton>
            )}
          </div>
        </RetroCard>
      </div>
    </div>
  );
};
