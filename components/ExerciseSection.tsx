
import React, { useState } from 'react';
import { ExerciseItem } from '../types.ts';
import AudioButton from './AudioButton.tsx';

interface ExerciseSectionProps {
  exercises: ExerciseItem[];
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ exercises }) => {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ");
  };

  const handleInputChange = (id: string, value: string) => {
    setUserInputs({ ...userInputs, [id]: value });
    if (results[id]) {
      setResults({ ...results, [id]: null });
    }
  };

  const checkTranslation = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) return;

    const userInput = normalizeText(userInputs[id] || "");
    const correctAnswer = normalizeText(exercise.correctEnglish);

    if (userInput === correctAnswer) {
      setResults({ ...results, [id]: 'correct' });
    } else {
      setResults({ ...results, [id]: 'wrong' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      checkTranslation(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b-2 border-indigo-100 pb-4">
        <h3 className="text-2xl font-bold text-slate-800">Prática de Tradução</h3>
        <p className="text-slate-500 text-sm mt-1">Escreva a tradução correta para o inglês.</p>
      </div>

      {exercises.map((ex, idx) => (
        <div key={ex.id} className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all ${
          results[ex.id] === 'correct' ? 'border-green-200 bg-green-50/30' : 
          results[ex.id] === 'wrong' ? 'border-red-100 bg-red-50/30' : 'border-slate-100 hover:border-indigo-100'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="bg-indigo-600 text-white w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-lg font-semibold text-slate-700 mb-1">{ex.portuguesePrompt}</p>
              {ex.audioHint && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Ajuda de áudio:</span>
                  <AudioButton text={ex.audioHint} size="sm" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Digite em inglês..."
                value={userInputs[ex.id] || ""}
                onChange={(e) => handleInputChange(ex.id, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, ex.id)}
                className={`w-full p-4 rounded-xl border-2 outline-none transition-all text-lg font-medium ${
                  results[ex.id] === 'correct' ? 'border-green-500 bg-white ring-4 ring-green-100' :
                  results[ex.id] === 'wrong' ? 'border-red-400 bg-white ring-4 ring-red-50' :
                  'border-slate-200 focus:border-indigo-500 bg-slate-50'
                }`}
                disabled={results[ex.id] === 'correct'}
              />
              
              {results[ex.id] === 'correct' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => checkTranslation(ex.id)}
                disabled={!userInputs[ex.id] || results[ex.id] === 'correct'}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-all font-bold shadow-lg shadow-indigo-200 active:scale-95"
              >
                Verificar
              </button>

              {results[ex.id] === 'wrong' && (
                <p className="text-red-500 font-bold animate-pulse text-sm">
                  Oops! Tente novamente.
                </p>
              )}
              
              {results[ex.id] === 'correct' && (
                <p className="text-green-600 font-bold text-sm">
                  Perfect! ✨
                </p>
              )}
            </div>
            
            {results[ex.id] === 'wrong' && userInputs[ex.id]?.length > 5 && (
              <div className="mt-2 p-3 bg-slate-100 rounded-lg text-xs text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Dica: Verifique a pontuação e as tag questions.
              </div>
            )}
          </div>
        </div>
      ))}
      
      <div className="p-8 bg-indigo-600 rounded-3xl text-white text-center shadow-xl shadow-indigo-200 mt-12">
        <h4 className="text-xl font-bold mb-2">Lição Concluída?</h4>
        <p className="text-indigo-100 mb-6">Pratique até conseguir escrever todas sem erros!</p>
        <button 
          onClick={() => {
            setUserInputs({});
            setResults({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
        >
          Recomeçar Exercícios
        </button>
      </div>
    </div>
  );
};

export default ExerciseSection;
