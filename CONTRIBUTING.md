# Contributing to Modern Frontend Template

感谢你对本项目的贡献！

## 如何贡献

### 报告 Bug

在 [Issues](https://github.com/zyhuliang/modern-frontend-template/issues) 中提交 Bug 报告，请包含：

- 清晰的标题和描述
- 复现步骤
- 预期行为
- 实际行为
- 截图（如适用）
- 运行环境（OS、Node 版本、浏览器版本）

### 提交新功能建议

提交 Issue 描述你的想法：

- 为什么需要这个功能
- 使用场景
- 可能的实现方案

### 代码贡献

1. **Fork 本仓库**

   ```bash
   git clone https://github.com/zyhuliang/modern-frontend-template.git
   ```

2. **创建特性分支**

   ```bash
   git checkout -b feature/amazing-feature
   git checkout -b fix/bug-fix
   ```

3. **进行开发**

   - 遵循现有代码风格
   - 添加必要的测试
   - 更新文档

4. **提交更改**

   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

   提交信息规范：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式（不影响逻辑）
   - `refactor:` 重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

5. **推送到分支**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **创建 Pull Request**

   - 填写 PR 模板
   - 说明你的更改
   - 关联相关的 Issue

## 开发规范

### 代码风格

项目使用 ESLint 和 Prettier，提交前请运行：

```bash
npm run lint
npm run format
```

### 组件开发

- 使用 TypeScript 定义 Props
- 添加 JSDoc 注释
- 导出类型供其他组件使用

示例：

```tsx
import { forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 按钮组件
 *
 * @param variant - 按钮样式变体
 * @param size - 按钮大小
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    // ...
  }
);
```

### Hooks 开发

- 以 `use` 开头命名
- 添加完整的 TypeScript 类型
- 包含使用示例

示例：

```tsx
import { useState } from 'react';

/**
 * 自定义计数器 Hook
 *
 * @param initialValue - 初始值
 * @returns [count, increment, decrement, reset]
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return [count, increment, decrement, reset] as const;
}
```

### 测试

为新功能添加测试：

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 发布流程

1. 更新版本号（`package.json`）
2. 更新 CHANGELOG.md
3. 创建 git tag
4. 推送到 GitHub

```bash
npm version patch|minor|major
git push --tags
```

## 社区行为准则

- 尊重不同观点
- 专注于建设性讨论
- 接受批评并优雅地处理
- 对他人表示同理心

## 需要帮助？

- 查看 [文档](README.md)
- 在 [Discussions](https://github.com/zyhuliang/modern-frontend-template/discussions) 提问
- 提交 [Issue](https://github.com/zyhuliang/modern-frontend-template/issues)

---

再次感谢你的贡献！🎉
