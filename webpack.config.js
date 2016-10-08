import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import validate from 'webpack-validator';
import env from 'gulp-env';
import jwt from 'jsonwebtoken';

if (!process.env.PORT) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  REVERSE_PROXY_PUBLIC_IP,
  PORT,
  JWT_PRIVATE_KEY,
} = process.env;

const anonymousToken = jwt.sign({
  role: 'postgraphql_anonymous',
  sub: 'postgraphql',
  aud: 'postgraphql'
}, JWT_PRIVATE_KEY);

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build', 'public'),
};

const config = {
  devtool: 'eval-source-map',
  entry: {
    src: PATHS.src,
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Terrafarm',
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
      anonymousToken
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        REVERSE_PROXY_PUBLIC_IP: JSON.stringify(REVERSE_PROXY_PUBLIC_IP), // obsolete with react-relay-network-layer
        PORT: Number(PORT), // obsolete with react-relay-network-layer
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.src,
        loaders: ['react-hot', `babel-loader?plugins[]=${path.join(__dirname, 'relayPlugin')}`],
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
    ],
  },
};

export default validate(config, { quiet: true });
