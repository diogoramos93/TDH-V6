import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TestProvider } from './context/TestContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { TestPage } from './pages/Test';
import { ResultsFree } from './pages/ResultsFree';
import { Checkout } from './pages/Checkout';
import { Report } from './pages/Report';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogList } from './pages/BlogList';
import { ContentPage } from './pages/ContentPage';
import { STATIC_PAGES, BLOG_POSTS } from './data/content';

function App() {
  return (
    <TestProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result-free" element={<ResultsFree />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/report" element={<Report />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Content Pages (Static) */}
            {Object.values(STATIC_PAGES).map(page => (
              <Route 
                key={page.slug} 
                path={`/${page.slug}`} 
                element={<ContentPage data={page} type="page" />} 
              />
            ))}

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogList />} />
            {BLOG_POSTS.map(post => (
              <Route 
                key={post.slug} 
                path={`/blog/${post.slug}`} 
                element={<ContentPage data={post} type="post" />} 
              />
            ))}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TestProvider>
  );
}

export default App;