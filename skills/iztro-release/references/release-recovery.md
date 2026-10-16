# 发布排障与恢复

以下方法来自 v2.6.3 实际发布。示例版本用于说明，执行时从本次目标版本、标签及运行记录取得参数，不能复用旧 run ID 或提交哈希。

## CI Node 版本一致性

- 本次 Codecov 使用 Node 18.20.8，安装锁定的 `serialize-javascript@7.0.5` 时因其要求 Node ≥20 而失败；Release 已使用 Node 24。将 Codecov 统一为 Node 24 后，安装、测试和覆盖率上传均成功。
- 发布前读取 `.github/workflows/` 下实际安装根依赖的任务，比较 `setup-node` 的 `node-version` 与本地实际运行版本；共同依赖测试默认统一到 Release 的 Node 主版本。目前为 24，后续按仓库配置及依赖要求维护。专门的兼容性测试矩阵可以保留其他受支持版本，但所有必需任务必须通过。
- `actions/setup-node@版本`、action 自身运行时和 `with.node-version` 是不同概念。升级 action 不会自动修正指定的项目 Node 版本；action 的运行时弃用警告也不等于项目依赖安装失败。
- 失败时保留依赖版本和引擎要求证据。修正环境后用 Yarn Classic 和冻结锁文件安装、运行测试，并检查该修复提交对应的远端 Codecov 任务，确认依赖安装、测试及覆盖率上传都通过。不要关闭引擎检查或降级安全补丁来消除错误。

## npm 认证失败后的恢复

1. 确认失败发生在查询还是上传。`npm publish` 的 PUT 请求返回 `E404` 也可能是 Trusted Publisher 身份未匹配，不能据此断言包不存在。本次首次上传即为此情况；用户完成 Trusted publishing 配置后，原任务重跑成功。
2. 核对工作流的 Node/npm 版本、`id-token: write`、发布账号与仓库身份，以及 npm 包的 Settings → Trusted publishing：Provider 为 GitHub Actions；Owner、Repository、Workflow filename 与实际运行一致且区分大小写（当前 `SylarLong` / `iztro` / `Release.yaml`）；当前未使用 environment，npm 对应字段留空；必须允许 `npm publish`。
3. 不要求用户提供 NPM_TOKEN，不输出认证凭据。可用 `npm trust list iztro --json --registry https://registry.npmjs.org` 只读检查配置（须支持该命令的 npm 及已登录包维护者身份）；返回 E401 仅证明当前本地身份无法读取，不能据此认定 GitHub OIDC 或后台配置不存在。无法读取时告知具体需核对字段，由用户在 npm 后台配置。
4. 配置完成后，重新检查 npm 精确版本、远端标签指向及原任务提交。只有配置发生变化、发布提交未变时，可直接重跑原失败任务；标签内容之前已通过的本地检查无需全部重跑，workflow 会重新执行其检查。如果同时修改了库代码、锁文件或发布逻辑，先重新验证；不移动既有标签来夹带修改。
5. 在用户已授权恢复的范围内，用 `gh run rerun <原运行ID> --repo SylarLong/iztro --failed` 重跑，并跟踪新的 attempt 和 job。需要手动触发时，向现有 `Release.yaml` 的 `workflow_dispatch` 传入原 tag。两种方式择一，不并行启动两个发布任务。
6. npm 版本已经存在时核对该版本是否属于本次提交，检查 GitHub Release/资产是否仍缺失；属于本次恢复则使用工作流的重复发布检查跳过 npm 并补齐后续步骤。若 npm 查询有缓存疑点，先按下节直接验证。既不能重发同版本，也不自动换版本。若任务再次遇到认证错误，读取新错误；没有新的配置变更或修复依据时停止重试，报告所需用户操作。

恢复过程中，main 可能已新增 CI 修复。比较标签与 main 的实际差异；仅 CI/日志变化不要求移动旧标签，恢复仍以原标签提交为准。不能将 main 最新提交误报为发布提交。`gh run list --commit` 过滤时使用完整提交 SHA，或读取列表后比对 `headSha`，不要用短 SHA 查不到任务就认定没有触发。

官方配置依据：[npm Trusted publishing](https://docs.npmjs.com/trusted-publishers/)、[npm trust](https://docs.npmjs.com/cli/v11/commands/npm-trust/)。排查新的认证行为时查阅当前文档，不仅凭错误码推断根因。

## 注册表缓存延迟

本次 npm 日志已显示 `+ iztro@2.6.3`，但随后 `npm view iztro@2.6.3` 仍报 E404，连带随机查询参数的整包元数据也仍显示旧版本。精确版本和 dist-tags 接口已能返回新版本。`--prefer-online`、Cache-Control 或随机查询参数只能尝试刷新，不能保证整包元数据立即更新。

上传日志是排查线索，不能单独作为发布验收证据。CLI 或 npm 网页仍显示旧内容时，直接请求官方 registry 的以下只读接口，将 `2.6.3` 替换为目标版本：

```sh
curl --fail --silent --show-error https://registry.npmjs.org/iztro/2.6.3
curl --fail --silent --show-error https://registry.npmjs.org/-/package/iztro/dist-tags
curl --fail --silent --show-error https://registry.npmjs.org/iztro/latest
```

- 精确版本响应的 `version` 必须等于目标；`gitHead` 存在时须等于 `git rev-parse 'v版本号^{commit}'`。缺失 gitHead 时，使用 provenance 等可核验的来源证据说明提交一致性，不能声称已核对该字段。
- 稳定版要求 dist-tags 响应的 `latest` 等于目标，`/iztro/latest` 的 `version` 也应一致；预发布改验 `next` 及 `/iztro/next`。接口结果互相矛盾时继续有界重试，不能挑一个成功响应结束验收。CLI/网页旧缓存不否定这些接口一致返回的结果，但须如实说明所用证据。
- 在临时目录下载精确版本响应中 `dist.tarball` 指向的官方 npm 压缩包，核对 `dist.integrity`；GitHub 的 `iztro-min-js.tar.gz` 核对 Release asset 的大小和可用的 digest。压缩包必须可读取，不能仅检查文件名存在。
- 比较两份压缩包中 `dist/iztro.min.js`、`dist/iztro-v版本号.min.js` 及对应 sourcemap；应与同一提交的已验证构建一致。确认 npm 包还包含 `lib/index.js`、`lib/index.d.ts`。读取归档检查内容，避免向工作区解包覆盖。
- 从首次验收查询起最多约两分钟，每隔 15～30 秒重试；如接口持续缺失或不一致，报告“上传成功、验收待确认”及证据，保留现有标签和版本，不重复 publish 或创建新版本来绕过延迟。
