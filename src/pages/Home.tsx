import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modern Frontend
              <br />
              <span className="text-blue-200">Template</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed">
              React 18 · TypeScript 5 · Vite 6 · Tailwind CSS
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 border-0"
              >
                快速开始
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10"
              >
                查看文档
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'React', value: '18' },
              { label: 'TypeScript', value: '5' },
              { label: 'Vite', value: '6' },
              { label: '构建速度', value: '100x' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Window Size Demo */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                窗口大小
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                使用 useWindowSize Hook 实时监测
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">宽度</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {width}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">px</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">高度</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {height}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">px</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Button Demo */}
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              按钮组件
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              多种样式与尺寸，满足各种场景
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Primary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Primary Buttons
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              {/* Secondary */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Secondary Buttons
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                </div>
              </div>

              {/* Outline */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Outline Buttons
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">Small</Button>
                  <Button variant="outline" size="md">Medium</Button>
                  <Button variant="outline" size="lg">Large</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              为什么选择我们
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              专为现代前端开发打造
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '⚡',
                title: '极速构建',
                description: 'Vite 6 提供毫秒级热更新，开发体验丝般顺滑',
              },
              {
                icon: '🛡️',
                title: '类型安全',
                description: 'TypeScript 5 全栈类型支持，告别运行时错误',
              },
              {
                icon: '🎨',
                title: '原子化 CSS',
                description: 'Tailwind CSS 快速构建现代化 UI，代码更简洁',
              },
            ].map((feature, index) => (
              <Card key={index} hover className="h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              开始构建吧！
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              立即使用这个模板，节省 80% 的配置时间
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 border-0"
            >
              在 GitHub 上 Star
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="mb-2">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/zyhuliang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @zyhuliang
              </a>
            </p>
            <p className="text-sm">
              MIT License · Built with React + TypeScript + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
