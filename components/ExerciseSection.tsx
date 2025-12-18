
import React, { useState } from 'react';
import { ExerciseItem } from '../types';
import AudioButton from './AudioButton';

interface ExerciseSectionProps {
  exercises: ExerciseItem[];
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ exercises }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  const handleSelect = (exerciseId: string, option: string) => {
    setAnswers({ ...answers, [exerciseId]: option });
    setResults({ ...results, [exerciseId]: null });
  };

  const checkAnswer = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    if (answers[exerciseId] === exercise.correctAnswer) {
      setResults({ ...results, [exerciseId]: 'correct' });
    } else {
      setResults({ ...results, [exerciseId]: 'wrong' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-2">Prática Interativa</h3>
      {exercises.map((ex, idx) => (
        <div key={ex.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
              {idx + 1}
            </span>
            <p className="text-lg font-medium text-gray-700">{ex.question}</p>
          </div>

          {ex.audioPrompt && (
            <div className="mb-4 flex items-center gap-3 bg-indigo-50 p-3 rounded-lg">
              <span className="text-indigo-600 font-semibold text-sm">Escute a frase:</span>
              <AudioButton text={ex.audioPrompt} size="sm" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {ex.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(ex.id, option)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  answers[ex.id] === option
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300 bg-white text-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => checkAnswer(ex.id)}
              disabled={!answers[ex.id]}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all font-semibold"
            >
              Verificar
            </button>

            {results[ex.id] === 'correct' && (
              <span className="text-green-600 font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Correto!
              </span>
            )}
            {results[ex.id] === 'wrong' && (
              <span className="text-red-600 font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Tente novamente!
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseSection;
