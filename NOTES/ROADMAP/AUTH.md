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
When the user hits the `/login` [route][1], they are presented with a screen that will allow them to login or sign up. This information is then sent to the API server via a Relay mutation. When the reponse is received, we either login the user or display an error message.

When the user is logged in, we set the localStorage key `id_token` with the signed JWT token that is received in the response. We then call the `setUserId` context function with the UUID received in the response. Next we call the `setLoggedIn` context function, and then redirect the user to their profile page.

[1]: /src/frontend/login/LoginPage.js

Relay Router uses the `onEnter` hook to check for an `id_token` in `localStorage` and [bounces][2] to `/login` if there isn’t one. This kind of sucks because the user has to be logged in to get to any pages that use Relay. But because of the jwt middleware on the graphql endpoint, anything that hits graphql without a token gets an unauthorized error.

[2]: /src/frontend/index.js#L32
