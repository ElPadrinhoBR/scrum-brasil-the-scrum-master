import React from 'react';
import { useGame } from '../game/GameContext';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';
import { CHARACTERS_DATA } from '../data/characters';
import { SaveSystem } from '../game/SaveSystem';

interface ResultsScreenProps {
  onBackToMenu: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ onBackToMenu }) => {
  const { state } = useGame();
  const { stats, team, unlockedAchievements, xp, level } = state;

  // Calculate ending
  const getEndingDetails = () => {
    const avgStress = Object.values(team).reduce((sum, member) => sum + member.stress, 0) / 6;
    const avgMotivation = Object.values(team).reduce((sum, member) => sum + member.motivation, 0) / 6;

    if (stats.valor >= 85 && stats.qualidade >= 85 && stats.confianca >= 85 && avgStress < 35 && avgMotivation > 75) {
      return {
        grade: 'S',
        title: '🏆 EXCELENTE SCRUM MASTER (AGILE LENDÁRIO)',
        description: 'Você alcançou o ápice do Scrum! O Pixflow foi lançado com sucesso absoluto. O código é robusto e seguro. A equipe está motivada, saudável e com autonomia invejável. A diretoria da Nova Tech te promoveu a Agile Director!',
        color: 'text-retro-green border-retro-green',
        bgColor: 'bg-green-950/20',
      };
    } else if (stats.valor >= 70 && stats.qualidade >= 70 && stats.confianca >= 65 && avgStress <= 55) {
      return {
        grade: 'A',
        title: '⭐ BOM SCRUM MASTER (FACILITADOR EFICAZ)',
        description: 'O Pixflow foi lançado nacionalmente e está gerando muito valor. O processo apresentou pequenas turbulências e o time se cansou um pouco nas Sprints finais de deploy, mas o clima de colaboração e a confiança no processo foram mantidos. Parabéns!',
        color: 'text-retro-blue border-retro-blue',
        bgColor: 'bg-blue-950/20',
      };
    } else if (stats.valor >= 60 && stats.moral >= 45) {
      return {
        grade: 'B',
        title: '⚖️ SCRUM MASTER OPERACIONAL',
        description: 'O produto foi entregue, mas o processo apresentou diversas cicatrizes. O time operou mais como executores de tarefas do que como uma equipe ágil auto-organizada. Há muito retrabalho e dívida técnica a serem tratados no futuro.',
        color: 'text-retro-accent border-retro-accent',
        bgColor: 'bg-yellow-950/20',
      };
    } else if (stats.valor >= 65 && (avgStress > 70 || avgMotivation < 45)) {
      return {
        grade: 'C',
        title: '🔥 PRODUTO ENTREGUE, EQUIPE FRAGILIZADA',
        description: 'O Pixflow está no ar, mas a um custo terrível. A equipe está no limite do Burnout, com estresse altíssimo e ressentimentos devido às pressões corporativas que você repassou. A rotação de funcionários será alta e a confiança em você é mínima.',
        color: 'text-retro-red border-retro-red',
        bgColor: 'bg-red-950/10',
      };
    } else {
      return {
        grade: 'D',
        title: '💀 PROJETO CANCELADO / TIME DISSOLVIDO',
        description: 'O Pixflow foi cancelado antes do deploy nacional. A diretoria perdeu a paciência com os atrasos constantes, a falta de qualidade e o acúmulo de bugs graves. O time perdeu toda a motivação e a confiança mútua foi quebrada. Hora de repensar as práticas.',
        color: 'text-red-600 border-red-600',
        bgColor: 'bg-red-950/30',
      };
    }
  };

  const ending = getEndingDetails();

  const handleRestart = () => {
    const confirm = window.confirm("Deseja voltar ao menu inicial? O progresso desta campanha será limpo.");
    if (confirm) {
      SaveSystem.clear();
      onBackToMenu();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 select-none">
      <div className="text-center">
        <h1 className="font-pressstart text-xl md:text-2xl text-retro-accent uppercase">Avaliação de Desempenho</h1>
        <p className="text-[10px] text-retro-dimmed mt-1 font-mono">Conselho Diretor da Nova Tech — Fim do Projeto Pixflow</p>
      </div>

      {/* Grade Card */}
      <div className={`border-4 p-6 text-center ${ending.color} ${ending.bgColor} shadow-retro-lg rounded`}>
        <span className="font-pressstart text-5xl md:text-7xl block mb-4">FINAL {ending.grade}</span>
        <h2 className="font-pressstart text-xs md:text-sm tracking-wide mb-3">{ending.title}</h2>
        <p className="text-xs md:text-sm font-sans text-white leading-relaxed max-w-xl mx-auto">
          {ending.description}
        </p>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Indicators */}
        <RetroCard title="Métricas Finais do Pixflow">
          <div className="space-y-2 font-pressstart text-[9.5px]">
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-retro-accent">🎯 VALOR DE NEGÓCIO:</span>
              <span className="text-white text-xs">{stats.valor} / 100</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-retro-purple">❤️ MORAL DO TIME:</span>
              <span className="text-white text-xs">{stats.moral} / 100</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-retro-green">🧪 QUALIDADE TÉCNICA:</span>
              <span className="text-white text-xs">{stats.qualidade} / 100</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-retro-blue">⚡ VELOCIDADE DE ENTREGA:</span>
              <span className="text-white text-xs">{stats.velocidade} / 100</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-white">🤝 CONFIANÇA NO PROCESSO:</span>
              <span className="text-white text-xs">{stats.confianca} / 100</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-retro-red">⚠️ RISCO ACUMULADO:</span>
              <span className="text-white text-xs">{stats.risco} / 100</span>
            </div>
          </div>
        </RetroCard>

        {/* Team Health */}
        <RetroCard title="Saúde Final da Equipe">
          <div className="space-y-3 font-sans text-xs">
            {Object.keys(team).map((memberId) => {
              const char = CHARACTERS_DATA[memberId];
              const mStats = team[memberId];
              return (
                <div key={memberId} className="flex justify-between items-center border-b border-slate-800 pb-1.5 last:border-b-0">
                  <span className="font-semibold text-white">{char.name} ({char.role})</span>
                  <div className="text-right font-mono text-[9px]">
                    Estresse: <span className={mStats.stress > 65 ? 'text-retro-red' : 'text-retro-green'}>{mStats.stress}%</span> | 
                    Motivação: <span className="text-retro-green">{mStats.motivation}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </RetroCard>
      </div>

      {/* Accomplishments */}
      <RetroCard title="Carreira Agile">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-pressstart text-[10px] space-y-1">
            <div>EXPERIÊNCIA TOTAL: <span className="text-retro-accent">{xp} XP</span></div>
            <div>NÍVEL ALCANÇADO: <span className="text-retro-blue">LVL {level}</span></div>
          </div>
          <div className="font-mono text-[10px] bg-[#131326] p-3 border border-retro-border text-center">
            🏆 Conquistas Desbloqueadas nesta campanha:<br />
            <strong className="text-retro-accent text-xs">{unlockedAchievements.length} desbloqueadas</strong>
          </div>
        </div>
      </RetroCard>

      {/* Actions */}
      <div className="flex justify-center">
        <RetroButton variant="danger" onClick={handleRestart} className="w-full md:w-64 py-3 uppercase">
          ↩️ Voltar ao Menu Principal
        </RetroButton>
      </div>
    </div>
  );
};
