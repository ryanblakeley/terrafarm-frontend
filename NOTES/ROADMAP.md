# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 0.5

- [ ] handle expired jwt
- [ ] check `state` on auth callback
- [ ] SSL


## 0.6

- [ ] browse page content and style


## 0.7

- [ ] test coverage


## 1.0

Alpha release targeted for 2015-03-05

- [ ] Home Page: shadows
- [ ] Profile Page
  - [ ] show alert next to group with pending resources
- [ ] better transition animations
- [ ] better loading component
- [ ] favicon
- [ ] review material theme
- [ ] review menu transition out
- [ ] allow user to change profile image
- [ ] browse page filter and sort


## 2.0

Beta release targeted for 2015-03-25

- [ ] Main Menu: alternative icon style if active page
- [ ] swap modals for animated divs in the page
- [ ] invent logo and add to`./package.json` as logo, icon, or image
- [ ] chaos monkey in dev
- [ ] review and add optimistic updates
- [ ] review having only certain graphql endpoints behind the lock
- [ ] load testing
- [ ] analytics
- [ ] add a production build flag that removes source maps and minifies js/html.



## 3.0

Monetization features

- [ ] more groups
- [ ] more group admins
- [ ] access to app source code
- [ ] crowd funding campaign
- [ ] vendor click-throughs for books, videos, and equipment


## 4.0

Low priority improvements and optimizations

- [ ] allow groups to post harvest schedule information
- [ ] parallel requests
- [ ] fewer calls to `getEndpoint`
- [ ] Browse Page: checkboxes and multiple selection
- [ ] New Resource: name field predictive text
- [ ] URL parameter values (query keys) should be descriptive
- [ ] `peerDependencies` instead of shrinkwrap?
- [ ] bump dependencies, maybe node
- [ ] svg background-image as dataURI
- [ ] funny 404 page
- [ ] Getting Started page
- [ ] Home Page photography
- [ ] css feature detection, fallbacks, and browser warnings
- [ ] review responsive css rem/em usage
- [ ] create indexes for `data/` modules
- [ ] review likes
  - [ ] viewerDoesLike
  - [ ] likeCount
- [ ] page view counters
- [ ] css transition composition when https://github.com/facebook/react/issues/2680 lands
- [ ] new group category called research that maybe has reading lists
- [ ] maybe add webpack-dev-server inside `if (isDeveloping)` in `frontend/server.js`
