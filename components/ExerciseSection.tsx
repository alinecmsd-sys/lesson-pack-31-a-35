
import React, { useState, useEffect } from 'react';
import { ExerciseItem } from '../types.ts';
import AudioButton from './AudioButton.tsx';

interface ExerciseSectionProps {
  exercises: ExerciseItem[];
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ exercises }) => {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'wrong' | null>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b-2 border-indigo-100 pb-4">
        <h3 className="text-2xl font-bold text-slate-800">Prática de Tradução</h3>
        <p className="text-slate-500 text-sm mt-1">Escreva a tradução correta para o inglês e clique em verificar.</p>
      </div>

      {exercises.map((ex, idx) => (
        <div key={ex.id} className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all duration-300 ${
          results[ex.id] === 'correct' ? 'border-green-300 bg-green-50/50' : 
          results[ex.id] === 'wrong' ? 'border-red-200 bg-red-50/50' : 'border-slate-100 hover:border-indigo-100'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="bg-indigo-600 text-white w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-700">{ex.portuguesePrompt}</p>
              {ex.audioHint && (
                <div className="flex items-center gap-3 mt-3 p-2 bg-slate-50 rounded-xl inline-flex border border-slate-100">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest pl-2">Escutar Resposta:</span>
                  <AudioButton text={ex.audioHint} size="sm" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: She teaches English, doesn't she?"
                value={userInputs[ex.id] || ""}
                onChange={(e) => handleInputChange(ex.id, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, ex.id)}
                className={`w-full p-4 pr-12 rounded-xl border-2 outline-none transition-all text-lg font-medium shadow-inner ${
                  results[ex.id] === 'correct' ? 'border-green-500 bg-white ring-4 ring-green-100' :
                  results[ex.id] === 'wrong' ? 'border-red-400 bg-white ring-4 ring-red-50' :
                  'border-slate-200 focus:border-indigo-500 bg-slate-50 focus:bg-white'
                }`}
                disabled={results[ex.id] === 'correct'}
                spellCheck={false}
              />
              
              {results[ex.id] === 'correct' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-bounce">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => checkTranslation(ex.id)}
                disabled={!userInputs[ex.id] || results[ex.id] === 'correct'}
                className="px-10 py-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95"
              >
                Verificar Resposta
              </button>

              {results[ex.id] === 'wrong' && (
                <div className="flex items-center gap-2 text-red-600 font-bold animate-pulse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Tente novamente
                </div>
              )}
              
              {results[ex.id] === 'correct' && (
                <div className="flex items-center gap-2 text-green-600 font-extrabold text-lg">
                  Excelente!
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="p-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white text-center shadow-2xl shadow-indigo-200 mt-16">
        <h4 className="text-2xl font-bold mb-3">Missão Cumprida?</h4>
        <p className="text-indigo-100 mb-8 max-w-md mx-auto">Complete todas as traduções corretamente para dominar esta lição!</p>
        <button 
          onClick={() => {
            setUserInputs({});
            setResults({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
        >
          Limpar e Recomeçar
        </button>
      </div>
    </div>
  );
};

export default ExerciseSection;
