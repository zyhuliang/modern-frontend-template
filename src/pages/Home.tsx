import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm text-blue-300 font-medium">现代化前端开发模板</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Modern Frontend
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Template
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
              React 18 · TypeScript 5 · Vite 6 · Tailwind CSS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-0">
                快速开始
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-white/5"
              >
                查看文档
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'React', value: '18+', color: 'text-blue-400' },
              { label: 'TypeScript', value: '5+', color: 'text-cyan-400' },
              { label: 'Vite', value: '6+', color: 'text-indigo-400' },
              { label: '构建速度', value: '100x', color: 'text-emerald-400' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                核心特性
              </h2>
              <p className="text-lg text-slate-400">
                专为现代前端开发打造的完整解决方案
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: '极速构建',
                  description: 'Vite 6 提供毫秒级热更新，开发体验丝般顺滑',
                  gradient: 'from-blue-500/10 to-blue-500/5',
                  border: 'border-blue-500/20',
                },
                {
                  icon: '🛡️',
                  title: '类型安全',
                  description: 'TypeScript 5 全栈类型支持，告别运行时错误',
                  gradient: 'from-cyan-500/10 to-cyan-500/5',
                  border: 'border-cyan-500/20',
                },
                {
                  icon: '🎨',
                  title: '原子化 CSS',
                  description: 'Tailwind CSS 快速构建现代化 UI，代码更简洁',
                  gradient: 'from-indigo-500/10 to-indigo-500/5',
                  border: 'border-indigo-500/20',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                组件演示
              </h2>
              <p className="text-lg text-slate-400">
                实时展示模板中的核心组件
              </p>
            </div>

            {/* Window Size Card */}
            <Card className="mb-8 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">窗口大小</h3>
                  <p className="text-sm text-slate-400">使用 useWindowSize Hook</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-xl">📐</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-xl p-4 text-center">
                  <div className="text-sm text-slate-400 mb-1">宽度</div>
                  <div className="text-2xl font-bold text-white">{width}</div>
                  <div className="text-xs text-slate-500 mt-1">px</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 text-center">
                  <div className="text-sm text-slate-400 mb-1">高度</div>
                  <div className="text-2xl font-bold text-white">{height}</div>
                  <div className="text-xs text-slate-500 mt-1">px</div>
                </div>
              </div>
            </Card>

            {/* Buttons Card */}
            <Card className="bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">按钮组件</h3>
                  <p className="text-sm text-slate-400">多种样式与尺寸</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-slate-400 mb-3">Primary</div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-3">Secondary</div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm">Small</Button>
                    <Button variant="secondary" size="md">Medium</Button>
                    <Button variant="secondary" size="lg">Large</Button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-3">Outline</div>
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
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              开始构建你的项目
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              立即使用这个模板，节省 80% 的配置时间
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 border-0"
            >
              ⭐ 在 GitHub 上 Star
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400">
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
            <p className="text-sm text-slate-500">
              MIT License · Built with React + TypeScript + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
