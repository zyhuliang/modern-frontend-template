import { useState } from 'react';
import { Home } from './pages/Home';
import { HooksDemo } from './pages/HooksDemo';
import { ApiDemo } from './pages/ApiDemo';
import { HistoryMap } from './components/HistoryMap';
import { Menu, Typography, Space } from 'antd';
import { HomeOutlined, GlobalOutlined, ApiOutlined, ToolOutlined } from '@ant-design/icons';

const { Text } = Typography;

type Page = 'home' | 'hooks' | 'api' | 'map';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const menuItems = [
    { key: 'home', label: '首页', icon: <HomeOutlined /> },
    { key: 'map', label: '历史地图', icon: <GlobalOutlined /> },
    { key: 'hooks', label: 'Hooks', icon: <ToolOutlined /> },
    { key: 'api', label: 'API', icon: <ApiOutlined /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <Text strong className="!text-white !text-base">Modern Frontend</Text>
                <Text className="!text-slate-500 !text-xs block">Template</Text>
              </div>
            </div>

            {/* Navigation Menu */}
            <Menu
              mode="horizontal"
              selectedKeys={[currentPage]}
              onClick={(e) => setCurrentPage(e.key as Page)}
              items={menuItems.map(item => ({
                key: item.key,
                label: (
                  <Space>
                    {item.icon}
                    <span>{item.label}</span>
                  </Space>
                ),
              }))}
              className="!bg-transparent !border-0 !min-w-[400px] !justify-end"
              style={{ flex: 1, justifyContent: 'flex-end' }}
            />
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
