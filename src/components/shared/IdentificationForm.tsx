import React, { useState } from 'react';
import { User, FileText, Mail, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';

interface IdentificationFormProps {
  onComplete: (data: { name: string; document: string; email: string }) => void;
}

export default function IdentificationForm({ onComplete }: IdentificationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', document: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(step + 1);

  // Máscara Inteligente para CPF / CNPJ
  const formatDocument = (value: string) => {
    if (!value) return '';
    
    const numbers = value.replace(/\D/g, '').slice(0, 14);
    
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2');
  };

  // Integração com API (Supabase + Resend) - Movido para o Passo 2
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(3); // Vai direto para a tela de Sucesso (antigo passo 4)
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error || 'Não foi possível gerar a sessão.'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erro de ligação:', error);
      alert('Erro ao ligar ao servidor. Verifica a tua ligação.');
      setIsSubmitting(false);
    }
  };

  // Passo 1: Boas-vindas
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
        <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-emerald-500 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Bem-vindo ao Questionário de Avaliação de Conformidade Ambiental</h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Este sistema foi desenvolvido para realizar um diagnóstico de conformidade legal ambiental 
          com base na legislação federal brasileira. Antes de começarmos, precisamos de alguns dados 
          para personalizar o seu relatório.
        </p>
        <button 
          onClick={handleNext}
          className="w-full sm:w-auto px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-wide"
        >
          COMEÇAR A IDENTIFICAÇÃO
        </button>
      </div>
    );
  }

  // Passo 2: Formulário de Dados
  if (step === 2) {
    return (
      <form onSubmit={handleSubmitForm} className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Identificação do Adquirente</h2>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Nome Completo / Razão Social</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all"
                placeholder="Ex: João Silva ou Empresa Verde LTDA"
                value={formData.name || ''}
                // AQUI ESTÁ A CORREÇÃO QUE CORTA OS NÚMEROS:
                onChange={(e) => {
                  const apenasLetras = e.target.value.replace(/\d/g, '');
                  setFormData({...formData, name: apenasLetras});
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">CNPJ ou CPF</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
                <input 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={formData.document || ''}
                  maxLength={18}
                  onChange={(e) => setFormData({
                    ...formData, 
                    document: formatDocument(e.target.value)
                  })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                E-mail para Envio <span className="text-emerald-500">* (inserir email válido)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
                <input 
                  required
                  type="email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all"
                  placeholder="seu@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-8">
          <p className="text-xs text-slate-400 leading-relaxed text-justify">
            <strong className="text-white">Aviso de Responsabilidade:</strong> Ao continuar, você declara estar ciente de que as informações fornecidas são de sua responsabilidade e que o link do questionário final será encaminhado apenas para o endereço de email informado. Certifique-se de que o email informado está correto.
          </p>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              A preparar ambiente...
            </>
          ) : (
            'Avançar'
          )}
        </button>
      </form>
    );
  }

  // Passo 3: Tela de Sucesso (Antigo passo 4)
  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
      <div className="bg-emerald-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="text-emerald-500 w-10 h-10" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">Link Enviado com Sucesso!</h2>
      
      <p className="text-slate-400 text-lg mb-8">
        Enviámos um link de acesso seguro e único para o e-mail <strong className="text-white">{formData.email}</strong>.
      </p>

      {/* AVISO IMPORTANTE SOLICITADO PELA YUDI */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl mb-8 flex flex-col items-center">
        <AlertTriangle className="text-amber-500 w-8 h-8 mb-3" />
        <h3 className="text-amber-500 font-bold text-lg mb-2">ATENÇÃO</h3>
        <p className="text-amber-200/80 font-medium">
          O LINK DO QUESTIONÁRIO EXPIRA EM 7 DIAS.<br/> 
          Inicie o preenchimento dentro desse prazo.
        </p>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 inline-block text-left">
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <span className="text-emerald-500">✔</span> Verifique a sua caixa de entrada.
        </p>
        <p className="text-sm text-slate-400 flex items-center gap-2 mt-2">
          <span className="text-emerald-500">✔</span> Verifique também a pasta de Spam/Lixo Eletrónico.
        </p>
      </div>
    </div>
  );
}