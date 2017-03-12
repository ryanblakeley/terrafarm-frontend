import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import env from 'gulp-env';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_PRIVATE_KEY) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  JWT_PRIVATE_KEY,
  GOOGLE_ANALYTICS_KEY,
  GOOGLE_MAPS_KEY,
} = process.env;

const anonymousToken = jwt.sign({
  role: 'postgraphql_anonymous',
  sub: 'postgraphql',
  aud: 'postgraphql',
}, JWT_PRIVATE_KEY);

const registrarToken = jwt.sign({
  role: 'postgraphql_registrar',
  sub: 'postgraphql',
  aud: 'postgraphql',
}, JWT_PRIVATE_KEY);

const PATHS = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build', 'public'),
};

const prodConfig = {
  entry: {
    src: PATHS.src,
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        GOOGLE_ANALYTICS_KEY: JSON.stringify(GOOGLE_ANALYTICS_KEY),
        GOOGLE_MAPS_KEY: JSON.stringify(GOOGLE_MAPS_KEY),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    // new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Terrafarm CSA',
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
      anonymousToken,
      registrarToken,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.src,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: PATHS.src,
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
    ],
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
};

export default prodConfig;
