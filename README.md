![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/SylarLong/astro/Codecov.yaml)
 ![npm](https://img.shields.io/npm/v/%40sylarlong%2Fastro)
 ![Static Badge](https://img.shields.io/badge/astro-%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B0-purple) ![GitHub top language](https://img.shields.io/github/languages/top/SylarLong/astro) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/astro)
 ![npm bundle size](https://img.shields.io/bundlephobia/min/%40sylarlong%2Fastro) ![Website](https://img.shields.io/website?up_message=https://a.14star.cn&up_color=purple&url=https%3A%2F%2Fa.14star.cn&label=demo) ![GitHub issues](https://img.shields.io/github/issues/SylarLong/astro) ![GitHub](https://img.shields.io/github/license/sylarlong/astro) ![Codecov](https://img.shields.io/codecov/c/github/sylarlong/astro)



# 介绍（Introduction）

用于紫微斗数排盘的工具库，文档还在整理中，大家有任何问题欢迎到[这里](https://github.com/SylarLong/astro/issues)提问交流，也可以直接向我发送邮件（sylarlong@gmail.com，alsogood@qq.com）。扣码不易，希望得到各位大佬的星星。之后会陆续添加更多实用功能和国际化，敬请期待。🍻

This framework is used to generate the astrolabe of The Purple Star Astrology(Zi Wei Dou Shu). The document is under progressing. If you have any issue please feel free to create issues in [here](https://github.com/SylarLong/astro/issues) or just send an email (sylarlong@gmail.com or alsogood@qq.com) to me directly. I'll appreciate your star. More useful functions and localization are coming soon. stay tuned!🍻

## 举个栗子🌰（Demo）

Demo 地址：https://a.14star.cn

## 用法（How to use it?）

### 让我们开始把（Let's get started）

```
npm i @sylarlong/astro -S
```

### 调用方法（Usage）

```ts
import { astro } from '@sylarlong/astro';

// 通过阳历获取星盘信息
// generate astrolabe by solar date
const astrolable = astro.astrolableBySolarDate('2000-8-16', 2, '女');

// 通过农历获取星盘信息
// generate astrolabe by lunar date
const astrolable = astro.astrolableByLunarDate('2000-7-17', 2, '女', false, true);
```

#### 方法定义（function definition）

- astrolableBySolarDate

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
  type astrolableBySolarDate = (
      solarDateStr: string,
      timeIndex: number,
      gender: Gender,
      fixLeap: boolean = true,
  ) => Astrolabe
  ```

- astrolableByLunarDate

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
  type astrolableByLunarDate = (
    lunarDateStr: string,
    timeIndex: number,
    gender: Gender,
    isLeapMonth: boolean = false,
    fixLeap: boolean = true,
  ) =>  Astrolabe
  ```

 <details><summary>返回数据 (Response data)</summary>
  <p>
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
          stage: { range: [44, 53], heavenlyStem: '戊' },
          // 小限
          ages: [9, 21, 33, 45, 57, 69, 81],
        },
        {
          name: '子女',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '己',
          earthlyBranch: '卯',
          majorStars: [
            { name: '太阳', type: 'major', scope: 'origin', brightness: '庙' },
            { name: '天梁', type: 'major', scope: 'origin', brightness: '庙' },
          ],
          minorStars: [],
          adjectiveStars: [{ name: '天刑', type: 'adjective', scope: 'origin' }],
          changsheng12: '墓',
          boshi12: '奏书',
          jiangqian12: '息神',
          suiqian12: '病符',
          stage: { range: [34, 43], heavenlyStem: '己' },
          ages: [8, 20, 32, 44, 56, 68, 80],
        },
        {
          name: '夫妻',
          isBodyPalace: false,
          isOriginalPalace: true,
          heavenlyStem: '庚',
          earthlyBranch: '辰',
          majorStars: [{ name: '七杀', type: 'major', scope: 'origin', brightness: '庙' }],
          minorStars: [
            { name: '右弼', type: 'soft', scope: 'origin', brightness: '' },
            { name: '火星', type: 'tough', scope: 'origin', brightness: '陷' },
          ],
          adjectiveStars: [
            { name: '封诰', type: 'adjective', scope: 'origin' },
            { name: '华盖', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '死',
          boshi12: '将军',
          jiangqian12: '华盖',
          suiqian12: '岁建',
          stage: { range: [24, 33], heavenlyStem: '庚' },
          ages: [7, 19, 31, 43, 55, 67, 79],
        },
        {
          name: '兄弟',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '辛',
          earthlyBranch: '巳',
          majorStars: [{ name: '天机', type: 'major', scope: 'origin', brightness: '平' }],
          minorStars: [],
          adjectiveStars: [
            { name: '天喜', type: 'flower', scope: 'origin' },
            { name: '天空', type: 'adjective', scope: 'origin' },
            { name: '孤辰', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '病',
          boshi12: '小耗',
          jiangqian12: '劫煞',
          suiqian12: '晦气',
          stage: { range: [14, 23], heavenlyStem: '辛' },
          ages: [6, 18, 30, 42, 54, 66, 78],
        },
        {
          name: '命宫',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '壬',
          earthlyBranch: '午',
          majorStars: [{ name: '紫微', type: 'major', scope: 'origin', brightness: '庙' }],
          minorStars: [{ name: '文曲', type: 'soft', scope: 'origin', brightness: '陷' }],
          adjectiveStars: [
            { name: '年解', type: 'helper', scope: 'origin' },
            { name: '凤阁', type: 'adjective', scope: 'origin' },
            { name: '天福', type: 'adjective', scope: 'origin' },
            { name: '截路', type: 'adjective', scope: 'origin' },
            { name: '蜚廉', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '衰',
          boshi12: '青龙',
          jiangqian12: '灾煞',
          suiqian12: '丧门',
          stage: { range: [4, 13], heavenlyStem: '壬' },
          ages: [5, 17, 29, 41, 53, 65, 77],
        },
        {
          name: '父母',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '癸',
          earthlyBranch: '未',
          majorStars: [],
          minorStars: [
            { name: '天钺', type: 'soft', scope: 'origin', brightness: '' },
            { name: '陀罗', type: 'tough', scope: 'origin', brightness: '庙' },
          ],
          adjectiveStars: [
            { name: '天姚', type: 'flower', scope: 'origin' },
            { name: '空亡', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '帝旺',
          boshi12: '力士',
          jiangqian12: '天煞',
          suiqian12: '贯索',
          stage: { range: [114, 123], heavenlyStem: '癸' },
          ages: [4, 16, 28, 40, 52, 64, 76],
        },
        {
          name: '福德',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '甲',
          earthlyBranch: '申',
          majorStars: [
            { name: '破军', type: 'major', scope: 'origin', brightness: '得' },
            { name: '禄存', type: 'lucun', scope: 'origin', brightness: '' },
          ],
          minorStars: [{ name: '文昌', type: 'soft', scope: 'origin', brightness: '得' }],
          adjectiveStars: [
            { name: '龙池', type: 'adjective', scope: 'origin' },
            { name: '台辅', type: 'adjective', scope: 'origin' },
            { name: '旬空', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '临官',
          boshi12: '博士',
          jiangqian12: '指背',
          suiqian12: '官符',
          stage: { range: [104, 113], heavenlyStem: '甲' },
          ages: [3, 15, 27, 39, 51, 63, 75],
        },
        {
          name: '田宅',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '乙',
          earthlyBranch: '酉',
          majorStars: [],
          minorStars: [
            { name: '地空', type: 'tough', scope: 'origin', brightness: '' },
            { name: '擎羊', type: 'tough', scope: 'origin', brightness: '陷' },
          ],
          adjectiveStars: [
            { name: '咸池', type: 'flower', scope: 'origin' },
            { name: '天贵', type: 'adjective', scope: 'origin' },
            { name: '月德', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '冠带',
          boshi12: '官府',
          jiangqian12: '咸池',
          suiqian12: '小耗',
          stage: { range: [94, 103], heavenlyStem: '乙' },
          ages: [2, 14, 26, 38, 50, 62, 74],
        },
        {
          name: '官禄',
          isBodyPalace: true,
          isOriginalPalace: false,
          heavenlyStem: '丙',
          earthlyBranch: '戌',
          majorStars: [
            { name: '廉贞', type: 'major', scope: 'origin', brightness: '利' },
            { name: '天府', type: 'major', scope: 'origin', brightness: '庙' },
          ],
          minorStars: [{ name: '左辅', type: 'soft', scope: 'origin', brightness: '' }],
          adjectiveStars: [
            { name: '天才', type: 'adjective', scope: 'origin' },
            { name: '天虚', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '沐浴',
          boshi12: '伏兵',
          jiangqian12: '月煞',
          suiqian12: '大耗',
          stage: { range: [84, 93], heavenlyStem: '丙' },
          ages: [1, 13, 25, 37, 49, 61, 73],
        },
        {
          name: '仆役',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '丁',
          earthlyBranch: '亥',
          majorStars: [{ name: '太阴', type: 'major', scope: 'origin', brightness: '庙' }],
          minorStars: [],
          adjectiveStars: [
            { name: '红鸾', type: 'flower', scope: 'origin' },
            { name: '恩光', type: 'adjective', scope: 'origin' },
            { name: '天官', type: 'adjective', scope: 'origin' },
            { name: '天月', type: 'adjective', scope: 'origin' },
            { name: '天伤', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '长生',
          boshi12: '大耗',
          jiangqian12: '亡神',
          suiqian12: '龙德',
          stage: { range: [74, 83], heavenlyStem: '丁' },
          ages: [12, 24, 36, 48, 60, 72, 84],
        },
        {
          name: '迁移',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '戊',
          earthlyBranch: '子',
          majorStars: [{ name: '贪狼', type: 'major', scope: 'origin', brightness: '旺' }],
          minorStars: [{ name: '铃星', type: 'tough', scope: 'origin', brightness: '陷' }],
          adjectiveStars: [{ name: ' 八座', type: 'adjective', scope: 'origin' }],
          changsheng12: '养',
          boshi12: '病符',
          jiangqian12: '将星',
          suiqian12: '白虎',
          stage: { range: [64, 73], heavenlyStem: '戊' },
          ages: [11, 23, 35, 47, 59, 71, 83],
        },
        {
          name: '疾厄',
          isBodyPalace: false,
          isOriginalPalace: false,
          heavenlyStem: '己',
          earthlyBranch: '丑',
          majorStars: [
            { name: '天同', type: 'major', scope: 'origin', brightness: '不' },
            { name: '巨门', type: 'major', scope: 'origin', brightness: '不' },
          ],
          minorStars: [
            { name: '天魁', type: 'soft', scope: 'origin', brightness: '' },
            { name: '地劫', type: 'tough', scope: 'origin', brightness: '' },
          ],
          adjectiveStars: [
            { name: '天德', type: 'adjective', scope: 'origin' },
            { name: '寡宿', type: 'adjective', scope: 'origin' },
            { name: '破碎', type: 'adjective', scope: 'origin' },
            { name: '天使', type: 'adjective', scope: 'origin' },
          ],
          changsheng12: '胎',
          boshi12: '喜神',
          jiangqian12: '攀鞍',
          suiqian12: '天德',
          stage: { range: [54, 63], heavenlyStem: '己' },
          ages: [10, 22, 34, 46, 58, 70, 82],
        },
      ],
    }
    </p>
</details> 

#### 返回数据定义（response data definition）

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

export type Stage = {
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
  stage: Stage;
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

以上数据可以生成如下星盘，其中`palaces`数据用于填充12宫，其他数据用于填充中宫。

You can create the astrolabe below based on the response data above. `palaces` is used to fill the 12-Palace and other fields are used to fill the Center Palace.

![demo](https://github.com/SylarLong/astro/assets/6510425/d2108ed7-6794-418a-b0e5-872c71ba6e1d)
