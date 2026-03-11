import { Question, CategoryScore, FinalDiagnosis } from '../types/diagnosis';

export class DiagnosisService {
  /**
   * Processa as respostas e gera o diagnóstico final.
   */
  static calculate(questions: Question[], userAnswers: Record<string, string>): FinalDiagnosis {
    const topicResults: Record<string, { points: number; total: number }> = {};
    const alerts: string[] = [];

    if (!questions || questions.length === 0) return this.getEmptyDiagnosis();

    questions.forEach((q) => {
      const answer = userAnswers[q.id];
      
      // Se a pergunta não foi respondida (foi pulada), ignora ela no cálculo.
      if (!answer) return;

      // CORREÇÃO 1: Normalização de texto. 
      // Transforma "geral", "GERAL" e " Geral " em "Geral" para não duplicar no gráfico.
      const rawTopic = (q.topic || "Geral").trim();
      const topicName = rawTopic.charAt(0).toUpperCase() + rawTopic.slice(1).toLowerCase();
      
      if (!topicResults[topicName]) {
        topicResults[topicName] = { points: 0, total: 0 };
      }

      // Base para o cálculo da teia (total de pontos possíveis apenas das respondidas)
      topicResults[topicName].total += (q.riskWeight || 0);

      // Se a resposta do usuário for IGUAL ao gatilho de risco
      if (answer === q.trigger && (q.riskWeight || 0) > 0) {
        topicResults[topicName].points += q.riskWeight;
        
        if (q.reportText) {
          alerts.push(q.reportText);
        }
      }
    });

    // CORREÇÃO 2: Filtrar categorias com total == 0 para evitar o falso 100%
    const scores: CategoryScore[] = Object.entries(topicResults)
      .filter(([_, data]) => data.total > 0) // O PULO DO GATO: Ignora tópicos sem peso de risco
      .map(([topic, data]) => {
        const riskRatio = data.points / data.total; 
        
        return {
          name: topic, 
          value: Math.round((1 - riskRatio) * 100), 
        };
      });

    return {
      scores,
      alerts,
    };
  }

  private static getEmptyDiagnosis(): FinalDiagnosis {
    return { scores: [], alerts: [] };
  }
}