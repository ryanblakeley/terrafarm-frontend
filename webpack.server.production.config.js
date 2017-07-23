import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import env from 'gulp-env';

if (!process.env.API_PORT) {
  env({file: './.env', type: 'ini'});
}
const {
  PRIVATE_IP,
  API_IP,
  PORT,
  API_PORT,
} = process.env;

const PATHS = {
  server: path.join(__dirname, 'src', 'server.js'),
  dist: path.join(__dirname, 'build', 'dist'),
  public: path.join(__dirname, 'build', 'public'),
  robots: path.join(__dirname, 'src', 'robots.txt'),
};

const serverProdConfig = {
  entry: {
    src: PATHS.server,
  },
  output: {
    path: PATHS.dist,
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
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PRIVATE_IP: JSON.stringify(PRIVATE_IP),
        API_IP: JSON.stringify(API_IP),
        PORT: Number(PORT),
        API_PORT: Number(API_PORT),
      },
    }),
    new CopyWebpackPlugin([
      { from: PATHS.robots, to: PATHS.public },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
    ],
  },
};

export default serverProdConfig;
