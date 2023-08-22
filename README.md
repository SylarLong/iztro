<p align="center" width="100%">
  
  ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/astro/Codecov.yaml)
  ![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro)
  ![Static Badge](https://img.shields.io/badge/astro-%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B0-purple) ![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/astro) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/astro)
  ![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro) ![Website](https://img.shields.io/website?up_message=https://a.14star.cn&up_color=purple&url=https%3A%2F%2Fa.14star.cn&label=demo) ![GitHub issues](https://img.shields.io/github/issues/SylarLong/astro) ![GitHub](https://img.shields.io/github/license/sylarlong/astro) ![Codecov](https://img.shields.io/codecov/c/github/sylarlong/astro) ![npm](https://img.shields.io/npm/dw/%40sylarlong/astro) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/sylarlong/astro) ![Maintenance](https://img.shields.io/maintenance/yes/2023)

</p>

# 📢 介绍（Introduction）

🇨🇳

用于紫微斗数排盘的工具库，文档还在整理中，大家有任何问题欢迎到[这里](https://github.com/SylarLong/astro/issues)提问交流，也可以直接向我发送邮件（sylarlong@gmail.com，alsogood@qq.com）。扣码不易，希望得到各位大佬的星星。之后会陆续添加更多实用功能和国际化，敬请期待。🍻

🇺🇸

This framework is used to generate the astrolabe of The Purple Star Astrology(Zi Wei Dou Shu). The document is under progressing. If you have any issue please feel free to create issues in [here](https://github.com/SylarLong/astro/issues) or just send an email (sylarlong@gmail.com or alsogood@qq.com) to me directly. I'll appreciate your star. More useful functions and localization are coming soon. stay tuned!🍻

## 🌰 举个栗子（Demo）

Demo 地址：https://a.14star.cn

## 🎲 用法（How to use it?）

### 🚀 让我们开始把（Let's get started）

```
npm i @sylarlong/astro -S
```

### ❓ 调用方法（Usage）

- ES6 Module

  ```ts
  import { astro } from '@sylarlong/astro';

  // 通过阳历获取星盘信息
  // generate astrolabe by solar date
  const astrolabe = astro.astrolabeBySolarDate('2000-8-16', 2, '女');

  // 通过农历获取星盘信息
  // generate astrolabe by lunar date
  const astrolabe = astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true);
  ```

- CommonJS

  ```ts
  var astroObj = require("@sylarlong/astro")

  // 通过阳历获取星盘信息
  // generate astrolabe by solar date
  var astrolabe = astroObj.astro.astrolabeBySolarDate('2000-8-16', 2, '女');
  
  // 通过农历获取星盘信息
  // generate astrolabe by lunar date
  var astrolabe = astroObj.astro.astrolabeByLunarDate('2000-7-17', 2, '女', false, true);
  ```

#### ✍️ 方法定义（function definition）

- astrolabeBySolarDate

  ```ts
  /**
   * 通过阳历获取星盘信息
   * generate astrolabe by solar date
   *
   * @param solarDateStr 阳历日期【YYYY-M-D】
   * @param timeIndex 出生时辰序号【0~12】，对应从早子时（0）一直到晚子时（12）的序号
   * @param gender 性别【男|女】
   * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
   * @returns 星盘信息
   */
  type astrolabeBySolarDate = (
    solarDateStr: string,
    timeIndex: number,
    gender: Gender,
    fixLeap: boolean = true,
  ) => Astrolabe;
  ```

- astrolabeByLunarDate

  ```ts
  /**
   * 通过农历获取星盘信息
   * generate astrolabe by lunar date
   *
   * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
   * @param timeIndex 出生时辰序号【0~12】
   * @param gender 性别【男|女】
   * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
   * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
   * @returns 星盘信息
   */
  type astrolabeByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    gender: Gender,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
  ) => Astrolabe;
  ```

#### 📑 返回数据 (Response data)

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

#### ✍️ 返回数据定义（Response data definition）

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
  fiveElementsClass: FiveElementsClassItem;
  /** 十二宫数据 */
  palaces: Palace[];
};
```

### ✨ 获取流耀（Get horoscope stars）

#### ❓ 调用方法（Usage）

- ES6 Module

  ```ts
  import { star } from '@sylarlong/astro';

  // 通过天干地支获取流耀
  // get horoscope stars by heavenly stem and earthly branch
  const horoscopeStars = star.getHoroscopeStar('庚', '辰', 'decadal');
  ```

- CommonJS

  ```ts
  var astroObj = require("@sylarlong/astro")

  // 通过天干地支获取流耀
  // get horoscope stars by heavenly stem and earthly branch
  var horoscopeStars = astroObj.star.getHoroscopeStar('庚', '辰', 'decadal');
  ```

#### ✍️ 方法定义（function definition）

- getHoroscopeStar

  ```ts
  /**
   * 获取流耀
   * get horoscope stars
   *
   * 魁钺昌曲禄羊陀马鸾喜
   *
   * @param heavenlyStem 天干
   * @param earthlyBranch 地支
   * @param scope 限定是大限还是流年的流耀，其中大限流耀会在星耀前面加上`运`，流年流耀会在星耀前面加上`流`
   */
  type getHoroscopeStar = (
    heavenlyStem: HeavenlyStem,
    earthlyBranch: EarthlyBranch,
    scope: 'decadal' | 'yearly',
  ) => Star[][];
  ```

#### 📑 返回数据 (Response data)

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

### ☕ 总结（Summary）

🇨🇳

以上数据可以生成如下星盘，其中`palaces`数据用于填充12宫，其他数据用于填充中宫。

🇺🇸

You can create the astrolabe below based on the response data above. `palaces` is used to fill the 12-Palace and other fields are used to fill the Center Palace.

![demo](https://github.com/SylarLong/astro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)

### 📜 版权（LICENSE）

MIT License

Copyright &copy; 2023 Sylar Long

🇨🇳

请合理使用本开源代码，禁止用于非法目的。

🇺🇸

Please use this open-source code responsibly and refrain from using it for illegal purposes.
