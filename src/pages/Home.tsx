import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              开箱即用的现代化前端模板
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Modern Frontend
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Template
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              React 18 · TypeScript 5 · Vite 6 · Tailwind CSS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                🚀 快速开始
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                📖 查看文档
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 dark:bg-gray-800/30 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">React 18</div>
              <div className="text-gray-600 dark:text-gray-400">最新版本</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">TS 5</div>
              <div className="text-gray-600 dark:text-gray-400">类型安全</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">Vite 6</div>
              <div className="text-gray-600 dark:text-gray-400">极速构建</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100x</div>
              <div className="text-gray-600 dark:text-gray-400">更快热更新</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              为什么选择这个模板？
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              开箱即用，让你专注于业务逻辑而非配置
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card hover className="p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                极速构建
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vite 6 提供毫秒级热更新，开发体验如丝般顺滑
              </p>
            </Card>

            <Card hover className="p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                类型安全
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                TypeScript 5 全栈类型支持，告别运行时错误
              </p>
            </Card>

            <Card hover className="p-8">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                原子化 CSS
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailwind CSS 快速构建现代化 UI，代码更简洁
              </p>
            </Card>

            <Card hover className="p-8">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                组件丰富
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                预置常用组件和 Hooks，开箱即用
              </p>
            </Card>

            <Card hover className="p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                自动部署
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                GitHub Actions CI/CD，自动测试与部署
              </p>
            </Card>

            <Card hover className="p-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                完整工具
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                API 封装、工具函数、表单验证一应俱全
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-20 bg-white/50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              实时演示
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              看看实际效果如何
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Window Size */}
            <Card hover>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span>📐</span> 窗口大小
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">宽度</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{width}</div>
                  <div className="text-xs text-gray-500 mt-1">px</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">高度</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{height}</div>
                  <div className="text-xs text-gray-500 mt-1">px</div>
                </div>
              </div>
            </Card>

            {/* Component Showcase */}
            <Card hover>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span>🎨</span> 组件展示
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 flex-wrap">
                  <Button variant="primary" size="sm">Primary Small</Button>
                  <Button variant="primary" size="md">Primary Medium</Button>
                  <Button variant="primary" size="lg">Primary Large</Button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button variant="secondary" size="md">Secondary</Button>
                  <Button variant="outline" size="md">Outline</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-4xl font-bold mb-4">
                准备开始了吗？
              </h2>
              <p className="text-xl mb-8 opacity-90">
                立即开始使用，节省 80% 的项目配置时间
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                  onClick={() => window.open('https://github.com/zyhuliang/modern-frontend-template', '_blank')}
                >
                  ⭐ GitHub Star
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                  onClick={() => window.open('https://github.com/zyhuliang/modern-frontend-template', '_blank')}
                >
                  📥 克隆仓库
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/zyhuliang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              @zyhuliang
            </a>
          </p>
          <p className="text-sm text-gray-500">
            MIT License · React · TypeScript · Vite · Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};
