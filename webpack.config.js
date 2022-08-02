const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader");
//压缩js文件
const TerserWebpackPlugin = require("terser-webpack-plugin")
//压缩css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
//单独成一个css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//复制
const CopyPlugin = require("copy-webpack-plugin");


const isProduction = process.env.NODE_ENV === 'Production'
const getStyleLoaders = (preProcessor) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env"
                    ]
                }
            }
        },
        preProcessor
    ].filter(Boolean)
}
module.exports = {
    entry: './src/main.js',
    output: {
        //[name]以输入文件名的
        //contenthash 是以文件内容生成的hash值
        path: isProduction ? path.resolve(__dirname, "dist") : undefined,
        filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js",
        chunkFilename: isProduction ? "js/[name].[contenthash:8].chunk.js" : "js/[name].chunk.js",
        assetModuleFilename: "static/asset/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader")
            },
            {
                test: /\.(png|jpe?g|git|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 //小于10kb的会被base64处理 
                    }
                }
            },
            {
                test: /\.(ttf|woff2)$/,
                type: "asset/resource"
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader",
                options: {
                    //开启缓存
                    cacheDirectory: true, // 开启babel编译缓存
                    cacheCompression: false, // 缓存文件不要压缩
                }
            },
            {
                // vue-loader不支持oneOf
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    cacheDirectory: path.resolve(__dirname, "./node_modules/.cache/vue-loader")
                }
            }
        ]
    },
    plugins: [
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, "./src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(
                __dirname,
                "./node_modules/.cache/.eslintcache"
            ),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public"),
                    to: path.resolve(__dirname, "./dist"),
                    toType: "dir",
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                    info: {
                        minimized: true,
                    },
                },
            ],
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:10].css",
            chunkFilename: "css/[name].[contenthash:10].chunk.css",
        }),
        new VueLoaderPlugin()
    ].filter(Boolean),
    optimization: {
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ],
        //分包
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                echarts:{
                    chunks:"all",
                    name: "echarts-element",
                    test: /[\\/]node_modules[\\/]_?echarts(.*)/,
                    priority: 31,
                },
                elementUI: {
                    chunks:"all",
                    name: "chunk-element",
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    priority: 30,
                  },
                // 将vue相关的库单独打包，减少node_modules的chunk体积。
                vue: {
                    name: "vue",
                    test: /[\\/]node_modules[\\/]vue(.*)[\\/]/,
                    chunks: "initial",
                    priority: 20,
                },
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10, // 权重最低，优先考虑前面内容
                    chunks: "initial",
                },
            }
        },
        //缓存文件 里面记载着各种文件之间互相引用的路径
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        }
    },
    resolve: {
        extensions: [".vue", ".js", ".json"],
        alias: {
            // 路径别名
            "@": path.resolve(__dirname, "./src"),
        },
    },
    devServer: {
        open: true,
        host: "localhost",
        port: 3000,
        hot: true,
        compress: true,
        historyApiFallback: true, // 解决vue-router刷新404问题
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
}