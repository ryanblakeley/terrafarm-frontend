import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import path from 'path';
import schema from 'gulp-graphql';
import env from 'gulp-env';

import configs from './webpack.config';
import prodConfigs from './webpack.production.config';
const { frontendConfig, graphqlServerConfig } = configs;
const { frontendProdConfig, frontendServerProdConfig, graphqlServerProdConfig } = prodConfigs;

// Test for environment variables and load if undefined
if (!process.env.FIELDBOOK_ID) {
  env({file: './.env', type: 'ini'});
}
let { PUBLIC_IP, PRIVATE_IP, FRONTEND_PORT, GRAPHQL_PORT } = process.env;
FRONTEND_PORT = Number(FRONTEND_PORT);
GRAPHQL_PORT = Number(GRAPHQL_PORT);

let compiler;

// trigger a manual recompilation of webpack(frontendConfig);
function recompile () {
  if (!compiler) {
    return null;
  }
  return new Promise((resolve, reject) => {
    compiler.run((err/* , stats*/) => {
      if (err) {
        reject(err);
      }
      console.log('[frontend]: recompiled');
      resolve();
    });
  });
}

function onBuild (done) {
  return function (err, stats) {
    if (err) {
      console.log('Build threw error:', err);
    }
    else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  }
}

// run the webpack dev server
//   must generate the schema.json first as compiler relies on it for babel-relay-plugin
gulp.task('webpack', ['generate-schema'], () => {
  compiler = webpack(frontendConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'build', 'public'),
    hot: true,
    noInfo: true,
    stats: { colors: true, chunks: false },
    historyApiFallback: true,
    proxy: {
      '/graphql': `http://${PRIVATE_IP}:${GRAPHQL_PORT}`,
    },
  });
  server.listen(FRONTEND_PORT, (err/* , result */) => {
    if (err) {
      return console.error(err);
    }
    console.log(`[webpackDevServer]: listening on ${PRIVATE_IP}:${FRONTEND_PORT}`);
  });
});

// restart the backend server whenever a required file from backend is updated
gulp.task('backend-watch', () => {
  return new Promise((resolve, reject) => {
    let compiled = false;
    webpack(graphqlServerConfig).watch(100, (err/* , stats*/) => {
      if (err) {
        return reject(err);
      }
      // trigger task completion after first compile
      if (!compiled) {
        compiled = true;
        resolve();
      } else {
        nodemon.restart();
      }
    });
  });
});

// Regenerate the graphql schema and recompile the frontend code that relies on schema.json
gulp.task('generate-schema', () => {
  return gulp.src('./src/graphql/data/schema.js')
    .pipe(schema({
      json: true,
      graphql: true,
    }))
    .on('error', err => {
      console.log(err.message);
    })
    .pipe(gulp.dest('./src/graphql/data'))
    .on('end', recompile);
});

// recompile the schema whenever .js files in data are updated
gulp.task('watch-schema', () => {
  gulp.watch(path.join(__dirname, './src/graphql/data', '**/*.js'), ['generate-schema']);
});

gulp.task('server', ['backend-watch', 'watch-schema'], () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, 'build', 'dist', 'graphql-server.js'),
    // do not watch any directory/files to refresh
    // all refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*'],
  }).on('restart', () => {
    console.log('[nodemon]: restart');
  });

  // fixes issue with nodemon's exit event
  // https://github.com/JacksonGariety/gulp-nodemon/issues/33
  process.once('SIGINT', () => {
    process.exit(0);
  });
});

// Build scripts
gulp.task('build-schema', (done) => {
  // webpack(graphqlProdConfig).run(onBuild(done));
  compiler = webpack(frontendProdConfig);
  return gulp.src('./src/graphql/data/schema.js')
    .pipe(schema({
      json: true,
      graphql: true,
    }))
    .on('error', err => {
      console.log(err.message);
    })
    .pipe(gulp.dest('./build/dist/data'));
});
gulp.task('build-frontend', ['build-schema'], (done) => {
  webpack(frontendProdConfig).run(onBuild(done));
});
gulp.task('build-frontend-server', (done) => {
  webpack(frontendServerProdConfig).run(onBuild(done));
});
gulp.task('build-graphql-server', (done) => {
  webpack(graphqlServerProdConfig).run(onBuild(done));
});

gulp.task('build', [
  'build-frontend',
  'build-frontend-server',
  'build-graphql-server',
]);

gulp.task('default', ['webpack', 'server']);
