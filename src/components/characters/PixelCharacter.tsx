import React, { useState, useEffect } from 'react';

export type CharacterExpression = 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';

interface PixelCharacterProps {
  characterId: string;
  expression?: CharacterExpression;
  size?: number;
  className?: string;
  playerAvatar?: 'roberto' | 'mariana';
  companyId?: string;
}

// Normaliza qualquer identificador ou nome de personagem para a chave de arquivo padrão
export const normalizeCharacterKey = (id: string, playerAvatar: 'roberto' | 'mariana' = 'roberto'): string => {
  const clean = id.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (clean.includes('scrum') || clean.includes('voce') || clean.includes('sm')) {
    return playerAvatar;
  }
  if (clean.includes('ana')) return 'ana';
  if (clean.includes('carlos')) return 'carlos';
  if (clean.includes('julia')) return 'julia';
  if (clean.includes('marcos')) return 'marcos';
  if (clean.includes('beatriz')) return 'beatriz';
  if (clean.includes('rafael')) return 'rafael';
  if (clean.includes('roberto')) return 'roberto';
  if (clean.includes('mariana')) return 'mariana';
  return clean;
};

// Badges de expressão emocional de anime / retro pixel sobrepostos
const EXPRESSION_BADGES: Record<CharacterExpression, { icon: string; label: string; bg: string; border: string }> = {
  happy: { icon: '✨', label: 'Feliz', bg: 'bg-emerald-950/80', border: 'border-emerald-500 text-emerald-300' },
  worried: { icon: '💧', label: 'Preocupado', bg: 'bg-blue-950/80', border: 'border-blue-500 text-blue-300' },
  angry: { icon: '💢', label: 'Irritado', bg: 'bg-red-950/80', border: 'border-red-500 text-red-300' },
  sad: { icon: '😢', label: 'Desanimado', bg: 'bg-slate-950/80', border: 'border-slate-500 text-slate-300' },
  surprised: { icon: '❗', label: 'Surpreso', bg: 'bg-amber-950/80', border: 'border-amber-500 text-amber-300' },
  confident: { icon: '⭐', label: 'Confiante', bg: 'bg-yellow-950/80', border: 'border-yellow-500 text-yellow-300' },
  neutral: { icon: '', label: '', bg: '', border: '' },
};

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  characterId,
  expression = 'neutral',
  size = 180,
  className = '',
  playerAvatar = 'roberto',
}) => {
  const normalizedKey = normalizeCharacterKey(characterId, playerAvatar);
  const [imageFailed, setImageFailed] = useState(false);

  // Reinicia estado de erro se mudar de personagem
  useEffect(() => {
    setImageFailed(false);
  }, [normalizedKey]);

  const badge = EXPRESSION_BADGES[expression];
  const imageSrc = `${import.meta.env.BASE_URL}characters/${normalizedKey}.png`;

  return (
    <div
      className={`relative inline-block border-4 border-retro-border bg-gradient-to-b from-[#18182f] to-[#0c0c18] p-1 shadow-retro rounded-md overflow-hidden select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${normalizedKey} — ${expression}`}
    >
      {/* 1. IMAGEM REAL GERADA (PNG EM ALTA QUALIDADE COMO A DA NOVATECH) */}
      {!imageFailed ? (
        <img
          src={imageSrc}
          alt={normalizedKey}
          className="w-full h-full object-cover object-top rounded-xs transition-transform duration-300"
          onError={() => setImageFailed(true)}
        />
      ) : (
        /* 2. FALLBACK SVG SE A IMAGEM NÃO CARREGAR */
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-retro-accent font-pressstart text-[10px] p-2 text-center">
          <span className="text-2xl mb-1">👤</span>
          <span className="uppercase text-[8px]">{normalizedKey}</span>
        </div>
      )}

      {/* 3. BALÃOZINHO / ÍCONE FLUTUANTE DE EXPRESSÃO EMOCIONAL RETRO */}
      {expression !== 'neutral' && badge.icon && (
        <div
          className={`absolute top-1.5 right-1.5 flex items-center justify-center w-6 h-6 rounded-full border-2 ${badge.border} ${badge.bg} text-xs shadow-md animate-bounce pointer-events-none`}
          style={{ animationDuration: '1.8s' }}
          title={badge.label}
        >
          <span>{badge.icon}</span>
        </div>
      )}
    </div>
  );
};
