# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 0.7.2

- ship

## 0.8

- add Wish lists
  - wish list item page
  - people will wish for resources, tasks, and projects
  - lands will wish for resources, tasks, and projects
  - tasks will wish for resources
  - projects will wish for resources
  - resources will wish for tasks, projects, lands
  - how does watching fit in?


## 0.9

- add Crop Schedules
  - resource: discrete unit of input
  - task: specific action that employs resources and generates measurable output
  - project: combination of tasks that share a material objective
  - land: discrete territory for organizing projects
  - wish list: resource requests by a task, project, or land
  - schedule:
    - resource commitments, offers, and availability
    - task and project deadlines
    - cr


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
- handle expired jwt
- check `state` on auth callback
- color relationships on User page
  - land, project, task have dash
  - resources have dots
- unit test plugin


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
- multiple images for profile (2), resource (3), land (5)
- new logo and add to`./package.json`
- chaos monkey in dev
- review optimistic updates
- review having only certain graphql endpoints behind the lock
- load testing
- analytics
- add a production build flag that removes source maps and minifies js/html
- new loading component
- SSL


## 2.0

Beta release


## 2.1

- Getting Started page
- css feature detection, fallbacks, and browser warnings
- better transition animations
  - refactor CSSTransitionGroup usage into a separate component (TransitionContainer)


## 3.0

First official release


## 3.1

- resource pricing and transactions
- higher limits on: lands, projects, land admins
- custom short url with name, e.x. terra.farm/dunbar
- crowd funding portal
- vendor click-throughs for books, videos, and equipment
- loadouts: save frequent resource combinations


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
- distinguish parent relationship items
- different icon for land:
  - torii gate by freepik: http://www.flaticon.com/free-icon/torii-gate_68189#term=gate&page=1&position=15
- sticky footer
- represent ecological diversity
- reading groups
- landing bumper
  - logo with full name animates into top left corner
  - login button fades in to top right corner
  - tagline fades in to center
  - photos fade in
- /login and /login/authenticate loading animations
- soil temp, moisture, and analysis
