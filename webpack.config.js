import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import RelayCompilerWebpackPlugin from 'relay-compiler-webpack-plugin';
import env from 'gulp-env';
import jwt from 'jsonwebtoken';

// process.traceDeprecation = true;

if (!process.env.JWT_PRIVATE_KEY) {
  env({file: './.env', type: 'ini'});
}
const {
  JWT_PRIVATE_KEY,
  GOOGLE_ANALYTICS_KEY,
} = process.env;

const anonymousToken = jwt.sign({
  role: 'clerk', // TEMPORARY
  sub: 'postgraphql',
  aud: 'postgraphql',
}, JWT_PRIVATE_KEY);

const authenticatorToken = jwt.sign({
  role: 'authenticator',
  sub: 'postgraphql',
  aud: 'postgraphql',
}, JWT_PRIVATE_KEY);

const PATHS = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'build', 'public'),
  shared: path.join(__dirname, 'src', 'shared'),
  fonts: path.join(__dirname, 'src', 'shared', 'fonts'),
  graphql: path.join(__dirname, 'data', 'schema.graphql'),
};

const config = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    PATHS.src,
  ],
  output: {
    path: PATHS.public,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        GOOGLE_ANALYTICS_KEY: JSON.stringify(GOOGLE_ANALYTICS_KEY),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Terrafarm · Personal nutrition assistant',
      filename: 'index.html',
      template: 'src/index.template.html',
      inject: true,
      anonymousToken,
      authenticatorToken,
    }),
    /*
    new RelayCompilerWebpackPlugin({
      schema: PATHS.graphql,
      src: PATHS.src,
    }),
    */
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

export default config;
