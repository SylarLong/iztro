<div align="center">

![banner2](https://github.com/SylarLong/iztro/assets/6510425/e8457a88-e52e-435e-8f93-e3f375486d70)

壹套輕量級紫微鬥數排盤工具庫。

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

[简体中文](./README.md) 🔸 繁體中文 🔸 [English](./README-en_US.md)

</div>

---

### 介紹

用於紫微鬥數排盤的javascript開源庫，有以下功能。

- 輸入

  - 生日（陽歷或農歷皆可）
  - 出生時間
  - 性別

- 可以實現下列功能

  - 紫微鬥數 12 宮的星盤數據
  - 獲取生肖
  - 獲取星座
  - 獲取四柱（幹支紀年法的生辰）
  - 獲取運限（大限，小限，流年，流月，流日，流時）的數據
  - 獲取流耀（大限和流年的動態星耀）
  - 判斷指定宮位是否存在某些星耀
  - 判斷指定宮位三方四正是否存在某些星耀
  - 判斷指定宮位三方四正是否存在四化
  - 判斷指定星耀是否存在四化
  - 判斷指定星耀三方四正是否存在四化
  - 判斷指定星耀是否是某個亮度
  - 判斷指定星耀是否存在四化
  - 根據天幹獲取四化
  - 獲取指定星耀所在宮位
  - 獲取指定宮位三方四正宮位
  - 獲取指定星耀三方四正宮位
  - 獲取指定星耀對宮

- 其他

  - 多語言輸入/輸出

    輸入的時候支持多個國家和地區語言混合輸入，可以輸出指定語言。目前支持 簡體中文，繁體中文，英文，日文，韓文，越南語。英文的翻譯目前還沒有標準，所以我大多是意譯的，但也正因為如此，可能英文版本的會更加易懂。如果有精通星象翻譯的歡迎提 PR 。任何語言都可以。

  - 鏈式調用

    假如妳想判斷 紫微星 的 三方四正 有沒有 化忌，妳可以這樣做

    ```ts
    import { astro } from 'iztro';

    const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '男', true, 'zh-CN');

    astrolabe.star('紫微').surroundedPalaces().haveMutagen('忌');
    ```

### 快捷跳轉

- [開發文檔](https://docs.iztro.com)
- [討論](https://github.com/SylarLong/iztro/discussions)
- [問題](https://github.com/SylarLong/iztro/issues)

### 安裝依賴

妳可以使用任何妳熟悉的包管理庫來安裝`iztro`

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

這裏是壹個簡單的例子顯示如何調用`iztro`獲取到紫微鬥數星盤數據，詳細文檔請移步[開發文檔](https://docs.iztro.com)

- ES6 Module

  ```ts
  import { astro } from 'iztro';

  // 通過陽歷獲取星盤信息
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // 通過農歷獲取星盤信息
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

- CommonJS

  ```ts
  var iztro = require('iztro');

  // 通過陽歷獲取星盤信息
  var astrolabe = iztro.astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // 通過農歷獲取星盤信息
  var astrolabe = iztro.astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

### [貢獻指南](https://github.com/SylarLong/iztro/blob/main/CONTRIBUTING.md)

如果妳對`iztro`有興趣，也想加入貢獻隊伍，我們非常歡迎，妳可以用以下方式進行：

- 如果妳對程序功能有什麽建議，請到[這裏](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E5%8A%9F%E8%83%BD%EF%BD%9Cfeature&projects=&template=new-feature.md&title=%7B%E6%A0%87%E9%A2%98%7D%EF%BD%9C%7Btitle%7D)創建壹個`功能需求`。
- 如果妳發現程序有BUG，請到[這裏](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E6%BC%8F%E6%B4%9E%EF%BD%9Cbug&projects=&template=bug-report.md&title=%7Bversion%7D%3A%7Bfunction%7D-)創建壹個`BUG報告`。
- 妳也可以將本倉庫`fork`到妳自己的倉庫進行編輯，然後提交PR到本倉庫。
- 假如妳擅長外語，我們也歡迎妳對國際化文件的翻譯做出妳的貢獻，妳可以`fork`本倉庫，然後在[locales](https://github.com/SylarLong/iztro/tree/main/src/i18n/locales)文件夾下創建壹個國際化語言文件，然後復制其他語言文件目錄裏面的文件到妳的目錄下進行更改。
- 當然，如果你覺得本程序對你有用，請給我買杯咖啡☕️ [![Static Badge](https://img.shields.io/badge/PaypalMe-8A2BE2?logo=paypal&link=https%3A%2F%2Fwww.paypal.com%2Fsylarlong)
  ](https://PayPal.Me/sylarlong)

### 總結

使用本程序返回的數據，妳可以生成這樣壹張星盤，當然這隻是壹個例子，妳可以把註意力集中在星盤的設計上，也可以把重心放在數據的分析上，本程序為妳解決了最繁冗的工作，讓妳可以把精力更多的放在妳所需要關註的事情上面。

<img width="966" alt="image" src="https://github.com/SylarLong/react-iztro/assets/6510425/f4335997-fdd8-42e2-bb1a-600942f9b0ba">

### Star趨勢

<a href="https://star-history.com/#sylarlong/iztro&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
  </picture>
</a>

### [版權](https://github.com/SylarLong/iztro/blob/main/LICENSE)

MIT License

Copyright &copy; 2023 Sylar Long

請合理使用本開源代碼，禁止用於非法目的。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_large)
