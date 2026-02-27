import { useState } from 'react';
import { Home } from './pages/Home';
import { HooksDemo } from './pages/HooksDemo';
import { ApiDemo } from './pages/ApiDemo';

type Page = 'home' | 'hooks' | 'api';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Modern Frontend
                </h1>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              {(['home', 'hooks', 'api'] as Page[]).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {page === 'home' ? '首页' : page === 'hooks' ? 'Hooks' : 'API'}
                </button>
              ))}
            </div>
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
    default:
      return <Home />;
  }
}

export default App;
