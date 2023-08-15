import { getFiveElementsClass, getSoulAndBody } from '../astro';
import { getHeavenlyStemAndEarthlyBranchBySolarDate, getTotalDaysOfLunarMonth, solar2lunar } from '../calendar';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS, PALACES } from '../data';
import { EarthlyBranch, FiveElementsClass, HeavenlyStem } from '../data/types';
import { fixEarthlyBranchIndex, fixIndex, fixLunarDayIndex, fixLunarMonthIndex } from '../utils';

/**
 * 起紫微星诀算法
 *
 * - 六五四三二，酉午亥辰丑，
 * - 局数除日数，商数宫前走；
 * - 若见数无余，便要起虎口，
 * - 日数小於局，还直宫中守。
 *
 * 举例：
 * - 例一：27日出生木三局，以三除27，循环0次就可以整除，27➗3=9，从寅进9格，在戍安紫微。
 * - 例二：13日出生火六局，以六除13，最少需要加5才能整除， 18➗8=3，从寅进3格为辰，添加数为5（奇数），故要逆回五宫，在亥安紫微。
 * - 例三：6日出生土五局，以五除6，最少需要加4才能整除，10➗5=2，从寅进2格为卯，添加数为4（偶数），顺行4格为未，在未安紫微。
 *
 * @param solarDateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否调整农历闰月（若该月不是闰月则不会生效）
 * @returns 紫微和天府星所在宫位索引
 */
export const getStartIndex = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
  const { heavenlyStemOfSoul, earthlyBranchOfSoul } = getSoulAndBody(solarDateStr, timeIndex, fixLeap);
  const { lunarYear, lunarMonth, lunarDay } = solar2lunar(solarDateStr);
  const fiveElements = getFiveElementsClass(heavenlyStemOfSoul, earthlyBranchOfSoul);
  let remainder = -1; // 余数
  let quotient; // 商
  let offset = -1; // 循环次数

  // 获取当月最大天数
  const maxDays = getTotalDaysOfLunarMonth(lunarYear, lunarMonth);

  // 如果timeIndex等于12说明是晚子时，需要加一天
  let _day = timeIndex === 12 ? lunarDay + 1 : lunarDay;

  if (_day > maxDays) {
    // 假如日期超过当月最大天数，说明跨月了，需要处理为合法日期
    _day -= maxDays;
  }

  do {
    // 农历出生日（初一为1，以此类推）加上偏移量作为除数，以这个数处以五行局的数向下取整
    // 需要一直运算到余数为0为止
    offset++;

    const divisor = _day + offset;

    quotient = Math.floor(divisor / FiveElementsClass[fiveElements]);
    remainder = divisor % FiveElementsClass[fiveElements];
  } while (remainder !== 0);

  // 将商除以12取余数
  quotient %= 12;

  // 以商减一（因为需要从0开始）作为起始位置
  let ziweiIndex = quotient - 1;

  if (offset % 2 === 0) {
    // 若循环次数为偶数，则索引逆时针数到循环数
    ziweiIndex += offset;
  } else {
    // 若循环次数为偶数，则索引顺时针数到循环数
    ziweiIndex -= offset;
  }

  ziweiIndex = fixIndex(ziweiIndex);

  // 天府星位置与紫微星相对
  const tianfuIndex = fixIndex(12 - ziweiIndex);

  return { ziweiIndex, tianfuIndex };
};

/**
 * 按年干支计算禄存、擎羊，陀罗、天马的索引
 *
 * 定禄存、羊、陀诀（按年干）
 *
 * - 甲禄到寅宫，乙禄居卯府。
 * - 丙戊禄在巳，丁己禄在午。
 * - 庚禄定居申，辛禄酉上补。
 * - 壬禄亥中藏，癸禄居子户。
 * - 禄前羊刃当，禄后陀罗府。
 *
 * 安天马（按年支），天马只会出现在四马地【寅申巳亥】
 *
 * - 寅午戍年马在申，申子辰年马在寅。
 * - 巳酉丑年马在亥，亥卯未年马在巳。
 *
 * @param heavenlyStem 天干
 * @param earthlyBranch 地支
 * @returns 禄存、擎羊，陀罗、天马的索引
 */
