import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { calculateScore } from '../services/logic';
import { QUESTIONS } from '../constants';
import { StatsService } from '../services/stats';

export const ResultsFree = () => {
  const navigate = useNavigate();
  const { answers } = useTest();
  const trackedRef = useRef(false);

  // Basic validation to prevent skipping test
  if (Object.keys(answers).length < QUESTIONS.length) {
    navigate('/test');
    return null;
  }

  const result = calculateScore(answers);

  useEffect(() => {
    if (!trackedRef.current) {
      StatsService.trackCompletion();
      trackedRef.current = true;
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-slate-900 text-white p-6">
          <p className="text-slate-400 uppercase tracking-wider text-xs font-bold mb-2">Resultado Básico</p>
          <h2 className="text-3xl font-bold">Classificação Indicativa</h2>
        </div>
        
        <div className="p-8 sm:p-12">
          <div className="mb-2 text-sm text-slate-500">Sua tendência ao TDAH é:</div>
          <div className={`inline-block px-6 py-2 rounded-full text-xl font-bold mb-8 ${result.categoryColor.replace('text-', 'bg-').replace('600', '100')} ${result.categoryColor}`}>
            {result.categoryText.toUpperCase()}
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-slate-600 text-lg">
              Seu resultado básico está pronto.
              Para entender quais áreas específicas (Atenção, Impulsividade, Memória) estão afetando você, acesse o relatório completo.
            </p>
          </div>

          {/* Blurred Teaser */}
          <div className="relative border border-slate-200 rounded-xl p-4 mb-8 bg-slate-50 overflow-hidden select-none">
            <div className="filter blur-sm opacity-60">
              <h3 className="font-bold text-left mb-4">Análise Detalhada (Exemplo)</h3>
              <div className="space-y-4">
                <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                <div className="h-4 bg-slate-300 rounded w-full"></div>
                <div className="h-4 bg-slate-300 rounded w-5/6"></div>
              </div>
              <div className="mt-6 flex items-end gap-2 h-32">
                <div className="bg-blue-300 w-1/5 h-1/2 rounded-t"></div>
                <div className="bg-blue-500 w-1/5 h-3/4 rounded-t"></div>
                <div className="bg-blue-200 w-1/5 h-1/3 rounded-t"></div>
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
              <div className="bg-white p-4 rounded-full shadow-lg">
                🔒 Bloqueado
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg shadow-green-200 transition-all transform hover:scale-[1.02]"
          >
            Ver Relatório Completo (R$ 29,90)
          </button>
          
          <p className="mt-4 text-xs text-slate-400">
            Acesso vitalício • Pagamento único • PDF Download
          </p>
        </div>
      </div>
    </div>
  );
};