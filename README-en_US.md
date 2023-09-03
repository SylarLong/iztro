<div align="center">

# 📦 IZTRO

A lightweight astrolabe generator of The Purple Star Astrology(Zi Wei Dou Shu).

</div>

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/iztro/Codecov.yaml)](https://github.com/SylarLong/iztro/actions) [![npm](https://img.shields.io/npm/v/iztro)](https://www.npmjs.com/package/iztro) [![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/iztro)](https://github.com/search?q=repo%3ASylarLong%2Fiztro++language%3ATypeScript&type=code) [![Codecov](https://img.shields.io/codecov/c/github/sylarlong/iztro)](https://app.codecov.io/gh/SylarLong/iztro/tree/main/src%2Fstar) [![npm](https://img.shields.io/npm/dw/%40sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![Maintenance](https://img.shields.io/maintenance/yes/2023)](https://github.com/SylarLong/iztro)
[![GitHub](https://img.shields.io/github/license/sylarlong/iztro)](https://www.npmjs.com/package/iztro) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/iztro)](https://www.npmjs.com/package/iztro) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro)](https://www.npmjs.com/package/iztro) [![GitHub issues](https://img.shields.io/github/issues/SylarLong/iztro)](https://github.com/SylarLong/iztro/issues)
[![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/iztro)](https://github.com/SylarLong)

</div>

---

<div align="center">

简体中文 🔸 [English](./README-en_US.md)

</div>

---

### Summary

It's used to obtain the data of `The Purple Star Astrology (Zi Wei Dou Shu)`.

Feature list

- To obtain the astrology data by birthday (`Solar calendar` or `Lunar calendar`) and birth time (`Chinese hour`).
  - basic information(`birthday`, `Chinese hour`, `sign`, `Chinese zodiac`, `body lord`, `soul lord` etc.)
  - palace information(`name`, `heavenly stem` and `earthly branch`, `stars` etc.)
  - star information(`brightness`, `mutagen` and `type`)
  - horoscope information(`decadal`, `nominal age`, `yearly`, `monthly`, `daily`, `hourly`)
  - mutagen
- get `mutagen` by `heavenly stem`
- get `surrounded palaces` by palace `index` or `name`
- check whether specific `stars` in a specific `palace`
- check whether specific `stars` in `surrounded palaces`
- multilingual input/output results

### Quick link

- [Document](https://docs.iztro.com)
- [Discussions](https://github.com/SylarLong/iztro/discussions)
- [Issues](https://github.com/SylarLong/iztro/issues)

### Installation

you can choose any package manager to install `iztro`.

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

### Simple example

This is a very simple example to show how to use `iztro` to get the astrolabe data. please visit [develop document](https://docs.iztro.com) for details.

- ES6 Module

  ```ts
  import { astro } from 'iztro';

  // get astrolabe data by solar date
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, 'male', true, 'en-US');

  // get astrolabe data by lunar date
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, 'male', false, true, 'en-US');
  ```

- CommonJS

  ```ts
  var iztro = require('iztro');

  // get astrolabe data by solar date
  var astrolabe = iztro.astro.astrolabeBySolarDate('2000-8-16', 2, 'male', true, 'en-US');

  // get astrolabe data by lunar date
  var astrolabe = iztro.astro.astrolabeByLunarDate('2000-7-17', 2, 'male', false, true, 'en-US');
  ```

### [CONTRIBUTING](https://github.com/SylarLong/iztro/blob/main/CONTRIBUTING.md)

If you're interested in `iztro` and wish to join us,it's very welcome. You can contribute by:

- create an issue [here](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E5%8A%9F%E8%83%BD%EF%BD%9Cfeature&projects=&template=new-feature.md&title=%7B%E6%A0%87%E9%A2%98%7D%EF%BD%9C%7Btitle%7D) if you have any good ideas or suggestions.
- report a bug [here](https://github.com/SylarLong/iztro/issues/new?assignees=SylarLong&labels=%E6%BC%8F%E6%B4%9E%EF%BD%9Cbug&projects=&template=bug-report.md&title=%7Bversion%7D%3A%7Bfunction%7D-) if you found any bugs.
- you can also `fork` this code to your repository and create PRs for your changes.
- also, you can contribute the `localization` files. please refer to [locales](https://github.com/SylarLong/iztro/tree/main/src/i18n/locales) and create the localization files for your lanuage.
- additionally, buy me a coffee is another great way to support me👍 [Paypal Me](https://PayPal.Me/sylarlong)

### Summary

You can generate an astrolabe by using the returned data. Of course it's just an example. You can focus on astrolabe design or data analyzation. This program solves the most tedious work for you, so that you can put more energy on the things you need to pay attention to.

![demo](https://github.com/SylarLong/iztro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

## Star History

<a href="https://star-history.com/#sylarlong/iztro&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sylarlong/iztro&type=Date" />
  </picture>
</a>

### [LICENSE](https://github.com/SylarLong/iztro/blob/main/LICENSE)

MIT License

Copyright &copy; 2023 Sylar Long

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSylarLong%2Fiztro.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSylarLong%2Fiztro?ref=badge_large)
