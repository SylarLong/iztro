# 紫微斗数 @sylarlong/astro

[文档地址｜Docuemnt](http://docs.iztro.com)

- ✨ 改进（enhancement）
- 🪄 功能（feature）
- 🛠️ 修复（fix）
- 🧹 琐事（Chore）

## v1.2.7-alpha

- ✨ 改进（enhancement）

  🇨🇳

  - 使用dayjs提高产品兼容性 #59

  🇺🇸

  - use dayjs to improve compatibility #56

## v1.2.6

- 🪄 功能（features）

  🇨🇳

  - 在流年运限里返回流年神煞 #56

  🇺🇸

  - return yearly decorative stars #56

- 🛠️ 修复（fix）

  🇨🇳

  - 流月索引错误 #54

  🇺🇸

  - monthly index is incorrect #54

## v1.2.5

- 🛠️ 修复（fix）

  🇨🇳

  - 修复丢失的星耀翻译(ja_JP -> 月德)

  🇺🇸

  - fix missed star translation for (ja_JP -> 月德)

## v1.2.4

- 🪄 功能（feature）

  🇨🇳

  - 新增越南语支持

  🇺🇸

  - support Vietnamese

- 🛠️ 修复（fix）

  🇨🇳

  - 修复代码风格检查发现的额问题 #42 #43

  🇺🇸

  - fix codestyle issues #42 #43

## v1.2.3

- 🛠️ 修复（fix）

  🇨🇳

  - 修复运限索引计算错误 #36

  🇺🇸

  - fix wrong horoscope indexes #36

## v1.2.2

- ✨ 改进（enhancement）

  🇨🇳

  - 给 Horoscope 添加 name 字段
  - 给 name 字段添加国际化翻译

  🇺🇸

  - add `name` field to `Horoscope`
  - add translation for `name`

## v1.2.1

- 🪄 功能（feature）

  🇨🇳

  - 新增静态方法 #28

    - 通过阳历获取生肖
    - 通过农历获取生肖
    - 通过阳历获取星座
    - 通过农历获取星座
    - 通过阳历获取主星
    - 通过农历获取主星

  🇺🇸

  - add some static methods #28

    - get zodiac by solar date
    - get zodiac by lunar date
    - get sign by solar date
    - get sign by lunar date
    - get major stars by solar date
    - get major stars by lunar date

- 🛠️ 修复（fix）

  🇨🇳

  - 在特定情况下语言无法设置成功的问题

  🇺🇸

  - failed to set language in some scenarios

## v1.2.0

- ✨ 改进（enhancement）

  🇨🇳

  - 新增 `FunctionalSurpalaces` 类
  - 新增 `FunctionalStar` 类
  - 废弃 `FunctionalAstrolabe` 类的下列方法

    - `isSurrounded()`
    - `isSurroundedOneOf()`
    - `notSurrounded()`

  🇺🇸

  - add new class `FunctionalSurpalaces`
  - add new class `FunctionalStar`
  - deprecate those functions to `FunctionalAstrolabe` class

    - `isSurrounded()`
    - `isSurroundedOneOf()`
    - `notSurrounded()`

- 🪄 功能（feature）

  🇨🇳

  - 实现 #24

  🇺🇸

  - implement #24

## v1.1.1

- 🛠️ 修复（fix）

  🇨🇳

  - 更改错别字

  🇺🇸

  - fix typo

## v1.1.0

- 🪄 功能（feature）

  🇨🇳

  - 实现三方四正宫位功能 #21

  🇺🇸

  - implement surrounded palaces feature #21

- ✨ 改进（enhancement）

  🇨🇳

  - 支持性别国际化
  - 将`timely`修改为`hourly`
  - 优化`types`结构，将`types.ts`拆分进`types`文件夹内，方便维护

  🇺🇸

  - localization for gender
  - rename `timely` to `hourly`
  - optimize the structure of `types`: split `types.ts` into several parts and store them into `types` directory.

## v1.0.0

- 🪄 功能（feature）

  🇨🇳

  - 新增宫位以及星耀分析方法

  🇺🇸

  - add `palace` and `star` analyzation function

- 🛠️ 修复（fix）

  🇨🇳

  - 已知Bug

  🇺🇸

  - fix known bugs

## v0.3.2

- ✨ 改进（enhancement）

  🇨🇳

  - 优化代码，将变量名改为英文，提高兼容性

  🇺🇸

  - code optimization. change the variable names from Chinese to english in order to avoid compatibility issues

- 🛠️ 修复（fix）

  🇨🇳

  - 翻译错误

  🇺🇸

  - translation error

## v0.3.1

- ✨ 改进（enhancement）

  🇨🇳

  - 完善流耀的翻译

  🇺🇸

  - enhance the translations of horoscope stars

- 🧹 琐事（Chore）

  🇨🇳

  - 使用eslint替换tslint

  🇺🇸

  - replace tslint to eslint

## v0.3.0

- 🪄 功能（feature）

  🇨🇳

  - 集成i18n，支持国际化 #2

  🇺🇸

  - i18n integration #2

## v0.2.1

- 🪄 功能（feature）

  🇨🇳

  - 实现流时 #3

  🇺🇸

  - implement hourly horoscope #3

- ✨ 改进（enhancement）

  🇨🇳

  - 优化代码结构
  - 完善注释
  - 增加Release后自动发布到npm的工作流

  🇺🇸

  - code structure optimization
  - comments improvement
  - add a workflow to `publish to npm after released`

## v0.2.0

- 🛠️ 修复（fix）

  🇨🇳

  - 修复错别字：`astrolable` --> `astrolabe`

  🇺🇸

  - fix typo: `astrolable` --> `astrolabe`

- 🪄 功能（feature）

  🇨🇳

  - 实现 #1

  🇺🇸

  - implement #1

## v0.1.4

- 🧹 琐事（Chore）

  🇨🇳

  - 调整package.json里的关键词
  - 修改大限变量名

  🇺🇸

  - modify keywords in package.json
  - change `stage` to `decadal`

## v0.1.3

- 🛠️ 修复（fix）

  🇨🇳

  - 将`年解`星放置到流耀里面去
  - 修复错误拼写

  🇺🇸

  - move `年解` to the horoscope star list
  - fix typo

- ✨ 改进（enhancement）

  🇨🇳

  - 完善ReadMe

  🇺🇸

  - imporove README

## v0.1.2

- ✨ 改进（enhancement）

  🇨🇳

  - 优化注释
  - 优化“性别”类型

  🇺🇸

  - optimize comments
  - optimize `Gender` type

## v0.1.1

- ✨ 改进（enhancement）

  🇨🇳

  - 增加CHANGELOG

  🇺🇸

  - add CHANGELOG

## v0.1.0

- 🪄 功能（feature）

  🇨🇳

  - 核心功能的实现

  🇺🇸

  - core functions implementation

## v0.0.2

- 🪄 功能（feature）

  🇨🇳

  - 实现工具方法

  🇺🇸

  - util functions implementation

- ✨ 改进（enhancement）

  🇨🇳

  - 优化代码结构
  - 完善注释

  🇺🇸

  - code structure optimization
  - comments improvement

### v0.0.1

- 🪄 功能（feature）

  🇨🇳

  - 项目初始化
  - 准备依赖数据

  🇺🇸

  - project initialization
  - dependencies preparation
