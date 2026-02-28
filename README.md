# My Blog

一个基于 React + TypeScript + Vite 的现代个人博客。

## ✨ 特性

- 📝 Markdown 写作 - 纯静态，无需后端
- 🎨 暗色主题 - 护眼舒适
- 📱 响应式设计 - 完美适配各种设备
- ⚡ 极速加载 - Vite 构建，静态托管
- 🏷️ 分类标签 - 文章分类管理
- 💬 Giscus 评论 - 基于 GitHub Discussions

## 🛠️ 技术栈

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- React Router 7
- React Markdown

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

## 📝 写文章

在 `src/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: 文章标题
date: 2026-02-28
excerpt: 文章摘要
tags:
  - 标签1
  - 标签2
category: 分类
author: 作者
---

文章内容...
```

## 📁 项目结构

```
src/
├── posts/          # Markdown 文章
├── pages/          # 页面组件
│   ├── Home.tsx    # 首页
│   ├── About.tsx   # 关于页
│   └── blog/       # 博客相关
├── hooks/          # 自定义 Hooks
├── types/          # 类型定义
├── App.tsx         # 主应用
└── main.tsx        # 入口
```

## 🌐 部署

项目自动部署到 GitHub Pages：
- 推送到 `main` 分支自动触发部署
- 访问地址：https://zyhuliang.github.io/modern-frontend-template/

## 📄 许可证

MIT License
