import { QuestionOption } from '../types/question';

/**
 * Transforma a string da planilha em um array de objetos QuestionOption.
 * Exemplo: "( )ela mesma Q18.2; ( )concessionária pública" 
 * vira [{ text: "ela mesma", nextId: "Q18.2" }, { text: "concessionária pública" }]
 */
export function parseOptions(optionsString: string): QuestionOption[] {
  if (!optionsString) return [];

  // 1. Separa as opções pelo ponto e vírgula
  return optionsString.split(';').map(optionText => {
    // 2. Limpa os parênteses ( ) e espaços em branco
    let cleanText = optionText.replace(/\(\s*\)/g, '').trim();

    // 3. Expressão Regular para encontrar IDs no formato Q + número (ex: Q18.2 ou Q19)
    const idMatch = cleanText.match(/Q\d+(\.\d+)?$/);
    
    if (idMatch) {
      const nextId = idMatch[0];
      // Remove o ID do texto da opção para não ficar repetido na interface
      const label = cleanText.replace(nextId, '').trim();
      
      return { text: label, nextId: nextId };
    }

    // Se não encontrar um ID específico, retorna apenas o texto
    return { text: cleanText };
  });
}