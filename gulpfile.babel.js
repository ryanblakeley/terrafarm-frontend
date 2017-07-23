import gulp from 'gulp';
/* eslint no-unused-vars:0 */
import gultil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import env from 'gulp-env';
import fetch from 'node-fetch';
import fs from 'fs';
import {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} from 'graphql/utilities';

import webpackConfig from './webpack.config';
import webpackServerProdConfig from './webpack.server.production.config';

// Test for environment variables and load if undefined
if (!process.env.API_PORT) {
  env({ file: './.env', type: 'ini' });
}
let { PRIVATE_IP, API_IP, PORT, API_PORT, CHAOS_MONKEY } // eslint-disable-line prefer-const
  = process.env;
PORT = Number(PORT);
API_PORT = Number(API_PORT);

const PATHS = {
  schema: path.join(__dirname, 'data', 'schema'),
  apiSrv: `http://${API_IP}:${API_PORT}`,
  public: path.join(__dirname, 'build', 'public'),
};

function onBuild (done, logLevel) {
  return (err, stats) => {
    if (err) {
      console.log('Build threw error:', err);
    } else if (logLevel === 'debug') {
      console.log('[build stats]:', stats.toString());
    }

    if (done) done();
  };
}

function unleashChaosMonkey (req, res) {
  const monkey = 'The chaos monkey strikes again!';
  const statusCodes = [500, 401]; // 500, 401
  const randomStatusCode = statusCodes[
    Math.floor(Math.random() * statusCodes.length)
  ];
  console.log(monkey);
  setTimeout(_ => {
    res.writeHead(randomStatusCode, {
      'Content-Type': 'text/plain',
      'Content-Length': monkey.length,
    });
    res.write(monkey);
    res.end();
  }, 1500);
}

gulp.task('load-schema', () => {
  fetch(`${PATHS.apiSrv}/graphql-api`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: introspectionQuery}),
  }).then(res => res.json()).then(schemaJSON => {
    fs.writeFileSync(
      `${PATHS.schema}.json`,
      JSON.stringify(schemaJSON, null, 2),
    );
    const graphQLSchema = buildClientSchema(schemaJSON.data);
    fs.writeFileSync(
      `${PATHS.schema}.graphql`,
      printSchema(graphQLSchema),
    );
  });
});

gulp.task('webpack-dev-server', () => {
  const devServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: PATHS.public,
    hot: true,
    // publicPath: '/',
    // inline: true,
    // noInfo: true,
    stats: { colors: true, chunks: false },
    historyApiFallback: true,
    proxy: {
      '/graphql-api': PATHS.apiSrv,
    },
    setup: app => {
      app.all('/graphql-api', (req, res, next) => {
        if (CHAOS_MONKEY === 'true'
          && (Math.random() < 0.15)) {
          unleashChaosMonkey(req, res);
        } else {
          next();
        }
      });
    },
  });
  devServer.listen(PORT, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`[webpackDevServer]: listening on ${PRIVATE_IP}:${PORT}`);
  });
});

gulp.task('build-frontend', done => {
  webpack(webpackConfig).run(onBuild(done));
});

gulp.task('build-server', done => {
  webpack(webpackServerProdConfig).run(onBuild(done));
});

gulp.task('build', ['build-frontend', 'build-server']);

gulp.task('default', ['webpack-dev-server']);
