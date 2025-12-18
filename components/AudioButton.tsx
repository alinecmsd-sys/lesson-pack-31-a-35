
import React, { useState, useEffect } from 'react';
import { playTextToSpeech } from '../services/audioService.ts';
import { Voice } from '../types.ts';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  voice?: Voice;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 'md', voice = 'Kore', className = '' }) => {
  const [loading, setLoading] = useState(false);
  // Regra 4: Proteção contra SSR usando mounted flag
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
      // Added explicit cast to Voice to resolve string vs literal union type mismatch error
      // Regra 2: Execução apenas após clique do usuário
      await playTextToSpeech(text, voice as Voice);
    } catch (err) {
      // Regra 7: try/catch para evitar crash
      console.error("Audio play failure:", err);
    } finally {
      // Delay pequeno para feedback visual
      setTimeout(() => setLoading(false), 600);
    }
  };

  // Regra 4: Se não estiver montado, não renderiza nada que possa usar APIs do navegador
  if (!mounted) return <div className={`inline-block ${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'}`} />;

  const sizeClasses = {
    sm: 'p-1.5 w-8 h-8',
    md: 'p-2.5 w-10 h-10',
    lg: 'p-3.5 w-12 h-12',
  };

  return (
    <button
      onClick={handlePlay}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all active:scale-90 flex items-center justify-center disabled:opacity-50 shrink-0 ${sizeClasses[size]} ${className}`}
      disabled={loading}
      title="Ouvir áudio"
    >
      {loading ? (
        <svg className="animate-spin h-full w-full" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
