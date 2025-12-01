import { createClient } from '@supabase/supabase-js';
import mercadopago from 'mercadopago';

// Init Supabase (Service Role for Admin access in API)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'https://zfgyflrzddjlnqmryxuy.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'SUA_SERVICE_KEY_AQUI_SE_FOR_PRIVADO_MAS_USE_ANON_PARA_TESTE' // Em prod use variáveis de ambiente da Vercel
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  try {
    // 1. Obter Token do Banco de Dados
    const { data: settings } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'mp_access_token')
      .single();

    if (!settings) throw new Error('Token MP não configurado');

    mercadopago.configure({ access_token: settings.value });

    // 2. Criar Pagamento
    const payment_data = {
      transaction_amount: 29.90,
      description: 'Relatório Completo FocusCheck',
      payment_method_id: 'pix',
      payer: {
        email: 'cliente@email.com', // Pode vir do body se tiver captura de lead
        first_name: 'Cliente',
        last_name: 'FocusCheck'
      },
      notification_url: `https://${req.headers.host}/api/webhook`
    };

    const payment = await mercadopago.payment.create(payment_data);
    
    // 3. Salvar 'Intenção' no Supabase
    const { data: sale, error } = await supabase
      .from('sales')
      .insert({
        external_ref: payment.body.id.toString(),
        amount: 29.90,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Retornar QR Code
    return res.status(200).json({
      qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
      payment_id: payment.body.id,
      internal_id: sale.id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}