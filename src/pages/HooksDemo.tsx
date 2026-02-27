import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWindowSize } from '../hooks/useWindowSize';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToggle } from '../hooks/useToggle';
import { useDebounce } from '../hooks/useDebounce';
import { useState } from 'react';

export const HooksDemo = () => {
  const { width, height } = useWindowSize();
  const [count, setCount] = useLocalStorage<number>('hooks-demo-count', 0);
  const [isDark, toggleDark] = useToggle(false);
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Hooks 演示</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* useWindowSize */}
        <Card>
          <h2 className="text-xl font-bold mb-4">useWindowSize</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>窗口宽度: {width}px</p>
            <p>窗口高度: {height}px</p>
          </div>
        </Card>

        {/* useLocalStorage */}
        <Card>
          <h2 className="text-xl font-bold mb-4">useLocalStorage</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              计数器: <span className="text-2xl font-bold text-blue-600">{count}</span>
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
              <Button size="sm" variant="secondary" onClick={() => setCount(c => c - 1)}>-</Button>
              <Button size="sm" variant="outline" onClick={() => setCount(0)}>重置</Button>
            </div>
            <p className="text-sm text-gray-500">数据会保存到 localStorage</p>
          </div>
        </Card>

        {/* useToggle */}
        <Card>
          <h2 className="text-xl font-bold mb-4">useToggle</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">状态: {isDark ? '开启' : '关闭'}</span>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}
                onClick={toggleDark}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}
                />
              </div>
            </div>
            <Button size="sm" onClick={toggleDark}>
              {isDark ? '关闭' : '开启'}
            </Button>
          </div>
        </Card>

        {/* useDebounce */}
        <Card>
          <h2 className="text-xl font-bold mb-4">useDebounce</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="输入文字..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-sm text-gray-500">
              <p>原始值: {text}</p>
              <p>防抖值 (500ms): <span className="text-blue-600 font-semibold">{debouncedText}</span></p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
