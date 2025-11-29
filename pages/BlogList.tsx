import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BLOG_POSTS } from '../data/content';

export const BlogList = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <SEO 
        title="Blog FocusCheck - Artigos sobre TDAH em Adultos"
        description="Leia artigos especializados sobre TDAH, hiperatividade, foco e procrastinação. Conteúdo atualizado para adultos neurodivergentes."
        keywords={["blog tdah", "artigos tdah", "informação tdah"]}
      />

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Blog FocusCheck</h1>
        <p className="text-slate-600">Conteúdo, dicas e ciência sobre TDAH em adultos.</p>
      </div>

      <div className="grid gap-6">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
            <article className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-3">
                {post.title}
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center text-blue-600 font-medium text-sm">
                Ler artigo completo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-4H3" />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};