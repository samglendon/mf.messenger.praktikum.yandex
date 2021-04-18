const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {DuplicatesPlugin} = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');


module.exports = {
  entry: {
    main: './src/index.ts',                           // указали первое место куда заглянет webpack — файл index.js в папке src
  },
  output: {                                           // указали в какой файл будет собирться весь js и дали ему имя
    path: path.resolve(__dirname, 'build'),           // переписали точку выхода, используя утилиту path
    filename: 'js/[name].[chunkhash].js',                 // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш (ранее main.js)
    clean: true,                                        // используем вместо clean-webpack-plugin
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {                                               // тут описываются правила
        test: /\.tsx?$/,                              // регулярное выражение, которое ищет все js файлы
        use: {
          loader: "ts-loader",                     // весь TS обрабатывается пакетом babel-loader
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        // exclude: /(node_modules)/                       // исключает папку node_modules (все исключения прописаны в tsconfig.json)
      },
          // {                                               // тут описываются правила
          //   test: /\.js$/,                                // регулярное выражение, которое ищет все js файлы
          //   use: {loader: "babel-loader"},                // весь JS обрабатывается пакетом babel-loader
          //   exclude: /node_modules/                       // исключает папку node_modules
          // },
      {
        test: /\.css$/i,                              // применять это правило только к CSS-файлам
        use: [                                        // к этим файлам нужно применить пакеты, которые мы уже установили
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]',     // указали папку, куда складывать изображения, относительно dist
          {
            loader: 'image-webpack-loader',
            options: {}
          },
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({                           // настроили плагин
      // Означает, что:
      inject: false,                                  // стили НЕ нужно прописывать внутри тегов
      // hash: true,                                  // для страницы нужно считать хеш
      template: './public/index.html',                   // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html',                          // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['main']
    }),

    new DuplicatesPlugin(),
    new CircularDependencyPlugin(),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 5000,
  },
};
