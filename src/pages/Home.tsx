import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Modern Frontend Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            React + TypeScript + Vite + Tailwind CSS
          </p>
        </div>

        {/* Window Size Demo */}
        <Card className="max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-4">窗口大小</h2>
          <p className="text-gray-600 dark:text-gray-300">
            宽度: {width}px | 高度: {height}px
          </p>
        </Card>

        {/* Button Demo */}
        <Card className="max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-4">按钮示例</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="primary" size="md">Primary Medium</Button>
            <Button variant="primary" size="lg">Primary Large</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="outline" size="md">Outline</Button>
          </div>
        </Card>

        {/* Card Demo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card hover>
            <h3 className="text-lg font-bold mb-2">特性 1</h3>
            <p className="text-gray-600 dark:text-gray-300">
              高性能构建工具，快速热更新
            </p>
          </Card>
          <Card hover>
            <h3 className="text-lg font-bold mb-2">特性 2</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TypeScript 类型安全，减少运行时错误
            </p>
          </Card>
          <Card hover>
            <h3 className="text-lg font-bold mb-2">特性 3</h3>
            <p className="text-gray-600 dark:text-gray-300">
              原子化 CSS，快速构建现代化 UI
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
