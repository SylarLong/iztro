<div align="center">

# IZTRO

A lightweight astrolabe generator of The Purple Star Astrology(Zi Wei Dou Shu).

</div>

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/iztro/Codecov.yaml)](https://github.com/SylarLong/iztro/actions) [![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/iztro)](https://github.com/search?q=repo%3ASylarLong%2Fastro++language%3ATypeScript&type=code) [![Codecov](https://img.shields.io/codecov/c/github/sylarlong/iztro)](https://app.codecov.io/gh/SylarLong/iztro/tree/main/src%2Fstar) [![npm](https://img.shields.io/npm/dw/%40sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![Maintenance](https://img.shields.io/maintenance/yes/2023)](https://github.com/SylarLong/iztro)
[![GitHub](https://img.shields.io/github/license/sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro)](https://www.npmjs.com/package/iztro) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub issues](https://img.shields.io/github/issues/SylarLong/iztro)](https://github.com/SylarLong/iztro/issues)
[![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/iztro)](https://github.com/SylarLong)

</div>

---

<div align="center">

[简体中文](./README.md) 🔸 English

</div>

### 📢 Introduction

This framework is used to generate the astrolabe of The Purple Star Astrology(Zi Wei Dou Shu). We support Simplified Chinese, Tradional Chinese, English, Korean and Japenese for now. If you have any issue please feel free to create issues in [here](https://github.com/SylarLong/iztro/discussions). feel free to create issues in [here](https://github.com/SylarLong/iztro/issues) if you found any bugs. I'll appreciate your star.🍻

### 🌰 Demo

- [Demo](https://a.14star.cn)
- [Document](https://docs.iztro.com)

### 🎲 How to use it?

#### 🚀 Let's get started

```
npm i iztro -S
```

#### ❓ Usage

- ES6 Module

  ```ts
  import { astro } from 'iztro';

  // generate astrolabe by solar date
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // generate astrolabe by lunar date
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

- CommonJS

  ```ts
  var iztro = require('iztro');

  // generate astrolabe by solar date
  var astrolabe = iztro.astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // generate astrolabe by lunar date
  var astrolabe = iztro.astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

Please refer to [document](https://docs.iztro.com) for details.

#### ☕ Summary

Buy me a coffe if it's useful for you.👍 [Paypal Me](https://PayPal.Me/sylarlong)

You can create the astrolabe below based on the response data above. `palaces` is used to fill the 12-Palace and other fields are used to fill the Center Palace.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

#### 📜 LICENSE

MIT License

Copyright &copy; 2023 Sylar Long

Please use this open-source code responsibly and refrain from using it for illegal purposes.
