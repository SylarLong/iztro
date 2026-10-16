---
name: iztro-release
description: 在 astro（SylarLong/iztro）仓库中执行版本发布。当用户要求“发布版本”、发布 iztro 到 npm 或执行 iztro release 时使用。仅编写或修改发布 skill、workflow、版本号及讨论发布流程时，不执行发布。
---

# 发布 iztro 版本

适用于 package.json.name 为 `iztro`、远端为 `SylarLong/iztro` 的仓库。开始时读取仓库 `AGENTS.md`、`package.json`、`CHANGELOG.md` 和 `.github/workflows/Release.yaml`，以实际配置为准。先确认仓库身份，不能仅凭目录名 `astro` 判断。

用户明确要求“发布版本”即授权本次发布所需的本地版本修改、提交、推送、标签与 workflow 发布。先完成检查，再执行已经授权的发布；不要重复索要发布确认。仅加载技能、创建技能或修改发布配置不构成发布授权。npm 已存在的版本必须按第 4 步请求用户确认并输入新版本。

## 1. 检查本地与远端

- 检查当前分支、工作区、暂存区、远端地址及上游分支，记录初始 HEAD 和已有修改。使用 GitHub CLI 检查当前账号能访问 `SylarLong/iztro`，不要显示认证凭据。
- 获取远端分支和标签，比较 HEAD 与远端默认分支（读取实际默认分支，不硬编码）。分清本地领先、落后和双方分叉；获取失败时停止，不能依据过期远端记录发布。
- 确认发布分支符合仓库惯例；位于其他分支或 detached HEAD 且无法判断发布意图时询问用户。不得把其他分支代码自动合入默认分支。

## 2. 安全同步

- 本地仅落后且工作区干净时使用 fast-forward 更新；本地仅领先时保留待发布提交。
- 工作区修改不会妨碍同步时保留它们。若会覆盖修改或双方分叉，先解释差异；不得强制重置、强推、自动丢弃或隐藏用户修改。需要用户选择合并方式或处理冲突时停止依赖操作并询问。
- 本次明确待发布的修改可以纳入后续提交；不明来源或无关的修改不得自动打包发布，需先确认范围。独立 `astro-docs` 仓库按自己的约束处理，仅在本次确需同步文档时操作，分别提交。

## 3. 本地验证

使用与 Release workflow 相同的 Node 主版本及 Yarn Classic；依赖用 `yarn install --frozen-lockfile`，不得重写锁文件来绕过失败。依次完成：

```sh
yarn test:release
yarn test --runInBand
yarn lint
yarn tsc --noEmit
yarn build:umd
yarn verify:umd
npm pack --dry-run --ignore-scripts
```

核查 npm 文件清单含 `lib/index.js`、`lib/index.d.ts` 和两种 dist UMD 文件。任一检查失败立即停止发版，报告失败项；必要修复后重新验证受影响项。构建产物是否提交依仓库约定，不将临时发布说明、测试覆盖率目录混入提交。

## 4. 确定尚未发布的版本

- 初始候选为 `package.json.version`（用户已指定目标时采用用户版本）。使用精确 SemVer，不带 `v` 前缀或 build metadata。禁止使用会自动暂存、推送的 `yarn version`，直接编辑版本字段。
- 用 `scripts/check-release.cjs` 导出的 `isPublished('iztro', version)` 检查官方 npm registry。它只有明确 E404 才视为未发布；网络、认证、限流、格式错误均停止，不得当作“未发布”。
- 候选已经发布时，告知实际已发布版本，请用户确认继续并输入新版本号；不得自行补丁递增、覆盖 npm 包或跳过此询问。获得回复后，校验新版本并重新查询，直到确认可用。
- 稳定版默认应高于当前 npm `latest`，并最终使用 `latest`。降级需用户明确要求。预发布仅在用户明确要求时使用，按现有 workflow 发布到 `next`，验收 `next` 而非 `latest`。
- 检查候选 `v版本号` 的本地标签、远端标签和 GitHub Release。已有标签或 Release 且 npm 未发布，属于部分发布：报告状态，转失败恢复，不覆盖标签或悄悄使用其他提交。

## 5. 整理版本及 CHANGELOG

