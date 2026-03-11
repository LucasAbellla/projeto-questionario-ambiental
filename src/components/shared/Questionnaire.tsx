'use client';

import { useState } from 'react';
import { Question } from '../../types/diagnosis';

interface QuestionnaireProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

export function Questionnaire({ questions, onComplete }: QuestionnaireProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0]?.id);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleAnswer = (answerText: string, fallbackNextId: string) => {
    // Procura se o botão clicado tem uma rota específica nas "options"
    const specificOption = currentQuestion?.options?.find(
      (opt) => opt.text.toLowerCase() === answerText.toLowerCase()
    );
    
    // Se tiver rota específica, usa ela. Se não, usa a rota padrão da pergunta.
    const nextId = specificOption?.nextId || fallbackNextId;

    const newAnswers = { ...answers, [currentQuestionId]: answerText };
    setAnswers(newAnswers);

    if (nextId === 'FIM') {
      onComplete(newAnswers);
    } else {
      setCurrentQuestionId(nextId);
    }
  };

  // REDE DE SEGURANÇA: Mostra exatamente qual pergunta está faltando!
  if (!currentQuestion) {
    return (
      <div className="bg-red-950/30 p-8 rounded-2xl border border-red-900 text-center max-w-2xl mx-auto mt-8">
        <h3 className="text-xl font-bold text-red-500 mb-2">⚠️ Ops! Caminho Quebrado</h3>
        <p className="text-slate-300">
          O sistema tentou ir para a pergunta <strong className="text-white text-lg px-2 py-1 bg-red-900 rounded mx-1">"{currentQuestionId}"</strong>, mas ela não foi encontrada.
        </p>
        <p className="text-sm text-slate-400 mt-4">
          Provavelmente essa pergunta foi apagada por acidente no arquivo <code>questions.json</code> ou o ID está digitado diferente.
        </p>
      </div>
    );
  }

  // Detecta se é uma pergunta de Sim/Não para aplicar o layout lado a lado
  const isYesNoVisual = 
    currentQuestion.responseType === 'Sim/Não' || 
    (currentQuestion.options?.length === 2 && 
     currentQuestion.options.some(o => o.text === 'Sim') && 
     currentQuestion.options.some(o => o.text === 'Não'));

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto w-full transition-all duration-300">
      
      <div className="mb-6">
        <span className="inline-block bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {currentQuestion.topic}
        </span>
      </div>

      <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-8 leading-snug">
        {currentQuestion.text}
      </h3>

      <div className="flex flex-col gap-3">
        {isYesNoVisual ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('Sim', currentQuestion.nextId || 'FIM')}
              className="py-4 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 active:scale-95"
            >
              Sim
            </button>
            <button
              onClick={() => handleAnswer('Não', currentQuestion.nextId || 'FIM')}
              className="py-4 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-all duration-200 active:scale-95"
            >
              Não
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.text, option.nextId)}
                className="w-full text-left py-4 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 flex items-center justify-between group active:scale-[0.98]"
              >
                <span>{option.text}</span>
                <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}