import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StaticPage, BlogPost } from '../types';

interface ContentPageProps {
  data: StaticPage | BlogPost;
  type: 'page' | 'post';
}

export const ContentPage = ({ data, type }: ContentPageProps) => {
  const navigate = useNavigate();
  const isPost = type === 'post';

  const schema = isPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": (data as BlogPost).excerpt,
    "author": {
      "@type": "Organization",
      "name": "FocusCheck"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": (data as StaticPage).description
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <SEO 
        title={data.title} 
        description={isPost ? (data as BlogPost).excerpt : (data as StaticPage).description}
        keywords={data.keywords}
        type="article"
        schema={schema}
      />

      {/* Breadcrumb */}
      <nav className="flex text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        {isPost && (
          <>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{data.title}</span>
      </nav>

      <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
          {data.title}
        </h1>
        
        {/* Content Body */}
        <div 
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: data.content }} 
        />
        
        {/* CTA Box inside article */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Suspeita de TDAH?</h3>
          <p className="text-slate-600 mb-6">Faça nosso teste gratuito agora mesmo e descubra seu perfil em poucos minutos.</p>
          <button 
            onClick={() => navigate('/test')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Fazer Teste Gratuito
          </button>
        </div>
      </article>
    </div>
  );
};