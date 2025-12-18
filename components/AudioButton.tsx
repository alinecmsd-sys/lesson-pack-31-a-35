
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService.ts';
import { Voice } from '../types.ts';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  voice?: Voice;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 'md', voice = 'Kore', className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading || !mounted) return;
    
    setLoading(true);
    try {
      await audioService.playText(text, voice as Voice);
    } catch (err) {
      console.error("Falha ao tocar áudio:", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  if (!mounted) return <div className={`w-8 h-8 ${className}`} />;

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3.5',
  };

  return (
    <button
      onClick={handlePlay}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 ${sizeClasses[size]} ${className}`}
      disabled={loading}
      aria-label="Ouvir"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
