// Define o formato das opções de múltipla escolha
export interface QuestionOption {
  text: string;
  nextId: string;
}

// Define o formato exato de uma Pergunta no nosso JSON
export interface Question {
  id: string;
  topic: string;
  text: string;
  responseType: string;
  options?: QuestionOption[];
  trigger?: string;
  nextId?: string;
  riskWeight: number;
  reportText?: string;
}

// 📊 Define o formato dos dados que vão para o Gráfico (O que estava faltando!)
export interface CategoryScore {
  name: string;
  value: number;
}

// Define o formato do resultado final gerado pelo motor
export interface FinalDiagnosis {
  scores: CategoryScore[]; // Agora usa o CategoryScore que criamos acima
  alerts: string[];
}