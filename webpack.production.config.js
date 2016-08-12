// @TODO: optimize build

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import env from 'gulp-env';

// Test for environment variables and load if undefined
if (!process.env.AUTH0_CLIENT_ID) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  PUBLIC_IP,
  PRIVATE_IP,
  FRONTEND_PORT,
  GRAPHQL_PORT,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  FIELDBOOK_ID,
  FIELDBOOK_USER,
  FIELDBOOK_KEY,
} = process.env;

const defaultConfig = {};

const frontendProdConfig = Object.assign({}, defaultConfig, {
  entry: './src/frontend/index.js',

  output: {
    filename: 'bundle.js',
    // @TODO: filename: '[name]-[hash].min.js',
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Terrafarm',
      filename: 'index.html',
      template: 'src/frontend/index.template.html',
      inject: true,
    }),
    /*
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        PUBLIC_IP: JSON.stringify(PUBLIC_IP),
        FRONTEND_PORT: Number(FRONTEND_PORT),
        AUTH0_CLIENT_ID: JSON.stringify(AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(AUTH0_DOMAIN),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loaders: [`babel?stage=0&plugins[]=${path.join(__dirname, 'relayPlugin')}`],
        // query: {
        //   "presets": ["es2015", "stage-0", "react"]
        // }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loader: 'style-loader!css-loader?modules',
        // loader: ExtractTextPlugin.extract('style',
        // 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
        // ),
        // postcss: [
        //   require('autoprefixer')
        // ],
      },
      {
        test: /\.svg$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.png$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loader: 'url-loader?limit=65000',
      },
    ],
  },
});

const frontendServerProdConfig = Object.assign({}, defaultConfig, {
  entry: './src/frontend/server.js',

  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: 'frontend-server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',
  // do not include polyfills or mocks for node stuff
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  // all non-relative modules are external
  externals: /^[a-z\-0-9]+$/,

  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        PRIVATE_IP: JSON.stringify(PRIVATE_IP),
        FRONTEND_PORT: Number(FRONTEND_PORT),
        GRAPHQL_PORT: Number(GRAPHQL_PORT),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0',
      },
    ],
  },
});

const graphqlServerProdConfig = Object.assign({}, defaultConfig, {
  entry: './src/graphql/server.js',
  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: 'graphql-server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  // all non-relative modules are external
  externals: /^[a-z\-0-9]+$/,

  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        PRIVATE_IP: JSON.stringify(PRIVATE_IP),
        GRAPHQL_PORT: Number(GRAPHQL_PORT),
        AUTH0_CLIENT_ID: JSON.stringify(AUTH0_CLIENT_ID),
        AUTH0_CLIENT_SECRET: JSON.stringify(AUTH0_CLIENT_SECRET),
        FIELDBOOK_ID: JSON.stringify(FIELDBOOK_ID),
        FIELDBOOK_USER: JSON.stringify(FIELDBOOK_USER),
        FIELDBOOK_KEY: JSON.stringify(FIELDBOOK_KEY),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0',
      },
    ],
  },
});

export default {frontendProdConfig, frontendServerProdConfig, graphqlServerProdConfig };
