# iztro Chat API 示例

这里提供可选托管 iztro Chat API 的最小调用示例。

Chat Session 是推荐的集成方式：先创建托管会话，再向会话发送用户消息，方便 API 为你的用户保留上下文。`/v1/chat/completions` 示例也保留在这里，供已有 OpenAI Chat Completions 兼容客户端的项目使用。

托管 API 与开源 `iztro` 包相互独立，使用时需要 API key。你可以在这里申请和管理 API key：

```text
https://platform.iztro.com
```

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

推荐先运行 Chat Session 示例。

JavaScript：

```bash
node chat-session.js
```

Python：

```bash
python chat_session.py
```

兼容 `/v1/chat/completions` 的示例：

```bash
node chat-completion.js
python chat_completion.py
```

## English

These examples call the optional hosted iztro Chat API. Chat Session is the recommended integration path because it creates a managed conversation and preserves context for your users. API keys can be created and managed at [platform.iztro.com](https://platform.iztro.com).
