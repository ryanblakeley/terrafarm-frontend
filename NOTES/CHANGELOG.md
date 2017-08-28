# Terrafarm Frontend Notes

## Changelog

### HEAD 0.3.0-alpha.2

- fix react hot loader config
- bump deps
- add working journal example
- upgrade to Relay Modern
- switch from react-router-relay to found-relay

### 0.3.0-alpha.1

- switch over to design for nutrition tracking app
- add loading spinner animation
- DEPRECATE: overall approach as a CSA app

### 0.2.5

- clean up browse page
- add external link field to product, organization, user
- add robots.txt
- add notice about early stage development
- change copy

### 0.2.4

- fix place lookup and create place
- add button to load more results on browse results list and relationship lists
- fix validation error props
- change namespace for graphql endpoint
- refactor google maps as shared component to fix retired version warning
- change copy
- change route to defer /about to content library's /pages/about

### 0.2.3

- add form error messages
- fix relationship list item status and link urls
- switch to props.relay.commitUpdate API instead of Relay.Store.commitUpdate
- fix default messages to render when fields are empty
- switch to new Relay.Environment API with better logout procedure
- remove redundant styles
- fix content subheader width of link hit area
- fix relay renderer api to use render callback
- fix index redirects on pages missing required rowId
- finish refactor Material shared components
- fix Icon shared component
- fix Google Map errors
- bump all deps
- add dev hot reload
- refactor color utils
- clean up Typography and Layout shared components
- move special-use sub-components to parent page file

### 0.2.2 2017 March 10

- fix links, queries, fields
- change token icon
- fix share status change pathways
- remove users and products from browse
- add base components for Material, Layout, Form, Typography, Icons
- add "number of distributions" to product
- fix Relay range_add on new product and organization

### 0.2.1 2017 March 1

- create and edit farms, users, products, shares, vouchers
- assing and reserve shares and activate shares with tokens
- create vouchers and validate vouchers with tokens
- redirect user page for current person to profile
- new icons and copy

### 0.2.0 2017 Feb 4

- redesign as a CSA platform

### 0.1.7 2016 Dec 7

- fix authorization to show correct form options
- requests and offers have contact info
- patch browse feature
- add member to organization
- resource categories and filter in browse
- contact info on resource allocations
- authorization patterns

### 0.1.6 2016 Nov 29

- new browse feature: form, map, list
- remove projects

### 0.1.5 2016 Nov 18

- chaos monkey
- setup emails @terra.farm
- SSL/HTTPS for alpha.terra.farm
- analytics

### 0.1.4 2016 Nov 15

- mutation callbacks with form errors
- handle routes with missing data
- bounce unauthorized users from routes for forms
- disable menu if not logged in or no items exist
- only link status to form if authorized

### 0.1.3 2016 Nov 11

- all new style and layout
- frontend permission logic for resource allocations
- resource allocation life cycle
- implement currentPerson
- forms as routes/containers
  - caveats
    - deleting a project orphans tasks
    - deleting organization orphans projects
    - delete resource leaves false connections in Relay, fixed with a refresh
- update icons
- change layout for app header and page menu
- add relationship lists
- add ui resource allocation lifecycle
- simplify tagline
- add about page
- home page links

### 0.1.1 2016 Oct 23

- update authentication
- update to match new api

### 0.1.0

- test framework
- new authentication

### 0.0.8 2016 July

- fixed login flow
- added app header with dynamic page heading and nav
- multiline inputs
- added logo
- added icon action tabs

### 0.0.7 2016 May

- added projects
- added tasks
- fixed main menu transition timing
- renamed groups to lands
- updated tagline
- updated icons

### 0.0.6 2016 April

- added browse components
- updated relationship icons layout
- added delete features for user, group, resource
- renamed group -> location (frontend only)
- fixed error messages
- added favicon

### 0.0.5 2016 March

- production build
- remote deploy

### 0.0.4 2016 February

- style composition
- global footer
- optimistic mutation responses
- loading render
- animated transitions
- form validations
- group location field
- switched like buttons to hearts
- bumped relay

### 0.0.3 2016 January

- user authentication
- liking a group enables user to offer a resource
- group admins
  - make decisions on resource offers
  - edit the group details
- resource offer includes user email so admin can correspond
- added fields to users, resources, and groups forms and pages
  - email
  - categories
  - images
- likes on resources and groups
- admin badge
- forms and form components
- shrinkwrap
- chaos monkey

### 0.0.2 2016 January

- gh-pages
- Heroku free hosting
- Home Page
- About Page
- Main Menu
  - Perspective
  - Goo animation
- Browse Page table
- User/Resource/Group page layouts
- edit/new user/resource/group modals
- create `actions` as components with mutations
- color connection indicators
- material components
- route transitions

- migrated to Fieldbook
- item api
- `./.env` db keys
- added fields on types and mutations

### 0.0.1 2015 December

- core [practices](https://github.com/linuxfoundation/cii-best-practices-badge) and standards.
- app description
- installation
- running
- `js/components/` and `js/elements` READMEs and TEMPLATEs
- contributing
- license
- roadmap
- change log
- tech and architecture
- basic user stories
- typography
- index page with stateful login component
- icons
- color coded relationships between users, groups, and resources
- mock database
- basic types
- basic mutations
