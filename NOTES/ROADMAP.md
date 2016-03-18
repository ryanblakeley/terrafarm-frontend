# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 1.0

Alpha release

- [ ] Browse page content and style
- [ ] Browse page filter and sort
- [ ] Profile page
  - [ ] show alert next to group with pending resources
  - [ ] edit name, description
- [ ] Home page: shadows
- [ ] better transition animations
- [ ] better loading component
- [ ] favicon
- [ ] review material theme
- [ ] review menu transition out
- [ ] allow user to change profile image
- [ ] allow user to delete profile, resource, or group
- [ ] Resource or Group page: location with map?


## 2.0

Beta release

- [ ] Main Menu: alternative icon style if active page
- [ ] multiple images for profile (2), resource (3), location (5)
- [ ] swap modals for animated divs in the page
- [ ] invent logo and add to`./package.json` as logo, icon, or image
- [ ] chaos monkey in dev
- [ ] review and add optimistic updates
- [ ] review having only certain graphql endpoints behind the lock
- [ ] load testing
- [ ] analytics
- [ ] add a production build flag that removes source maps and minifies js/html.


## 2.2

- [ ] handle expired jwt
- [ ] check `state` on auth callback
- [ ] SSL
- [ ] test coverage


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
- [ ] goo menu
