var path = require("path");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var  uglify = require('uglifyjs-webpack-plugin');
 var  htmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry:{
    main:'./src/main.js',
  },
  output:{
      path : __dirname + '/dist', //输出路径，要用绝对路径
      filename : 'js/[name].js', //打包之后输出的文件名
  },
  devServer: {
            contentBase:path.resolve(__dirname,'../dist'),
            inline: false,
            port: 8181,
            open:true,
            hot:true
      },
  plugins: [
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // new OpenBrowserPlugin(
    //   {
    //     url: 'http://localhost:8181/index.html'
    //   }
    // ),
   new CleanWebpackPlugin(["./dist"]),
    new uglify(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: 'webpackDemo',
        minify:{ //是对html文件进行压缩
            removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
        },
        hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
        template:'./src/index.html' //是要打包的html模版路径和文件名称。
      }),


  ],
  module: {
        //加载器配置
        rules: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            {  test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ] },
            //.js 文件使用 jsx-loader 来编译处理
            {
                test: /\.js$/,
                 exclude: /node_modules/,
                 loader: "babel-loader"
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            }


        ]
    }
}
