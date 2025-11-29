import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AdminService } from '../services/admin';
import { DashboardStats, SaleRecord, AdminSettings } from '../types';

type Tab = 'dashboard' | 'sales' | 'settings';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [loading, setLoading] = useState(true);
  
  // State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({ mp_access_token: '', price: '' });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_session');
    if (!isAuth) {
      navigate('/admin');
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    if (activeTab === 'dashboard') {
      const data = await AdminService.getStats();
      setStats(data);
    } else if (activeTab === 'sales') {
      const data = await AdminService.getSales();
      setSales(data);
    } else if (activeTab === 'settings') {
      const data = await AdminService.getSettings();
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Salvando...');
    const success = await AdminService.saveSettings(settings);
    if (success) {
      setSaveStatus('Configurações salvas com sucesso!');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Erro ao salvar.');
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Receita Total</div>
          <div className="text-3xl font-bold text-green-600">
            R$ {stats?.totalRevenue.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-xs text-slate-400 mt-2">{stats?.salesCount} vendas aprovadas</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Testes</div>
          <div className="text-3xl font-bold text-slate-800">{stats?.testsStarted}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Taxa de Conversão</div>
          <div className="text-3xl font-bold text-purple-600">
            {stats && stats.testsStarted > 0 ? ((stats.salesCount / stats.testsStarted) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Histórico de Transações</h3>
        <button onClick={loadData} className="text-sm text-blue-600 hover:underline">Atualizar</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50">
            <tr>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">ID Ref</th>
              <th className="px-6 py-3">Classificação</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-600">
                  {new Date(sale.date).toLocaleDateString('pt-BR')} <br/>
                  <span className="text-xs opacity-50">{new Date(sale.date).toLocaleTimeString('pt-BR')}</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">{sale.id.substring(0, 8)}...</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                    {sale.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {sale.status === 'paid' ? (
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">PAGO</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">PENDENTE</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-700">R$ {sale.amount.toFixed(2)}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Nenhum registro encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Integração de Pagamento</h3>
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Preço do Relatório (R$)</label>
          <input
            type="number"
            step="0.01"
            value={settings.price}
            onChange={(e) => setSettings({...settings, price: e.target.value})}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Mercado Pago Access Token
            <span className="ml-2 text-xs text-slate-400 font-normal">(Produção ou Teste)</span>
          </label>
          <input
            type="text"
            value={settings.mp_access_token}
            onChange={(e) => setSettings({...settings, mp_access_token: e.target.value})}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
            placeholder="APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          />
          <p className="mt-2 text-xs text-slate-500">
            Obtenha este token em: <a href="https://www.mercadopago.com.br/developers/panel" target="_blank" rel="noreferrer" className="text-blue-600 underline">Painel de Desenvolvedor Mercado Pago</a>
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto"
          >
            Salvar Configurações
          </button>
          {saveStatus && (
            <span className={`ml-4 text-sm font-medium ${saveStatus.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>
              {saveStatus}
            </span>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
          <p className="text-slate-500">Gerencie sua plataforma</p>
        </div>
        <button 
          onClick={() => {
             localStorage.removeItem('admin_session');
             navigate('/');
          }}
          className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Sair do Sistema
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab('sales')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'sales' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Relatório de Vendas
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          Configurações API
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'sales' && renderSales()}
          {activeTab === 'settings' && renderSettings()}
        </>
      )}
    </div>
  );
};
