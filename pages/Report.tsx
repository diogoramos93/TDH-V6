import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTest } from '../context/TestContext';
import { calculateScore } from '../services/logic';
import { QUESTIONS, RESULT_TEXTS } from '../constants';

export const Report = () => {
  const navigate = useNavigate();
  const { answers, hasPaid } = useTest();

  // Protect route
  useEffect(() => {
    if (!hasPaid) {
      navigate('/');
    }
  }, [hasPaid, navigate]);

  if (Object.keys(answers).length < QUESTIONS.length) return null;

  const result = calculateScore(answers);
  const resultMeta = RESULT_TEXTS[result.category];
  
  // Data for Chart
  const chartData = result.sectionScores.map(s => ({
    name: s.name,
    score: s.score,
    max: s.max,
    percentage: Math.round((s.score / s.max) * 100)
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white sm:rounded-2xl sm:shadow-xl sm:border border-slate-200 overflow-hidden print:shadow-none print:border-none">
      
      {/* Header / Summary */}
      <div className={`p-8 sm:p-12 text-center text-white bg-gradient-to-br ${result.category === 'Muito Alta' ? 'from-red-600 to-red-800' : result.category === 'Alta' ? 'from-orange-500 to-orange-700' : result.category === 'Moderada' ? 'from-yellow-500 to-yellow-600' : 'from-green-500 to-green-700'}`}>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Relatório de Perfil TDAH</h1>
        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
          <span className="font-bold text-lg tracking-wide uppercase">{result.categoryText}</span>
        </div>
        <div className="text-6xl font-black mb-2">{result.totalScore} <span className="text-2xl font-normal opacity-80">/ 192</span></div>
        <p className="opacity-90">Pontuação Total</p>
      </div>

      <div className="p-8 sm:p-12 space-y-12">
        
        {/* Interpretation */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-blue-600 rounded-full block"></span>
            Interpretação do Resultado
          </h2>
          <div className={`p-6 rounded-xl border-l-4 ${resultMeta.bg} ${resultMeta.border}`}>
            <p className={`text-lg font-medium ${resultMeta.color}`}>
              {resultMeta.description}
            </p>
          </div>
        </section>

        {/* Detailed Chart */}
        <section className="print-break">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-blue-600 rounded-full block"></span>
            Análise por Áreas
          </h2>
          <div className="h-[400px] w-full bg-slate-50 rounded-xl p-4 border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={140} tick={{fontSize: 12, fill: '#475569'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="percentage" barSize={24} radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.percentage > 70 ? '#ef4444' : entry.percentage > 40 ? '#f59e0b' : '#22c55e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">Gráfico: Percentual de impacto percebido por área cognitiva.</p>
        </section>

        {/* Detailed Breakdown */}
        <section>
           <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-blue-600 rounded-full block"></span>
            Detalhamento
          </h2>
          <div className="grid gap-4">
            {chartData.map((item) => (
              <div key={item.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                 <div>
                   <h3 className="font-bold text-slate-700">{item.name}</h3>
                   <div className="text-sm text-slate-500">
                      {item.percentage > 70 ? "Impacto Severo" : item.percentage > 40 ? "Impacto Moderado" : "Pouco Impacto"}
                   </div>
                 </div>
                 <div className="mt-2 sm:mt-0 font-mono font-bold text-slate-600">
                    {item.score} / {item.max} pts
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="print-break">
           <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-blue-600 rounded-full block"></span>
            Recomendações Práticas
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-xl">
               <h3 className="font-bold text-blue-800 mb-2">Busque Avaliação Profissional</h3>
               <p className="text-blue-900/80 text-sm">Este relatório é apenas um indicativo. Leve este documento a um Psiquiatra ou Neurologista para uma avaliação clínica completa.</p>
            </div>
            
            <div className="border border-slate-200 p-6 rounded-xl">
               <h3 className="font-bold text-slate-800 mb-2">Higiene do Sono</h3>
               <p className="text-slate-600 text-sm">A privação de sono piora drasticamente os sintomas de TDAH. Tente manter horários fixos para dormir e acordar.</p>
            </div>

             <div className="border border-slate-200 p-6 rounded-xl">
               <h3 className="font-bold text-slate-800 mb-2">Técnica Pomodoro</h3>
               <p className="text-slate-600 text-sm">Utilize timers de 25 minutos de foco e 5 minutos de pausa para ajudar na gestão da atenção em tarefas longas.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Action Bar */}
      <div className="bg-slate-50 p-8 border-t border-slate-200 flex justify-center no-print">
        <button 
          onClick={handlePrint}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Baixar PDF / Imprimir
        </button>
      </div>
    </div>
  );
};