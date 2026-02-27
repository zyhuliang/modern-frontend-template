import { useState } from 'react';
import { Home } from './pages/Home';
import { HooksDemo } from './pages/HooksDemo';
import { ApiDemo } from './pages/ApiDemo';
import { HistoryMap } from './components/HistoryMap';
import { Button, Space } from 'antd';
import { HomeOutlined, GlobalOutlined, ApiOutlined, ToolOutlined } from '@ant-design/icons';

type Page = 'home' | 'hooks' | 'api' | 'map';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navItems = [
    { key: 'home', label: '首页', icon: <HomeOutlined /> },
    { key: 'map', label: '历史地图', icon: <GlobalOutlined /> },
    { key: 'hooks', label: 'Hooks', icon: <ToolOutlined /> },
    { key: 'api', label: 'API', icon: <ApiOutlined /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-16">
            {/* Navigation Buttons */}
            <Space size={8}>
              {navItems.map((item) => {
                const isActive = currentPage === item.key;
                return (
                  <Button
                    key={item.key}
                    type={isActive ? 'primary' : 'text'}
                    icon={item.icon}
                    onClick={() => setCurrentPage(item.key as Page)}
                    className={`!h-11 !px-6 !rounded-xl !text-base !font-medium transition-all duration-300 ${
                      isActive
                        ? '!shadow-lg !shadow-blue-500/30'
                        : '!text-slate-400 hover:!text-white hover:!bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Space>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-16">{renderPage(currentPage)}</div>
    </div>
  );
}

function renderPage(currentPage: Page) {
  switch (currentPage) {
    case 'home':
      return <Home />;
    case 'hooks':
      return <HooksDemo />;
    case 'api':
      return <ApiDemo />;
    case 'map':
      return <HistoryMap />;
    default:
      return <Home />;
  }
}

export default App;
