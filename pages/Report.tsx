import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTest } from '../context/TestContext';
import { calculateScore } from '../services/logic';
import { QUESTIONS, RESULT_TEXTS } from '../constants';
import { PDFDocument } from '../components/PDFDocument';

export const Report = () => {
  const navigate = useNavigate();
  const { answers, hasPaid } = useTest();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!hasPaid) {
      navigate('/');
    }
  }, [hasPaid, navigate]);

  if (Object.keys(answers).length < QUESTIONS.length) return null;

  const result = calculateScore(answers);
  const resultMeta = RESULT_TEXTS[result.category];
  
  const chartData = result.sectionScores.map(s => ({
    name: s.name,
    score: s.score,
    max: s.max,
    percentage: Math.round((s.score / s.max) * 100)
  }));

  return (
    <div className="max-w-4xl mx-auto bg-white sm:rounded-2xl sm:shadow-xl sm:border border-slate-200 overflow-hidden">
      
      {/* Header */}
      <div className={`p-8 sm:p-12 text-center text-white bg-gradient-to-br ${result.category === 'Muito Alta' ? 'from-red-600 to-red-800' : result.category === 'Alta' ? 'from-orange-500 to-orange-700' : result.category === 'Moderada' ? 'from-yellow-500 to-yellow-600' : 'from-green-500 to-green-700'}`}>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Relatório de Perfil TDAH</h1>
        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
          <span className="font-bold text-lg tracking-wide uppercase">{result.categoryText}</span>
        </div>
        <div className="text-6xl font-black mb-2">{result.totalScore} <span className="text-2xl font-normal opacity-80">/ 192</span></div>
      </div>

      <div className="p-8 sm:p-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Interpretação</h2>
          <div className={`p-6 rounded-xl border-l-4 ${resultMeta.bg} ${resultMeta.border}`}>
            <p className={`text-lg font-medium ${resultMeta.color}`}>
              {resultMeta.description}
            </p>
          </div>
        </section>

        <section className="h-[300px] w-full bg-slate-50 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={chartData} margin={{ left: 20 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" width={140} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="percentage" barSize={20} radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.percentage > 70 ? '#ef4444' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* PDF Download Button */}
        <div className="flex justify-center pt-8">
          {isClient && (
            <PDFDownloadLink
              document={<PDFDocument data={result} date={new Date().toLocaleDateString()} />}
              fileName="Relatorio_FocusCheck.pdf"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {({ loading }) => 
                loading ? 'Gerando PDF...' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Baixar Relatório Oficial em PDF
                  </>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
};