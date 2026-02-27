import { useState } from 'react';
import { Home } from './pages/Home';
import { HooksDemo } from './pages/HooksDemo';
import { ApiDemo } from './pages/ApiDemo';

type Page = 'home' | 'hooks' | 'api';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'hooks':
        return <HooksDemo />;
      case 'api':
        return <ApiDemo />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Modern Frontend</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                首页
              </button>
              <button
                onClick={() => setCurrentPage('hooks')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'hooks'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Hooks
              </button>
              <button
                onClick={() => setCurrentPage('api')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'api'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                API
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">{renderPage()}</div>
    </div>
  );
}

export default App;
