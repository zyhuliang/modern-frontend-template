---
title: OpenClaw 安装教程：配置自定义供应商与模型
date: 2026-02-28
excerpt: 详细介绍如何安装 OpenClaw 个人 AI 助手，并配置自定义供应商（如智谱 GLM、Moonshot Kimi、Ollama 等）来使用各种大模型。
tags:
  - OpenClaw
  - AI
  - 教程
  - 配置
category: 技术
author: 开发者
---

# OpenClaw 安装教程：配置自定义供应商与模型

OpenClaw 是一个开源的个人 AI 助手，支持多种消息渠道（WhatsApp、Telegram、Discord、Slack、微信等），可以运行在你自己的设备上，保护隐私的同时提供强大的 AI 能力。本文将详细介绍如何安装 OpenClaw 并配置自定义供应商。

## 什么是 OpenClaw？

OpenClaw 是一个**本地优先**的个人 AI 助手：

- 🏠 **本地运行** - 数据掌握在自己手中
- 📱 **多渠道支持** - WhatsApp、Telegram、Discord、Slack、Signal、iMessage 等
- 🤖 **多模型支持** - 支持 OpenAI、Anthropic、Google、智谱 GLM、Kimi 等多种模型
- 🔧 **可扩展** - 支持自定义供应商和本地模型
- 🎤 **语音支持** - macOS/iOS/Android 支持语音唤醒和对话

## 安装 OpenClaw

### 系统要求

- Node.js ≥ 22
- 支持 macOS、Linux、Windows（推荐 WSL2）

### 安装步骤

#### 1. 全局安装 OpenClaw

```bash
# 使用 npm
npm install -g openclaw@latest

# 或使用 pnpm
pnpm add -g openclaw@latest
```

#### 2. 运行安装向导

OpenClaw 提供了一个交互式安装向导，帮助你完成初始配置：

```bash
openclaw onboard --install-daemon
```

这个命令会：

1. 引导你选择模型供应商
2. 配置 API 密钥或 OAuth 认证
3. 设置 Gateway 守护进程（自动启动）
4. 完成基础配置

#### 3. 验证安装

```bash
# 查看 Gateway 状态
openclaw gateway status

# 查看模型状态
openclaw models status
```

## 配置自定义供应商

OpenClaw 支持多种内置供应商，也允许你添加自定义供应商。下面介绍几种常见的配置方式。

### 内置供应商配置

#### OpenAI

```bash
# 方式一：通过向导配置
openclaw onboard --auth-choice openai-api-key

# 方式二：设置环境变量
export OPENAI_API_KEY="sk-..."
```

配置文件示例：

```json5
{
  agents: {
    defaults: {
      model: { primary: "openai/gpt-5.1-codex" }
    }
  }
}
```

#### Anthropic Claude

```bash
# 方式一：使用 Claude CLI 设置 token（推荐）
claude setup-token

# 方式二：通过向导配置
openclaw onboard --auth-choice token

# 方式三：设置环境变量
export ANTHROPIC_API_KEY="sk-ant-..."
```

配置文件示例：

```json5
{
  agents: {
    defaults: {
      model: { primary: "anthropic/claude-opus-4-6" }
    }
  }
}
```

#### 智谱 GLM（Z.AI）

```bash
# 通过向导配置
openclaw onboard --auth-choice zai-api-key

# 或设置环境变量
export ZAI_API_KEY="..."
```

配置文件示例：

```json5
{
  agents: {
    defaults: {
      model: { primary: "zai/glm-4.7" }
    }
  }
}
```

### 自定义供应商配置

自定义供应商需要在配置文件中添加 `models.providers` 配置。配置文件通常位于 `~/.openclaw/openclaw.json`。

#### Moonshot Kimi（月之暗面）

Moonshot 使用 OpenAI 兼容的 API：

```json5
{
  env: {
    MOONSHOT_API_KEY: "sk-..."
  },
  agents: {
    defaults: {
      model: { primary: "moonshot/kimi-k2.5" }
    }
  },
  models: {
    mode: "merge",
    providers: {
      moonshot: {
        baseUrl: "https://api.moonshot.ai/v1",
        apiKey: "${MOONSHOT_API_KEY}",
        api: "openai-completions",
        models: [
          { id: "kimi-k2.5", name: "Kimi K2.5" },
          { id: "kimi-k2-thinking", name: "Kimi K2 Thinking" }
        ]
      }
    }
  }
}
```

#### Ollama（本地模型）

Ollama 是本地运行大模型的最佳选择：

```bash
# 安装 Ollama
# macOS/Linux: https://ollama.ai

# 拉取模型
ollama pull llama3.3
ollama pull qwen2.5
```

OpenClaw 会自动检测本地运行的 Ollama（`http://127.0.0.1:11434/v1`），只需设置模型：

```json5
{
  agents: {
    defaults: {
      model: { primary: "ollama/llama3.3" }
    }
  }
}
```

#### LM Studio / vLLM / LiteLLM（本地代理）

这些工具提供 OpenAI 兼容的 API：

