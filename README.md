<div align="center">

# 📦 IZTRO

一套轻量级紫微斗数排盘工具库。

</div>

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/iztro/Codecov.yaml)](https://github.com/SylarLong/iztro/actions) [![npm](https://img.shields.io/npm/v/iztro)](https://www.npmjs.com/package/iztro) [![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/iztro)](https://github.com/search?q=repo%3ASylarLong%2Fiztro++language%3ATypeScript&type=code) [![Codecov](https://img.shields.io/codecov/c/github/sylarlong/iztro)](https://app.codecov.io/gh/SylarLong/iztro/tree/main/src%2Fstar) [![npm](https://img.shields.io/npm/dw/iztro)](https://www.npmjs.com/package/iztro) [![Maintenance](https://img.shields.io/maintenance/yes/2023)](https://github.com/SylarLong/iztro)
[![GitHub](https://img.shields.io/github/license/sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro)](https://www.npmjs.com/package/iztro) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub issues](https://img.shields.io/github/issues/SylarLong/iztro)](https://github.com/SylarLong/iztro/issues) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_shield) [![Package Quality](https://packagequality.com/badge/iztro.png)](https://packagequality.com/#?package=iztro)

</div>

---

<div align="center">

简体中文 🔸 [English](./README-en_US.md)

</div>

---

### 介绍

用于紫微斗数排盘的javascript开源库，有以下功能。

- 根据出生日期（`农历`或`阳历`）以及出生时辰获取紫微斗数`星盘数据`，星盘数据包括
  - 基础信息（出生日期，时辰，星座，生肖，身主，命主等信息）
  - 宫位信息（宫位名称，干支，星耀等）
  - 星耀信息（包括亮度【（庙、旺、得、利、平、不、陷）】，四化【禄，权，科，忌】和类型）
  - 运限信息（大限，小限，流年，流月，流日，流时）
  - 星耀四化
- 根据天干获取四化
- 查询指定宫位三方四正宫位
- 查询指定星耀是否存在指定宫位内
- 查询指定星耀是否存在于三方四正内
- 多语言输入/输出结果

### 快捷跳转

- [开发文档](https://docs.iztro.com)
- [讨论](https://github.com/SylarLong/iztro/discussions)
- [问题](https://github.com/SylarLong/iztro/issues)

### 安装依赖

你可以使用任何你熟悉的包管理库来安装`iztro`

- NPM

  ```
  npm install iztro -S
  ```

- Yarn

  ```
  yarn add iztro
  ```

- pnpm

  ```
  pnpm install iztro -S
  ```

### 例子

这里是一个简单的例子显示如何调用`iztro`获取到紫微斗数星盘数据，详细文档请移步[开发文档](https://docs.iztro.com)

- ES6 Module

  ```ts
  import { astro } from 'iztro';

  // 通过阳历获取星盘信息
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // 通过农历获取星盘信息
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

- CommonJS

  ```ts
  var iztro = require('iztro');

  // 通过阳历获取星盘信息
  var astrolabe = iztro.astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // 通过农历获取星盘信息
  var astrolabe = iztro.astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

### [贡献指南](https://github.com/SylarLong/iztro/blob/main/CONTRIBUTING.md)

如果你对`iztro`有兴趣，也想加入贡献队伍，我们非常欢迎，你可以用以下方式进行：

- 如果你对程序功能有什么建议，请到[这里](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E5%8A%9F%E8%83%BD%EF%BD%9Cfeature&projects=&template=new-feature.md&title=%7B%E6%A0%87%E9%A2%98%7D%EF%BD%9C%7Btitle%7D)创建一个`功能需求`。
- 如果你发现程序有BUG，请到[这里](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E6%BC%8F%E6%B4%9E%EF%BD%9Cbug&projects=&template=bug-report.md&title=%7Bversion%7D%3A%7Bfunction%7D-)创建一个`BUG报告`。
- 你也可以将本仓库`fork`到你自己的仓库进行编辑，然后提交PR到本仓库。
- 假如你擅长外语，我们也欢迎你对国际化文件的翻译做出你的贡献，你可以`fork`本仓库，然后在[locales](https://github.com/SylarLong/iztro/tree/main/src/i18n/locales)文件夹下创建一个国际化语言文件，然后复制其他语言文件目录里面的文件到你的目录下进行更改。
- 当然，如果在我挑灯码字的时候能的到你赞助的咖啡，在下也是不胜感激👍 [Paypal Me](https://PayPal.Me/sylarlong)

### 总结

使用本程序返回的数据，你可以生成这样一张星盘，当然这只是一个例子，你可以把注意力集中在星盘的设计上，也可以把重心放在数据的分析上，本程序为你解决了最繁冗的工作，让你可以把精力更多的放在你所需要关注的事情上面。

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

### Star趋势

<a href="https://star-history.com/#sylarlong/iztro&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
  </picture>
</a>

### [版权](https://github.com/SylarLong/iztro/blob/main/LICENSE)

MIT License

Copyright &copy; 2023 Sylar Long

请合理使用本开源代码，禁止用于非法目的。


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_large)