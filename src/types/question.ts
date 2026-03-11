// 1. Criamos a regra para UMA opção de resposta
export interface QuestionOption {
  text: string;      // O texto que o usuário lê (ex: "Concessionária pública")
  nextId?: string;   // Opcional: Para onde o sistema pula se ele clicar aqui (ex: "Q19")
}

// 2. Atualizamos a regra da PERGUNTA para usar a interface acima
export interface Question {
  id: string;
  topic: string;
  text: string;
  responseType: 'Sim/Não' | 'Múltipla Escolha' | 'Seleção' | 'Texto';
  
  // Repare aqui: agora 'options' é uma lista de 'QuestionOption'
  options?: QuestionOption[]; 
  
  trigger?: string;
  nextId?: string;   // Destino padrão (caso a opção não tenha um específico)
  riskWeight: number;
  reportText?: string;
}