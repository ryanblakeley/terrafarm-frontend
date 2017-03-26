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

import config from './webpack.config';
import prodConfig from './webpack.production.config';
import serverProdConfig from './webpack.server.production.config';

// Test for environment variables and load if undefined
if (!process.env.API_PORT) {
  env({file: './.env', type: 'ini'});
}
const PRIVATE_IP = process.env.PRIVATE_IP;
const API_IP = process.env.API_IP;
let PORT = process.env.PORT;
let API_PORT = process.env.API_PORT;
PORT = Number(PORT);
API_PORT = Number(API_PORT);
const CHAOS_MONKEY = process.env.CHAOS_MONKEY;
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
  }, 1200);
}

gulp.task('load-schema', () => {
  fetch(`${PATHS.apiSrv}/csa-graphql`, {
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

gulp.task('webpack-dev-server', ['load-schema'], () => {
  const server = new WebpackDevServer(webpack(config), {
    contentBase: PATHS.public,
    hot: true,
    // publicPath: '/',
    // inline: true,
    // noInfo: true,
    stats: { colors: true, chunks: false },
    historyApiFallback: true,
    proxy: {
      '/csa-graphql': PATHS.apiSrv,
    },
    setup: app => {
      app.all('/csa-graphql', (req, res, next) => {
        if (CHAOS_MONKEY && (Math.random() < 0.08)) {
          unleashChaosMonkey(req, res);
        } else {
          next();
        }
      });
    },
  });
  server.listen(PORT, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`[webpackDevServer]: listening on ${PRIVATE_IP}:${PORT}`);
  });
});

gulp.task('build-frontend', ['load-schema'], done => {
  webpack(prodConfig).run(onBuild(done));
});

gulp.task('build-server', done => {
  webpack(serverProdConfig).run(onBuild(done));
});

gulp.task('build', ['build-frontend', 'build-server']);

gulp.task('default', ['webpack-dev-server']);
