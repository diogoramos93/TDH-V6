import { PRICING } from "../constants";

// Interface para os dados do Dashboard
export interface DashboardStats {
  testsStarted: number;
  testsCompleted: number;
  salesCount: number;
  totalRevenue: number;
  recentSales: { id: string; date: string; amount: number }[];
  dailyActivity: { date: string; started: number; completed: number }[];
}

const STORAGE_KEY = 'focuscheck_db_v1';

// Inicializa dados falsos se estiver vazio, para testar o visual
const getInitialData = (): DashboardStats => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);

  // Dados de exemplo para o gráfico não ficar vazio no primeiro acesso
  return {
    testsStarted: 12,
    testsCompleted: 5,
    salesCount: 2,
    totalRevenue: 59.80,
    recentSales: [
      { id: '1', date: new Date(Date.now() - 86400000).toISOString(), amount: 29.90 },
      { id: '2', date: new Date().toISOString(), amount: 29.90 }
    ],
    dailyActivity: [
      { date: '2024-05-20', started: 4, completed: 1 },
      { date: '2024-05-21', started: 8, completed: 4 },
      { date: '2024-05-22', started: 12, completed: 5 },
      { date: '2024-05-23', started: 3, completed: 2 },
      { date: 'Hoje', started: 0, completed: 0 },
    ]
  };
};

export const StatsService = {
  // Retorna todos os dados para o Dashboard
  getStats: (): DashboardStats => {
    return getInitialData();
  },

  // Incrementa teste iniciado
  trackStart: () => {
    const data = getInitialData();
    data.testsStarted += 1;
    
    // Atualiza gráfico de hoje (simplificado)
    const today = data.dailyActivity.find(d => d.date === 'Hoje');
    if (today) today.started += 1;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Incrementa teste concluído
  trackCompletion: () => {
    const data = getInitialData();
    data.testsCompleted += 1;
    
    const today = data.dailyActivity.find(d => d.date === 'Hoje');
    if (today) today.completed += 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Registra venda
  trackSale: () => {
    const data = getInitialData();
    data.salesCount += 1;
    data.totalRevenue += PRICING.amount;
    
    data.recentSales.unshift({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      amount: PRICING.amount
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

/**
 * IMPORTANTE PARA VPS:
 * Para integrar com seu Backend real (Python/Node), substitua as funções acima
 * por chamadas fetch(). Exemplo:
 * 
 * getStats: async () => {
 *   const res = await fetch('/api/admin/stats');
 *   return await res.json();
 * }
 */