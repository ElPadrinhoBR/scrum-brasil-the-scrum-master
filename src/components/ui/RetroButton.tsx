import React from 'react';
import { SoundManager } from './SoundManager';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'purple';
  children: React.ReactNode;
}

export const RetroButton: React.FC<RetroButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyle = 'retro-border-interactive px-4 py-2 font-pressstart text-[10px] tracking-wider select-none outline-none';
  
  const variants = {
    primary: 'bg-retro-blue hover:bg-blue-600 text-white',
    secondary: 'bg-retro-panel hover:bg-slate-800 text-retro-text',
    success: 'bg-retro-green hover:bg-green-600 text-black font-bold',
    danger: 'bg-retro-red hover:bg-red-600 text-white',
    warning: 'bg-retro-accent hover:bg-yellow-500 text-black font-bold',
    purple: 'bg-retro-purple hover:bg-purple-600 text-white',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    SoundManager.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
