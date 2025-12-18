
import React, { useState, useEffect } from 'react';
import { LESSONS } from './data/lessons.ts';
import AudioButton from './components/AudioButton.tsx';
import ExerciseSection from './components/ExerciseSection.tsx';

const App: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(LESSONS[0].id);
  const [activeTab, setActiveTab] = useState<'vocab' | 'sentences' | 'dialogues' | 'exercises'>('vocab');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLesson = LESSONS.find(l => l.id === selectedLessonId) || LESSONS[0];

  const handleLessonChange = (id: number) => {
    setSelectedLessonId(id);
    setActiveTab('vocab');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previne erros de hidratação no Vercel
  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto z-10">
        <div className="p-6 border-b border-slate-100 bg-indigo-600 text-white">
          <h1 className="text-2xl font-bold">English Master</h1>
          <p className="text-indigo-100 text-sm opacity-90">Aprenda com inteligência</p>
        </div>
        <nav className="p-4 space-y-2">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonChange(lesson.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                selectedLessonId === lesson.id
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 shadow-sm'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="font-bold uppercase text-xs opacity-70 mb-1">{lesson.title}</div>
              <div className="font-medium truncate">{lesson.subtitle}</div>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-10 w-full">
        <header className="mb-8">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2 block">
            {currentLesson.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
            {currentLesson.subtitle}
          </h2>
          
          <div className="flex overflow-x-auto pb-2 gap-2 mt-6 border-b border-slate-200">
            {[
              { id: 'vocab', label: 'Vocabulário' },
              { id: 'sentences', label: 'Frases' },
              { id: 'dialogues', label: 'Diálogos' },
              { id: 'exercises', label: 'Exercícios' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-6 py-3 font-semibold rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-indigo-600 bg-white border-b-4 border-indigo-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 min-h-[60vh]">
          {activeTab === 'vocab' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Vocabulário Essencial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLesson.vocabulary.map((item) => (
                  <div key={item.id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-white hover:ring-2 hover:ring-indigo-100 transition-all border border-transparent">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-slate-800">{item.word}</p>
                      <p className="text-slate-500 italic">{item.translation}</p>
                    </div>
                    <AudioButton text={item.word} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sentences' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Frases em Contexto</h3>
              <div className="space-y-4">
                {currentLesson.sentences.map((sentence) => (
                  <div key={sentence.id} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-xl font-medium text-slate-800 leading-relaxed">{sentence.english}</p>
                        <p className="text-slate-500">{sentence.portuguese}</p>
                      </div>
                      <AudioButton text={sentence.english} size="md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dialogues' && (
            <div className="animate-fade-in space-y-8">
              {currentLesson.dialogues.map((dialogue, dIdx) => (
                <div key={dIdx} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">{dialogue.title}</h3>
                  <div className="bg-indigo-50/50 p-6 rounded-3xl space-y-6">
                    {dialogue.parts.map((part) => (
                      <div key={part.id} className={`flex flex-col ${part.speaker === dialogue.parts[0].speaker ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                          part.speaker === dialogue.parts[0].speaker 
                            ? 'bg-white text-slate-800 rounded-bl-none' 
                            : 'bg-indigo-600 text-white rounded-br-none'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-xs uppercase opacity-75">{part.speaker}</span>
                            <AudioButton text={part.text} size="sm" voice={part.speaker === dialogue.parts[0].speaker ? 'Kore' : 'Puck'} className={part.speaker === dialogue.parts[0].speaker ? '' : 'bg-indigo-400 hover:bg-indigo-300'} />
                          </div>
                          <p className="text-lg font-medium mb-1">{part.text}</p>
                          <p className={`text-xs ${part.speaker === dialogue.parts[0].speaker ? 'text-slate-400' : 'text-indigo-200'}`}>{part.translation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercises' && (
            <ExerciseSection exercises={currentLesson.exercises} />
          )}
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
