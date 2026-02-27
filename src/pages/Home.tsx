import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';
import { useState } from 'react';

export const Home = () => {
  const { width, height } = useWindowSize();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: '极速构建',
      description: 'Vite 6 提供毫秒级热更新，开发体验丝般顺滑',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 2,
      title: '类型安全',
      description: 'TypeScript 5 全栈类型支持，告别运行时错误',
      icon: '🛡️',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 3,
      title: '原子化 CSS',
      description: 'Tailwind CSS 快速构建现代化 UI，代码更简洁',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                开箱即用的现代化前端模板
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Modern Frontend
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Template</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              React 18 · TypeScript 5 · Vite 6 · Tailwind CSS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
              >
                🚀 快速开始
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2"
              >
                📖 查看文档
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'React', value: '18+', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
            { label: 'TypeScript', value: '5+', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
            { label: 'Vite', value: '6+', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
            { label: '构建速度', value: '100x', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`text-center p-6 ${stat.color} hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium opacity-80">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Window Size Demo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl">📐</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">窗口大小</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">实时监测</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">宽度</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {width}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">px</div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">高度</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {height}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">px</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Button Demo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">按钮组件</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">多种样式与尺寸</p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">主要按钮</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            {/* Secondary Buttons */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">次要按钮</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </div>
            {/* Outline Buttons */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">轮廓按钮</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">Small</Button>
                <Button variant="outline" size="md">Medium</Button>
                <Button variant="outline" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            为什么选择我们
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            专为现代前端开发量身定制的解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card
              key={feature.id}
              hover
              className={`p-8 bg-gradient-to-br ${feature.color} text-white relative overflow-hidden group cursor-pointer`}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Decorative Elements */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-black/10 rounded-full group-hover:scale-125 transition-transform duration-700" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Active Indicator */}
              {activeFeature === feature.id && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center p-12 shadow-2xl shadow-indigo-500/30">
          <h2 className="text-4xl font-bold mb-4">开始构建吧！</h2>
          <p className="text-xl mb-8 text-white/90">
            立即使用这个模板，节省 80% 的配置时间
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 border-0"
          >
            ⭐ 在 GitHub 上 Star
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/zyhuliang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
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
