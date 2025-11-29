import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="font-bold text-xl text-slate-800">FocusCheck</span>
          </Link>
          <div className="text-sm text-slate-500 hidden sm:block">
            Teste Indicativo de TDAH
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto no-print">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">© 2024 FocusCheck. Todos os direitos reservados.</p>
          <p className="text-xs text-slate-500 mb-4">
            Este teste não substitui um diagnóstico médico profissional. 
            Consulte sempre um especialista.
          </p>
          <div className="flex justify-center gap-4 text-xs opacity-50">
            <Link to="/tdah-o-que-e" className="hover:text-white transition-colors">Sobre TDAH</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Área Administrativa</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};