'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';

import { Questionnaire } from '../components/shared/Questionnaire';
import { ComplianceChart } from '../components/shared/ComplianceChart';
import { ExportPDFButton } from '../components/shared/ExportPDFButton';
import { DiagnosisService } from '../services/diagnosis';
import { FinalDiagnosis } from '../types/diagnosis';

import questionsData from '../data/questions.json';

export default function Home() {
  const [diagnosis, setDiagnosis] = useState<FinalDiagnosis | null>(null);

  const handleComplete = (answers: Record<string, string>) => {
    const result = DiagnosisService.calculate(questionsData as any, answers);
    setDiagnosis(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      
      <header className="bg-emerald-700 dark:bg-emerald-900 text-white shadow-md px-6 py-4 flex items-center gap-3">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-full">
          <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide">EnvCheck</h1>
          <p className="text-emerald-100 dark:text-emerald-200 text-xs uppercase tracking-widest">Diagnóstico Ambiental</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl">
          
          {!diagnosis ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Nova Avaliação</h2>
                <p className="text-slate-500 dark:text-slate-400">Responda às questões abaixo para gerar o laudo.</p>
              </div>
              <Questionnaire questions={questionsData as any} onComplete={handleComplete} />
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
              
              {/* ÁREA DO RELATÓRIO (O que vai para o PDF) */}
              <div id="area-relatorio" className="p-8 md:p-12 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800">
                
                {/* 1. Cabeçalho Oficial do Documento */}
                <div className="border-b border-slate-800 pb-6 mb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Leaf className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Laudo de Diagnóstico Ambiental</h2>
                  <p className="text-slate-400">
                    Gerado em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                  </p>
                  <p className="text-emerald-500 font-semibold mt-2 tracking-widest uppercase text-sm">Documento Confidencial</p>
                </div>
                
                {/* 2. O Gráfico */}
                <ComplianceChart data={diagnosis.scores} />

                {/* 3. NOVO: Tabela de Desempenho por Categoria */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4 border-b border-slate-800 pb-2">Desempenho por Categoria</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diagnosis.scores.map((score, idx) => (
                      <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="font-medium text-slate-300">{score.name}</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-sm 
                          ${score.value >= 80 ? 'bg-emerald-900/50 text-emerald-400' : 
                            score.value >= 50 ? 'bg-yellow-900/50 text-yellow-400' : 
                            'bg-red-900/50 text-red-400'}`}>
                          {score.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Alertas Críticos */}
                {diagnosis.alerts.length > 0 && (
                  <div className="mt-12 bg-slate-900 p-6 rounded-xl border-l-4 border-l-red-500 border border-t-slate-800 border-r-slate-800 border-b-slate-800">
                    <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                      <span>⚠️</span> Exigências Legais e Recomendações
                    </h3>
                    <ul className="space-y-3">
                      {diagnosis.alerts.map((alert, index) => (
                        <li key={index} className="text-slate-300 bg-red-950/30 p-4 rounded-lg text-sm border border-red-900/30">
                          {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => setDiagnosis(null)}
                  className="w-full md:w-auto bg-slate-800 text-slate-300 px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-sm"
                >
                  🔄 Refazer Questionário
                </button>
                <ExportPDFButton elementId="area-relatorio" />
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}