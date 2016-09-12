# Terrafarm Roadmap

Planned and potential features and releases.

## 0.8.1

- on resource page
  - request resource from a button in the action tabs heading
    - show a hierarchical display of lands, projects, and tasks where the viewer
      has permission to request resources (admin or resource contributor).
    - the owner of the requested resource sees a notification on the
      ResourceRelationshipItem on his profile page and on the Resource page
    - if a land, project, or task admin is on a Resource page for a resource that
      has been offered to one of those scopes, show a notification that it has
      been offered and the viewer can make a decision and take action.

- on land, project, and task pages
  - show a wish list
  - if the viewer has permission
    - show delete options on wish list items
    - show a button in the action heading for a new wish list item.
      - use a text field, wish list is an array of text types
    - show a list of resources requested
      - provide the option to cancel a request.
    - show a button for requesting a resource
      - if clicked, show a list of resources liked by the viewer

## 0.8.2

- mark complete task/project items on parent page

## 0.9

Sept 14

- replace fieldbook api with postgres db that reflects a graphql api
- increase x in `(first: x)` chunks

## 0.10

- patch auth
  - handle expired jwt
  - check `state` on auth callback
  - handle login failure
  - if not a registered member, fail and navigate to sign up
- add resource availability
- review optimistic updates

## 0.11

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
- chaos monkey in dev
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
- review likes
  - viewerDoesLike
  - likeCount
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
- style guide
- add Geometos Rounded font for app logo
- hint to add resources to profile when trying to offer resource and profile resource list is empty
- add warning to required fields
- symbolize geographic location property
- color relationships
- transitions on app header and item page header