export const getLuYangTuoMaIndex = (heavenlyStem: HeavenlyStem, earthlyBranch: EarthlyBranch) => {
  let luIndex = -1; // 禄存索引
  let maIndex = -1; // 天马索引

  switch (earthlyBranch) {
    case '寅':
    case '午':
    case '戌':
      maIndex = fixEarthlyBranchIndex('申');
      break;
    case '申':
    case '子':
    case '辰':
      maIndex = fixEarthlyBranchIndex('寅');
      break;
    case '巳':
    case '酉':
    case '丑':
      maIndex = fixEarthlyBranchIndex('亥');
      break;
    case '亥':
    case '卯':
    case '未':
      maIndex = fixEarthlyBranchIndex('巳');
      break;
  }

  switch (heavenlyStem) {
    case '甲': {
      luIndex = fixEarthlyBranchIndex('寅');
      break;
    }
    case '乙': {
      luIndex = fixEarthlyBranchIndex('卯');
      break;
    }
    case '丙':
    case '戊': {
      luIndex = fixEarthlyBranchIndex('巳');
      break;
    }
    case '丁':
    case '己': {
      luIndex = fixEarthlyBranchIndex('午');
      break;
    }
    case '庚': {
      luIndex = fixEarthlyBranchIndex('申');
      break;
    }
    case '辛': {
      luIndex = fixEarthlyBranchIndex('酉');
      break;
    }
    case '壬': {
      luIndex = fixEarthlyBranchIndex('亥');
      break;
    }
    case '癸': {
      luIndex = fixEarthlyBranchIndex('子');
      break;
    }
  }

  return {
    luIndex,
    maIndex,
    yangIndex: fixIndex(luIndex + 1),
    tuoIndex: fixIndex(luIndex - 1),
  };
};

/**
 * 获取天魁天钺所在宫位索引（按年干）
 *
 * - 甲戊庚之年丑未
 * - 乙己之年子申
 * - 辛年午寅
 * - 壬癸之年卯巳
 * - 丙丁之年亥酉
 *
 * @param heavenlyStem 天干
 * @returns
 */
export const getKuiYueIndex = (heavenlyStem: HeavenlyStem) => {
  let kuiIndex = -1;
  let yueIndex = -1;

  switch (heavenlyStem) {
    case '甲':
    case '戊':
    case '庚':
      kuiIndex = fixEarthlyBranchIndex('丑');
      yueIndex = fixEarthlyBranchIndex('未');
      break;
    case '乙':
    case '己':
      kuiIndex = fixEarthlyBranchIndex('子');
      yueIndex = fixEarthlyBranchIndex('申');
      break;
    case '辛':
      kuiIndex = fixEarthlyBranchIndex('午');
      yueIndex = fixEarthlyBranchIndex('寅');
      break;
    case '丙':
    case '丁':
      kuiIndex = fixEarthlyBranchIndex('亥');
      yueIndex = fixEarthlyBranchIndex('酉');
      break;
    case '壬':
    case '癸':
      kuiIndex = fixEarthlyBranchIndex('卯');
      yueIndex = fixEarthlyBranchIndex('巳');
      break;
  }

  return { kuiIndex, yueIndex };
};

/**
 * 获取左辅右弼的索引（按生月）
 *
 * - 辰上顺正寻左辅
 * - 戌上逆正右弼当
 *
 * 解释：
 *
 * - 从辰顺数农历月份数是左辅的索引
 * - 从戌逆数农历月份数是右弼的索引
 *
 * @param lunarMonth 农历月份
 * @returns 左辅、右弼索引
 */
export const getZuoYouIndex = (lunarMonth: number) => {
  const zuoIndex = fixIndex(fixEarthlyBranchIndex('辰') + (lunarMonth - 1));
  const youIndex = fixIndex(fixEarthlyBranchIndex('戌') - (lunarMonth - 1));

  return { zuoIndex, youIndex };
};

/**
 * 获取文昌文曲的索引（按时支）
 *
 * - 辰上顺时文曲位
 * - 戌上逆时觅文昌
 *
 * 解释：
 *
 * - 从辰顺数到时辰地支索引是文曲的索引
 * - 从戌逆数到时辰地支索引是文昌的索引
 *
 * 由于时辰地支的索引即是时辰的序号，所以可以直接使用时辰的序号
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 文昌、文曲索引
 */
