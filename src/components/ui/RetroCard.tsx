import React from 'react';

interface RetroCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const RetroCard: React.FC<RetroCardProps> = ({
  title,
  children,
  className = '',
  onClick,
}) => {
  const isClickable = !!onClick;
  return (
    <div 
      onClick={onClick}
      className={`bg-retro-panel border-4 border-retro-border p-4 shadow-retro ${
        isClickable ? 'cursor-pointer hover:border-retro-accent transition-colors' : ''
      } ${className}`}
    >
      {title && (
        <div className="border-b-4 border-retro-border pb-2 mb-4">
          <h3 className="font-pressstart text-[10px] text-retro-accent uppercase tracking-wider">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};
