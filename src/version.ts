/** 当前 iztro 包的版本号，与 package.json 保持一致。 */
// 使用 require 保持现有 lib 输出目录；Webpack 仅将 version 字段打包到 UMD。
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const version: string = require('../package.json').version;
