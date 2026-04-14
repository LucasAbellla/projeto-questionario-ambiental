import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// A "VACINA": Se a URL não começar com https://, nós adicionamos à força
const supabaseUrl = rawUrl.startsWith('http') 
  ? rawUrl 
  : `https://${rawUrl}`;

if (!rawUrl || !supabaseKey) {
  console.warn("⚠️ Atenção: Variáveis do Supabase não encontradas!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);