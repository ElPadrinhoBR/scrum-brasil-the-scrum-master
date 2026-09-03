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
  if (clean.includes('dandara')) return 'dandara';
  if (clean.includes('taina')) return 'taina';
  if (clean.includes('kofi')) return 'kofi';
  if (clean.includes('kenji')) return 'kenji';
  if (clean.includes('aline')) return 'aline';
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

// Visual specs com etnias e gêneros para renderização procedural
interface DiverseVisualSpec {
  name: string;
  role: string;
  skinTone: string;
  skinShadow: string;
  hairColor: string;
  hairHighlight: string;
  shirtColor: string;
  hasGlasses?: boolean;
  glassesColor?: string;
  hasEarrings?: boolean;
  hasBeard?: boolean;
  isQA?: boolean;
  style: 'box_braids' | 'indigenous_straight' | 'fade_cut' | 'anime_tech' | 'curly_up' | 'standard';
}

const DIVERSE_SPECS: Record<string, DiverseVisualSpec> = {
  dandara: {
    name: 'Dandara',
    role: 'QA & Automação',
    skinTone: '#4a2810',
    skinShadow: '#361c0b',
    hairColor: '#18181b',
    hairHighlight: '#facc15',
    shirtColor: '#0f766e',
    hasGlasses: true,
    glassesColor: '#facc15',
    hasEarrings: true,
    isQA: true,
    style: 'box_braids',
  },
  taina: {
    name: 'Tainá',
    role: 'QA & Carga',
    skinTone: '#c87d55',
    skinShadow: '#a35f3a',
    hairColor: '#09090b',
    hairHighlight: '#27272a',
    shirtColor: '#15803d',
    hasEarrings: true,
    isQA: true,
    style: 'indigenous_straight',
  },
  kofi: {
    name: 'Kofi',
    role: 'Backend & Arq.',
    skinTone: '#31180d',
    skinShadow: '#220f07',
    hairColor: '#18181b',
    hairHighlight: '#27272a',
    shirtColor: '#b45309',
    hasBeard: true,
    style: 'fade_cut',
  },
  kenji: {
    name: 'Kenji',
    role: 'Mobile & UI',
    skinTone: '#faebd7',
    skinShadow: '#e6ccb2',
    hairColor: '#1c1917',
    hairHighlight: '#292524',
    shirtColor: '#1e40af',
    hasGlasses: true,
    glassesColor: '#0f172a',
    style: 'anime_tech',
  },
  aline: {
    name: 'Aline',
    role: 'DevSecOps',
    skinTone: '#d9976b',
    skinShadow: '#b8754b',
    hairColor: '#261710',
    hairHighlight: '#44281b',
    shirtColor: '#be123c',
    hasEarrings: true,
    style: 'curly_up',
  },
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

  useEffect(() => {
    setImageFailed(false);
  }, [normalizedKey]);

  const badge = EXPRESSION_BADGES[expression];
  const imageSrc = `${import.meta.env.BASE_URL}characters/${normalizedKey}.png`;
  const diverseSpec = DIVERSE_SPECS[normalizedKey];

  return (
    <div
      className={`relative inline-block border-4 border-retro-border bg-gradient-to-b from-[#18182f] to-[#0c0c18] p-1 shadow-retro rounded-md overflow-hidden select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${normalizedKey} — ${expression}`}
    >
      {/* 1. TENTA CARREGAR PNG REAL */}
      {!imageFailed ? (
        <img
          src={imageSrc}
          alt={normalizedKey}
          className="w-full h-full object-cover object-top rounded-xs transition-transform duration-300"
          onError={() => setImageFailed(true)}
        />
      ) : diverseSpec ? (
        /* 2. PROCEDURAL RETRO PIXEL ART PARA NOVOS PERSONAGENS DE DIVERSIDADE */
        <svg
          viewBox="0 0 28 28"
          width="100%"
          height="100%"
          style={{ shapeRendering: 'crispEdges' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="28" height="28" fill="#111122" />
          <line x1="0" y1="14" x2="28" y2="14" stroke="#1f1f40" strokeWidth="0.25" />
          <line x1="14" y1="0" x2="14" y2="28" stroke="#1f1f40" strokeWidth="0.25" />

          {/* Ombros & Corpo */}
          <rect x="11" y="18" width="6" height="3" fill={diverseSpec.skinShadow} />
          <rect x="4" y="20" width="20" height="8" fill={diverseSpec.shirtColor} />
          <rect x="10" y="20" width="8" height="4" fill="#ffffff" opacity="0.2" />

          {/* Cabeça / Rosto */}
          <rect x="8" y="9" width="12" height="10" fill={diverseSpec.skinTone} />
          <rect x="8" y="18" width="12" height="1" fill={diverseSpec.skinShadow} />
          <rect x="18" y="10" width="2" height="8" fill={diverseSpec.skinShadow} opacity="0.4" />

          {/* Cabelos & Penteados Específicos por Etnia */}
          {diverseSpec.style === 'box_braids' && (
            <>
              {/* Tranças escuras com contas douradas (Dandara) */}
              <rect x="7" y="5" width="14" height="5" fill={diverseSpec.hairColor} />
              <rect x="5" y="9" width="3" height="11" fill={diverseSpec.hairColor} />
              <rect x="20" y="9" width="3" height="11" fill={diverseSpec.hairColor} />
              {/* Contas douradas nas tranças */}
              <rect x="6" y="17" width="1.5" height="1.5" fill="#facc15" />
              <rect x="20.5" y="17" width="1.5" height="1.5" fill="#facc15" />
            </>
          )}

          {diverseSpec.style === 'indigenous_straight' && (
            <>
              {/* Cabelo liso comprido com franja (Tainá) */}
              <rect x="7" y="5" width="14" height="5" fill={diverseSpec.hairColor} />
              <rect x="5" y="9" width="3" height="13" fill={diverseSpec.hairColor} />
              <rect x="20" y="9" width="3" height="13" fill={diverseSpec.hairColor} />
              <rect x="9" y="8" width="10" height="2" fill={diverseSpec.hairColor} />
              {/* Grafismo tradicional de urucum nas bochechas */}
              <rect x="9" y="14" width="2" height="1" fill="#dc2626" />
              <rect x="17" y="14" width="2" height="1" fill="#dc2626" />
            </>
          )}

          {diverseSpec.style === 'fade_cut' && (
            <>
              {/* Fade e cavanhaque (Kofi) */}
              <rect x="7" y="5" width="14" height="4" fill={diverseSpec.hairColor} />
              <rect x="6" y="8" width="2" height="3" fill={diverseSpec.hairHighlight} />
              <rect x="20" y="8" width="2" height="3" fill={diverseSpec.hairHighlight} />
              {/* Risca lateral */}
              <line x1="8" y1="6" x2="11" y2="6" stroke="#fff" strokeWidth="0.8" />
              {/* Cavanhaque */}
              <rect x="12" y="16" width="4" height="3" fill={diverseSpec.hairColor} />
            </>
          )}

          {diverseSpec.style === 'anime_tech' && (
            <>
              {/* Cabelo preto tech repicado (Kenji) */}
              <rect x="7" y="5" width="14" height="4" fill={diverseSpec.hairColor} />
              <rect x="6" y="8" width="3" height="5" fill={diverseSpec.hairColor} />
              <rect x="19" y="8" width="3" height="5" fill={diverseSpec.hairColor} />
              <polygon points="9,8 11,11 13,8" fill={diverseSpec.hairColor} />
              <polygon points="15,8 17,11 19,8" fill={diverseSpec.hairColor} />
            </>
          )}

          {diverseSpec.style === 'curly_up' && (
            <>
              {/* Cachos volumosos com bandana (Aline) */}
              <rect x="6" y="4" width="16" height="6" fill={diverseSpec.hairColor} rx="2" />
              <rect x="5" y="8" width="3" height="6" fill={diverseSpec.hairColor} />
              <rect x="20" y="8" width="3" height="6" fill={diverseSpec.hairColor} />
              {/* Bandana vermelha */}
              <rect x="7" y="8" width="14" height="2" fill="#e11d48" />
            </>
          )}

          {/* Óculos se tiver */}
          {diverseSpec.hasGlasses && diverseSpec.glassesColor && (
            <>
              <rect x="9" y="11" width="4" height="3" fill="none" stroke={diverseSpec.glassesColor} strokeWidth="0.8" />
              <rect x="15" y="11" width="4" height="3" fill="none" stroke={diverseSpec.glassesColor} strokeWidth="0.8" />
              <line x1="13" y1="12" x2="15" y2="12" stroke={diverseSpec.glassesColor} strokeWidth="0.8" />
            </>
          )}

          {/* Olhos Pixel Art com Brilho */}
          <rect x="10" y="12" width="2" height="2" fill="#000" />
          <rect x="10" y="12" width="1" height="1" fill="#fff" />
          <rect x="16" y="12" width="2" height="2" fill="#000" />
          <rect x="16" y="12" width="1" height="1" fill="#fff" />

          {/* Boca sorridente */}
          <path d="M 12 16 L 14 17 L 16 16" stroke="#000" strokeWidth="1" fill="none" />

          {/* Badge de QA no canto */}
          {diverseSpec.isQA && (
            <rect x="2" y="2" width="6" height="4" fill="#7e22ce" rx="1" />
          )}
        </svg>
      ) : (
        /* 3. FALLBACK GENÉRICO */
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
