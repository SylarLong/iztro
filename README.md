<div align="center">

![banner2](https://github.com/SylarLong/iztro/assets/6510425/e8457a88-e52e-435e-8f93-e3f375486d70)

# 一套轻量级紫微斗数排盘工具库

简体中文 🔸 [繁體中文](./README-zh_TW.md) 🔸 [English](./README-en_US.md)

</div>

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/iztro?logo=npm&logoColor=%23959DA5)](https://www.npmjs.com/package/iztro)
  [![NPM Minified Size](https://img.shields.io/bundlephobia/min/iztro?logo=npm&logoColor=%23959DA5)](https://www.npmjs.com/package/iztro)
  [![NPM Downloads](https://img.shields.io/npm/dt/iztro.svg?logo=npm&logoColor=%23959DA5)](https://www.npmjs.com/package/iztro)
  [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/iztro/badge)](https://www.jsdelivr.com/package/npm/iztro)

  [![GitHub Code Size in Bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro?logo=github&logoColor=%23959DA5)](https://github.com/SylarLong/iztro)
  [![Codecov Coverage](https://img.shields.io/codecov/c/github/SylarLong/iztro?logo=codecov&logoColor=%23959DA5)](https://github.com/SylarLong/iztro/actions/workflows/Codecov.yaml)
  [![Codecov Status](https://github.com/SylarLong/iztro/actions/workflows/Codecov.yaml/badge.svg)](https://github.com/SylarLong/iztro/actions/workflows/Codecov.yaml)

  [![Maintainability](https://qlty.sh/gh/SylarLong/projects/iztro/maintainability.svg)](https://qlty.sh/gh/SylarLong/projects/iztro)
  [![Package Quality](https://packagequality.com/shield/iztro.svg?logo=github)](https://packagequality.com/#?package=iztro)

  [![License](https://img.shields.io/github/license/sylarlong/iztro?logo=github)](https://www.npmjs.com/package/iztro)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_shield)

</div>

## 介绍

用于紫微斗数排盘的 JavaScript 开源库，有以下功能：

- 输入

  - 生日（阳历或农历皆可）
  - 出生时间
  - 性别

- 可以实现下列功能

  - 紫微斗数 12 宫的星盘数据
  - 获取生肖
  - 获取星座
  - 获取四柱（干支纪年法的生辰）
  - 获取运限（大限、小限、流年、流月、流日、流时）的数据
  - 获取流耀（大限和流年的动态星耀）
  - 判断指定宫位是否存在某些星耀
  - 判断指定宫位三方四正是否存在某些星耀
  - 判断指定宫位三方四正是否存在四化
  - 判断指定星耀是否存在四化
  - 判断指定星耀三方四正是否存在四化
  - 判断指定星耀是否是某个亮度
  - 根据天干获取四化
  - 获取指定星耀所在宫位
  - 获取指定宫位三方四正宫位
  - 获取指定星耀三方四正宫位
  - 获取指定星耀对宫
  - 获取指定运限宫位
  - 获取指定运限宫位的三方四正
  - 判断指定运限宫位内是否存在某些星耀
  - 判断指定运限宫位内是否存在四化
  - 判断指定运限三方四正内是否存在某些星耀
  - 判断指定运限三方四正内是否存在四化
  - 判断指定宫位是否是空宫
  - 判断宫位是否产生飞星到目标宫位
  - 获取宫位产生的四化宫位

- 其他

  - 多语言输入/输出

    输入的时候支持多个国家和地区语言混合输入，可以输出指定语言。目前支持 简体中文，繁体中文，英文，日文，韩文，越南语。英文的翻译目前还没有标准，所以我大多是意译的，但也正因为如此，可能英文版本的会更加易懂。如果有精通星象翻译的欢迎提 PR 。任何语言都可以。

  - 链式调用

    假如你想判断 `紫微星` 的 `三方四正` 有没有 `化忌`，你可以这样做

    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.bySolar('2000-8-16', 2, '男', true, 'zh-CN');

    astrolabe.star('紫微').surroundedPalaces().haveMutagen('忌');
    ```

  - 配置和插件

    紫微斗数流派众多，不同的流派的四化以及星耀亮度都会有些许差异，为了满足不同流派的需求和功能的扩展，`iztro` 在 `v2.3.0` 版本加入了全局配置和第三方插件功能。详见 [配置文档](https://ziwei.pro/posts/config-n-plugin.html)

> [!IMPORTANT]
> 如果你在开发中遇到任何问题，可以添加作者微信咨询。<br>
> 你也可以任意魔改代码，或联系作者获取技术支持。<br>
> <img src="https://github.com/SylarLong/SylarLong/assets/6510425/a2af4876-7d26-4900-a0fc-f5a2030f6205" alt="WeChat" width="350" />

## 快捷跳转

- [文档](https://docs.iztro.com)
- [讨论](https://github.com/SylarLong/iztro/discussions)
- [问题](https://github.com/SylarLong/iztro/issues)
- [排盘](https://ziwei.pub)

## Python 生态

如果你需要一个 **原生 Python** 的版本（运行时不依赖 JavaScript/Node.js），可以参考第三方项目：

- [`izthon`](https://github.com/TaoracleHQ/izthon)

说明：

- `izthon` 是一个新的纯 Python 重写版，以 `iztro` 的行为为规格参考。
- 它不是 `iztro` 官方仓库的一部分，但目标是尽量与 `iztro` 的行为和测试保持一致。

## 直接使用

如果你想要零开发直接查看 `iztro` 的排盘结果，请直接使用 [紫微派（ziwei.pub）](https://ziwei.pub) 在线排盘。

## 安装依赖

你可以使用任何你熟悉的包管理库来安装 `iztro`。

```shell
# npm
npm install iztro -S

# yarn
yarn add iztro

# pnpm
pnpm install iztro -S
```

## 独立 JavaScript 库

假如你使用的是静态 HTML 文件，可以下载 [release](https://github.com/SylarLong/iztro/releases) 资源文件中的 `iztro-min-js.tar.gz` 压缩包，里面包含了一个 `iztro` 压缩混淆过的 `js` 文件和对应的 `sourcemap` 文件。

> `v2.0.4+` 版本才提供独立js库。

将 `iztro.min.js` 用 `script` 标签引入 HTML 文件使用。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>iztro-紫微斗数开源库</title>
  </head>
  <body>
    <script src="./iztro.min.js"></script>
    <script>
      // 获取一张星盘数据
      var astrolabe = iztro.astro.bySolar('2000-8-16', 2, '男', true, 'zh-CN');
    </script>
  </body>
</html>
```

当然，我们更推荐你直接使用 `CDN` 加速链接，你可以在下面列表中选择一个，在没有指定版本号的时候，会自动指向最新发布的版本。

- jsdelivr

  - https://cdn.jsdelivr.net/npm/iztro/dist/iztro.min.js
  - https://cdn.jsdelivr.net/npm/iztro@2.0.5/dist/iztro.min.js

- unpkg

  - https://unpkg.com/iztro/dist/iztro.min.js
  - https://unpkg.com/iztro@2.0.5/dist/iztro.min.js

你也可以使用如下规则来指定版本：

- `iztro@2`
- `iztro@^2.0.5`
- `iztro@2.0.5`

因为纯 JS 库没有代码提示和注释，所以在集成的时候请参阅 [iztro 开发文档](https://docs.iztro.com/quick-start.html)。

## 简单示例

这里是一个简单的例子显示如何调用 `iztro` 获取到紫微斗数星盘数据，详细文档请移步 [开发文档](https://docs.iztro.com)。

- ES6 Module

  ```ts
  import { astro } from 'iztro';

  // 通过阳历获取星盘信息
  const astrolabe = astro.bySolar('2000-8-16', 2, '女', true, 'zh-CN');

  // 通过农历获取星盘信息
  const astrolabe = astro.byLunar('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

- CommonJS

  ```ts
  var iztro = require('iztro');

  // 通过阳历获取星盘信息
  var astrolabe = iztro.astro.bySolar('2000-8-16', 2, '女', true, 'zh-CN');

  // 通过农历获取星盘信息
  var astrolabe = iztro.astro.byLunar('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

## 贡献

如果你对 `iztro` 有兴趣，也想加入贡献队伍，我们非常欢迎，你可以用以下方式进行：

- 如果你对程序功能有什么建议，请到 [这里](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E5%8A%9F%E8%83%BD%EF%BD%9Cfeature&projects=&template=new-feature.md&title=%7B%E6%A0%87%E9%A2%98%7D%EF%BD%9C%7Btitle%7D) 创建一个 `功能需求`。
- 如果你发现程序有 BUG，请到 [这里](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E6%BC%8F%E6%B4%9E%EF%BD%9Cbug&projects=&template=bug-report.md&title=%7Bversion%7D%3A%7Bfunction%7D-) 创建一个 `BUG 报告`。
- 你也可以将本仓库 `fork` 到你自己的仓库进行编辑，然后提交 PR 到本仓库。
- 假如你擅长外语，我们也欢迎你对国际化文件的翻译做出你的贡献，你可以 `fork` 本仓库，然后在 [locales](https://github.com/SylarLong/iztro/tree/main/src/i18n/locales) 文件夹下创建一个国际化语言文件，然后复制其他语言文件目录里面的文件到你的目录下进行更改。
- 当然，如果你觉得本程序对你有用，请给我买杯咖啡☕️ [![Static Badge](https://img.shields.io/badge/PaypalMe-8A2BE2?logo=paypal&link=https%3A%2F%2Fwww.paypal.com%2Fsylarlong)](https://PayPal.Me/sylarlong)

> [!NOTE]
> 在开始之前，请阅读 [贡献指南](https://github.com/SylarLong/iztro/blob/main/CONTRIBUTING.md)。

## 总结

使用本程序返回的数据，你可以生成这样一张星盘，当然这只是一个例子，你可以把注意力集中在星盘的设计上，也可以把重心放在数据的分析上，本程序为你解决了最繁冗的工作，让你可以把精力更多的放在你所需要关注的事情上面。

<img width="966" alt="image" src="https://github.com/SylarLong/react-iztro/assets/6510425/f4335997-fdd8-42e2-bb1a-600942f9b0ba">

## Star 历史

> [!IMPORTANT]
> 如果你觉得代码对你有用，请点 ⭐ 支持，你的 ⭐ 是我持续更新的动力～

[![Star History Chart](https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date)](https://www.star-history.com/#sylarlong/iztro&Date)

## 版权

[MIT License](https://github.com/SylarLong/iztro/blob/main/LICENSE)

Copyright &copy; 2023 All Contributors

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_large)

> [!NOTE]
> 请合理使用本开源代码，禁止用于非法目的。
