# js

Directories in this folder other than `./shared` group features for first-level
url routes. Each has sub-directories for `containers`, `components`, `styles`,
`mutations`, and `queries`. Modules that don't interact with the API and get
used across routes go in `./shared`. 

`./TEMPLATE` can be copied to start a new first-level url feature.


## containers

> These containers are used by Routes in `./routes.js` or by other containers.

A container can represent a page or a fragment of a page.

A container can be a Relay `<QueryRenderer>` or `<FragmentContainer>`.

A container is composed of `components` from its own directory and possibly from `./shared/components/*`.

A container can have layout styles, but `components` handle visual stuff with their own stylesheets.

A container is allowed to import the following stuff:
* `<feature>/containers/<container>`
* `<feature>/components/<component>`
* `<feature>/styles/<container>Stylesheet.css`
* `./shared/*`

Don't import:
* `<feature>/elements/<element>` -> wrap the element in a component.
* `<feature>/mutations/<mutation>` -> wrap the mutation in a component.


## components

>  The components are used by `containers` or by other components.

A component is allowed to import the following stuff:
* `components/*`
* `mutations/*`
* `elements/*`
* `styles/*`

Don't import:
* external styles and components -> wrap the style or component in an element.


## elements

> The elements are used by `components` or by other elements.

An element doesn't do any data fetching or manipulation and expects data pass via `props`. It represents a low-level reuseable component that can be used by different components. An element doesn't have state. An element expects low-level data.

An element brings its own styles. Optionally it can take class names to override styling (theming).

Examples for elements: a drop down list, autocompletion edit box, radio button list.

An element is allowed to import the following stuff:
* `elements/*`
* `styles/*`
* external styles and components

Don't import:
* `components/*` -> pass a component via `props` instead.
* `mutations/*` -> components should handle mutations.


## queries

> The queries are used by `containers`.

A query uses GraphQL to handle backend data fetching.

A query does not import anything. It composes a GraphQL query string.


## mutations

> The mutations are used by `components`.

A mutation uses GraphQL to handle a backend data mutation.

A mutation does not import anything. It composes a GraphQL mutation query string.


## styles

> The styles are used by `containers`, `components`, and `elements`.

These are CSS-module stylesheets. Each component should have its own namespaced stylesheet if it needs any CSS.

Style rules may be composed from other style rules.

See [this post](https://css-modules.github.io/webpack-demo/) for info on CSS Modules.
