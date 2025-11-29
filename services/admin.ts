import { AdminSettings, DashboardStats, SaleRecord } from "../types";

const API_URL = '/api/admin';

export const AdminService = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      if (!res.ok) throw new Error('Falha ao carregar stats');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { testsStarted: 0, testsCompleted: 0, salesCount: 0, totalRevenue: 0 };
    }
  },

  getSales: async (): Promise<SaleRecord[]> => {
    try {
      const res = await fetch(`${API_URL}/sales`);
      if (!res.ok) throw new Error('Falha ao carregar vendas');
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getSettings: async (): Promise<AdminSettings> => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      if (!res.ok) throw new Error('Falha ao carregar configurações');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { mp_access_token: '', price: '29.90' };
    }
  },

  saveSettings: async (settings: AdminSettings): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return res.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
