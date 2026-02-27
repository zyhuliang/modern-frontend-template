# Modern Frontend Template

一个现代化的 React + TypeScript 前端项目模板，开箱即用。

## ✨ 特性

- ⚛️ **React 18** + TypeScript 5
- ⚡ **Vite 6** - 极速开发体验
- 🎨 **Tailwind CSS** - 原子化 CSS 框架
- 📦 **ESLint + Prettier** - 代码规范
- 🧪 **Vitest** - 单元测试
- 🚀 **GitHub Actions CI/CD** - 自动化测试和构建
- 🎣 **自定义 Hooks** - 常用 Hooks 集合
- 🧩 **组件库** - Button, Card, Input, Modal, Loading
- 🌐 **API 封装** - RESTful API 请求工具
- 🔧 **工具函数** - 日期、数字、货币格式化等

## 🛠️ 技术栈

- React 18
- TypeScript 5
- Vite 6
- Tailwind CSS
- Vitest
- ESLint + Prettier

## 🚀 快速开始

### 克隆项目

```bash
git clone https://github.com/zyhuliang/modern-frontend-template.git
cd modern-frontend-template
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 运行测试

```bash
npm run test
```

## 📁 项目结构

```
modern-frontend-template/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD 配置
├── public/                     # 静态资源
├── src/
│   ├── assets/                # 资源文件
│   ├── components/            # 组件
│   │   ├── Button.tsx         # 按钮组件
│   │   ├── Card.tsx           # 卡片组件
│   │   ├── Input.tsx          # 输入框组件
│   │   ├── Modal.tsx          # 模态框组件
│   │   └── Loading.tsx        # 加载组件
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useWindowSize.ts   # 窗口大小 Hook
│   │   ├── useLocalStorage.ts # 本地存储 Hook
│   │   ├── useDebounce.ts    # 防抖 Hook
│   │   └── useToggle.ts      # 切换 Hook
│   ├── lib/                  # 工具库
│   │   ├── api.ts            # API 请求封装
│   │   └── utils.ts          # 工具函数
│   ├── pages/                # 页面
│   │   ├── Home.tsx          # 首页
│   │   ├── HooksDemo.tsx     # Hooks 演示
│   │   └── ApiDemo.tsx       # API 演示
│   ├── types/                # 类型定义
│   │   └── index.ts
│   ├── App.tsx               # 根组件
│   └── main.tsx              # 入口文件
├── index.html                # HTML 模板
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # Tailwind 配置
└── README.md                 # 项目说明
```

## 📦 组件使用示例

### Button 按钮

```tsx
import { Button } from './components/Button';

<Button variant="primary" size="md" onClick={() => alert('点击了')}>
  点击我
</Button>
```

### Card 卡片

```tsx
import { Card } from './components/Card';

<Card hover>
  <h2>标题</h2>
  <p>内容</p>
</Card>
```

### Input 输入框

```tsx
import { Input } from './components/Input';

<Input
  label="用户名"
  placeholder="请输入用户名"
  value={value}
  onChange={e => setValue(e.target.value)}
  error={error}
/>
```

### Modal 模态框

```tsx
import { Modal } from './components/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="标题"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        取消
      </Button>
      <Button onClick={handleConfirm}>确认</Button>
    </>
  }
>
  <p>模态框内容</p>
</Modal>
```

## 🎣 自定义 Hooks

### useWindowSize

```tsx
import { useWindowSize } from './hooks/useWindowSize';

const { width, height } = useWindowSize();
```

### useLocalStorage

```tsx
import { useLocalStorage } from './hooks/useLocalStorage';

const [count, setCount] = useLocalStorage<number>('count', 0);
```

### useDebounce

```tsx
import { useDebounce } from './hooks/useDebounce';

const debouncedValue = useDebounce(value, 500);
```

### useToggle

```tsx
import { useToggle } from './hooks/useToggle';

const [isDark, toggle, setDark] = useToggle(false);
```

## 🌐 API 请求

```tsx
import { get, post } from './lib/api';

// GET 请求
const user = await get('https://api.example.com/users/1');

// POST 请求
const result = await post('https://api.example.com/users', {
  name: 'John',
  email: 'john@example.com',
});
```

## 🔧 工具函数

```tsx
import { formatDate, formatCurrency } from './lib/utils';

const date = formatDate(new Date()); // 2026年2月27日
const money = formatCurrency(1000); // ¥1,000.00
```

## 📝 开发规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case 或 PascalCase
- 提交代码前运行 `npm run lint` 检查

## 🚀 部署

### GitHub Pages（推荐）

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

**自动部署：**
- 推送到 `main` 分支时自动触发部署
- 部署地址：https://zyhuliang.github.io/modern-frontend-template/
- 详见：[DEPLOYMENT.md](DEPLOYMENT.md)

**首次部署步骤：**

1. 在仓库 Settings → Pages 中启用 GitHub Pages
2. 选择 **Source** 为 **GitHub Actions**
3. 推送代码触发部署：
   ```bash
   git push origin main
   ```

4. 查看部署状态：Actions → Deploy to GitHub Pages

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# 将 dist 目录上传到 Netlify
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

## 📮 联系方式

- 作者: zyhuliang
- GitHub: [@zyhuliang](https://github.com/zyhuliang)

---

如果觉得这个模板对你有帮助，请给它一个 ⭐️！
