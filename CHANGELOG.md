# 紫微斗数

[文档地址｜Docuemnt](http://docs.iztro.com)

- ✨ 改进（enhancement）
- 🪄 功能（feature）
- 🛠️ 修复（fix）
- 🧹 琐事（Chore）

## v2.5.3

- 🛠️ 修复（fix）

  - 天地人盘中基本信息里显示的命宫宫位异常。

## v2.5.2

- 🛠️ 修复（fix）

  - 流日/流月宫位在运限月份是闰月情况下不正确。#244
  - 排盘算法不应该以节气干支来排。#246

- 🪄 功能（feature）
  
  - 新增晚子时配置。

## v2.5.1

- 🛠️ 修复（fix）

  - 流日/流月宫位在生月月份是闰月情况下不正确。#242

## v2.5.0

- 🪄 功能（feature）

  - 支持中州派排盘。#228
  
- 🛠️ 修复（fix）

  - [v2.4.9]: 流月宫位计算错误 #229

## v2.4.9

- ✨ 改进（enhancement）

  - 新增杂耀龙德星(中州派)。

- 🛠️ 修复（fix）

  - 修复旬空位置错误。

## v2.4.8

- 🛠️ 修复（fix）

  - 修复三台、八座位置错误。#227

## v2.4.7

- 🛠️ 修复（fix）

  - 修复插件开发时编译器报错问题。

## v2.4.6

- 🛠️ 修复（fix）

  - 补充缺失流耀的翻译

## v2.4.5

- ✨ 改进（enhancement）

  - 新增虚岁分割点配置 #225

## v2.4.4

- 🪄 功能（feature）

  - 增加流月、流日、流时的流耀 #210

## v2.4.3

- 🛠️ 修复（fix）

  - 新增运限分界点参数以满足不同需求 #190
  
## v2.4.2

- 🛠️ 修复（fix）

  - 更新起大限的规则，使它与全局配置同步

## v2.4.1

- ✨ 改进（enhancement）

  - 增加 `withOptions` 方法

## v2.4.0

- ✨ 改进（enhancement）

  - 增加年分界点全局配置 #182

## v2.3.2

- ✨ 改进（enhancement）

  - 改进部分英文翻译
  
## v2.3.1

- 🛠️ 修复（fix）

  - 修复小限年龄判断条件错误

## v2.3.0

- 🪄 功能（feature）

  - 支持全局插件 #165
  - 支持全局配置 #165
  
## v2.2.3

- 🛠️ 修复（fix）

  - 修复星耀亮度错误 #166

## v2.2.2

- 🛠️ 修复（fix）

  - 来因宫错误 #161

- ✨ 改进（enhancement）

  - 更新lunar-lite依赖，以支持更宽的日期参数

## v2.2.1

- 🛠️ 修复（fix）

  - 小限数据错误 #160

## v2.2.0

-  🪄 功能（feature）
 
  - 新增童限指示 #154
  - 新增小限12宫 #157

## v2.1.0

-  🪄 功能（feature）

  - 宫位飞星判断 #143

## v2.0.8

- 🛠️ 修复（fix）

  - 地支`丑`繁体错误

## v2.0.7

- 🛠️ 修复（fix）
 
  - 小限顺序错误 #95

## v2.0.6

- 🪄 功能（feature）
 
  - 新增空宫判断 #92

## v2.0.5

- ✨ 改进（enhancement）

  - 废弃 `astrolabeByLunarDate` 和 `astrolabeBySolarDate` 方法
  - 增加umd编译以便支持纯js库CDN调用 #87

## v2.0.4

- 🛠️ 修复（fix）

  - 修复虚岁为0的问题

- 🪄 功能（feature）

  - 增加独立的js库 #84

## v2.0.3

- ✨ 改进（enhancement）

  - 星盘数据中加入性别

## v2.0.2

- 🛠️ 修复（fix）
  
  - 农历月底晚子时不对 #82

## v2.0.0

- 🪄 功能（feature）

  - 分离日期转换组件 #80

## v1.3.5

- 🛠️ 修复（fix）

  - 农历阳历转化错误 #76

## v1.3.4

- 🪄 功能（feature）

  - 判断运限四化 #74

- ✨ 改进（enhancement）

  - 重构代码 #72

- 🛠️ 修复（fix）

  - 文曲星亮度丢失

## v1.3.3

- 🪄 功能（feature）

  - 判断指定运限宫位内是否包含指定流耀中其中一个 #70

## v1.3.2

- 🪄 功能（feature）

  - 判断指定运限宫位内是否不包含指定流耀 #67

## v1.3.1

- 🛠️ 修复（fix）

  - 天干地支在翻译时会出现译文一样而导致结果错误 #64

## v1.3.0

- 🪄 功能（feature）

  - 创建FunctionalHoroscope类 #31

## v1.2.7-alpha

- ✨ 改进（enhancement）

  - 使用dayjs提高产品兼容性 #59

## v1.2.6

- 🪄 功能（features）

  - 在流年运限里返回流年神煞 #56


- 🛠️ 修复（fix）

  - 流月索引错误 #54

## v1.2.5

- 🛠️ 修复（fix）

  - 修复丢失的星耀翻译(ja_JP -> 月德)

## v1.2.4

- 🪄 功能（feature）

  - 新增越南语支持

- 🛠️ 修复（fix）

  - 修复代码风格检查发现的额问题 #42 #43

## v1.2.3

- 🛠️ 修复（fix）

  - 修复运限索引计算错误 #36

## v1.2.2

- ✨ 改进（enhancement）

  - 给 Horoscope 添加 name 字段
  - 给 name 字段添加国际化翻译

## v1.2.1

- 🪄 功能（feature）

  - 新增静态方法 #28

    - 通过阳历获取生肖
    - 通过农历获取生肖
    - 通过阳历获取星座
    - 通过农历获取星座
    - 通过阳历获取主星
    - 通过农历获取主星

- 🛠️ 修复（fix）

  - 在特定情况下语言无法设置成功的问题

## v1.2.0

- ✨ 改进（enhancement）

  - 新增 `FunctionalSurpalaces` 类
  - 新增 `FunctionalStar` 类
  - 废弃 `FunctionalAstrolabe` 类的下列方法

    - `isSurrounded()`
    - `isSurroundedOneOf()`
    - `notSurrounded()`

- 🪄 功能（feature）

  - 实现 #24

## v1.1.1

- 🛠️ 修复（fix）

  - 更改错别字

## v1.1.0

- 🪄 功能（feature）

  - 实现三方四正宫位功能 #21

- ✨ 改进（enhancement）

  - 支持性别国际化
  - 将`timely`修改为`hourly`
  - 优化`types`结构，将`types.ts`拆分进`types`文件夹内，方便维护

## v1.0.0

- 🪄 功能（feature）

  - 新增宫位以及星耀分析方法

- 🛠️ 修复（fix）

  - 已知Bug

## v0.3.2

- ✨ 改进（enhancement）

  - 优化代码，将变量名改为英文，提高兼容性

- 🛠️ 修复（fix）

  - 翻译错误

## v0.3.1

- ✨ 改进（enhancement）

  - 完善流耀的翻译

- 🧹 琐事（Chore）

  - 使用eslint替换tslint

## v0.3.0

- 🪄 功能（feature）

  - 集成i18n，支持国际化 #2

## v0.2.1

- 🪄 功能（feature）

  - 实现流时 #3

- ✨ 改进（enhancement）

  - 优化代码结构
  - 完善注释
  - 增加Release后自动发布到npm的工作流

## v0.2.0

- 🛠️ 修复（fix）

  - 修复错别字：`astrolable` --> `astrolabe`

- 🪄 功能（feature）

  - 实现 #1

## v0.1.4

- 🧹 琐事（Chore）

  - 调整package.json里的关键词
  - 修改大限变量名

## v0.1.3

- 🛠️ 修复（fix）

  - 将`年解`星放置到流耀里面去
  - 修复错误拼写

- ✨ 改进（enhancement）

  - 完善ReadMe

## v0.1.2

- ✨ 改进（enhancement）

  - 优化注释
  - 优化“性别”类型

## v0.1.1

- ✨ 改进（enhancement）

  - 增加CHANGELOG

## v0.1.0

- 🪄 功能（feature）

  - 核心功能的实现

## v0.0.2

- 🪄 功能（feature）

  - 实现工具方法

- ✨ 改进（enhancement）

  - 优化代码结构
  - 完善注释

### v0.0.1

- 🪄 功能（feature）

  - 项目初始化
  - 准备依赖数据
