# Terrafarm Frontend Roadmap

## Authentication and Authorization patterns

### Story
**Work in progress, documentation coming soon**

### Implementation
This describes how things work now, but this implementation is in need of review.

#### GraphQL
The `graphql` [server][1] uses `jwt` middleware, configured with the app’s Auth0 identity. This middleware gives us a `req.user` object, which gets passed to `graphqlHttp` on the `rootValue` object. Then the graphql `viewer` [type][2] is able to query Fieldbook for a user whose email matches the `user.email` that we get from Auth0.

[1]: /src/graphql/server.js
[2]: /src/graphql/data/schema.js#L93

#### Frontend
When the user hits the `/login` [route][3], it creates an Auth0 lock if one doesn’t yet exist. That lock allows us to parse a hash on a callback from Auth0. It looks for `id_token` in `localStorage`. If there is no `id_token` but we have a hash to parse, we parse the hash with the lock and set the `id_token` in `localStorage`. If that token has not been injected in the Relay network layer, then it gets injected in the `Authorization` header for the graphql proxy. 

The `id_token` and Auth0 `lock` are passed in `context` to a [nested route][4] `/login/authorize`. `AuthorizeContainer` also gets context functions called `setLoggedIn` and `refresh` from the top-level app component `CoreContainer`. If we have `context.idToken` but `props.viewer` (from Relay) is falsey, a `NewUser` mutation gets called. A refresh is triggered so Relay can get the new `viewer`, but it doesn’t always work smoothly :(.

[3]: /src/frontend/login/LoginPage.js
[4]: /src/frontend/login/components/AuthorizeContainer.js

[`CoreContainer`][5] has the same injection function as the Login route. I can’t remember which cases this is meant to handle, but it has something to do with refreshing or logging out or being able to not have all routes nested under the Login route. It also passes a boolean `loggedIn` into context for the rest of the app routes.

[5]: /src/frontend/core/CoreContainer.js

Relay Router uses the `onEnter` hook to check for an `id_token` in `localStorage` and [bounces][6] to `/login` if there isn’t one. This kind of sucks because the user has to be logged in to get to any pages that use Relay. But because of the jwt middleware on the graphql endpoint, anything that hits graphql without a token gets an unauthorized error.

[6]: /src/frontend/index.js#L32
