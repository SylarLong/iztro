# iztro Chat API 示例

这里提供 iztro Chat API 的最小调用示例，默认使用当前的 `https://chat-api.iztro.com/v2` 接口。

多轮对话 API 是推荐的集成方式：先创建会话，再向会话发送用户消息，方便 API 为你的用户保留上下文。`/v2/chat/completions` 示例也保留在这里，供已有 OpenAI Chat Completions 兼容客户端的项目使用。

## 准备

运行前先设置 API key：

```bash
export IZTRO_API_KEY="sk_..."
```

PowerShell:

```powershell
$env:IZTRO_API_KEY="sk_..."
```

## 运行

推荐先运行多轮对话示例。

JavaScript：

```bash
node chat-session.js
```

Python：

```bash
python chat_session.py
```

兼容 `/v2/chat/completions` 的示例：

```bash
node chat-completion.js
python chat_completion.py
```

完整的前后端流式聊天、编辑、重新发送示例见 [`../fullstack-demo`](../fullstack-demo)。

## English

These examples call the iztro Chat API at `https://chat-api.iztro.com/v2`. The Multi-turn Conversation API is the recommended integration path because it creates a conversation and preserves context for your users. A full-stack streaming demo with edit and resend support is available in [`../fullstack-demo`](../fullstack-demo).
