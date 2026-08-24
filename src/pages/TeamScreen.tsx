import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { CHARACTERS_DATA } from '../data/characters';
import { SKILLS_DATA, Skill } from '../data/skills';
import { PixelCharacter } from '../components/characters/PixelCharacter';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';

export const TeamScreen: React.FC = () => {
  const { state, unlockPlayerSkill, talkToTeamMember } = useGame();
  const { team, unlockedSkills, skillPoints } = state;
  const [selectedMember, setSelectedMember] = useState<string>('ana');

  const charBio = CHARACTERS_DATA[selectedMember];
  const charStats = team[selectedMember];

  // Helper to draw mini status bars
  const renderMiniBar = (val: number, isStress = false) => {
    let color = 'bg-retro-green';
    if (isStress) {
      if (val > 70) color = 'bg-retro-red';
      else if (val > 40) color = 'bg-retro-accent';
      else color = 'bg-slate-600';
    } else {
      if (val < 40) color = 'bg-retro-red';
      else if (val < 70) color = 'bg-retro-accent';
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex bg-slate-900 border border-slate-700 h-3 w-32 rounded-sm overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${val}%` }} />
        </div>
        <span className="font-mono text-[9px] text-white">{val}%</span>
      </div>
    );
  };

  // Group skills by category
  const categories: Array<{
    id: Skill['category'];
    title: string;
    bgColor: string;
  }> = [
    { id: 'FACILITACAO', title: 'Facilitação', bgColor: 'border-retro-blue' },
    { id: 'COACHING', title: 'Coaching', bgColor: 'border-retro-purple' },
    { id: 'CONFLITOS', title: 'Conflitos', bgColor: 'border-retro-red' },
    { id: 'AGILIDADE', title: 'Agilidade', bgColor: 'border-retro-green' },
  ];

  const getSkillsByCategory = (category: Skill['category']) => {
    return SKILLS_DATA.filter((s) => s.category === category);
  };

  const handleUnlockSkill = (skill: Skill) => {
    // Check prerequisites
    if (skill.unlockedBy && !unlockedSkills.includes(skill.unlockedBy)) {
      const prereqName = SKILLS_DATA.find(s => s.id === skill.unlockedBy)?.name || '';
      alert(`🔒 Bloqueado: Requer desbloquear a habilidade '${prereqName}' primeiro.`);
      return;
    }

    const success = unlockPlayerSkill(skill.id, skill.cost);
    if (success) {
      alert(`✨ Habilidade desbloqueada com sucesso: ${skill.name}!`);
    }
  };

  const isCoachingEnabled = unlockedSkills.includes('coa_feedback');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none leading-relaxed">
      
      {/* LEFT COLUMN: TEAM MEMBERS */}
      <div className="space-y-4">
        <RetroCard title="Membros do Scrum Team">
          <p className="text-[10px] text-retro-dimmed mb-4">Selecione um personagem para ver biografia, catching phrases e dar mentoria.</p>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {Object.keys(CHARACTERS_DATA).map((key) => {
              const char = CHARACTERS_DATA[key];
              const isSelected = selectedMember === key;
              const hasHighStress = team[key].stress > 75;
              
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMember(key)}
                  className={`flex flex-col items-center p-1.5 border-2 relative transition-all ${
                    isSelected 
                      ? 'border-retro-accent bg-slate-900/60 shadow-none' 
                      : 'border-retro-border hover:border-slate-500'
                  }`}
                >
                  <PixelCharacter characterId={key} size={50} className="border-0 shadow-none p-0 bg-transparent" />
                  <span className="text-[9px] font-pressstart truncate max-w-full text-white mt-1">{char.name}</span>
                  {hasHighStress && (
                    <span className="absolute top-0.5 right-0.5 bg-retro-red text-white text-[7px] px-1 font-bold animate-pulse">
                      🔥
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Member Details */}
          {charBio && charStats && (
            <div className="border-4 border-retro-border bg-[#131326] p-4 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-center sm:items-start shrink-0">
                <PixelCharacter characterId={selectedMember} expression={charStats.stress > 70 ? 'worried' : 'neutral'} size={110} />
                <span className="font-pressstart text-[10px] text-retro-accent mt-2">{charBio.name}</span>
                <span className="text-[9px] text-retro-dimmed font-mono">{charBio.role} ({charBio.age} anos)</span>
              </div>
              
              <div className="grow space-y-3.5 text-left">
                {/* Catchphrase */}
                <div className="italic text-[10px] text-slate-300 bg-slate-950/50 p-2 border-l-4 border-retro-accent leading-snug">
                  "{charBio.phrase}"
                </div>

                {/* Bio text */}
                <p className="text-[10px] font-sans text-retro-text leading-relaxed">
                  <strong>Personalidade:</strong> {charBio.personality}
                </p>

                {/* Stats */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[9px] uppercase">
                  <div className="flex items-center justify-between">
                    <span className="font-pressstart text-retro-dimmed">Motivação:</span>
                    {renderMiniBar(charStats.motivation)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-pressstart text-retro-dimmed">Estresse:</span>
                    {renderMiniBar(charStats.stress, true)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-pressstart text-retro-dimmed">Confiança:</span>
                    {renderMiniBar(charStats.confidence)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-pressstart text-retro-dimmed">Relacionamento:</span>
                    {renderMiniBar(charStats.relationship)}
                  </div>
                </div>

                {/* Mentoring Action */}
                <div className="pt-2">
                  <RetroButton
                    variant={isCoachingEnabled ? 'purple' : 'secondary'}
                    disabled={!isCoachingEnabled || charStats.stress === 0}
                    onClick={() => talkToTeamMember(selectedMember)}
                    className="w-full text-[9px]"
                  >
                    {isCoachingEnabled 
                      ? `🗣️ Mentoria Individual (-20% Estresse)`
                      : `🔒 Requer Habilidade: Feedback Empático`}
                  </RetroButton>
                </div>
              </div>
            </div>
          )}
        </RetroCard>
      </div>

      {/* RIGHT COLUMN: SKILL TREE */}
      <div className="space-y-4">
        <RetroCard title="Árvore de Habilidades do Scrum Master">
          {/* Unspent points */}
          <div className="bg-[#131326] p-3 border-2 border-retro-border flex justify-between items-center mb-4">
            <span className="font-pressstart text-[10px] text-white">PONTOS DE HABILIDADE:</span>
            <span className="font-pressstart text-xs text-retro-accent bg-slate-950 px-3 py-1 border border-retro-border">
              {skillPoints}
            </span>
          </div>

          {/* Skill List by Category */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const categorySkills = getSkillsByCategory(cat.id);
              return (
                <div key={cat.id} className={`border-2 p-3 ${cat.bgColor} bg-[#0c0c14]/40`}>
                  <h4 className="font-pressstart text-[9px] text-white mb-2 uppercase tracking-wide">
                    {cat.title}
                  </h4>
                  
                  <div className="flex flex-col gap-2">
                    {categorySkills.map((skill) => {
                      const isUnlocked = unlockedSkills.includes(skill.id);
                      
                      // Check prerequisite name
                      const prereq = skill.unlockedBy 
                        ? SKILLS_DATA.find(s => s.id === skill.unlockedBy)
                        : null;
                      const isPrereqMet = !skill.unlockedBy || unlockedSkills.includes(skill.unlockedBy);

                      return (
                        <div
                          key={skill.id}
                          className={`border p-2 flex flex-col md:flex-row md:items-center justify-between text-left transition-all ${
                            isUnlocked
                              ? 'border-retro-green bg-green-950/20'
                              : isPrereqMet 
                                ? 'border-retro-border bg-slate-900/40 hover:border-slate-500'
                                : 'border-slate-900 opacity-40 bg-[#0c0c14]'
                          }`}
                        >
                          <div className="grow pr-2">
                            <span className={`font-pressstart text-[9.5px] block ${isUnlocked ? 'text-retro-green' : 'text-white'}`}>
                              {skill.name} {isUnlocked && '✓'}
                            </span>
                            <span className="text-[9.5px] font-sans text-retro-dimmed leading-snug block mt-0.5">
                              {skill.description}
                            </span>
                            {prereq && !isPrereqMet && (
                              <span className="text-[8px] font-pressstart text-retro-red block mt-1 uppercase">
                                [Requer: {prereq.name}]
                              </span>
                            )}
                          </div>

                          <div className="shrink-0 mt-2 md:mt-0 flex justify-end">
                            {isUnlocked ? (
                              <span className="font-pressstart text-[8px] text-retro-green uppercase bg-green-950 px-2 py-1 border border-green-800">
                                Desbloqueada
                              </span>
                            ) : (
                              <RetroButton
                                variant="warning"
                                onClick={() => handleUnlockSkill(skill)}
                                disabled={skillPoints < skill.cost || !isPrereqMet}
                                className="text-[8px] px-2.5 py-1.5"
                              >
                                Desbloquear ({skill.cost}pt)
                              </RetroButton>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </RetroCard>
      </div>
    </div>
  );
};
