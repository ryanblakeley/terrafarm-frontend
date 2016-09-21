import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import validate from 'webpack-validator';
import env from 'gulp-env';

if (!process.env.AUTH0_CLIENT_ID) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  REVERSE_PROXY_PUBLIC_IP, // obsolete with react-relay-network-layer
  PORT, // obsolete with react-relay-network-layer
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} = process.env;

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
      title: 'Terrafarm',
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        REVERSE_PROXY_PUBLIC_IP: JSON.stringify(REVERSE_PROXY_PUBLIC_IP), // obsolete with react-relay-network-layer
        PORT: Number(PORT), // obsolete with react-relay-network-layer
        AUTH0_CLIENT_ID: JSON.stringify(AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(AUTH0_DOMAIN),
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

export default validate(prodConfig, { quiet: true });
