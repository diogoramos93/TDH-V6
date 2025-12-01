import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializar Supabase
// Nota: Em produção na Vercel, defina as variáveis de ambiente no painel
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zfgyflrzddjlnqmryxuy.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3lmbHJ6ZGRqbG5xbXJ5eHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDYwMTYsImV4cCI6MjA4MDEyMjAxNn0.IwUGkuqNndfAfxP3MP_4bReUHYOPTu0QIwmeKFmhLK8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Configuração de CORS para permitir chamadas do frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Obter Token do Mercado Pago do Banco de Dados
    const { data: settings, error: dbError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'mp_access_token')
      .single();

    if (dbError || !settings) {
      console.error("Erro DB:", dbError);
      throw new Error('Token MP não configurado no banco de dados.');
    }

    // 2. Configurar Mercado Pago (Sintaxe V2)
    const client = new MercadoPagoConfig({ accessToken: settings.value });
    const payment = new Payment(client);

    // 3. Criar Preferência de Pagamento
    const body = {
      transaction_amount: 29.90,
      description: 'Relatório Completo FocusCheck',
      payment_method_id: 'pix',
      payer: {
        email: 'cliente@focuscheck.app',
        first_name: 'Cliente',
        last_name: 'FocusCheck'
      },
      notification_url: `https://${req.headers.host}/api/webhook`
    };

    const result = await payment.create({ body });
    
    // 4. Salvar 'Intenção de Venda' no Supabase
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        external_ref: result.id.toString(),
        amount: 29.90,
        status: 'pending'
      })
      .select()
      .single();

    if (saleError) throw saleError;

    // 5. Retornar QR Code para o Frontend
    return res.status(200).json({
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
      payment_id: result.id,
      internal_id: sale.id
    });

  } catch (error) {
    console.error("Erro API Pagamento:", error);
    return res.status(500).json({ error: error.message || 'Erro interno ao gerar pagamento' });
  }
}