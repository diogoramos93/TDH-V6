import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { SEO } from '../components/SEO';
import { STATIC_PAGES } from '../data/content';

export const Home = () => {
  const navigate = useNavigate();
  const { resetTest } = useTest();

  // Reset test on mount to ensure fresh start
  useEffect(() => {
    resetTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FocusCheck",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Teste Indicativo de TDAH para Adultos – Grátis (48 perguntas)"
        description="Faça o teste de TDAH online gratuito com 48 perguntas baseado em critérios clínicos. Descubra seu perfil de atenção e receba um resultado imediato."
        keywords={["teste tdah", "tdah adulto", "quiz tdah", "sintomas tdah"]}
        schema={schema}
      />
      
      <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center animate-fade-in">
        <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-700 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight max-w-3xl">
          Teste de TDAH Online para Adultos
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Sente que sua mente não para? Tem dificuldade de foco?
          <br/>
          Faça nosso teste rápido de <strong>48 perguntas</strong>.
          <br className="hidden sm:block"/>
          <span className="text-sm mt-2 block opacity-80 font-medium">Resultado básico 100% gratuito.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
          <button 
            onClick={() => navigate('/test')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            Iniciar Teste Gratuito
          </button>
        </div>

        {/* Content Links Grid */}
        <div className="max-w-4xl w-full grid md:grid-cols-3 gap-6 text-left">
          {Object.values(STATIC_PAGES).map(page => (
            <Link key={page.slug} to={`/${page.slug}`} className="group p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{page.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-3">{page.description}</p>
              <span className="text-blue-600 text-sm font-medium mt-4 inline-block">Ler mais →</span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
           <Link to="/blog" className="text-slate-500 hover:text-slate-800 font-medium text-sm underline underline-offset-4">
             Ver todos os artigos do Blog
           </Link>
        </div>

        {/* Features / Trust */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl w-full border-t border-slate-200 pt-12">
          <div className="flex gap-3">
             <div className="bg-green-100 p-2 rounded-lg h-fit text-green-700">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <div>
               <div className="font-bold text-slate-800">Resultado Imediato</div>
               <p className="text-slate-600 text-sm mt-1">Sem cadastro prévio. Faça o teste e veja a classificação na hora.</p>
             </div>
          </div>
           <div className="flex gap-3">
             <div className="bg-purple-100 p-2 rounded-lg h-fit text-purple-700">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             </div>
             <div>
               <div className="font-bold text-slate-800">Privacidade Total</div>
               <p className="text-slate-600 text-sm mt-1">Seus dados são processados localmente e não são vendidos.</p>
             </div>
          </div>
           <div className="flex gap-3">
             <div className="bg-blue-100 p-2 rounded-lg h-fit text-blue-700">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
             </div>
             <div>
               <div className="font-bold text-slate-800">Relatório Completo</div>
               <p className="text-slate-600 text-sm mt-1">Opção de análise detalhada com gráficos e recomendações.</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};