export const getChangQuIndex = (timeIndex: number) => {
  const changIndex = fixIndex(fixEarthlyBranchIndex('戌') - fixIndex(timeIndex));
  const quIndex = fixIndex(fixEarthlyBranchIndex('辰') + fixIndex(timeIndex));

  return { changIndex, quIndex };
};

/**
 * 获取日系星索引，包括
 *
 * 三台，八座，恩光，天贵
 *
 * - 安三台八座
 *   - 由左辅之宫位起初一，顺行至生日安三台。
 *   - 由右弼之宫位起初一，逆行至生日安八座。
 *
 * - 安恩光天贵
 *   - 由文昌之宫位起初一，顺行至生日再退一步起恩光。
 *   - 由文曲之宫位起初一，顺行至生日再退一步起天贵。
 *
 * @param solarDateStr 阳历日期
 * @param timeIndex 时辰索引【0～12】
 * @returns 三台，八座索引
 */
export const getDailyStarIndex = (solarDateStr: string, timeIndex: number) => {
  const { lunarMonth, lunarDay } = solar2lunar(solarDateStr);
  const { zuoIndex, youIndex } = getZuoYouIndex(lunarMonth);
  const { changIndex, quIndex } = getChangQuIndex(timeIndex);
  const dayIndex = fixLunarDayIndex(lunarDay, timeIndex);

  const santaiIndex = fixIndex((zuoIndex + dayIndex) % 12);
  const bazuoIndex = fixIndex((youIndex - dayIndex) % 12);
  const enguangIndex = fixIndex(((changIndex + dayIndex) % 12) - 1);
  const tianguiIndex = fixIndex(((quIndex + dayIndex) % 12) - 1);

  return { santaiIndex, bazuoIndex, enguangIndex, tianguiIndex };
};

/**
 * 获取时系星耀索引，包括台辅，封诰
 *
 * @param timeIndex 时辰序号【0～12】
 * @returns 台辅，封诰索引
 */
export const getTimelyStarIndex = (timeIndex: number) => {
  const taifuIndex = fixIndex(fixEarthlyBranchIndex('午') + fixIndex(timeIndex));
  const fenggaoIndex = fixIndex(fixEarthlyBranchIndex('寅') + fixIndex(timeIndex));

  return { taifuIndex, fenggaoIndex };
};

/**
 * 获取地空地劫的索引（按时支）
 *
 * - 亥上子时顺安劫
 * - 逆回便是地空亡
 *
 * 解释：
 *
 * - 从亥顺数到时辰地支索引是地劫的索引
 * - 从亥逆数到时辰地支索引是地空的索引
 *
 * 由于时辰地支的索引即是时辰的序号，所以可以直接使用时辰的序号
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 地空、地劫索引
 */
export const getKongJieIndex = (timeIndex: number) => {
  const fixedTimeIndex = fixIndex(timeIndex);
  const haiIndex = fixEarthlyBranchIndex('亥');
  const kongIndex = fixIndex(haiIndex - fixedTimeIndex);
  const jieIndex = fixIndex(haiIndex + fixedTimeIndex);

  return { kongIndex, jieIndex };
};

/**
 * 获取火星铃星索引（按年支以及时支）
 *
 * - 申子辰人寅戌扬
 * - 寅午戌人丑卯方
 * - 巳酉丑人卯戌位
 * - 亥卯未人酉戌房
 *
 * 起火铃二曜先据出生年支，依口诀定火铃起子时位。
 *
 * 例如壬辰年卯时生人，据[申子辰人寅戌扬]口诀，故火星在寅宫起子时，铃星在戌宫起子时，顺数至卯时，即火星在巳，铃星在丑。
 *
 * @param earthlyBranch 地支
 * @param timeIndex 时辰序号
 * @returns 火星、铃星索引
 */
