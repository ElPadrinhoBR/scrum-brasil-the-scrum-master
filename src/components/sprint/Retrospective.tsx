import React, { useState } from 'react';
import { RetroCard } from '../ui/RetroCard';
import { RetroButton } from '../ui/RetroButton';
import { SoundManager } from '../ui/SoundManager';
import { useLanguage } from '../../i18n/LanguageContext';

interface RetrospectiveProps {
  sprintNumber: number;
  onSelectImprovement: (improvementId: string, name: string) => void;
  unlockedSkills: string[];
}

export const Retrospective: React.FC<RetrospectiveProps> = ({
  sprintNumber,
  onSelectImprovement,
  unlockedSkills,
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { t } = useLanguage();

  // Retro items based on sprint index
  const getRetroComments = (sprint: number) => {
    switch (sprint) {
      case 1:
        return {
          good: ['Definimos um Sprint Goal claro.', 'A tela de login foi mockada rápido.', 'Primeira entrega funcional concluída.'],
          bad: ['Discussão inicial de arquitetura desgastou o time.', 'Júlia ficou travada aguardando o Carlos.', 'Falta de uma Definition of Done oficial no início.'],
        };
      case 2:
        return {
          good: ['Decisão correta de não subir código vulnerável na sexta.', 'A tela de confirmação de Pix ficou fantástica.', 'Marcos testou a segurança minuciosamente.'],
          bad: ['Instabilidade súbita da API do banco parceiro nos bloqueou.', 'Discussão cansativa sobre design simplificado.', 'Estresse subiu devido à pressa.'],
        };
      case 3:
        return {
          good: ['Conseguimos proteger o time do microgerente.', 'Negociamos os desvios de escopo de forma transparente.', 'Evitamos bugs fingidos na Review.'],
          bad: ['Interferência direta do Dr. Cláudio na Daily assustou a Júlia.', 'Pressão política gerou estresse geral.', 'Uso de APIs impostas causou gargalos.'],
        };
      case 4:
        return {
          good: ['Melhoramos a API interna reduzindo lentidão em 60%.', 'Testamos os blocos legados e estabilizamos staging.', 'Ana aceitou a importância de conter a dívida técnica.'],
          bad: ['A velocidade aparente de entrega de novas telas diminuiu.', 'Júlia perdeu tempo caçando bugs CSS paralelos.', 'Atualizações de dependências causaram atritos.'],
        };
      default:
        return {
          good: ['Alinhamento ágil manteve o time focado no valor.', 'Comunicação fluindo sem atritos de ego.', 'Incrementos robustos implantados na nuvem.'],
          bad: ['Prazos da diretoria continuam apertados.', 'Estresse geral alto devido à proximidade da entrega final.', 'Dificuldade de conciliar CNAB legados.'],
        };
    };
  };

  const comments = getRetroComments(sprintNumber);

  // Available Action Items
  const improvements = [
    {
      id: 'improve_daily',
      name: 'Melhorar a condução da Daily Scrum',
      description: 'Garante foco técnico e ajuda a remover impedimentos externos. Reduz o Risco diário em 5% na próxima Sprint.',
      buff: 'Buff: -5% Risco diário',
    },
    {
      id: 'pair_programming',
      name: 'Estimular Pair Programming (Pareamento)',
      description: 'Carlos e Júlia programam juntos partes críticas. Aumenta a Velocidade geral em 8 pontos na próxima Sprint.',
      buff: 'Buff: +8 Velocidade',
    },
    {
      id: 'engineering_workshop',
      name: 'Realizar Workshop Técnico com o Time',
      description: 'Marcos e Rafael explicam padrões de teste e deploy. Aumenta a Qualidade em 8 pontos e a Motivação geral em 5%.',
      buff: 'Buff: +8 Qualidade, +5% Motivação',
    },
    {
      id: 'one_on_ones',
      name: 'Fazer conversas individuais (One-on-Ones)',
      description: 'Scrum Master conversa individualmente para ouvir dores e dar mentoria. Reduz o Estresse de todos os membros em 15%.',
      buff: 'Buff: -15% Estresse geral',
    },
    {
      id: 'refine_dod',
      name: 'Refinar a Definition of Done (DoD)',
      description: 'Ser mais exigente nos critérios de pronto para aceitar um card. Aumenta os ganhos de Valor em 10% na próxima Sprint.',
      buff: 'Buff: +10% Ganhos de Valor',
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedAction(id);
    SoundManager.playClick();
  };

  const handleConfirm = () => {
    if (!selectedAction) return;
    const action = improvements.find((imp) => imp.id === selectedAction);
    if (action) {
      // If player has continuous improvement skill, double the effect (narrative mention)
      const doubled = unlockedSkills.includes('agi_cont_improvement');
      onSelectImprovement(action.id, doubled ? `${action.name} (Efeito Duplicado!)` : action.name);
      SoundManager.playSuccess();
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="text-center">
        <h2 className="font-pressstart text-sm text-retro-accent uppercase">
          {t.retro.title}
        </h2>
        <p className="text-[10px] text-retro-dimmed mt-1">
          {t.retro.subtitle}
        </p>
      </div>

      {/* Retro columns grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* What went well */}
        <RetroCard title={t.retro.wentWell} className="border-green-600 bg-[#0d2218]/45">
          <ul className="list-disc pl-4 space-y-2 text-[10.5px] font-sans text-green-200">
            {comments.good.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </RetroCard>

        {/* What didn't go well */}
        <RetroCard title={t.retro.didntWork} className="border-red-600 bg-[#2b1010]/45">
          <ul className="list-disc pl-4 space-y-2 text-[10.5px] font-sans text-red-200">
            {comments.bad.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </RetroCard>

        {/* Action Items selection */}
        <RetroCard title={t.retro.improve} className="border-retro-blue bg-[#0c1326]/45">
          <p className="text-[10px] font-sans text-retro-dimmed mb-3">
            {t.retro.improvePrompt}
          </p>
          <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
            {improvements.map((imp) => (
              <button
                key={imp.id}
                onClick={() => handleSelect(imp.id)}
                className={`text-left p-2 border text-[10px] transition-all rounded ${
                  selectedAction === imp.id
                    ? 'border-retro-accent bg-retro-panel text-white ring-2 ring-retro-accent/50'
                    : 'border-slate-800 bg-[#131326] text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-white">{imp.name}</div>
                <p className="text-[9px] text-retro-dimmed font-sans leading-snug mt-1">{imp.description}</p>
                <span className="inline-block text-[8px] font-pressstart text-retro-green mt-1 bg-green-950/40 px-1 border border-green-800">
                  {imp.buff}
                </span>
              </button>
            ))}
          </div>
        </RetroCard>
      </div>

      {/* Footer confirm button */}
      <div className="flex justify-center pt-4">
        <RetroButton
          variant="success"
          disabled={!selectedAction}
          onClick={handleConfirm}
          className="w-full md:w-64"
        >
          {t.retro.confirm}
        </RetroButton>
      </div>
    </div>
  );
};

