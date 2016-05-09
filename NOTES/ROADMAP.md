# Roadmap

Below is a roadmap of potential Terrafarm features and releases.


## 0.7

- [ ] new Project
- [ ] new Task
- edit task
- edit project
- edit land
- edit resource
- edit user

- [ ] fix eslint
- [ ] compatible test package
- [ ] different icon for land:
  - torii gate by freepik: http://www.flaticon.com/free-icon/torii-gate_68189#term=gate&page=1&position=15
- [ ] cleanup styles
- do tasks need priority?
- move "Prototype" heading into a footer on Home page
- sticky footer
- get rid of /home as redirect
- ion-log-in, ion-log-out
- rewrite tagline
- ion-person icon on main menu profile button
- color relationships on task and project pages
- rewrite copy on PendingResourceDialog and NewResourceOfferDialog

- [x] Task page
  - [x] show AddResource button if user likes project
  - [x] if viewer isAdmin, show pending resource offers with actions
  - [x] create resource list based on permissions and pass as prop to NewResourceOfferDialog
  - [x] show remove Resource action if isProjectAdmin or user owns resource

- [x] Resource page
  - [x] add Projects list under Lands list item
  - [x] add Tasks list under Projects list item

- [x] User page
  - [x] remove color relationship from Lands list
  - [x] add Projects list under Lands list item
  - [x] add Tasks list under Projects list item

- [x] Project page
  - [x] parent Land item
  - [x] admins
  - [x] tasks
  - [x] resources
  - [x] resources pending if isProjectAdmin
  - [x] show AddResourceOffer in actionHeading if doesLike project
  - [x] project admin or resource owner can remove resource

- [x] Land page


## 0.8

- [ ] add Wish Lists
  - wish list item page
  - people will wish for resources, tasks, and projects
  - lands will wish for resources, tasks, and projects
  - tasks will wish for resources
  - projects will wish for resources
- [ ] add Crop Schedules
- [ ] add Weather
- [ ] update Resources
  - [ ] add Availability
  - [ ] add Storage Area
  - [ ] add Last Seen


## 0.9

- [ ] redesign dialogs
  - [ ] layout
    - title
    - children
    - actions
  - [ ] testing on EditResourceDialog
- [ ] redesign browse line menu
  - inspiration [line-menu-styles](http://tympanus.net/Development/LineMenuStyles/#Valentine)
- [ ] responsive styles
- [ ] main menu item click feedback animation


## 1.0

Prototype release

- [ ] tests
  - [ ] types
  - [ ] mutations


## 2.0

Alpha release

- [ ] improve the "new location" module by asking questions that guide description-writing
  - What is the physical layout?
  - What are the climate patterns?
  - What are the incumbent lifeforms?
  - What are your preferences?
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
    - survey
    - soil analysis
    - harvest projections
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
  - [ ] multiple selection
- [ ] Profile page
  - [ ] show alert next to location with pending resources
- [ ] allow locations to share harvest schedule
- [ ] New Resource: name field predictive text
- [ ] URL parameter values (query keys) should be descriptive
- [ ] `peerDependencies` instead of shrinkwrap?
- [ ] bump dependencies, maybe node
- [ ] svg background-image as dataURI
- [ ] funny 404 page 'oh well arms ascii guy'
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
- [ ] review parallel requests
- [ ] review calls to `getEndpoint`
- [ ] review formsy placeholders matching optimistic updates
- [ ] maybe change User -> Person
- [ ] priority and status indicators