export const getHuoLingIndex = (earthlyBranch: EarthlyBranch, timeIndex: number) => {
  let huoIndex = -1;
  let lingIndex = -1;
  const fixedTimeIndex = fixIndex(timeIndex);

  switch (earthlyBranch) {
    case '寅':
    case '午':
    case '戌': {
      huoIndex = fixEarthlyBranchIndex('丑') + fixedTimeIndex;
      lingIndex = fixEarthlyBranchIndex('卯') + fixedTimeIndex;
      break;
    }
    case '申':
    case '子':
    case '辰': {
      huoIndex = fixEarthlyBranchIndex('寅') + fixedTimeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + fixedTimeIndex;
      break;
    }
    case '巳':
    case '酉':
    case '丑': {
      huoIndex = fixEarthlyBranchIndex('卯') + fixedTimeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + fixedTimeIndex;
      break;
    }
    case '亥':
    case '未':
    case '卯': {
      huoIndex = fixEarthlyBranchIndex('酉') + fixedTimeIndex;
      lingIndex = fixEarthlyBranchIndex('戌') + fixedTimeIndex;
      break;
    }
  }

  return {
    huoIndex: fixIndex(huoIndex),
    lingIndex: fixIndex(lingIndex),
  };
};

/**
 * 获取红鸾天喜所在宫位索引
 *
 * - 卯上起子逆数之
 * - 数到当生太岁支
 * - 坐守此宫红鸾位
 * - 对宫天喜不差移
 *
 * @param earthlyBranch 年支
 * @returns 红鸾、天喜索引
 */
export const getLuanXiIndex = (earthlyBranch: EarthlyBranch) => {
  const hongluanIndex = fixIndex(fixEarthlyBranchIndex('卯') - EARTHLY_BRANCHES.indexOf(earthlyBranch));

  const tianxiIndex = fixIndex(hongluanIndex + 6);

  return { hongluanIndex, tianxiIndex };
};

