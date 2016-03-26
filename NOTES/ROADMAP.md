# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 1.0

Prototype release

- [ ] menu [top-expand](http://tympanus.net/Development/OffCanvasMenuEffects/topexpand.html)  


## 1.2

- [ ] type tests
- [ ] mutation tests


## 2.0

Alpha release

- [ ] swap modals for animated divs in the page
- [ ] improve the "new location" module by asking questions that guide description-writing
  - [ ] What is the physical layout?
  - [ ] What are the climate patterns?
  - [ ] What are the incumbent lifeforms?
  - [ ] What are your preferences?
- [ ] Main Menu: alternative icon style if active page
- [ ] multiple images for profile (2), resource (3), location (5)
- [ ] invent logo and add to`./package.json` as logo, icon, or image
- [ ] chaos monkey in dev
- [ ] review and add optimistic updates
- [ ] review having only certain graphql endpoints behind the lock
- [ ] load testing
- [ ] analytics
- [ ] add a production build flag that removes source maps and minifies js/html.
- [ ] task management
  - [ ] examples
    - [ ] survey
    - [ ] soil analysis
    - [ ] harvest projections
  - [ ] recurring
- [ ] better loading component


## 2.1

- [ ] handle expired jwt
- [ ] check `state` on auth callback
- [ ] SSL
- [ ] test coverage


## 3.0

Beta release


## 4.0

Monetization release

- [ ] more locations
- [ ] more location admins
- [ ] access to app source code
- [ ] crowd funding campaign
- [ ] vendor click-throughs for books, videos, and equipment


## 5.0

Low priority improvements and optimizations

- [ ] Browse page
  - [ ] results per page
  - [ ] sort
  - [ ] map
- [ ] Profile page
  - [ ] show alert next to location with pending resources
- [ ] allow locations to share harvest schedule
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
- [ ] new location category called research that maybe has reading lists
- [ ] maybe add webpack-dev-server inside `if (isDeveloping)` in `frontend/server.js`
- [ ] goo menu
- [ ] Home page: shadows
- [ ] better transition animations
- [ ] review material theme
- [ ] mail server
- [ ] menu for desktop [move-down](http://tympanus.net/Development/PerspectivePageViewNavigation/index4.html)
