<div align="center">

# IZTRO

一套轻量级紫微斗数排盘工具库。

</div>

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/iztro/Codecov.yaml)](https://github.com/SylarLong/iztro/actions) [![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/iztro)](https://github.com/search?q=repo%3ASylarLong%2Fastro++language%3ATypeScript&type=code) [![Codecov](https://img.shields.io/codecov/c/github/sylarlong/iztro)](https://app.codecov.io/gh/SylarLong/iztro/tree/main/src%2Fstar) [![npm](https://img.shields.io/npm/dw/%40sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![Maintenance](https://img.shields.io/maintenance/yes/2023)](https://github.com/SylarLong/iztro)
[![GitHub](https://img.shields.io/github/license/sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro)](https://www.npmjs.com/package/iztro) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub issues](https://img.shields.io/github/issues/SylarLong/iztro)](https://github.com/SylarLong/iztro/issues)
[![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/iztro)](https://github.com/SylarLong)

</div>

---

<div align="center">

简体中文 🔸 [English](./README-en_US.md)

</div>

### 📢 介绍

用于紫微斗数排盘的工具库，目前支持简体中文、繁体中文、英文、韩文、日文，大家有任何问题欢迎到[这里](https://github.com/SylarLong/iztro/discussions)提问交流，如果发现程序有不对的地方，欢迎到[这里](https://github.com/SylarLong/iztro/issues)提交Bug。扣码不易，希望得到各位大佬的星星。🍻

### 🌰 举个栗子

- [Demo](https://a.14star.cn)
- [文档](https://docs.iztro.com)

### 🎲 用法

#### 🚀 让我们开始把

```
npm i iztro -S
```

#### ❓ 调用方法

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

相信文档请移步[开发文档](https://docs.isztro.com)

#### ☕ 总结

如果您觉得本程序对您有用的话，可以给我带杯咖啡吗？👍 [Paypal Me](https://PayPal.Me/sylarlong)

以上数据可以生成如下星盘，其中`palaces`数据用于填充12宫，其他数据用于填充中宫。

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

#### 📜 版权（LICENSE）

MIT License

Copyright &copy; 2023 Sylar Long

请合理使用本开源代码，禁止用于非法目的。