- 将 package.json.version 更新为确定版本；检查其他受维护的版本声明、锁文件是否需同步，不批量改历史日志、文档示例或生成物中的旧版本。
- 读取执行当日 Asia/Shanghai 日期，标题格式固定为 `## v版本号（YYYY.MM.DD 发布）`，例如 `## v2.6.3（2026.10.16 发布）`。示例日期不能当作实际日期。
- 若有 `## 未发布` 或 `## Unreleased`，将其改为目标标题；若已存在该版本裸标题，则给它补日期。两者同时存在时合并本次内容为唯一目标版本章节，保留所有有效条目。多个同版本章节或归属不清时先解决，不能取第一段凑数。
- 若用户更换了尚未发布的版本号，将原待发布章节一起更新；不改已发布章节。完全没有本次说明时根据实际待发布提交补齐，无法确定内容则询问；禁止空说明发版。
- 保持 v2.6.2 的嵌套分类：`✨ 改进（enhancement）`、`🪄 功能（feature）`、`🛠️ 修复（fix）`、`🧹 琐事（Chore）`；仅写有内容的分类。
- 使用 `extractReleaseNotes(markdown, tag)` 预览说明，要求唯一非空章节。说明保留完整分类和条目，排除版本标题、其他版本及未发布内容。

## 6. 提交并作发布前复核

- 检查最终差异，明确暂存本次文件，提交信息如 `chore(release): 发布 v2.6.3`；不空提交、不覆盖已有提交。技能本身不要求每次修改 AGENTS.md。
- 版本和日志修改后重跑 release guards 与类型检查；如果新增代码、依赖、构建或同步带来代码变化，补跑第 3 步受影响检查。先前测试通过的提交若已改变，不能仍当作验证通过。
- 再次获取远端并核对，没有新提交需要同步。工作区应无未纳入的待发布修改；无关修改只有已确认不会进入发布时才可保留。再次查询 npm 版本和远端标签，避免检查与发布之间的竞争。
- 检查 workflow 确实监听 `v*` 标签、校验标签/版本/提交、支持带日期日志、重复 npm 版本跳过、构建 UMD 资产并创建 Release。发现缺失则先修复验证提交，再发布。
- 认证前提：Git 推送权限、GitHub CLI 登录；workflow 的 `contents: write` 和 `id-token: write`；npm 的 iztro Trusted Publisher 绑定实际 owner/repository/workflow（当前为 SylarLong / iztro / Release.yaml），且包设置允许这种发布方式。当前使用 OIDC，不要求 NPM_TOKEN，也不把令牌写入文件。读取不到 npm 后台配置时如实告知无法预检，继续已授权 workflow，由运行结果验证；明确缺失时先让用户配置。

## 7. 推送标签，交由 workflow 发布

- 简要告知目标版本、提交和已通过检查，然后推送发布分支；推送被拒绝先重新获取和判断，不能强推。
- 确认远端分支包含已验证提交后，为同一提交创建 `v版本号` 标签，只推送这个标签，不推送全部本地标签。
- 现有 Release workflow 由标签推送触发，负责 npm 发布及 GitHub Release。不要并行手动执行 npm publish 或 gh release create。
- GitHub Release 标题必须等于标签，description 必须等于目标 changelog 章节内容。通过推送标签对应的 commit/event 定位本次运行，不误认同名旧运行。
- 持续查看本次运行，每次等待至多 60 秒，并在有进展或失败时说明。约 10 分钟仍未完成则报告运行链接和待验收项；不宣布成功、不擅自创建后续自动任务。

## 8. 验收与报告

全部满足才能报告发布成功：

1. 本次 Release workflow 成功，远端标签指向预期提交，GitHub Release 为非草稿，标题等于标签，说明与本次日志一致。
2. Release assets 含非空 `iztro-min-js.tar.gz`；下载到临时目录验证压缩包可读取，包含 `dist/iztro.min.js` 和与目标版本一致的 `dist/iztro-v版本号.min.js`，并与该提交的构建输出核对（必要时隔离重建），不要向工作区解包覆盖。
3. 官方 registry 可查询 `iztro@版本号`；稳定版 `dist-tags.latest` 等于目标，预发布验收 `dist-tags.next`。短暂传播延迟可有界重试，约两分钟后仍不一致即报告未完成。给出 npm 包页面链接，网页缓存延迟时以 registry 实际结果说明。

报告版本、提交哈希、标签、GitHub Release 链接、workflow 链接、资产及 npm 验收结果；部分失败时明确已成功与未成功步骤。

## 失败恢复

- npm 版本不可覆盖。已发布 npm 但 GitHub Release/资产失败时修复失败原因后重新运行同一标签的 workflow，由重复发布检查跳过 npm 并补齐 Release；无需另起版本。
- 已有标签且与预期提交一致时，可在明确属于本次恢复的情境下重跑该标签 workflow。若用户本次只要求新发布但发现来源不明的部分状态，先确认恢复范围。
- 标签提交有误时停止，报告实际指向，不删除或强制移动标签。需变更已打标签代码时通常使用用户确认的新版本。
- 认证、网络、测试、构建或验收失败时保留已完成结果与日志，提供可执行的下一步。不得以重复发包、自动递增版本或降低测试门槛绕过失败。
