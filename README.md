<div align="center">


![banner2](https://github.com/SylarLong/iztro/assets/6510425/e8457a88-e52e-435e-8f93-e3f375486d70)

一套轻量级紫微斗数排盘工具库。

</div>

<div align="center">

[![Maintainability](https://api.codeclimate.com/v1/badges/b57f0e6e2e8875ce39ae/maintainability)](https://codeclimate.com/github/SylarLong/iztro/maintainability) 
[![Codecov](https://github.com/SylarLong/iztro/actions/workflows/Codecov.yaml/badge.svg)](https://github.com/SylarLong/iztro/actions/workflows/Codecov.yaml) 
[![npm](https://img.shields.io/npm/v/iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/iztro) 
![Codecov](https://img.shields.io/codecov/c/github/SylarLong/iztro?logo=codecov&logoColor=%23F01F7A) 
[![npm](https://img.shields.io/npm/dw/iztro?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/iztro) 
[![GitHub](https://img.shields.io/github/license/sylarlong/iztro)](https://www.npmjs.com/package/iztro) 
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro)](https://www.npmjs.com/package/iztro) 
[![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) 
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_shield) 
[![Socket Badge](https://socket.dev/api/badge/npm/package/iztro)](https://socket.dev/npm/package/iztro) 
[![Package Quality](https://packagequality.com/shield/iztro.svg)](https://packagequality.com/#?package=iztro) 

</div>

---

<div align="center">

简体中文 🔸 [繁體中文](./README-zh_TW.md) 🔸 [English](./README-en_US.md)

</div>

---

### 介绍

用于紫微斗数排盘的javascript开源库，有以下功能。

- 输入

  - 生日（阳历或农历皆可）
  - 出生时间
  - 性别

- 可以实现下列功能

  - 紫微斗数 12 宫的星盘数据
  - 获取生肖
  - 获取星座
  - 获取四柱（干支纪年法的生辰）
  - 获取运限（大限，小限，流年，流月，流日，流时）的数据
  - 获取流耀（大限和流年的动态星耀）
  - 判断指定宫位是否存在某些星耀
  - 判断指定宫位三方四正是否存在某些星耀
  - 判断指定宫位三方四正是否存在四化
  - 判断指定星耀是否存在四化
  - 判断指定星耀三方四正是否存在四化
  - 判断指定星耀是否是某个亮度
  - 判断指定星耀是否存在四化
  - 根据天干获取四化
  - 获取指定星耀所在宫位
  - 获取指定宫位三方四正宫位
  - 获取指定星耀三方四正宫位
  - 获取指定星耀对宫

- 其他

  - 多语言输入/输出

    输入的时候支持多个国家和地区语言混合输入，可以输出指定语言。目前支持 简体中文，繁体中文，英文，日文，韩文，越南语。英文的翻译目前还没有标准，所以我大多是意译的，但也正因为如此，可能英文版本的会更加易懂。如果有精通星象翻译的欢迎提 PR 。任何语言都可以。

  - 链式调用

    假如你想判断 紫微星 的 三方四正 有没有 化忌，你可以这样做

    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '男', true, 'zh-CN');

    astrolabe.star('紫微').surroundedPalaces().haveMutagen('忌');
    ```

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
- 当然，如果你觉得本程序对你有用，请给我买杯咖啡☕️ [![Static Badge](https://img.shields.io/badge/PaypalMe-8A2BE2?logo=paypal&link=https%3A%2F%2Fwww.paypal.com%2Fsylarlong)
  ](https://PayPal.Me/sylarlong)

### 总结

使用本程序返回的数据，你可以生成这样一张星盘，当然这只是一个例子，你可以把注意力集中在星盘的设计上，也可以把重心放在数据的分析上，本程序为你解决了最繁冗的工作，让你可以把精力更多的放在你所需要关注的事情上面。

<img width="966" alt="image" src="https://github.com/SylarLong/react-iztro/assets/6510425/f4335997-fdd8-42e2-bb1a-600942f9b0ba">

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
