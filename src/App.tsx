import { useState } from 'react';
import { Home } from './pages/Home';
import { HooksDemo } from './pages/HooksDemo';
import { ApiDemo } from './pages/ApiDemo';
import { HistoryMap } from './components/HistoryMap';

type Page = 'home' | 'hooks' | 'api' | 'map';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navItems = [
    { key: 'home', label: '首页' },
    { key: 'map', label: '🗺️ 历史地图' },
    { key: 'hooks', label: 'Hooks' },
    { key: 'api', label: 'API' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="hidden sm:block text-white font-semibold">Modern Frontend</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentPage(item.key as Page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-14">{renderPage(currentPage)}</div>
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
