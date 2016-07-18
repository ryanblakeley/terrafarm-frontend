// TODO: add a production flag that disables debug/sourcemaps and minifies

import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import env from 'gulp-env';

// Test for environment variables and load if undefined
if (!process.env.AUTH0_CLIENT_ID) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  PUBLIC_IP,
  PORT,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} = process.env;
let {FRONTEND_PORT} = process.env;
FRONTEND_PORT = Number(PORT) || Number(FRONTEND_PORT);

const defaultConfig = {
  devtool: 'sourcemap',
};

const frontendConfig = Object.assign({}, defaultConfig, {
  entry: [
    `webpack-dev-server/client?http://${PUBLIC_IP}:${FRONTEND_PORT}`,
    'webpack/hot/only-dev-server',
    './src/frontend/index.js',
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Terrafarm',
      filename: 'index.html',
      template: 'src/frontend/index.template.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        PUBLIC_IP: JSON.stringify(PUBLIC_IP),
        FRONTEND_PORT,
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
        loaders: ['react-hot', `babel?stage=0&plugins[]=${path.join(__dirname, 'relayPlugin')}`],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loader: 'style-loader!css-loader?modules',
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

const graphqlServerConfig = Object.assign({}, defaultConfig, {
  entry: './src/graphql/server.js',
  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: 'graphql-server.js',
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
  // abc -> require('abc')
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    // enable source-map-support by installing at the head of every chunk
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}),
  ],

  module: {
    loaders: [
      {
        // transpile all .js files using babel
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0',
      },
    ],
  },
});

export default {frontendConfig, graphqlServerConfig};
