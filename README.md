# Terrafarm

[Terrafarm.io][300]

A web platform for allocating and measuring resources in local food systems.

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

```
npm install
```

## Environment

Copy [.env.example][101] to `/.env` and add credentials.

## Running

Start a local server:

```
npm start  # Launch the GraphQL server and the Webpack dev server.
open http://localhost:3000
```

## Deploying

```
pm2 deploy --ecosystem production
```

## Directory Structure

```
build/                    // webpack build output
  public/                 // publicly served assets
    index.html
    bundle.js             // frontend bundle
  dist/
    data/
      schema.graphql
      schema.json
    frontend-server.js
    backend-server.js
NOTES/                    // project documentation
  DOCS/                   // software documentation
  ROADMAP/                // feature designs
src/
  frontend/
    TEMPLATE/             // template for a top-level set of components
    index.js              // React.render root component
    index.template.html   // template html file that includes React bundle
    server.js
  graphql/
    data/                 // GraphQL schema definitions
    server.js
  postgres/               // PostgreSQL schema migrations
.env                      // environment variables
ecosystem.json            // deployment configuration
gulpfile.babel.js
relayPlugin.js            // babel-relay-plugin module
webpack.config.js
webpack.production.config
```

## Features

Both the frontend and graphql codebases are built and transpiled using webpack,
while gulp is used primarily to start the webpack-dev-server and nodemon.

The frontend is automatically hot reloaded whenever you save a file. See
[react-hot-loader][401] for more details on how this works. It enables you to
immediately see changes in React components without losing application state
or having to reload your page.

The backend server is automatically restarted whenever you save a file using
[nodemon][402]. If, for example, you modify the GraphQL schema, then the GraphQL
server will be restarted to reflect the changes, the `schema.json` will be
regenerated using an introspection query, and the frontend code will be
recompiled to re-run `Relay.QL` queries through the `babel-relay-plugin`.

## Database

This app is using a free database by [Fieldbook][403].  

## Hosting

This app is being hosted by [Digital Ocean][404].

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
[402]: http://nodemon.io/
[403]: https://fieldbook.com
[404]: https://digitalocean.com
