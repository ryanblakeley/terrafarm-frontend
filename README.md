# Terrafarm CSA Frontend

[Terrafarm.io][300]

Frontend server and client code for Terrafarm.

## Contributing

Please take a moment to review the [guidelines][200]:

[Bug reports][201]  
[Feature requests][202]  
[Pull requests][203]

## Documentation

Software documenation lives in `/NOTES/DOCS/`. Start [here][205].

## Roadmap

Planned and potential features are documented in `/NOTES/ROADMAP/`. Start [here][206].

## Installation

Make sure you followed the installation instructions for terrafarm-api first to ensure your API and database are up and operational.

After that, just run the install and setup scripts.
```bash
npm install
npm run setup
```
The setup script copies [/.env.example][101] to `/.env`. Missing values will need to be manually added.

## Running

Start a local server:

```bash
npm run dev
open http://localhost:3000
```

## Other scripts

* `npm run eslint` to check js files for syntax errors and style violations
* `npm run test` to run the test runner
* `npm run build` to build the project
* `npm run start` to serve the build with pm2
* `npm run restart` to restart with pm2
* `npm run stop` to stop serving the build

## Directory Structure

```
build/                    // webpack build output
  dist/
    server.js             // frontend server bundle
  public/                 // publicly served assets
    index.html
    bundle.js             // frontend client bundle
data/                     // loaded GraphQL schema for Relay plugin
NOTES/                    // project documentation
  DOCS/                   // software documentation
  ROADMAP/                // future plans and designs
spec/                     // test framework config
src/
  index.js                // React.render root component
  index.template.html     // template html file that includes React bundle
  routes.js               // frontend routes
  server.js               // frontend server
.babelrc                  // compiler config
.env                      // environment variables
.eslintrc                 // syntax and style config
ecosystem.json            // deployment config
gulpfile.babel.js
relayPlugin.js            // babel-relay-plugin module
webpack.config.js
webpack.production.config
```

## Features

The frontend codebase is built and transpiled using webpack, while gulp is used primarily to run processes and the webpack-dev-server.

The frontend is automatically hot reloaded whenever you save a file. See [react-hot-loader][401] for more details on how this works. It enables you to immediately see changes in React components without losing application state or having to reload your page.

## License

Copyright (c) 2016 Terrafarm LLC  
[Creative Commons BY-NC-ND 3.0][400]  
[Legal Code][100]  
[Acknowledgements][204]


[100]: ./LICENSE.md
[101]: ./.env.example
[200]: ./NOTES/CONTRIBUTING.md
[201]: ./NOTES/CONTRIBUTING.md#bugs
[202]: ./NOTES/CONTRIBUTING.md#features
[203]: ./NOTES/CONTRIBUTING.md#pull-requests
[204]: ./NOTES/ACKNOWLEDGEMENTS.md
[205]: ./NOTES/DOCS/README.md
[206]: ./NOTES/ROADMAP/README.md
[300]: http://terrafarm.io/
[301]: http://terrafarm.io/about/
[400]: https://creativecommons.org/licenses/by-nc-nd/3.0/
[401]: http://gaearon.github.io/react-hot-loader/
