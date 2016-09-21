import webpack from 'webpack';
import path from 'path';
import validate from 'webpack-validator';
import env from 'gulp-env';

if (!process.env.AUTH0_CLIENT_ID) {
  env({file: './.env', type: 'ini'});
}
const {
  NODE_ENV,
  PRIVATE_IP,
  REVERSE_PROXY_PRIVATE_IP,
  PORT,
  API_PORT,
} = process.env;

const PATHS = {
  src: path.join(__dirname, 'src', 'server.js'),
  build: path.join(__dirname, 'build', 'dist'),
};

const serverProdConfig = {
  entry: {
    src: PATHS.src,
  },
  output: {
    path: PATHS.build,
    filename: 'server.js',
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
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        PRIVATE_IP: JSON.stringify(PRIVATE_IP),
        REVERSE_PROXY_PRIVATE_IP: JSON.stringify(REVERSE_PROXY_PRIVATE_IP),
        PORT: Number(PORT),
        API_PORT: Number(API_PORT),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

export default validate(serverProdConfig, { quiet: true });
