<div align="center">

# ASTRO

A lightweight astrolabe generator of The Purple Star Astrology(Zi Wei Dou Shu).

</div>

<div align="center">

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/astro/Codecov.yaml) ![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro) ![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/astro) ![Codecov](https://img.shields.io/codecov/c/github/sylarlong/astro) ![npm](https://img.shields.io/npm/dw/%40sylarlong/astro) ![Maintenance](https://img.shields.io/maintenance/yes/2023)

![GitHub](https://img.shields.io/github/license/sylarlong/astro) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/astro) ![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro) ![GitHub issues](https://img.shields.io/github/issues/SylarLong/astro)

![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/astro)

</div>

---

<div align="center">

[简体中文](./README.md) 🔸 English

</div>

### 📢 Introduction

This framework is used to generate the astrolabe of The Purple Star Astrology(Zi Wei Dou Shu). We support Simplified Chinese, Tradional Chinese, English, Korean and Japenese for now. If you have any issue please feel free to create issues in [here](https://github.com/SylarLong/astro/discussions). feel free to create issues in [here](https://github.com/SylarLong/astro/issues) if you found any bugs. I'll appreciate your star.🍻

### 🌰 Demo

- [Demo](https://a.14star.cn)
- [Document](https://astro.14star.cn)

### 🎲 How to use it?

#### 🚀 Let's get started

```
npm i @sylarlong/astro -S
```

#### ❓ Usage

- ES6 Module

  ```ts
  import { astro } from '@sylarlong/astro';

  // generate astrolabe by solar date
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // generate astrolabe by lunar date
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

- CommonJS

  ```ts
  var astroObj = require('@sylarlong/astro');

  // generate astrolabe by solar date
  var astrolabe = astroObj.astro.astrolabeBySolarDate('2000-8-16', 2, '女', true, 'zh-CN');

  // generate astrolabe by lunar date
  var astrolabe = astroObj.astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true, 'zh-CN');
  ```

##### ✍️ function definition

- astrolabeBySolarDate

  ```ts
  /**
   * generate astrolabe by solar date
   *
   * @param solarDateStr solar date string【YYYY-M-D】
   * @param timeIndex index of time【0~12】
   * @param gender gender【男|女】
   * @param fixLeap fix leap month or not【default to true】
   * @param language specify language 【default to zh-CN】. now we support 'zh-CN' 'zh-TW' 'en-US' 'ko-KR' and 'ja-JP'
   * @returns astrolabe information
   */
  type astrolabeBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    gender: Gender,
    fixLeap: boolean = true,
    language: Language = 'zh-CN'
  ) => Astrolabe;
  ```

- astrolabeByLunarDate

  ```ts
  /**
   * generate astrolabe by lunar date
   *
   * @param lunarDateStr lunar date string【YYYY-M-D】
   * @param timeIndex index of time【0~12】
   * @param gender gender【男|女】
   * @param isLeapMonth is passed month a leap month of lunar year【default to false】
   *                    it will be omitted if the month in the year is not a leap month
   * @param fixLeap fix leap month or not【default to true】
   * @param language specify language 【default to zh-CN】. now we support 'zh-CN' 'zh-TW' 'en-US' 'ko-KR' and 'ja-JP'
   * @returns 星盘信息
   */
  type astrolabeByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    gender: Gender,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
    language: Language = 'zh-CN'
  ) => Astrolabe;
  ```

##### 📑 Response data

```ts
    {
      // 阳历日期
      solarDate: '2000-8-16',
       // 农历日期
      lunarDate: '二〇〇〇年七月十七',
      // 四柱
      chineseDate: '庚辰 甲申 丙午 庚寅',
      // 时辰
      time: '寅时',
      // 时辰对应的时间段
      timeRange: '03:00~05:00',
      // 星座
      sign: '狮子座',
      // 生肖
      zodiac: '龙',
      // 命宫地支
      earthlyBranchOfSoulPalace: '午',
      // 身宫地支
      earthlyBranchOfBodyPalace: '戌',
      // 命主
      soul: '破军',
      // 身主
      body: '文昌',
      // 五行局
      fiveElementsClass: '木三局',
      // 十二宫数据，从寅宫开始
      palaces: [
        {
          // 宫名
          name: '财帛',
          // 是否身宫
          isBodyPalace: false,
          // 是否来因宫
          isOriginalPalace: false,
          // 宫位天干
          heavenlyStem: '戊',
          // 宫位地支
          earthlyBranch: '寅',
          // 主星（含天马禄存）
          majorStars: [
            { name: '武曲', type: 'major', scope: 'origin', brightness: '得' },
            { name: '天相', type: 'major', scope: 'origin', brightness: '庙' },
            { name: '天马', type: 'tianma', scope: 'origin', brightness: '' },
          ],
          // 辅星（含六吉六煞）
          minorStars: [],
          // 杂耀
          adjectiveStars: [
            { name: '月解', type: 'helper', scope: 'origin' },
            { name: '三台', type: 'adjective', scope: 'origin' },
            { name: '天寿', type: 'adjective', scope: 'origin' },
            { name: '天巫', type: 'adjective', scope: 'origin' },
            { name: '天厨', type: 'adjective', scope: 'origin' },
            { name: '阴煞', type: 'adjective', scope: 'origin' },
            { name: '天哭', type: 'adjective', scope: 'origin' },
          ],
          // 长生12神
          changsheng12: '绝',
          // 博士12神
          boshi12: '蜚廉',
          // 流年将前12神
          jiangqian12: '岁驿',
          // 流年岁前12神
          suiqian12: '吊客',
          // 大限
          decadal: { range: [44, 53], heavenlyStem: '戊' },
          // 小限
          ages: [9, 21, 33, 45, 57, 69, 81],
        },
        // 其余11条数据因为篇幅关系予以隐藏
      ],
    }
```

##### ✍️ Response data definition

```ts
export type Star = {
  /** 星耀名字 */
  name: string;
  /** 星耀类型（主星 | 吉星 | 煞星 | 杂耀 | 桃花星 | 解神 | 禄存 | 天马） */
  type: StarType;
  /** 作用范围（本命盘 | 大限盘 | 流年盘） */
  scope: Scope;
  /** 星耀亮度 */
  brightness?: StarBrightness;
  /** 四化 */
  mutagen?: Mutagen;
};

export type Decadal = {
  /** 大限起止年龄 [起始年龄, 截止年龄] */
  range: number[];
  /** 大限天干 */
  heavenlyStem: HeavenlyStem;
  /** 大限地支 */
  earthlyBranch: EarthlyBranch;
};

export type Palace = {
  /** 宫名 */
  name: PalaceName;
  /** 是否身宫 */
  isBodyPalace: boolean;
  /** 是否来因宫 */
  isOriginalPalace: boolean;
  /** 宫位天干 */
  heavenlyStem: HeavenlyStem;
  /** 宫位地支 */
  earthlyBranch: EarthlyBranch;
  /** 主星 */
  majorStars: Star[];
  /** 辅星 */
  minorStars: Star[];
  /** 杂耀 */
  adjectiveStars: Star[];
  /** 长生12神 */
  changsheng12: string;
  /** 博士12神 */
  boshi12: string;
  /** 流年将前12神 */
  jiangqian12: string;
  /** 流年岁前12神 */
  suiqian12: string;
  /** 大限 */
  decadal: Decadal;
  /** 小限 */
  ages: number[];
};

export type Astrolabe = {
  /** 阳历日期 */
  solarDate: string;
  /** 农历日期 */
  lunarDate: string;
  /** 四柱 */
  chineseDate: string;
  /** 时辰 */
  time: BirthTime;
  /** 时辰对应的时间段 */
  timeRange: TimeRange;
  /** 星座 */
  sign: string;
  /** 生肖 */
  zodiac: string;
  /** 命宫地支 */
  earthlyBranchOfSoulPalace: EarthlyBranch;
  /** 身宫地支 */
  earthlyBranchOfBodyPalace: EarthlyBranch;
  /** 命主 */
  soul: string;
  /** 身主 */
  body: string;
  /** 五行局 */
  fiveElementsClass: FiveElementsClassName;
  /** 十二宫数据 */
  palaces: Palace[];
};
```

#### ✨ Get horoscope stars

##### ❓ Usage

- ES6 Module

  ```ts
  import { star } from '@sylarlong/astro';

  // get horoscope stars by heavenly stem and earthly branch
  const horoscopeStars = star.getHoroscopeStar('庚', '辰', 'decadal');
  ```

- CommonJS

  ```ts
  var astroObj = require('@sylarlong/astro');

  // get horoscope stars by heavenly stem and earthly branch
  var horoscopeStars = astroObj.star.getHoroscopeStar('庚', '辰', 'decadal');
  ```

##### ✍️ function definition

- getHoroscopeStar

  ```ts
  /**
   * get horoscope stars
   *
   * @param heavenlyStem heavenly stem of the horoscope
   * @param earthlyBranch earthly branch of the horoscope
   * @param scope scope 【'decadal' | 'yearly'】
   * @returns horoscope stars
   */
  type getHoroscopeStar = (
    heavenlyStem: HeavenlyStem,
    earthlyBranch: EarthlyBranch,
    scope: 'decadal' | 'yearly',
  ) => Star[][];
  ```

##### 📑 返回数据 (Response data)

```ts
[
  [{ name: '运马', type: 'tianma', scope: 'decadal' }],
  [{ name: '运曲', type: 'soft', scope: 'decadal' }],
  [],
  [{ name: '运喜', type: 'flower', scope: 'decadal' }],
  [],
  [
    { name: '运钺', type: 'soft', scope: 'decadal' },
    { name: '运陀', type: 'tough', scope: 'decadal' },
  ],
  [{ name: '运禄', type: 'lucun', scope: 'decadal' }],
  [{ name: '运羊', type: 'tough', scope: 'decadal' }],
  [],
  [
    { name: '运昌', type: 'soft', scope: 'decadal' },
    { name: '运鸾', type: 'flower', scope: 'decadal' },
  ],
  [],
  [{ name: '运魁', type: 'soft', scope: 'decadal' }],
];
```

#### ☕ Summary

Buy me a coffe if it's useful for you.👍 [Paypal Me](https://PayPal.Me/sylarlong)

You can create the astrolabe below based on the response data above. `palaces` is used to fill the 12-Palace and other fields are used to fill the Center Palace.

![demo](https://github.com/SylarLong/astro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

#### 📜 LICENSE

MIT License

Copyright &copy; 2023 Sylar Long

Please use this open-source code responsibly and refrain from using it for illegal purposes.
