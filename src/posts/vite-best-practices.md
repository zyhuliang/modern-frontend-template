---
title: 使用 Vite 构建 React 项目最佳实践
date: 2026-02-27
excerpt: 分享使用 Vite 构建 React 项目的最佳实践，包括项目结构、配置优化和常用插件推荐。
tags:
  - React
  - Vite
  - 前端工程化
category: 技术
author: 开发者
---

# 使用 Vite 构建 React 项目最佳实践

Vite 是新一代前端构建工具，它的快速冷启动和热更新让开发体验大大提升。本文分享一些使用 Vite 构建 React 项目的最佳实践。

## 项目结构

推荐的项目结构：

```
project/
├── src/
│   ├── components/     # 组件
│   ├── pages/          # 页面
│   ├── hooks/          # 自定义 Hooks
│   ├── lib/            # 工具库
│   ├── types/          # 类型定义
│   └── main.tsx        # 入口
├── public/             # 静态资源
└── vite.config.ts      # Vite 配置
```

## 配置优化

### 路径别名

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 构建优化

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
```

## 常用插件

1. **@vitejs/plugin-react** - React 支持
2. **vite-plugin-svgr** - SVG 转组件
3. **vite-plugin-compression** - Gzip 压缩

## 总结

Vite 让前端开发变得更加愉快，合理配置能让项目更上一层楼。
