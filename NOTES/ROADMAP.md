# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 0.8

- [x] refactor CSSTransitionGroup usage into a separate component (TransitionWrapper)
- database
- logo
- tests


## 0.9

- redesign auth
  - handle expired jwt
  - check `state` on auth callback
- redesign dialogs
  - layout
    - title
    - children
    - actions


## 0.10

- add Request resource button to dropdown on resource icon in action header on land, project, and task pages
  - land, project, task
  - on click, show list of resources liked by viewer
  - who can request a resource for a task?
    - task resource owners
    - project admins and resource owners
    - land admins and resource owners
  - who can request a resource for a project?
    - project admins and resource owners
    - land admins and resource owners
  - who can a request a resource for a land?
    - land admins and resource owners
- add Request resource button to dropdown on resource centerIcon on resource item page
  - on click, show list of lands and projects admin by viewer and lands,
    projects, and tasks where viewer is a resource owner


## 0.11

- new Resource properties
  - availability
  - storage area
  - last seen

## 0.12

- Browse container
  - map with zip + range
  - pagination
  - filter/sort
- line-menu inspiration [line-menu-styles](http://tympanus.net/Development/LineMenuStyles/#Valentine)


## 1.0

Alpha prototype


## 1.1

- Profile container
  - show alert next to location with pending resources
- Land container
  - add weather forecast and historical trends
- multiple images for profile (2), resource (3), land (5)
- new logo and add to`./package.json`
- chaos monkey in dev
- review optimistic updates
- review having only certain graphql endpoints behind the lock
- review scalability and load testing
- analytics
- new loading component
- SSL


## 2.0

Beta release


## 2.1

- Getting Started page
- css feature detection, fallbacks, and browser warnings


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

- add Crop Schedules
  - resource commitments, offers, and availability
  - task and project deadlines
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
- visually distinguish parent relationship items
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
- add scrollIntoView to clicks on actions heading icons
- smaller logout button
- transitions on app header and item page header
- color relationships
