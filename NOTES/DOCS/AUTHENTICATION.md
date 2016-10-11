# Terrafarm Authentication Scheme

This describes how Authentication and User Sign Up works in the Terrafarm
App as of commit de14ce3cb2c1b98ba2598de4ddf90c1831d58e30.

Authentication is done via a Relay Mutation called `authenticateUser`. It takes
two props: `email` and `password`. These are passed to the PostgraphQL
backend and the user is authenticated against the `user_account` table to
verify the email and password match. Once it is verified, a new signed JWT
token is created and a JSON object is created with the following structure:

```json
{
  "token":"jwt-token",
  "id":"user-uuid"
}
```

This is stringified and passed back in the `output` field of the mutation.

When received on the front end, the payload is parsed back into a JSON object
and the `id` field is checked. If it is null, then no user was found or the
password was incorrect, and an error message is rendered. If the `id` is
present, then the user is logged in and redirected.

The login function (used for both logging in and signing up) then sets the
JWT token in a local storage key called `id_token`, sets the `loggedIn` context
variable to true, and also sets a new context variable called `userId` to
the UUID of the logged in user. This can now be used to query with Relay.
