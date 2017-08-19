var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src/');
var CORE_DIR = path.resolve(__dirname, 'core/');
var RESSOURCES_DIR = path.resolve(__dirname, 'ressources/');
var THEME_DIR = path.resolve(__dirname, 'theme/');

var includeAll = [APP_DIR, CORE_DIR, RESSOURCES_DIR, THEME_DIR];

var config = {
  entry: APP_DIR + '/index.jsx',
  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  output: {
    path: BUILD_DIR + '/assets',
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : includeAll,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy',
          ],
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        include: includeAll,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?module&localIdentName=[hash:base64:5]!resolve-url-loader'
        })),
      },
      {
        test: /\.less\.lib$/,
        include: includeAll,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!resolve-url-loader!less-loader'
        })),
      },
      {
        test: /\.less$/,
        include: includeAll,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?module&localIdentName=[hash:base64:5]!resolve-url-loader!less-loader'
        })),
      },
      { test: /\.json?$/, loader: 'json-loader' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url-loader?limit=8182' },
      { test: /\.(svg|gif|ttf|woff2?|eot)(\?.*)?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true})
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    alias: {
      'project-core': path.join(__dirname, 'core'),
      'project-pages': path.join(__dirname, 'src', 'pages'),
      'project-ressources': path.join(__dirname, 'ressources'),
      'project-root': path.join(__dirname, 'src'),
      'project-routes': path.join(__dirname, 'src', 'routes'),
      'project-theme': path.join(__dirname, 'theme')
    }
  }
};

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': { 
       NODE_ENV: JSON.stringify('production') 
     }
  }));
}

module.exports = config;
