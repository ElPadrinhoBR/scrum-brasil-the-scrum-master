import React from 'react';

export type CharacterExpression = 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';

interface PixelCharacterProps {
  characterId: string;
  expression?: CharacterExpression;
  size?: number;
  className?: string;
  playerAvatar?: 'roberto' | 'mariana';
  companyId?: string;
}

// Normaliza qualquer identificador ou nome de personagem para a chave padrão
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

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  characterId,
  expression = 'neutral',
  size = 180,
  className = '',
  playerAvatar = 'roberto',
  companyId = 'novatech',
}) => {
  const normalizedKey = normalizeCharacterKey(characterId, playerAvatar);

  // Paleta de tons de pele
  const skin = {
    base: '#fcd3b6',
    shadow: '#e8a582',
    blush: '#f87171',
  };

  // Especificações visuais detalhadas por personagem
  const characterSpecs: Record<string, {
    name: string;
    role: string;
    hairColor: string;
    hairHighlight: string;
    hairStyle: 'bob_brown' | 'short_messy' | 'top_bun' | 'short_beard' | 'long_blonde' | 'grey_streaks' | 'ceo_sidecut' | 'elegant_waves';
    shirtColor: string;
    collarColor: string;
    hasGlasses: boolean;
    glassesColor?: string;
    hasHeadphones?: boolean;
    hasBeard?: boolean;
    beardColor?: string;
    hasEarrings?: boolean;
    accessory?: 'stethoscope' | 'lanyard' | 'badge' | 'tie' | 'none';
  }> = {
    ana: {
      name: 'Ana',
      role: 'Product Owner',
      hairColor: '#5a2e1d',
      hairHighlight: '#7c3f27',
      hairStyle: 'bob_brown',
      shirtColor: '#1e3a8a',
      collarColor: '#f97316',
      hasGlasses: true,
      glassesColor: '#ef4444',
      hasEarrings: true,
    },
    carlos: {
      name: 'Carlos',
      role: 'Fullstack Dev',
      hairColor: '#18181b',
      hairHighlight: '#27272a',
      hairStyle: 'short_messy',
      shirtColor: '#15803d',
      collarColor: '#166534',
      hasGlasses: false,
      hasHeadphones: true,
    },
    julia: {
      name: 'Júlia',
      role: 'Frontend Dev',
      hairColor: '#ea580c',
      hairHighlight: '#fb923c',
      hairStyle: 'top_bun',
      shirtColor: '#7e22ce',
      collarColor: '#9333ea',
      hasGlasses: true,
      glassesColor: '#18181b',
      hasEarrings: true,
    },
    marcos: {
      name: 'Marcos',
      role: 'QA Engineer',
      hairColor: '#27272a',
      hairHighlight: '#3f3f46',
      hairStyle: 'short_beard',
      shirtColor: '#475569',
      collarColor: '#334155',
      hasGlasses: false,
      hasBeard: true,
      beardColor: '#27272a',
    },
    beatriz: {
      name: 'Beatriz',
      role: 'UX/UI Designer',
      hairColor: '#eab308',
      hairHighlight: '#facc15',
      hairStyle: 'long_blonde',
      shirtColor: '#c2410c',
      collarColor: '#f59e0b',
      hasGlasses: false,
      hasEarrings: true,
    },
    rafael: {
      name: 'Rafael',
      role: 'DevOps / SRE',
      hairColor: '#52525b',
      hairHighlight: '#a1a1aa',
      hairStyle: 'grey_streaks',
      shirtColor: '#1e293b',
      collarColor: '#475569',
      hasGlasses: false,
      hasBeard: true,
      beardColor: '#3f3f46',
      hasHeadphones: false,
    },
    roberto: {
      name: 'Roberto',
      role: 'Scrum Master',
      hairColor: '#3b2518',
      hairHighlight: '#533422',
      hairStyle: 'ceo_sidecut',
      shirtColor: '#1e3a8a',
      collarColor: '#ffffff',
      hasGlasses: true,
      glassesColor: '#0284c7',
      accessory: 'lanyard',
    },
    mariana: {
      name: 'Mariana',
      role: 'Scrum Master',
      hairColor: '#2d1508',
      hairHighlight: '#4a2512',
      hairStyle: 'elegant_waves',
      shirtColor: '#9d174d',
      collarColor: '#f43f5e',
      hasGlasses: false,
      hasEarrings: true,
      accessory: 'badge',
    },
  };

  const spec = characterSpecs[normalizedKey] || characterSpecs.ana;

  // Cores de uniforme customizadas pelo setor da empresa
  const getCompanyShirtColor = () => {
    switch (companyId) {
      case 'healthpulse': return '#0284c7'; // Azul médico / jaleco
      case 'cybershield': return '#0f172a'; // Dark hacker / cyber
      case 'velocelog': return '#ea580c';   // Laranja logístico
      case 'agrosmart': return '#15803d';   // Verde agro
      case 'safevault': return '#1e1b4b';   // Terno bancário azul meia-noite
      case 'foodfast': return '#dc2626';    // Vermelho food delivery
      case 'autodrive': return '#0369a1';   // Azul mecânico/telemetria
      case 'ecoenergy': return '#16a34a';   // Verde energia
      case 'cloudcore': return '#4338ca';   // Roxo cloud
      case 'edunext': return '#0d9488';     // Teal educação
      default: return spec.shirtColor;      // Cor clássica original
    }
  };

  const currentShirt = getCompanyShirtColor();

  return (
    <div
      className={`relative inline-block border-4 border-retro-border bg-gradient-to-b from-[#18182f] to-[#0c0c18] p-1.5 shadow-retro rounded-md overflow-hidden select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${spec.name} (${spec.role}) — ${expression}`}
    >
      <svg
        viewBox="0 0 28 28"
        width="100%"
        height="100%"
        style={{ shapeRendering: 'crispEdges' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fundo retrô quadriculado */}
        <rect x="0" y="0" width="28" height="28" fill="#111122" />
        <rect x="0" y="0" width="28" height="14" fill="#181830" opacity="0.4" />
        <line x1="0" y1="7" x2="28" y2="7" stroke="#1f1f40" strokeWidth="0.2" />
        <line x1="0" y1="14" x2="28" y2="14" stroke="#1f1f40" strokeWidth="0.2" />
        <line x1="0" y1="21" x2="28" y2="21" stroke="#1f1f40" strokeWidth="0.2" />
        <line x1="7" y1="0" x2="7" y2="28" stroke="#1f1f40" strokeWidth="0.2" />
        <line x1="14" y1="0" x2="14" y2="28" stroke="#1f1f40" strokeWidth="0.2" />
        <line x1="21" y1="0" x2="21" y2="28" stroke="#1f1f40" strokeWidth="0.2" />

        {/* ── 1. CORPO & OMBROS (Y: 19 a 28) ── */}
        <rect x="11" y="18" width="6" height="3" fill={skin.shadow} />
        {/* Ombro base */}
        <rect x="4" y="20" width="20" height="8" fill={currentShirt} />
        {/* Gola da camisa / detalhe */}
        <polygon points="11,20 17,20 14,24" fill={spec.collarColor} />
        {/* Sombras nos ombros para volume pixel art */}
        <rect x="4" y="20" width="2" height="8" fill="#000" opacity="0.25" />
        <rect x="22" y="20" width="2" height="8" fill="#000" opacity="0.25" />
        <rect x="6" y="20" width="16" height="1" fill="#fff" opacity="0.15" />

        {/* Detalhe de empresa: crachá/botão no peito */}
        <rect x="7" y="22" width="2" height="3" fill="#ffffff" />
        <rect x="7.5" y="22.5" width="1" height="1" fill={companyId === 'cybershield' ? '#22c55e' : '#3b82f6'} />

        {/* ── 2. CABELO DE FUNDO (para cabelos longos) ── */}
        {(spec.hairStyle === 'long_blonde' || spec.hairStyle === 'elegant_waves') && (
          <>
            <rect x="6" y="11" width="3" height="10" fill={spec.hairColor} />
            <rect x="19" y="11" width="3" height="10" fill={spec.hairColor} />
            <rect x="5" y="14" width="2" height="7" fill={spec.hairColor} />
            <rect x="21" y="14" width="2" height="7" fill={spec.hairColor} />
          </>
        )}

        {/* ── 3. CABEÇA / ROSTO (Y: 8 a 19) ── */}
        <rect x="8" y="9" width="12" height="10" fill={skin.base} />
        {/* Sombra do queixo e laterais */}
        <rect x="8" y="18" width="12" height="1" fill={skin.shadow} />
        <rect x="18" y="10" width="2" height="8" fill={skin.shadow} opacity="0.45" />

        {/* Orelhas */}
        <rect x="7" y="12" width="1" height="3" fill={skin.base} />
        <rect x="20" y="12" width="1" height="3" fill={skin.base} />

        {/* Brincos */}
        {spec.hasEarrings && (
          <>
            <rect x="6.5" y="14.5" width="1" height="1" fill="#facc15" />
            <rect x="20.5" y="14.5" width="1" height="1" fill="#facc15" />
          </>
        )}

        {/* ── 4. CABELOS PRINCIPAIS ── */}
        {/* Bob castanho (Ana) */}
        {spec.hairStyle === 'bob_brown' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="3" height="6" fill={spec.hairColor} />
            <rect x="19" y="9" width="3" height="6" fill={spec.hairColor} />
            <rect x="9" y="5" width="10" height="1" fill={spec.hairHighlight} />
            <rect x="9" y="9" width="5" height="2" fill={spec.hairColor} />
          </>
        )}

        {/* Despenteado dev preto (Carlos) */}
        {spec.hairStyle === 'short_messy' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="8" width="2" height="4" fill={spec.hairColor} />
            <rect x="20" y="8" width="2" height="4" fill={spec.hairColor} />
            <rect x="9" y="5" width="4" height="2" fill={spec.hairHighlight} />
            <rect x="15" y="5" width="4" height="2" fill={spec.hairHighlight} />
            <rect x="8" y="4" width="2" height="2" fill={spec.hairColor} />
            <rect x="18" y="4" width="2" height="2" fill={spec.hairColor} />
          </>
        )}

        {/* Coque ruivo no topo (Júlia) */}
        {spec.hairStyle === 'top_bun' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="6" fill={spec.hairColor} />
            <rect x="20" y="9" width="2" height="6" fill={spec.hairColor} />
            {/* Coque redondo no topo */}
            <rect x="11" y="2" width="6" height="4" fill={spec.hairColor} />
            <rect x="12" y="3" width="4" height="2" fill={spec.hairHighlight} />
            <rect x="8" y="9" width="4" height="2" fill={spec.hairHighlight} />
          </>
        )}

        {/* Barba curta cinza/escura (Marcos) */}
        {spec.hairStyle === 'short_beard' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="20" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="9" y="5" width="10" height="1" fill={spec.hairHighlight} />
          </>
        )}

        {/* Loiro longo ondulado (Beatriz) */}
        {spec.hairStyle === 'long_blonde' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="3" height="4" fill={spec.hairColor} />
            <rect x="19" y="9" width="3" height="4" fill={spec.hairColor} />
            <rect x="9" y="5" width="10" height="1" fill={spec.hairHighlight} />
            <rect x="8" y="9" width="4" height="2" fill={spec.hairHighlight} />
          </>
        )}

        {/* Mechas grisalhas DevOps (Rafael) */}
        {spec.hairStyle === 'grey_streaks' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="20" y="9" width="2" height="4" fill={spec.hairColor} />
            {/* Mechas grisalhas visíveis */}
            <rect x="7" y="7" width="2" height="3" fill="#e4e4e7" />
            <rect x="19" y="7" width="2" height="3" fill="#e4e4e7" />
            <rect x="12" y="5" width="4" height="1" fill="#d4d4d8" />
          </>
        )}

        {/* Corte executivo moderno (Roberto) */}
        {spec.hairStyle === 'ceo_sidecut' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="3" fill={spec.hairColor} />
            <rect x="20" y="9" width="2" height="3" fill={spec.hairColor} />
            <rect x="8" y="5" width="12" height="2" fill={spec.hairHighlight} />
            <rect x="9" y="8" width="5" height="1" fill={spec.hairColor} />
          </>
        )}

        {/* Ondas morenas elegantes (Mariana) */}
        {spec.hairStyle === 'elegant_waves' && (
          <>
            <rect x="7" y="6" width="14" height="4" fill={spec.hairColor} />
            <rect x="6" y="9" width="3" height="5" fill={spec.hairColor} />
            <rect x="19" y="9" width="3" height="5" fill={spec.hairColor} />
            <rect x="9" y="5" width="10" height="2" fill={spec.hairHighlight} />
            <rect x="8" y="9" width="5" height="2" fill={spec.hairColor} />
          </>
        )}

        {/* ── 5. BARBA (Marcos & Rafael) ── */}
        {spec.hasBeard && spec.beardColor && (
          <>
            <rect x="8" y="16" width="12" height="3" fill={spec.beardColor} />
            <rect x="9" y="15" width="2" height="1" fill={spec.beardColor} />
            <rect x="17" y="15" width="2" height="1" fill={spec.beardColor} />
            {/* Cavidade para boca */}
            <rect x="11" y="16" width="6" height="2" fill={skin.base} />
          </>
        )}

        {/* ── 6. FONE DE OUVIDO GAMER/DEV (Carlos) ── */}
        {spec.hasHeadphones && (
          <>
            {/* Tiara de cabeça */}
            <rect x="8" y="4" width="12" height="2" fill="#ef4444" />
            {/* Conchas auriculares grandes */}
            <rect x="5" y="10" width="3" height="5" fill="#dc2626" rx="1" />
            <rect x="20" y="10" width="3" height="5" fill="#dc2626" rx="1" />
            <rect x="6" y="11" width="1" height="3" fill="#18181b" />
            <rect x="21" y="11" width="1" height="3" fill="#18181b" />
          </>
        )}

        {/* ── 7. BOCHECHAS ROSADAS (BLUSH KAWAII/RETRO) ── */}
        <rect x="9" y="14" width="2" height="1" fill={skin.blush} opacity={expression === 'happy' ? '0.85' : '0.45'} />
        <rect x="17" y="14" width="2" height="1" fill={skin.blush} opacity={expression === 'happy' ? '0.85' : '0.45'} />

        {/* ── 8. ÓCULOS ESTILOSOS (Ana, Júlia, Roberto) ── */}
        {spec.hasGlasses && spec.glassesColor && (
          <>
            {/* Lente esquerda */}
            <rect x="9" y="11" width="4" height="3" fill="none" stroke={spec.glassesColor} strokeWidth="0.8" />
            {/* Lente direita */}
            <rect x="15" y="11" width="4" height="3" fill="none" stroke={spec.glassesColor} strokeWidth="0.8" />
            {/* Ponte */}
            <line x1="13" y1="12" x2="15" y2="12" stroke={spec.glassesColor} strokeWidth="0.8" />
            {/* Haste lateral */}
            <line x1="7" y1="12" x2="9" y2="12" stroke={spec.glassesColor} strokeWidth="0.8" />
            <line x1="19" y1="12" x2="21" y2="12" stroke={spec.glassesColor} strokeWidth="0.8" />
          </>
        )}

        {/* ── 9. SOBRANCELHAS DINÂMICAS POR EXPRESSÃO ── */}
        {expression === 'angry' ? (
          <>
            {/* Inclinadas para baixo no centro */}
            <line x1="9" y1="10" x2="12" y2="11.5" stroke="#18181b" strokeWidth="1" />
            <line x1="19" y1="10" x2="16" y2="11.5" stroke="#18181b" strokeWidth="1" />
          </>
        ) : expression === 'worried' || expression === 'sad' ? (
          <>
            {/* Inclinadas para cima no centro */}
            <line x1="9" y1="11.5" x2="12" y2="10" stroke="#18181b" strokeWidth="1" />
            <line x1="19" y1="11.5" x2="16" y2="10" stroke="#18181b" strokeWidth="1" />
          </>
        ) : expression === 'surprised' ? (
          <>
            {/* Arqueadas altas */}
            <rect x="9" y="9" width="3" height="1" fill="#18181b" />
            <rect x="16" y="9" width="3" height="1" fill="#18181b" />
          </>
        ) : (
          <>
            {/* Neutras / confiante */}
            <rect x="9" y="10" width="3" height="1" fill="#18181b" opacity="0.8" />
            <rect x="16" y="10" width="3" height="1" fill="#18181b" opacity="0.8" />
          </>
        )}

        {/* ── 10. OLHOS EXPRESSIVOS (PIXEL ART COM BRILHO) ── */}
        {expression === 'happy' ? (
          <>
            {/* Olhos fechados sorrindo ^ ^ */}
            <path d="M 9 13 L 10.5 11.5 L 12 13" stroke="#18181b" strokeWidth="1" fill="none" />
            <path d="M 16 13 L 17.5 11.5 L 19 13" stroke="#18181b" strokeWidth="1" fill="none" />
          </>
        ) : expression === 'surprised' ? (
          <>
            {/* Olhos arregalados redondos com reflexo de luz */}
            <rect x="9" y="11" width="3" height="3" fill="#ffffff" />
            <rect x="16" y="11" width="3" height="3" fill="#ffffff" />
            <rect x="10" y="12" width="2" height="2" fill="#18181b" />
            <rect x="17" y="12" width="2" height="2" fill="#18181b" />
            <rect x="10" y="11.5" width="1" height="1" fill="#ffffff" />
            <rect x="17" y="11.5" width="1" height="1" fill="#ffffff" />
          </>
        ) : expression === 'confident' ? (
          <>
            {/* Olho esquerdo normal com brilho, olho direito piscando (wink) */}
            <rect x="10" y="12" width="2" height="2" fill="#18181b" />
            <rect x="10" y="12" width="1" height="1" fill="#ffffff" />
            {/* Wink piscadinha */}
            <line x1="16" y1="13" x2="19" y2="13" stroke="#18181b" strokeWidth="1.2" />
          </>
        ) : expression === 'sad' ? (
          <>
            {/* Olhos caídos com brilho triste */}
            <rect x="10" y="12" width="2" height="2" fill="#18181b" />
            <rect x="16" y="12" width="2" height="2" fill="#18181b" />
            {/* Lágrima azul descendo */}
            <rect x="9.5" y="14" width="1.5" height="2" fill="#38bdf8" />
            <rect x="10" y="16" width="1" height="1" fill="#38bdf8" />
          </>
        ) : (
          <>
            {/* Padrão com brilho reflexivo pixel art */}
            <rect x="10" y="12" width="2" height="2" fill="#18181b" />
            <rect x="10" y="12" width="1" height="1" fill="#ffffff" />
            <rect x="16" y="12" width="2" height="2" fill="#18181b" />
            <rect x="16" y="12" width="1" height="1" fill="#ffffff" />
          </>
        )}

        {/* ── 11. BOCA EXPRESSIVA ── */}
        {expression === 'happy' ? (
          <>
            {/* Sorriso aberto com dentinhos brancos */}
            <polygon points="12,15 16,15 15,17 13,17" fill="#ef4444" />
            <rect x="13" y="15" width="2" height="1" fill="#ffffff" />
          </>
        ) : expression === 'sad' ? (
          <path d="M 12 17 Q 14 15 16 17" stroke="#18181b" strokeWidth="1" fill="none" />
        ) : expression === 'angry' ? (
          <>
            {/* Boca aberta gritando/furiosa */}
            <rect x="12" y="15.5" width="4" height="2.5" fill="#b91c1c" stroke="#18181b" strokeWidth="0.5" />
            <rect x="13" y="15.5" width="2" height="1" fill="#ffffff" />
          </>
        ) : expression === 'surprised' ? (
          /* Boca em 'O' */
          <ellipse cx="14" cy="16.5" rx="1.5" ry="2" fill="#18181b" />
        ) : expression === 'confident' ? (
          /* Sorrisinho de canto */
          <path d="M 12 16.5 L 14 16.5 L 16 15" stroke="#18181b" strokeWidth="1" fill="none" />
        ) : expression === 'worried' ? (
          /* Linha trêmula de nervoso */
          <path d="M 12 16 L 13 16.5 L 14 16 L 15 16.5 L 16 16" stroke="#18181b" strokeWidth="0.8" fill="none" />
        ) : (
          /* Linha sutil neutra */
          <line x1="12.5" y1="16" x2="15.5" y2="16" stroke="#18181b" strokeWidth="1" />
        )}

        {/* ── 12. EFEITOS ESPECIAIS DE ANIME/RETRO ── */}
        {/* Gotas de suor na testa (Worried) */}
        {expression === 'worried' && (
          <>
            <path d="M 21 8 Q 23 10 22 12 Q 20 12 21 8" fill="#38bdf8" />
            <circle cx="21.5" cy="14" r="0.8" fill="#38bdf8" />
          </>
        )}

        {/* Veia de raiva pulsando no canto (Angry) */}
        {expression === 'angry' && (
          <g>
            <path d="M 21 5 L 24 8 M 24 5 L 21 8" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="22.5" cy="6.5" r="1.5" fill="none" stroke="#ef4444" strokeWidth="0.6" />
          </g>
        )}

        {/* Estrela brilhante no canto (Confident) */}
        {expression === 'confident' && (
          <polygon
            points="23,4 24,2 25,4 27,5 25,6 24,8 23,6 21,5"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="0.4"
          />
        )}
      </svg>
    </div>
  );
};
