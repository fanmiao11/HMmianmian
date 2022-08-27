const path = require("path");

let externals = {};
if (process.env.NODE_ENV === "production") {
  externals = {
    echarts: "echarts",
    "element-ui": "ELEMENT",
    vue: "Vue",
    xlsx: "XLSX",
    "cos-js-sdk-v5": "COS",
    "@wangeditor/editor": "wangEditor",
    "quill": "Quill",
  };
}
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  lintOnSave: false,

  configureWebpack: {
    // webpack排除打包
    externals,
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].myEnv = process.env.NODE_ENV;
      return args;
    });

    const imagesRule = config.module.rule('images')
    imagesRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .test(/.svg$/)
      .include.add(path.resolve(__dirname, "./src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

      
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/.svg$/)
      .exclude.add(path.resolve(__dirname, "./src/icons/svg"))
      .end()
      .use("file-loader")
      .loader("file-loader");

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      // 提取公共代码
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      // 运行时代码
      config.optimization.runtimeChunk("single");
    });
  },
};
