# Terrafarm Frontend Roadmap

## Authentication and Authorization patterns

### Story
Authentication is performed as outlined in the [docs section](https://github.com/rojobuffalo/terrafarm-frontend/tree/dev/NOTES/DOCS/AUTHENTICATION.md).

Future implementation will likely be moved entirely to rely on PostgraphQL,
but it has not yet been implemented. This will be ideal because there is
currently a bit of a hacky workaround to get it to work properly.

The issue lies in the fact that we have turned on JWT authorization on the
PostgraphQL server. This is done by passing in a `secret` key to the options
object when initializing the express server. This key is used to verify JWT
tokens passed in the `Authorization` header when sending query requests to the
server.

It is important that this key be kept a secret, so that only the authorized
users with properly signed tokens can query and update the database. To this
end, when authenticating a user, and creating a new user, we must sign the
resulting JWT token with the same key. This poses a problem in that the
mutation is sent from the client, and we cannot give the client the secret key.

This problem is solved here: https://github.com/rojobuffalo/terrafarm-api/blob/feature/authentication/src/index.js#L19
but it is a hacky workaround at best. What is happening is that we are matching
the query string against a regex that checks for the `authenticateUser` or
`createUser` mutation, and if found, injects the secret key into the `variables`
payload.

### Implementation
For the current implementation, see the [docs section](https://github.com/rojobuffalo/terrafarm-frontend/tree/dev/NOTES/DOCS/AUTHENTICATION.md).

#### Frontend
When the user hits the `/login` [route][3], it creates an Auth0 lock if one doesn’t yet exist. That lock allows us to parse a hash on a callback from Auth0. It looks for `id_token` in `localStorage`. If there is no `id_token` but we have a hash to parse, we parse the hash with the lock and set the `id_token` in `localStorage`. If that token has not been injected in the Relay network layer, then it gets injected in the `Authorization` header for the graphql proxy.

The `id_token` and Auth0 `lock` are passed in `context` to a [nested route][4] `/login/authorize`. `AuthorizeContainer` also gets context functions called `setLoggedIn` and `refresh` from the top-level app component `CoreContainer`. If we have `context.idToken` but `props.viewer` (from Relay) is falsey, a `NewUser` mutation gets called. A refresh is triggered so Relay can get the new `viewer`, but it doesn’t always work smoothly :(.

[3]: /src/frontend/login/LoginPage.js
[4]: /src/frontend/login/components/AuthorizeContainer.js

Relay Router uses the `onEnter` hook to check for an `id_token` in `localStorage` and [bounces][6] to `/login` if there isn’t one. This kind of sucks because the user has to be logged in to get to any pages that use Relay. But because of the jwt middleware on the graphql endpoint, anything that hits graphql without a token gets an unauthorized error.

[6]: /src/frontend/index.js#L32
