const fs = require('fs');
const csv = require('csv-parser');

const questions = [];

// ATENÇÃO AQUI: Nome do arquivo atualizado para 'perguntas-1.csv'
fs.createReadStream('perguntas-1.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (!row.ID_PERGUNTA) return;

    let responseType = 'Sim/Não';
    let options = [];

    if (row.TIPO_RESPOSTA && row.TIPO_RESPOSTA.trim() === 'S / N') {
      responseType = 'Sim/Não';
    } else if (row.OPCOES_RESPOSTA && row.OPCOES_RESPOSTA.trim() !== '') {
      responseType = 'Múltipla Escolha';
      
      const separatedOptions = row.OPCOES_RESPOSTA.split('/').map(o => o.trim());
      
      options = separatedOptions.map(opt => ({
        text: opt,
        nextId: row.VAI_PARA_ID ? row.VAI_PARA_ID.trim() : 'FIM'
      }));
    }

    questions.push({
      id: row.ID_PERGUNTA.trim(),
      topic: row.TOPICO ? row.TOPICO.trim() : 'Geral',
      text: row.PERGUNTA_TEXTO ? row.PERGUNTA_TEXTO.trim() : '',
      responseType: responseType,
      options: options,
      trigger: row.GATILHO ? row.GATILHO.trim() : '',
      nextId: row.VAI_PARA_ID ? row.VAI_PARA_ID.trim() : 'FIM',
      riskWeight: parseInt(row.PESO_RISCO) || 0,
      reportText: row.TEXTO_LAUDO ? row.TEXTO_LAUDO.trim() : ''
    });
  })
  .on('end', () => {
    fs.writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
    console.log('✅ Sucesso! O arquivo questions.json foi atualizado com todas as perguntas da planilha.');
  });