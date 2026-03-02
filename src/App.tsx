import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeToggle, ErrorBoundary, ScrollToTop, ReadingProgress, Loading } from './components';
import { Button, Space } from 'antd';
import { HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const BlogList = lazy(() => import('./pages/blog/BlogList').then(m => ({ default: m.BlogList })));
const BlogPost = lazy(() => import('./pages/blog/BlogPost').then(m => ({ default: m.BlogPost })));

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { key: '/', label: '首页', icon: <HomeOutlined />, path: '/' },
    { key: '/blog', label: '博客', icon: <BookOutlined />, path: '/blog' },
    { key: '/about', label: '关于', icon: <UserOutlined />, path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-lg">
      <ReadingProgress />
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
            <span className="text-2xl">📝</span>
            <span>My Blog</span>
          </Link>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Space size={8}>
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link key={item.key} to={item.path}>
                    <Button
                      type={active ? 'primary' : 'text'}
                      icon={item.icon}
                      className={`!h-10 !px-5 !rounded-xl !text-sm !font-medium transition-all duration-300 ${
                        active
                          ? '!shadow-lg !shadow-blue-500/30'
                          : '!text-gray-600 dark:!text-slate-400 hover:!text-gray-900 dark:hover:!text-white hover:!bg-gray-100 dark:hover:!bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </Space>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            <Navigation />
            <ScrollToTop />
            <main className="pt-20">
              <Suspense fallback={<Loading fullScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Suspense>
            </main>
            
            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-200 dark:border-slate-800">
              <div className="container mx-auto max-w-4xl text-center text-gray-500 dark:text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} My Blog. Built with React + Vite + Tailwind CSS</p>
                <p className="mt-2">
                  Powered by{' '}
                  <a 
                    href="https://github.com/zyhuliang" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    @zyhuliang
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
