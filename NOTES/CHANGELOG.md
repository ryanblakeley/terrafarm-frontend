# Terrafarm Frontend Notes

## Changelog

### HEAD

- update icons

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

#### Stories
- user authentication
- liking a group enables user to offer a resource
- group admins
  - make decisions on resource offers
  - edit the group details
- resource offer includes user email so admin can correspond

#### Frontend
- added fields to users, resources, and groups forms and pages
  - email
  - categories
  - images
- likes on resources and groups
- admin badge
- forms and form components

#### Resilience
- shrinkwrap
- chaos monkey

## 0.2 2016 January

#### Documentation
- gh-pages
- Heroku free hosting

#### Frontend
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

#### Database
- migrated to Fieldbook
- item api
- `./.env` db keys
- added fields on types and mutations

### 0.1 2015 December

#### Documentation
- core [practices](https://github.com/linuxfoundation/cii-best-practices-badge) and standards.
- app description
- installation
- running
- `js/components/` and `js/elements` READMEs and TEMPLATEs
- contributing
- license
- roadmap
- change log

#### Frontend
- tech and architecture
- basic user stories
- typography
- index page with stateful login component
- icons
- color coded relationships between users, groups, and resources

#### Database
- mock database
- basic types
- basic mutations
