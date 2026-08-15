const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  mode: 'none',
  devtool: 'source-map', // 输出sourcemap
  entry: {
    [`iztro-v${version}.min`]: './src/index.ts',
    'iztro.min': './src/index.ts',
  }, // 同时输出版本化文件和向后兼容文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 指定打包文件的目录
    filename: '[name].js', // 使用入口名称作为打包后的文件名
    clean: true, // 清理上一次构建生成的文件
    library: 'iztro', // 将打包后的代码作为一个全局变量可直接调用
    libraryTarget: 'umd', // 将代码打包为通用模块定义
    umdNamedDefine: true, // 为UMD模块命名
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定loader加载的规则
    rules: [
      {
        test: /\.ts$/, // 匹配所有的.ts文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 11'],
                  },
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: /node_modules/, // 排除node_modules目录
      },
    ],
  }, // 设置哪些文件类型可以作为模块被引用
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // 删除所有注释
          },
        },
      }),
    ],
  },
};
