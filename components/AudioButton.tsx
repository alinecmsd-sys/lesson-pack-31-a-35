
import React, { useState } from 'react';
import { audioService } from '../services/audioService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  voice?: 'Kore' | 'Puck' | 'Zephyr';
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 'md', voice = 'Kore', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      // Fix: Ensure the voice parameter matches the expected literal union type defined in audioService
      // This prevents the TypeScript compiler from widening the destructured prop to a generic 'string'.
      await audioService.playText(text, voice as 'Kore' | 'Puck' | 'Zephyr');
    } finally {
      // Just a simple visual timeout to show it was clicked
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <button
      onClick={handlePlay}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all flex items-center justify-center disabled:opacity-50 ${sizeClasses[size]} ${className}`}
      disabled={isPlaying}
      title="Play Audio"
    >
      {isPlaying ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
