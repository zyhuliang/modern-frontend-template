# GitHub Pages 部署指南

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

## 📋 前置条件

1. 确保仓库是公开的（public）或者开启了 GitHub Pages
2. 确保分支保护设置不会阻止 Actions 运行

## 🚀 自动部署

每次推送到 `main` 分支时，会自动触发部署流程：

```
1. 安装依赖
2. 运行测试
3. 构建生产版本
4. 部署到 GitHub Pages
```

## 🔧 手动触发部署

你也可以在 GitHub 上手动触发部署：

1. 进入仓库的 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** workflow
3. 点击 **Run workflow**
4. 选择分支并运行

## 🌐 访问网站

部署完成后，你的网站将可以通过以下地址访问：

```
https://zyhuliang.github.io/modern-frontend-template/
```

## ⚙️ 配置说明

### Vite 配置

在 `vite.config.ts` 中配置了 `base` 路径：

```typescript
base: '/modern-frontend-template/'
```

如果你的仓库名不同，请修改为：

```typescript
base: '/你的仓库名/'
```

### Workflow 配置

GitHub Actions workflow 配置文件位于：

```
.github/workflows/deploy.yml
```

关键配置：

- **触发条件**：推送到 `main` 分支时自动部署
- **Node 版本**：20
- **部署环境**：github-pages
- **并发控制**：同一时间只运行一个部署任务

## 📝 首次部署步骤

### 1. 启用 GitHub Pages

1. 进入仓库的 **Settings** 标签页
2. 在左侧菜单找到 **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 保存

### 2. 推送代码触发部署

```bash
git add .
git commit -m "chore: enable GitHub Pages deployment"
git push origin main
```

### 3. 查看部署状态

1. 进入 **Actions** 标签页
2. 查看 **Deploy to GitHub Pages** workflow
3. 等待构建完成（通常需要 2-5 分钟）

### 4. 访问网站

部署成功后，访问：

```
https://zyhuliang.github.io/modern-frontend-template/
```

## 🔍 故障排查

### 部署失败

检查以下几点：

1. **Workflow 权限**：
   - Settings → Actions → General
   - 确保 **Workflow permissions** 已启用
   - 勾选 **Read and write permissions**
   - 勾选 **Allow GitHub Actions to create and approve pull requests**

2. **分支保护**：
   - Settings → Branches
   - 确保 main 分支的保护规则不会阻止 Actions

3. **构建错误**：
   - 查看 Actions 日志中的错误信息
   - 本地运行 `npm run build` 确认可以成功构建

### 404 错误

1. 检查 `vite.config.ts` 中的 `base` 配置是否正确
2. 确认仓库名称和 base 路径匹配
3. 检查 GitHub Pages 是否正确启用

### 资源加载失败

1. 检查所有资源路径是否使用相对路径
2. 确认构建后的 `dist/index.html` 中的资源路径正确
3. 检查浏览器控制台的错误信息

## 🎯 自定义域名

如果需要使用自定义域名：

### 1. 配置 DNS

在你的域名 DNS 设置中添加：

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | www | zyhuliang.github.io |
| CNAME | @  | zyhuliang.github.io |

### 2. 在 GitHub Pages 设置域名

1. Settings → Pages
2. 在 **Custom domain** 中输入你的域名
3. 勾选 **Enforce HTTPS**

### 3. 更新 Vite 配置

```typescript
export default defineConfig({
  base: '/', // 自定义域名使用根路径
  // ...
})
```

### 4. 重新部署

提交更改并推送到 main 分支。

## 📊 部署历史

所有部署历史可以在以下位置查看：

1. **Actions** 标签页 - 查看 workflow 运行历史
2. **Pages** 标签页 - 查看部署状态和环境
3. **Commits** 标签页 - 查看每次提交的部署状态

## 💡 最佳实践

1. **预览构建**：本地运行 `npm run preview` 预览生产版本
2. **环境变量**：如需使用环境变量，在 Settings → Secrets 中添加
3. **缓存优化**：workflow 已配置 npm 缓存，加速构建过程
4. **版本管理**：为每次发布打 tag，便于回滚

## 🔗 相关链接

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
