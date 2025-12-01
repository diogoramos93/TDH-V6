import { supabase } from "../lib/supabase";
import { AdminSettings, DashboardStats, SaleRecord } from "../types";

export const AdminService = {
  getStats: async (): Promise<DashboardStats> => {
    // Buscar total de vendas no Supabase
    const { data: sales } = await supabase.from('sales').select('*');
    const paidSales = sales?.filter(s => s.status === 'paid') || [];
    
    return { 
      testsStarted: 0, // Precisaria de uma tabela 'events' para ser preciso
      testsCompleted: 0, 
      salesCount: paidSales.length, 
      totalRevenue: paidSales.reduce((acc, curr) => acc + curr.amount, 0),
      recentSales: [], // Pode ser populado se precisar
      dailyActivity: [] 
    };
  },

  getSales: async (): Promise<SaleRecord[]> => {
    const { data } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false });
    
    return data?.map(d => ({
      id: d.id,
      date: d.created_at,
      amount: d.amount,
      status: d.status,
      category: 'TDAH Test'
    })) || [];
  },

  getSettings: async (): Promise<AdminSettings> => {
    const { data } = await supabase.from('settings').select('*');
    const token = data?.find(i => i.key === 'mp_access_token')?.value || '';
    const price = data?.find(i => i.key === 'price')?.value || '29.90';
    return { mp_access_token: token, price };
  },

  saveSettings: async (settings: AdminSettings): Promise<boolean> => {
    const { error: err1 } = await supabase.from('settings').upsert({ key: 'mp_access_token', value: settings.mp_access_token });
    const { error: err2 } = await supabase.from('settings').upsert({ key: 'price', value: settings.price });
    return !err1 && !err2;
  }
};