/**
 * 获取年系星的索引，包括
 * 咸池，华盖，孤辰，寡宿, 天厨，破碎，天才，天寿，蜚蠊, 龙池，凤阁，天哭，天虚，
 * 天官，天福
 *
 * - 安华盖
 *   - 子辰申年在辰，丑巳酉年在丑，寅午戍年在戍，卯未亥年在未。
 *
 * - 安咸池
 *   - 子辰申年在酉，丑巳酉年在午，寅午戍年在卯，卯未亥年在子。
 *
 * - 安孤辰寡宿
 *   - 寅卯辰年安巳丑，巳午未年安申辰，申酉戍年安亥未，亥子丑年安寅戍。
 *
 * - 安天才天寿
 *   - 天才由命宫起子，顺行至本生年支安之。天寿由身宫起子，顺行至本生年支安之。
 *
 * - 安破碎
 *   - 子午卯酉年安巳宫，寅申巳亥年安酉宫，辰戍丑未年安丑宫。
 *
 * - 安天厨
 *   - 甲丁食蛇口，乙戊辛马方。丙从鼠口得，己食于猴房。庚食虎头上，壬鸡癸猪堂。
 *
 * - 安蜚蠊
 *   - 子丑寅年在申酉戍，卯辰巳年在巳午未，午未申年在寅卯辰，酉戍亥年在亥子丑。
 *
 * - 安龙池凤阁
 *   - 龙池从辰宫起子，顺至本生年支安之。凤阁从戍宫起子，逆行至本生年支安之。
 *
 * - 安天哭天虚
 *   - 天哭天虚起午宫，午宫起子两分踪，哭逆行兮虚顺转，数到生年便停留。
 *
 * - 安天官天福
 *   - 甲喜羊鸡乙龙猴，丙年蛇鼠一窝谋。丁虎擒猪戊玉兔，
 *   - 己鸡居然与虎俦。庚猪马辛鸡蛇走，壬犬马癸马蛇游。
 *
 * -安截路空亡
 *   - 甲己之年申酉，乙庚之年午未，
 *   - 丙辛之年辰巳，丁壬之年寅卯，
 *   - 戊癸之年子丑。
 *
 * - 安天空
 *   - 生年支顺数的前一位就是。
 * @param solarDate 阳历日期
 * @param timeIndex 时辰序号
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 */
export const getYearlyStarIndex = (solarDate: string, timeIndex: number, fixLeap?: boolean) => {
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex);
  const { soulIndex, bodyIndex } = getSoulAndBody(solarDate, timeIndex, fixLeap);
  const [heavenlyStem, earthlyBranch] = yearly;
  let hgIdx = -1;
  let xcIdx = -1;
  let guIdx = -1;
  let guaIdx = -1;

  switch (earthlyBranch) {
    case '寅':
    case '午':
    case '戌': {
      hgIdx = fixEarthlyBranchIndex('戌');
      xcIdx = fixEarthlyBranchIndex('卯');
      break;
    }
    case '申':
    case '子':
    case '辰': {
      hgIdx = fixEarthlyBranchIndex('辰');
      xcIdx = fixEarthlyBranchIndex('酉');
      break;
    }
    case '巳':
    case '酉':
    case '丑': {
      hgIdx = fixEarthlyBranchIndex('丑') + 12;
      xcIdx = fixEarthlyBranchIndex('午');
      break;
    }
    case '亥':
    case '未':
    case '卯': {
      hgIdx = fixEarthlyBranchIndex('未');
      xcIdx = fixEarthlyBranchIndex('子') + 12;
      break;
    }
  }

  switch (earthlyBranch) {
    case '寅':
    case '卯':
    case '辰': {
      guIdx = fixEarthlyBranchIndex('巳');
      guaIdx = fixEarthlyBranchIndex('丑') + 12;
      break;
    }
    case '巳':
    case '午':
    case '未': {
      guIdx = fixEarthlyBranchIndex('申');
      guaIdx = fixEarthlyBranchIndex('辰');
      break;
    }
    case '申':
    case '酉':
    case '戌': {
      guIdx = fixEarthlyBranchIndex('亥');
      guaIdx = fixEarthlyBranchIndex('未');
      break;
    }
    case '亥':
    case '子':
    case '丑': {
      guIdx = fixEarthlyBranchIndex('寅');
      guaIdx = fixEarthlyBranchIndex('戌');
      break;
    }
  }

  const tiancaiIndex = fixIndex(soulIndex + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tianshouIndex = fixIndex(bodyIndex + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tianchuIndex = fixIndex(
    fixEarthlyBranchIndex(
      ['巳', '午', '子', '巳', '午', '申', '寅', '午', '酉', '亥'][
        HEAVENLY_STEMS.indexOf(heavenlyStem)
      ] as EarthlyBranch,
    ),
  );
  const posuiIndex = fixIndex(
    fixEarthlyBranchIndex(['巳', '丑', '酉'][EARTHLY_BRANCHES.indexOf(earthlyBranch) % 3] as EarthlyBranch),
  );
  const feilianIndex = fixIndex(
    fixEarthlyBranchIndex(
      ['申', '酉', '戌', '巳', '午', '未', '寅', '卯', '辰', '亥', '子', '丑'][
        EARTHLY_BRANCHES.indexOf(earthlyBranch)
      ] as EarthlyBranch,
    ),
  );
  const longchiIndex = fixIndex(fixEarthlyBranchIndex('辰') + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const fenggeIndex = fixIndex(fixEarthlyBranchIndex('戌') - EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tiankuIndex = fixIndex(fixEarthlyBranchIndex('午') - EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tianxuIndex = fixIndex(fixEarthlyBranchIndex('午') + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tianguanIndex = fixIndex(
    fixEarthlyBranchIndex(
      ['未', '辰', '巳', '寅', '卯', '酉', '亥', '酉', '戌', '午'][HEAVENLY_STEMS.indexOf(yearly[0])] as EarthlyBranch,
    ),
  );
  const tianfuIndex = fixIndex(
    fixEarthlyBranchIndex(
      ['酉', '申', '子', '亥', '卯', '寅', '午', '巳', '午', '巳'][HEAVENLY_STEMS.indexOf(yearly[0])] as EarthlyBranch,
    ),
  );
  const tiandeIndex = fixIndex(fixEarthlyBranchIndex('酉') + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const yuedeIndex = fixIndex(fixEarthlyBranchIndex('巳') + EARTHLY_BRANCHES.indexOf(earthlyBranch));
  const tiankongIndex = fixIndex(fixEarthlyBranchIndex(earthlyBranch) + 1);
  const jieluIndex = fixIndex(
    fixEarthlyBranchIndex(['申', '午', '辰', '寅', '子'][HEAVENLY_STEMS.indexOf(heavenlyStem) % 5] as EarthlyBranch),
  );
  const kongwangIndex = fixIndex(
    fixEarthlyBranchIndex(['酉', '未', '巳', '卯', '丑'][HEAVENLY_STEMS.indexOf(heavenlyStem) % 5] as EarthlyBranch),
  );
  const xunkongIndex = fixIndex(
    fixEarthlyBranchIndex(earthlyBranch) + HEAVENLY_STEMS.indexOf('癸') - HEAVENLY_STEMS.indexOf(heavenlyStem) + 1,
  );
  const tianshangIndex = fixIndex(PALACES.indexOf('仆役') + soulIndex);
  const tianshiIndex = fixIndex(PALACES.indexOf('疾厄') + soulIndex);

  return {
    xianchiIndex: fixIndex(xcIdx),
    huagaiIndex: fixIndex(hgIdx),
    guchenIndex: fixIndex(guIdx),
    guasuIndex: fixIndex(guaIdx),
    tiancaiIndex,
    tianshouIndex,
    tianchuIndex,
    posuiIndex,
    feilianIndex,
    longchiIndex,
    fenggeIndex,
    tiankuIndex,
    tianxuIndex,
    tianguanIndex,
    tianfuIndex,
    tiandeIndex,
    yuedeIndex,
    tiankongIndex,
    jieluIndex,
    kongwangIndex,
    xunkongIndex,
    tianshangIndex,
    tianshiIndex,
  };
};

/**
 * 获取年解的索引
 *
 * - 年解（按年支）
 *   - 解神从戌上起子，逆数至当生年太岁上是也
 *
 * @param earthlyBranch 地支（年）
 * @returns 年解索引
 */
export const getNianjieIndex = (earthlyBranch: EarthlyBranch) =>
  fixIndex(
    fixEarthlyBranchIndex(
      ['戌', '酉', '申', '未', '午', '巳', '辰', '卯', '寅', '丑', '子', '亥'][
        EARTHLY_BRANCHES.indexOf(earthlyBranch)
      ] as EarthlyBranch,
    ),
  );

/**
 * 获取以月份索引为基准的星耀索引，包括解神，天姚，天刑，阴煞，天月，天巫
 * 解神分为年解和月解，月解作用更加直接快速，年解稍迟钝，且作用力没有月解那么大
 *
 * - 月解（按生月）
 *   - 正二在申三四在戍，五六在子七八在寅，九十月坐於辰宫，十一十二在午宫。
 *
 * - 安天刑天姚（三合必见）
 *   - 天刑从酉起正月，顺至生月便安之。天姚丑宫起正月，顺到生月即停留。
 *
 * - 安阴煞
 *   - 正七月在寅，二八月在子，三九月在戍，四十月在申，五十一在午，六十二在辰。
 *
 * - 安天月
 *   - 一犬二蛇三在龙，四虎五羊六兔宫。七猪八羊九在虎，十马冬犬腊寅中。
 *
 * - 安天巫
 *   - 正五九月在巳，二六十月在申，三七十一在寅，四八十二在亥。
 *
 * @param solarDate 阳历日期
 * @param timeIndex 时辰序号
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns
 */
export const getMonthlyStarIndex = (solarDate: string, timeIndex: number, fixLeap?: boolean) => {
  const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(solarDate, timeIndex);
  const monthIndex = fixLunarMonthIndex(solarDate, timeIndex, fixLeap);

  const jieshenIndex = fixIndex(
    fixEarthlyBranchIndex(['申', '戌', '子', '寅', '辰', '午'][Math.floor(monthIndex / 2)] as EarthlyBranch),
  );
  const tianyaoIndex = fixIndex(fixEarthlyBranchIndex('丑') + monthIndex);
  const tianxingIndex = fixIndex(fixEarthlyBranchIndex('酉') + monthIndex);
  const yinshaIndex = fixIndex(
    fixEarthlyBranchIndex(['寅', '子', '戌', '申', '午', '辰'][monthIndex % 6] as EarthlyBranch),
  );
  const tianyueIndex = fixIndex(
    fixEarthlyBranchIndex(
      ['戌', '巳', '辰', '寅', '未', '卯', '亥', '未', '寅', '午', '戌', '寅'][monthIndex] as EarthlyBranch,
    ),
  );
  const tianwuIndex = fixIndex(fixEarthlyBranchIndex(['巳', '申', '寅', '亥'][monthIndex % 4] as EarthlyBranch));

  return {
    yuejieIndex: jieshenIndex,
    tianyaoIndex,
    tianxingIndex,
    yinshaIndex,
    tianyueIndex,
    tianwuIndex,
  };
};
