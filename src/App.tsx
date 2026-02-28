import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { BlogList } from './pages/blog/BlogList';
import { BlogPost } from './pages/blog/BlogPost';
import { Button, Space } from 'antd';
import { HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-2xl">📝</span>
            <span>My Blog</span>
          </Link>
          
          {/* Navigation Buttons */}
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
                        : '!text-slate-400 hover:!text-white hover:!bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </Space>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-800">
          <div className="container mx-auto max-w-4xl text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} My Blog. Built with React + Vite + Tailwind CSS</p>
            <p className="mt-2">
              Powered by{' '}
              <a 
                href="https://github.com/zyhuliang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                @zyhuliang
              </a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
