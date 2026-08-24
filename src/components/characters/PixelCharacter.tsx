import React from 'react';

interface PixelCharacterProps {
  characterId: string;
  expression?: 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';
  size?: number;
  className?: string;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  characterId,
  expression = 'neutral',
  size = 180,
  className = '',
}) => {
  const [imgState, setImgState] = React.useState<'expression' | 'base' | 'svg'>('expression');

  React.useEffect(() => {
    setImgState('expression');
  }, [characterId, expression]);

  // Common colors
  const skinColor = '#ffdbb5';
  const skinShadow = '#e0a880';
  
  // Specific character visual specs
  const specs: Record<string, {
    hairColor: string;
    hairStyle: string; // 'short_brown', 'short_black', 'ruiva_up', 'beard_grey', 'blonde_long', 'devops_grey'
    shirtColor: string;
    collarColor: string;
    hasGlasses: boolean;
    glassesColor?: string;
    hasBeard?: boolean;
    beardColor?: string;
    hasHeadphones?: boolean;
    hasEarrings?: boolean;
  }> = {
    ana: {
      hairColor: '#6d4c41', // Brown
      hairStyle: 'short_brown',
      shirtColor: '#1e3a8a', // Blue blazer
      collarColor: '#ea580c', // Orange undershirt
      hasGlasses: true,
      glassesColor: '#dc2626', // Red frames
    },
    carlos: {
      hairColor: '#1a1a1a', // Black
      hairStyle: 'short_black',
      shirtColor: '#166534', // Dark green shirt
      collarColor: '#14532d',
      hasGlasses: false,
      hasHeadphones: true,
    },
    julia: {
      hairColor: '#d97706', // Ruivo/Orange
      hairStyle: 'ruiva_up',
      shirtColor: '#6b21a8', // Purple hoodie
      collarColor: '#581c87',
      hasGlasses: true,
      glassesColor: '#000000',
    },
    marcos: {
      hairColor: '#2b2b2b',
      hairStyle: 'short_black',
      shirtColor: '#4b5563', // Grey polo
      collarColor: '#1f2937',
      hasGlasses: false,
      hasBeard: true,
      beardColor: '#2b2b2b',
    },
    beatriz: {
      hairColor: '#fcd34d', // Blonde
      hairStyle: 'blonde_long',
      shirtColor: '#b45309', // Dark yellow/brown shirt
      collarColor: '#eab308',
      hasGlasses: false,
      hasEarrings: true,
    },
    rafael: {
      hairColor: '#78716c', // Greyish stone
      hairStyle: 'devops_grey',
      shirtColor: '#111827', // Black t-shirt
      collarColor: '#374151',
      hasGlasses: false,
      hasBeard: true,
      beardColor: '#57534e',
    },
  };

  const spec = specs[characterId] || specs.ana;

  // Renders the background grid/card to look like a retro portrait
  return (
    <div 
      className={`relative inline-block border-4 border-retro-border bg-retro-panel p-2 shadow-retro overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {imgState === 'expression' && (
        <img 
          src={`${import.meta.env.BASE_URL}characters/${characterId}_${expression}.png`} 
          alt={`${characterId} (${expression})`} 
          className="w-full h-full object-cover"
          onError={() => setImgState('base')}
        />
      )}

      {imgState === 'base' && (
        <img 
          src={`${import.meta.env.BASE_URL}characters/${characterId}.png`} 
          alt={characterId} 
          className="w-full h-full object-cover"
          onError={() => setImgState('svg')}
        />
      )}

      {imgState === 'svg' && (
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          style={{ shapeRendering: 'crispEdges' }}
          xmlns="http://www.w3.org/2000/svg"
        >
        {/* Background Retro Grid */}
        <rect x="0" y="0" width="24" height="24" fill="#131326" />
        
        {/* Grid pattern lines */}
        <line x1="0" y1="6" x2="24" y2="6" stroke="#1f1f3d" strokeWidth="0.25" />
        <line x1="0" y1="12" x2="24" y2="12" stroke="#1f1f3d" strokeWidth="0.25" />
        <line x1="0" y1="18" x2="24" y2="18" stroke="#1f1f3d" strokeWidth="0.25" />
        <line x1="6" y1="0" x2="6" y2="24" stroke="#1f1f3d" strokeWidth="0.25" />
        <line x1="12" y1="0" x2="12" y2="24" stroke="#1f1f3d" strokeWidth="0.25" />
        <line x1="18" y1="0" x2="18" y2="24" stroke="#1f1f3d" strokeWidth="0.25" />

        {/* 1. Base Body/Shoulders (Y: 17 to 24) */}
        {/* Shadow under neck */}
        <rect x="9" y="16" width="6" height="2" fill={skinShadow} />
        {/* Shoulders */}
        <rect x="4" y="18" width="16" height="6" fill={spec.shirtColor} />
        {/* Collar/Undershirt */}
        <rect x="9" y="18" width="6" height="3" fill={spec.collarColor} />
        {/* Shoulders details (retro style) */}
        <rect x="4" y="18" width="2" height="1" fill="#fff" opacity="0.15" />
        <rect x="18" y="18" width="2" height="1" fill="#fff" opacity="0.15" />

        {/* 2. Face Base (Y: 8 to 16, X: 7 to 17) */}
        <rect x="7" y="8" width="10" height="9" fill={skinColor} />
        {/* Face shadow side */}
        <rect x="15" y="9" width="2" height="8" fill={skinShadow} opacity="0.4" />
        <rect x="7" y="16" width="10" height="1" fill={skinShadow} opacity="0.6" />

        {/* 3. Hair Styles */}
        {spec.hairStyle === 'short_brown' && (
          <>
            <rect x="6" y="6" width="12" height="3" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="16" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="8" y="5" width="8" height="1" fill={spec.hairColor} />
            {/* Bangs */}
            <rect x="8" y="8" width="4" height="1" fill={spec.hairColor} />
          </>
        )}
        {spec.hairStyle === 'short_black' && (
          <>
            <rect x="6" y="6" width="12" height="3" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="3" fill={spec.hairColor} />
            <rect x="16" y="9" width="2" height="3" fill={spec.hairColor} />
            <rect x="7" y="5" width="10" height="1" fill={spec.hairColor} />
            {/* Spiky details */}
            <rect x="8" y="4" width="2" height="1" fill={spec.hairColor} />
            <rect x="14" y="4" width="2" height="1" fill={spec.hairColor} />
          </>
        )}
        {spec.hairStyle === 'ruiva_up' && (
          <>
            {/* Hair base */}
            <rect x="6" y="6" width="12" height="3" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="5" fill={spec.hairColor} />
            <rect x="16" y="9" width="2" height="5" fill={spec.hairColor} />
            <rect x="8" y="5" width="8" height="1" fill={spec.hairColor} />
            {/* Bun on top */}
            <rect x="10" y="3" width="4" height="2" fill={spec.hairColor} />
            <rect x="9" y="4" width="6" height="1" fill={spec.hairColor} />
          </>
        )}
        {spec.hairStyle === 'blonde_long' && (
          <>
            <rect x="6" y="6" width="12" height="3" fill={spec.hairColor} />
            <rect x="5" y="9" width="2" height="9" fill={spec.hairColor} />
            <rect x="17" y="9" width="2" height="9" fill={spec.hairColor} />
            <rect x="4" y="12" width="1" height="5" fill={spec.hairColor} />
            <rect x="19" y="12" width="1" height="5" fill={spec.hairColor} />
            <rect x="8" y="5" width="8" height="1" fill={spec.hairColor} />
            <rect x="7" y="8" width="3" height="1" fill={spec.hairColor} />
            <rect x="14" y="8" width="3" height="1" fill={spec.hairColor} />
          </>
        )}
        {spec.hairStyle === 'devops_grey' && (
          <>
            <rect x="6" y="6" width="12" height="3" fill={spec.hairColor} />
            <rect x="6" y="9" width="2" height="4" fill={spec.hairColor} />
            <rect x="16" y="9" width="2" height="4" fill={spec.hairColor} />
            {/* Grey side streaks */}
            <rect x="6" y="10" width="1" height="2" fill="#d1d5db" />
            <rect x="17" y="10" width="1" height="2" fill="#d1d5db" />
            <rect x="8" y="5" width="8" height="1" fill={spec.hairColor} />
          </>
        )}

        {/* 4. Facial Accessories (Beard, Headphones, Earrings) */}
        {spec.hasBeard && spec.beardColor && (
          <>
            {/* Beard outline */}
            <rect x="7" y="14" width="10" height="3" fill={spec.beardColor} />
            <rect x="8" y="13" width="2" height="1" fill={spec.beardColor} />
            <rect x="14" y="13" width="2" height="1" fill={spec.beardColor} />
            {/* Mouth cutout area */}
            <rect x="10" y="14" width="4" height="2" fill={skinColor} />
          </>
        )}

        {spec.hasHeadphones && (
          <>
            {/* Ear cups */}
            <rect x="5" y="9" width="2" height="4" fill="#dc2626" />
            <rect x="17" y="9" width="2" height="4" fill="#dc2626" />
            <rect x="6" y="10" width="1" height="2" fill="#1f2937" />
            <rect x="17" y="10" width="1" height="2" fill="#1f2937" />
            {/* Band */}
            <rect x="7" y="5" width="10" height="1" fill="#374151" />
          </>
        )}

        {spec.hasEarrings && (
          <>
            <rect x="6" y="14" width="1" height="1" fill="#fbbf24" />
            <rect x="17" y="14" width="1" height="1" fill="#fbbf24" />
          </>
        )}

        {/* 5. Eyes & Eyebrows based on Expression */}
        {/* Eyebrows */}
        {expression === 'angry' ? (
          <>
            {/* Slanted angry brows */}
            <line x1="8" y1="9" x2="10" y2="10" stroke="#000" strokeWidth="1" />
            <line x1="16" y1="9" x2="14" y2="10" stroke="#000" strokeWidth="1" />
          </>
        ) : expression === 'worried' || expression === 'sad' ? (
          <>
            {/* Worried curved up brows */}
            <line x1="8" y1="10" x2="10" y2="9" stroke="#000" strokeWidth="1" />
            <line x1="16" y1="10" x2="14" y2="9" stroke="#000" strokeWidth="1" />
          </>
        ) : (
          <>
            {/* Standard brows */}
            <rect x="8" y="9" width="3" height="1" fill="#000" opacity="0.6" />
            <rect x="13" y="9" width="3" height="1" fill="#000" opacity="0.6" />
          </>
        )}

        {/* Glasses */}
        {spec.hasGlasses && spec.glassesColor && (
          <>
            <rect x="8" y="10" width="3" height="2" fill="none" stroke={spec.glassesColor} strokeWidth="1" />
            <rect x="13" y="10" width="3" height="2" fill="none" stroke={spec.glassesColor} strokeWidth="1" />
            <line x1="11" y1="11" x2="13" y2="11" stroke={spec.glassesColor} strokeWidth="1" />
          </>
        )}

        {/* Eye Pupils */}
        {expression === 'happy' ? (
          <>
            {/* Curved smiling eyes ^ ^ */}
            <line x1="8" y1="11" x2="9" y2="10" stroke="#000" strokeWidth="1" />
            <line x1="10" y1="11" x2="9" y2="10" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="11" x2="15" y2="10" stroke="#000" strokeWidth="1" />
            <line x1="16" y1="11" x2="15" y2="10" stroke="#000" strokeWidth="1" />
          </>
        ) : expression === 'surprised' ? (
          <>
            {/* Wide eyes */}
            <rect x="8" y="10" width="2" height="2" fill="#fff" />
            <rect x="14" y="10" width="2" height="2" fill="#fff" />
            <rect x="9" y="11" width="1" height="1" fill="#000" />
            <rect x="15" y="11" width="1" height="1" fill="#000" />
          </>
        ) : expression === 'confident' ? (
          <>
            {/* Wink on one eye, smug on the other */}
            <rect x="8" y="11" width="2" height="1" fill="#000" /> {/* normal */}
            <line x1="14" y1="11" x2="16" y2="11" stroke="#000" strokeWidth="1" /> {/* wink */}
          </>
        ) : (
          <>
            {/* Standard dot pupils */}
            <rect x="9" y="11" width="1" height="1" fill="#000" />
            <rect x="14" y="11" width="1" height="1" fill="#000" />
          </>
        )}

        {/* 6. Mouth based on Expression */}
        {expression === 'happy' ? (
          <path d="M 10 14 L 11 15 L 13 15 L 14 14" stroke="#000" strokeWidth="1" fill="none" />
        ) : expression === 'sad' ? (
          <path d="M 10 15 L 11 14 L 13 14 L 14 15" stroke="#000" strokeWidth="1" fill="none" />
        ) : expression === 'angry' ? (
          <rect x="10" y="14" width="4" height="2" fill="#ef4444" stroke="#000" strokeWidth="1" /> // Red open shouting mouth
        ) : expression === 'surprised' ? (
          <rect x="11" y="14" width="2" height="2" fill="#000" /> // O face
        ) : expression === 'confident' ? (
          <line x1="10" y1="15" x2="14" y2="14" stroke="#000" strokeWidth="1" /> // Smirk line
        ) : expression === 'worried' ? (
          <path d="M 10 14 L 11 14.5 L 12 14 L 13 14.5 L 14 14" stroke="#000" strokeWidth="1" fill="none" /> // Wobbly line
        ) : (
          <line x1="10" y1="14.5" x2="14" y2="14.5" stroke="#000" strokeWidth="1" /> // Straight line
        )}

        {/* 7. Expression Extras (Sweat, Blush, Anger Marks, Tears, Sparkle) */}
        {expression === 'worried' && (
          <>
            {/* Sweat drops on forehead/side */}
            <rect x="18" y="8" width="1" height="2" fill="#2563eb" />
            <rect x="18" y="11" width="1" height="1" fill="#2563eb" />
          </>
        )}

        {expression === 'angry' && (
          <>
            {/* Red blush lines */}
            <rect x="8" y="13" width="1" height="1" fill="#ef4444" opacity="0.6" />
            <rect x="15" y="13" width="1" height="1" fill="#ef4444" opacity="0.6" />
            {/* Anger cross mark in corner */}
            <path d="M 19 6 L 21 8 M 21 6 L 19 8" stroke="#ef4444" strokeWidth="1" />
          </>
        )}

        {expression === 'sad' && (
          <>
            {/* Blue tear drop */}
            <rect x="8" y="12" width="1" height="2" fill="#3b82f6" />
            <rect x="9" y="13" width="1" height="1" fill="#3b82f6" />
          </>
        )}

        {expression === 'confident' && (
          <>
            {/* Yellow star/sparkle in the corner */}
            <polygon points="19,5 20,3 21,5 23,6 21,7 20,9 19,7 17,6" fill="#fbbf24" />
          </>
        )}
      </svg>
      )}
    </div>
  );
};
