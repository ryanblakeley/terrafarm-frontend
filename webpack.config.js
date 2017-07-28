import path from 'path';
import env from 'gulp-env';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

if (!process.env.GOOGLE_ANALYTICS_KEY) {
  env({file: './.env', type: 'ini'});
}
const {
  WEBPACK_ENV,
  GOOGLE_ANALYTICS_KEY,
} = process.env;

const PATHS = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  client: path.join(__dirname, 'src', 'client'),
  public: path.join(__dirname, 'build', 'public'),
  fonts: path.join(__dirname, 'src', 'shared', 'fonts'),
  graphql: path.join(__dirname, 'data', 'schema.graphql'),
  robots: path.join(__dirname, 'src', 'robots.txt'),
};

let entry;
let devtool;
let devServer;
const plugins = [
  new HtmlWebpackPlugin({
    title: 'Terrafarm · Personal nutrition assistant',
    filename: 'index.html',
    template: 'src/index.template.html',
    inject: true,
  }),
];

if (WEBPACK_ENV === 'production') {
  console.log('[webpackProductionConfig]');
  entry = [
    PATHS.client,
  ];
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GOOGLE_ANALYTICS_KEY: JSON.stringify(GOOGLE_ANALYTICS_KEY),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.NoErrorsPlugin(),
  );
  devtool = 'source-map';
  devServer = {};
} else {
  console.log('[webpackDevelopmentConfig]');
  entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    PATHS.client,
  ];
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        GOOGLE_ANALYTICS_KEY: JSON.stringify(GOOGLE_ANALYTICS_KEY),
      },
    }),
  );
  devtool = 'eval-source-map'; // 'module-source-map'
  devServer = {
    historyApiFallback: true,
  };
}

const webpackConfig = {
  context: PATHS.root,

  entry,

  output: {
    path: PATHS.public,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: [
      PATHS.src,
      'node_modules',
    ],
    alias: {
      root: PATHS.root,
    },
  },

  plugins,
  devtool,
  devServer,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        // include: PATHS.src, // sanitize.css is outside src
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        include: PATHS.fonts,
        loader: 'url-loader',
        options: {
          name: 'font/[hash].[ext]',
          limit: 50000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.svg$/,
        include: PATHS.src,
        use: [
          { loader: 'url-loader', options: { limit: 10000 } },
        ],
      },
      {
        test: /\.png$/,
        include: PATHS.src,
        use: [
          { loader: 'url-loader', options: { limit: 65000 } },
        ],
      },
    ],
  },
};

export default webpackConfig;

/*
TODO

import ExtractTextPlugin from 'extract-text-webpack-plugin';

plugins: [

  new ExtractTextPlugin('styles.css'),

  new RelayCompilerWebpackPlugin({
    schema: PATHS.graphql,
    src: PATHS.src,
  }),

],

{
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    // fallback: 'style-loader',
    use: {
      loader: 'css-loader',
      options: {
        modules: true,
        // localIdentName: '[name]_[local]__[hash:base64:5]',
      },
    },
  }),
},
*/

