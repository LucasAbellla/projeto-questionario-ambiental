import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; 
import { Resend } from 'resend';

// 1. TRUQUE MÁGICO PARA A VERCEL: Obriga o Next.js a tratar esta rota de forma dinâmica, ignorando-a no 'build'
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 2. MUDANÇA: O Resend agora só é inicializado AQUI DENTRO, no momento exato em que o formulário é enviado
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Recebe os dados enviados pelo formulário
    const body = await request.json();
    const { name, document, email } = body;

    // Calcula a data de validade (7 dias)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Guarda na base de dados (Supabase)
    const { data, error } = await supabase
      .from('sessions')
      .insert([
        {
          client_name: name,
          client_document: document,
          client_email: email,
          expires_at: expiresAt.toISOString(),
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Erro no Supabase:", error);
      return NextResponse.json({ error: 'Erro ao gravar na base de dados.' }, { status: 500 });
    }

    const sessionId = data.id;

    // Cria o link único usando a variável da Vercel
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const magicLink = `${baseUrl}/t/${sessionId}`;

    // Envia o e-mail através do Resend (TEXTOS ATUALIZADOS A PEDIDO DA YUDI)
    await resend.emails.send({
      from: 'Avaliação Ambiental <nao-responda@conformidade.eco.br>',
      to: email,
      subject: 'O seu acesso à Avaliação de Conformidade Ambiental',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #047857;">Olá, ${name}!</h2>
          <p>O seu questionário para a Avaliação de Conformidade Ambiental está disponível.</p>
          <p>Para iniciar o preenchimento, clique no botão abaixo.</p>
          <p>Por motivos de segurança, este link é exclusivo e expirará em 7 dias a contar de hoje.</p>
          
          <a href="${magicLink}" style="display: inline-block; background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; margin-bottom: 20px;">
            Acessar o Questionário
          </a>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #f59e0b; font-size: 13px; color: #475569; line-height: 1.5;">
            <strong>Aviso:</strong> ao concluir o formulário será gerado um resumo da avaliação que pode ser impressa e também será enviada para o email informado. Após a conclusão da avaliação o formulário será bloqueado.
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true, sessionId });

  } catch (error) {
    console.error("Erro fatal:", error);
    return NextResponse.json({ error: 'Ocorreu um erro no servidor.' }, { status: 500 });
  }
}