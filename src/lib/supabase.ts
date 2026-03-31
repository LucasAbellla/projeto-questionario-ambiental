import { createClient } from '@supabase/supabase-js';

// Adicionamos valores "placeholder" (de mentira) apenas para o Next.js não "entrar em pânico" 
// durante a fase de construção (build) na Vercel, caso as variáveis demorem a carregar.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://build-placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Cria a ponte de ligação
export const supabase = createClient(supabaseUrl, supabaseKey);