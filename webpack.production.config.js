import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import validate from 'webpack-validator';
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
    new HtmlWebpackPlugin({
      title: 'Terrafarm CSA',
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
      anonymousToken,
      registrarToken,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        GOOGLE_ANALYTICS_KEY: JSON.stringify(GOOGLE_ANALYTICS_KEY),
        GOOGLE_MAPS_KEY: JSON.stringify(GOOGLE_MAPS_KEY),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.src,
        loaders: [`babel-loader?plugins[]=${path.join(__dirname, 'relayPlugin')}`],
      },
      {
        test: /\.css$/,
        include: PATHS.src,
        loader: 'style-loader!css-loader?modules',
      },
      {
        test: /\.svg$/,
        include: PATHS.src,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.png$/,
        include: PATHS.src,
        loader: 'url-loader?limit=65000',
      },
      {
        test: /\.(woff|woff2)$/,
        include: PATHS.fonts,
        query: {
          name: 'font/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff',
        },
        loader: 'url?limit=50000',
      },
    ],
  },
};

export default validate(prodConfig, { quiet: true });
