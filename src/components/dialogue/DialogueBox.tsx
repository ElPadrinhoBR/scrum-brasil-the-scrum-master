import React, { useState, useEffect, useRef } from 'react';
import { DialogueChoice } from '../../data/sprints';
import { SoundManager } from '../ui/SoundManager';
import { RetroButton } from '../ui/RetroButton';
import { SKILLS_DATA } from '../../data/skills';
import { GLOSSARY_DATA } from '../../data/glossary';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  choices?: DialogueChoice[];
  unlockedSkills: string[];
  onChoiceSelect: (choice: DialogueChoice) => void;
  onAdvance: () => void;
  dialogueHistory: Array<{ speaker: string; text: string }>;
  playerName: string;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  text,
  choices = [],
  unlockedSkills,
  onChoiceSelect,
  onAdvance,
  dialogueHistory,
  playerName,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const textTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format text by replacing the playerName placeholder
  const formattedText = text.replace(/{playerName}/g, playerName);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    if (textTimerRef.current) {
      clearInterval(textTimerRef.current);
    }

    const textChars = formattedText.split('');
    
    textTimerRef.current = setInterval(() => {
      if (index < textChars.length) {
        const char = textChars[index];
        setDisplayedText((prev) => prev + char);
        if (char !== ' ' && index % 2 === 0) {
          SoundManager.playDialogue();
        }
        index++;
      } else {
        setIsTyping(false);
        if (textTimerRef.current) clearInterval(textTimerRef.current);
      }
    }, 20);

    return () => {
      if (textTimerRef.current) clearInterval(textTimerRef.current);
    };
  }, [formattedText]);

  const handleSkipOrAdvance = () => {
    if (isTyping) {
      if (textTimerRef.current) clearInterval(textTimerRef.current);
      setDisplayedText(formattedText);
      setIsTyping(false);
      SoundManager.playClick();
    } else if (choices.length === 0) {
      onAdvance();
    }
  };

  // Convert speaker ID to readable name and color
  const getSpeakerDetails = (spk: string) => {
    const speakers: Record<string, { name: string; color: string }> = {
      ana: { name: 'Ana (Product Owner)', color: 'text-orange-500' },
      carlos: { name: 'Carlos (Developer)', color: 'text-green-500' },
      julia: { name: 'Júlia (Developer)', color: 'text-purple-500' },
      marcos: { name: 'Marcos (QA)', color: 'text-red-500' },
      beatriz: { name: 'Beatriz (UX/UI)', color: 'text-yellow-500' },
      rafael: { name: 'Rafael (DevOps)', color: 'text-blue-500' },
      'VOCÊ — SCRUM MASTER': { name: `${playerName} (Scrum Master)`, color: 'text-retro-accent' },
      SISTEMA: { name: 'SISTEMA', color: 'text-slate-400 font-bold' },
      NARRADOR: { name: 'NARRADOR', color: 'text-retro-dimmed italic' },
    };
    return speakers[spk] || { name: spk, color: 'text-white' };
  };

  const details = getSpeakerDetails(speaker);

  // Check if skill is unlocked
  const isSkillMet = (requiredSkill?: string) => {
    if (!requiredSkill) return true;
    return unlockedSkills.includes(requiredSkill);
  };

  const getSkillName = (skillId: string) => {
    return SKILLS_DATA.find((s) => s.id === skillId)?.name || skillId;
  };

  // Parses completed typewriter text to highlight and anchor glossary terms
  const renderTextWithGlossaryLinks = (plainText: string) => {
    const glossaryKeys = Object.keys(GLOSSARY_DATA);
    glossaryKeys.sort((a, b) => b.length - a.length); // match longest terms first
    
    // Regex using word boundary and matching keys
    const regex = new RegExp(`\\b(${glossaryKeys.join('|')})\\b`, 'gi');
    const parts = plainText.split(regex);
    if (parts.length === 1) return plainText;

    return parts.map((part, i) => {
      const matchedKey = glossaryKeys.find(
        (key) => key.toLowerCase() === part.toLowerCase()
      );

      if (matchedKey) {
        return (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation(); // Prevent advancing dialogue line!
              SoundManager.playClick();
              setSelectedTerm(matchedKey);
            }}
            className="text-retro-accent hover:text-white underline font-semibold focus:outline-none px-0.5 bg-yellow-950/30 border-b border-dotted border-retro-accent hover:bg-retro-accent/15"
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full relative mt-auto">
      {/* Speaker Name Tag */}
      <div className="absolute -top-7 left-4 bg-retro-panel border-4 border-b-0 border-retro-border px-3 py-1 font-pressstart text-[10px] z-10">
        <span className={details.color}>{details.name}</span>
      </div>

      {/* Main Dialogue Box */}
      <div className="bg-retro-panel border-4 border-retro-border p-5 pt-7 shadow-retro min-h-[160px] flex flex-col justify-between">
        {/* Dialogue text */}
        <div 
          onClick={handleSkipOrAdvance}
          className="text-xs md:text-sm font-sans tracking-wide leading-relaxed cursor-pointer select-none grow min-h-[60px]"
        >
          {isTyping ? (
            <span className="cursor-blink">{displayedText}</span>
          ) : (
            <span>{renderTextWithGlossaryLinks(formattedText)}</span>
          )}
        </div>

        {/* Buttons / Choice options */}
        <div className="mt-4 pt-4 border-t-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex space-x-2">
            <RetroButton 
              variant="secondary" 
              onClick={() => {
                SoundManager.playClick();
                setShowHistory(true);
              }}
            >
              📖 Histórico
            </RetroButton>

            {isTyping && (
              <RetroButton 
                variant="secondary" 
                onClick={handleSkipOrAdvance}
              >
                ⏩ Pular
              </RetroButton>
            )}
          </div>

          {/* Choices Rendering */}
          <div className="w-full md:w-auto flex flex-col md:items-end gap-2">
            {choices.length > 0 ? (
              <div className="flex flex-col gap-2 w-full max-w-xl">
                {choices.map((choice, i) => {
                  const skillMet = isSkillMet(choice.requiredSkill);
                  const formattedChoiceText = choice.text.replace(/{playerName}/g, playerName);
                  
                  return (
                    <button
                      key={i}
                      disabled={!skillMet}
                      onClick={() => {
                        SoundManager.playClick();
                        onChoiceSelect(choice);
                      }}
                      className={`text-left border-2 p-2.5 text-xs font-sans tracking-wide leading-tight transition-all relative ${
                        skillMet
                          ? 'border-retro-border bg-[#131326] hover:border-retro-accent text-white active:translate-x-[2px] active:translate-y-[2px]'
                          : 'border-slate-800 bg-[#0c0c14] text-slate-600 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {choice.requiredSkill && !skillMet && (
                        <span className="block text-[9px] font-pressstart text-retro-red mb-1">
                          [REQUER: {getSkillName(choice.requiredSkill).toUpperCase()}]
                        </span>
                      )}
                      {choice.requiredSkill && skillMet && (
                        <span className="block text-[9px] font-pressstart text-retro-green mb-1">
                          [HABILIDADE ATIVA: {getSkillName(choice.requiredSkill).toUpperCase()}]
                        </span>
                      )}
                      {formattedChoiceText}
                    </button>
                  );
                })}
              </div>
            ) : (
              !isTyping && (
                <button
                  onClick={handleSkipOrAdvance}
                  className="font-pressstart text-[10px] text-retro-accent animate-pulse flex items-center space-x-1 hover:text-white"
                >
                  <span>Pressione avançar</span>
                  <span>▶</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Glossary Term modal */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-[60]">
          <div className="bg-retro-panel border-4 border-retro-accent p-5 shadow-retro-lg max-w-md w-full text-left">
            <h4 className="font-pressstart text-[11px] text-retro-accent uppercase tracking-wider mb-2">
              📖 GLOSSÁRIO ÁGIL: {selectedTerm}
            </h4>
            <div className="bg-[#131326] p-3 border-2 border-retro-border text-xs md:text-sm font-sans leading-relaxed text-slate-200 mb-4">
              {GLOSSARY_DATA[selectedTerm]}
            </div>
            <div className="flex justify-end">
              <RetroButton variant="warning" onClick={() => setSelectedTerm(null)} className="text-[9px]">
                Fechar Explicação
              </RetroButton>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-retro-panel border-4 border-retro-border p-6 shadow-retro-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="border-b-4 border-retro-border pb-2 mb-4 flex justify-between items-center">
              <h3 className="font-pressstart text-xs text-retro-accent">HISTÓRICO DE DIÁLOGO</h3>
              <RetroButton variant="danger" onClick={() => setShowHistory(false)}>Fechar</RetroButton>
            </div>
            
            <div className="overflow-y-auto space-y-4 pr-2 grow font-sans text-sm">
              {dialogueHistory.length === 0 ? (
                <div className="text-retro-dimmed text-center py-8 font-pressstart text-[10px]">Sem diálogos gravados nesta Sprint.</div>
              ) : (
                dialogueHistory.map((item, index) => {
                  const itemDetails = getSpeakerDetails(item.speaker);
                  const formattedItemText = item.text.replace(/{playerName}/g, playerName);
                  return (
                    <div key={index} className="border-b border-slate-800 pb-2">
                      <span className={`block font-pressstart text-[9px] mb-1 ${itemDetails.color}`}>
                        {itemDetails.name}
                      </span>
                      <p className="text-retro-text">{formattedItemText}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
