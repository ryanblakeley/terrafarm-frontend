# Terrafarm Frontend Roadmap

## Authentication

Authentication is performed as outlined in the [docs section][1].

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

This problem is solved [here][2], but it is a hacky workaround at best. What is
happening is that we are matching the query string against a regex that checks
for the `authenticateUser` or `createUser` mutation, and if found, injects the
secret key into the `variables` payload.

[1]: ../DOCS/AUTHENTICATION.md
[2]: https://github.com/rojobuffalo/terrafarm-frontend/tree/dev/NOTES/DOCS/AUTHENTICATION.md
