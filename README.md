# Terrafarm

Cultivate good food close to home.

[Terrafarm.io][1] (pre-release)  
[Motivation][2]

## Contributing

Anyone is welcome to [contribute][3], however, if you decide to get involved, please take a moment to review the [guidelines][3]:

[Bug reports][301]  
[Feature requests][302]  
[Pull requests][303]

## Roadmap

Planned and potential features and releases are documented in the [Roadmap][4].

## Installation

```
npm install
```

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
build/                  // webpack build output
  public/               //  publicly served assets
    index.html
    bundle.js           // frontend bundle  built w/ webpack
  server.js             // backend server   built w/ webpack
src/
  frontend/
    index.js            // React.render Root component
    index.template.html // Template html file that includes React bundle
  server/
    data/               // GraphQL Schema definitions
    index.js
gulpfile.babel.js
webpack.config.js
relayPlugin.js          // babel-relay-plugin module
```

## Features

Both the server and frontend code are built and transpiled using webpack, while
gulp is used primarily to start the webpack-dev-server and nodemon.

The frontend is automatically hot reloaded whenever you save a file. See
[react-hot-loader][5] for more details on how this works. It enables you to
immediately see changes in React components without losing application state
or having to reload your page.

The backend server is automatically restarted whenever you save a file using
[nodemon][6]. If, for example, you modify the GraphQL schema, then the GraphQL
server will be restarted to reflect the changes, the `schema.json` will be
regenerated using an introspection query, and the frontend code will be
recompiled to re-run `Relay.QL` queries through the `babel-relay-plugin`.

## Database

This app is using a free database by [Fieldbook][7].

## Hosting

This app is being hosted by [Heroku][8].

## License

Copyright (c) 2016, Ryan Blakeley  
[Creative Commons BY-NC-ND 3.0][9].

## Acknowledgements

Parts from [Relay Starter Kit][10], which is [BSD licensed][11] and provides an additional [patent grant][12].  
Parts from [Relay Skeleton][13]  
Parts from [codrops/PerspectivePageViewNavigation][14].  
Parts from [codrops/CreativeGooeyEffects][15]  

Some of the UI libraries we use include:
[React Router][16]  
[Material UI][17]  
[Formsy Material UI][18]  
[React Icons][19]

[1]: http://terrafarm.io/
[2]: http://terrafarm.io/about/
[3]: ./NOTES/CONTRIBUTING.md
[301]: ./NOTES/CONTRIBUTING.md#bugs
[302]: ./NOTES/CONTRIBUTING.md#features
[303]: ./NOTES/CONTRIBUTING.md#pull-requests
[4]: ./NOTES/ROADMAP.md
[5]: http://gaearon.github.io/react-hot-loader/
[6]: http://nodemon.io/
[7]: https://fieldbook.com
[8]: https://heroku.com
[9]: http://creativecommons.org/licenses/by-nc-nd/3.0/
[10]: https://github.com/relayjs/relay-starter-kit
[11]: ./NOTES/LICENSE
[12]: ./NOTES/PATENTS
[13]: https://github.com/fortruce/relay-skeleton
[14]: https://github.com/codrops/PerspectivePageViewNavigation
[15]: https://github.com/codrops/CreativeGooeyEffects
[16]: https://github.com/reactjs/react-router
[17]: https://github.com/callemall/material-ui
[18]: https://github.com/mbrookes/formsy-material-ui
[19]: https://github.com/gorangajic/react-icons
