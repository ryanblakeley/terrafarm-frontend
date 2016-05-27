# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 0.7

- [x] color relationships on task and project pages


## 0.8

- unit test plugin
- add Wish Lists
  - wish list item page
  - people will wish for resources, tasks, and projects
  - lands will wish for resources, tasks, and projects
  - tasks will wish for resources
  - projects will wish for resources


## 0.9

- add Crop Schedules


## 0.10

- new Resource properties
  - availability
  - storage area
  - last seen


## 0.11

- redesign dialogs
  - layout
    - title
    - children
    - actions
  - testing on EditResourceDialog
- redesign browse line menu
  - inspiration [line-menu-styles](http://tympanus.net/Development/LineMenuStyles/#Valentine)
- progressive enhancement styles


## 1.0

Alpha prototype


## 1.1

- Browse container
  - map with zip + range
  - pagination
  - filter/sort
- Profile container
  - show alert next to location with pending resources
- Land container
  - add weather forecast and historical trends
- Main Menu: alternative icon style if active page
- multiple images for profile (2), resource (3), land (5)
- new logo and add to`./package.json`
- chaos monkey in dev
- review optimistic updates
- review having only certain graphql endpoints behind the lock
- load testing
- analytics
- add a production build flag that removes source maps and minifies js/html
- new loading component
- handle expired jwt
- check `state` on auth callback
- SSL


## 2.0

Beta release


## 2.1

- Getting Started page
- css feature detection, fallbacks, and browser warnings
- Home page: shadows
- better transition animations
  - refactor CSSTransitionGroup usage into a separate component (TransitionContainer)


## 3.0

First official release


## 3.1

- resource pricing and transactions
- higher limits on: lands, projects, land admins
- descriptive URL parameters (rather than random string id)
- crowd funding portal
- vendor click-throughs for books, videos, and equipment


## 4.0

Monetization release


## 4.1

- svg background-image as dataURI
- funny 404 page 'oh well arms ascii guy'
- review likes
  - viewerDoesLike
  - likeCount
- page view counters
- css transition composition when https://github.com/facebook/react/issues/2680 lands
- maybe add webpack-dev-server inside `if (isDeveloping)` in `frontend/server.js`
- mail server
- review formsy placeholders matching optimistic updates
- maybe change User -> Person
- priority and status indicators rather than text
- refactor parentProject and parentLand as their own graphql props
- menu for adding connections to an entity, e.x.
  - offering a resource to a land, project, or task
  - adding a new project to a land
  - adding a new task to a project
  - hover on plus icon, circle expands from center around plus icon
    bottom of circle drops down to create rectangle with semi-circle top and bottom
    icons in the rectangle are new connections (resource offer, new task...).
- a line between parent relationship items and children relationship items
- different icon for land:
  - torii gate by freepik: http://www.flaticon.com/free-icon/torii-gate_68189#term=gate&page=1&position=15
- sticky footer
- represent ecological diversity
- reading groups
