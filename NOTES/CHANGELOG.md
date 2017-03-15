# Terrafarm CSA Frontend Notes

## Changelog

### 2.0.3

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

### 2.0.2 2017 March 10

- fix links, queries, fields
- change token icon
- fix share status change pathways
- remove users and products from browse
- add base components for Material, Layout, Form, Typography, Icons
- add "number of distributions" to product
- fix Relay range_add on new product and organization

### 2.0.1 2017 March 1

- create and edit farms, users, products, shares, vouchers
- assing and reserve shares and activate shares with tokens
- create vouchers and validate vouchers with tokens
- redirect user page for current person to profile
- new icons and copy

### 2.0.0 2017 Feb 4

- redesign as a CSA platform

### 1.1.0 2016 Dec 7

- fix authorization to show correct form options
- requests and offers have contact info
- patch browse feature
- add member to organization
- resource categories and filter in browse
- contact info on resource allocations
- authorization patterns

### 1.0.6 2016 Nov 29

- new browse feature: form, map, list
- remove projects

### 1.0.5 2016 Nov 18

- chaos monkey
- setup emails @terra.farm
- SSL/HTTPS for alpha.terra.farm
- analytics

### 1.0.4 2016 Nov 15

- mutation callbacks with form errors
- handle routes with missing data
- bounce unauthorized users from routes for forms
- disable menu if not logged in or no items exist
- only link status to form if authorized

### 1.0.3 2016 Nov 11

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

### 1.0.1 2016 Oct 23

- update authentication
- update to match new api

### 1.0.0

- test framework
- new authentication

### 0.8 2016 July

- fixed login flow
- added app header with dynamic page heading and nav
- multiline inputs
- added logo
- added icon action tabs

### 0.7 2016 May

- added projects
- added tasks
- fixed main menu transition timing
- renamed groups to lands
- updated tagline
- updated icons

### 0.6 2016 April

- added browse components
- updated relationship icons layout
- added delete features for user, group, resource
- renamed group -> location (frontend only)
- fixed error messages
- added favicon

### 0.5 2016 March

- production build
- remote deploy

### 0.4 2016 February

- style composition
- global footer
- optimistic mutation responses
- loading render
- animated transitions
- form validations
- group location field
- switched like buttons to hearts
- bumped relay

### 0.3 2016 January

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

### 0.2 2016 January

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

### 0.1 2015 December

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