```json5
{
  agents: {
    defaults: {
      model: { primary: "lmstudio/your-model" }
    }
  },
  models: {
    providers: {
      lmstudio: {
        baseUrl: "http://localhost:1234/v1",
        apiKey: "LMSTUDIO_KEY",  // 通常不需要真实 key
        api: "openai-completions",
        models: [
          {
            id: "your-model-id",
            name: "Your Model",
            contextWindow: 128000,
            maxTokens: 8192
          }
        ]
      }
    }
  }
}
```

#### 火山引擎（豆包）

```bash
# 通过向导配置
openclaw onboard --auth-choice volcengine-api-key

# 或设置环境变量
export VOLCANO_ENGINE_API_KEY="..."
```

```json5
{
  agents: {
    defaults: {
      model: { primary: "volcengine/doubao-seed-1-8-251228" }
    }
  }
}
```

#### MiniMax

```bash
openclaw onboard --auth-choice minimax-api
```

```json5
{
  agents: {
    defaults: {
      model: { primary: "minimax/abab6.5s-chat" }
    }
  },
  models: {
    providers: {
      minimax: {
        baseUrl: "https://api.minimax.chat/v1",
        apiKey: "${MINIMAX_API_KEY}",
        api: "openai-completions",
        models: [
          { id: "abab6.5s-chat", name: "MiniMax 6.5s" }
        ]
      }
    }
  }
}
```

### 通用自定义供应商模板

如果你想接入一个 OpenAI 兼容的供应商，可以使用以下模板：

```json5
{
  env: {
    YOUR_PROVIDER_API_KEY: "your-api-key"
  },
  agents: {
    defaults: {
      model: { primary: "your-provider/model-id" }
    }
  },
  models: {
    mode: "merge",
    providers: {
      "your-provider": {
        baseUrl: "https://api.your-provider.com/v1",  // API 端点
        apiKey: "${YOUR_PROVIDER_API_KEY}",           // 环境变量引用
        api: "openai-completions",                     // API 类型
        models: [
          {
            id: "model-id",                            // 模型 ID
            name: "Model Name",                        // 显示名称
            contextWindow: 128000,                     // 上下文窗口大小
            maxTokens: 8192,                           // 最大输出 token
            input: ["text", "image"],                  // 支持的输入类型
            reasoning: false                           // 是否支持推理
          }
        ]
      }
    }
  }
}
```

**API 类型说明**：

- `openai-completions` - OpenAI 兼容的 Chat Completions API
- `anthropic-messages` - Anthropic Messages API

## 模型切换与管理

### 在对话中切换模型

```bash
# 列出可用模型
/model
/model list

# 切换模型
/model openai/gpt-5.1-codex
/model anthropic/claude-opus-4-6
/model zai/glm-4.7

# 查看当前模型状态
/model status
```

### CLI 命令

```bash
# 列出所有模型
openclaw models list

# 查看模型状态
openclaw models status

# 设置默认模型
openclaw models set anthropic/claude-opus-4-6

# 设置图像模型
openclaw models set-image openai/gpt-4-vision

# 配置 fallback（备用模型）
openclaw models fallbacks add openai/gpt-5.1-codex
openclaw models fallbacks add zai/glm-4.7
```

### 模型别名

为常用模型设置简短别名：

```bash
# 添加别名
openclaw models aliases add claude anthropic/claude-opus-4-6
openclaw models aliases add gpt openai/gpt-5.1-codex

# 使用别名
/model claude
/model gpt
```

## 多渠道配置

配置好消息渠道后，你就可以在各种平台上使用你的 AI 助手：

### Telegram

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}"
    }
  }
}
```

### Discord

```json5
{
  channels: {
    discord: {
      enabled: true,
      botToken: "${DISCORD_BOT_TOKEN}",
      applicationId: "${DISCORD_APPLICATION_ID}"
    }
  }
}
```

### WhatsApp

WhatsApp 使用扫描二维码配对：

```bash
openclaw channels whatsapp pair
```

## 常见问题

### 1. 模型不可用

如果提示 "Model is not allowed"，需要在配置中添加模型白名单：

```json5
{
  agents: {
    defaults: {
      models: {
        "anthropic/claude-opus-4-6": { alias: "Opus" },
        "openai/gpt-5.1-codex": { alias: "GPT" },
        "zai/glm-4.7": { alias: "GLM" }
      }
    }
  }
}
```

### 2. API Key 轮换

支持配置多个 API Key 进行负载均衡：

```bash
# 环境变量配置
export OPENAI_API_KEY_1="sk-..."
export OPENAI_API_KEY_2="sk-..."
export OPENAI_API_KEY_3="sk-..."
```

### 3. 代理配置

如果需要通过代理访问 API：

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
```

## 总结

OpenClaw 是一个强大且灵活的个人 AI 助手框架：

1. **安装简单** - 一条命令完成安装
2. **配置灵活** - 支持多种供应商和自定义配置
3. **本地优先** - 保护隐私，数据自控
4. **多渠道支持** - 一个助手，多平台使用

开始你的 OpenClaw 之旅吧！

---

**相关链接**：

- [OpenClaw 官网](https://openclaw.ai)
- [GitHub 仓库](https://github.com/openclaw/openclaw)
- [官方文档](https://docs.openclaw.ai)
- [Discord 社区](https://discord.gg/clawd)
