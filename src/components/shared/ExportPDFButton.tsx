'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPDFButtonProps {
  elementId: string;
}

export function ExportPDFButton({ elementId }: ExportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(element, { 
        scale: 2, 
        backgroundColor: '#020617' // Mantém o fundo noturno (slate-950)
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Adiciona a primeira página
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      // Se a imagem for maior que a folha, cria novas páginas
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Relatorio_Auditoria_EnvCheck.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o relatório.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-3
        ${isGenerating 
          ? 'bg-slate-700 cursor-not-allowed' 
          : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95'
        }`}
    >
      {isGenerating ? 'Processando Documento...' : '📄 Baixar Relatório Completo'}
    </button>
  );
}