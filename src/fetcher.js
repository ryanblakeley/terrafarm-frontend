import 'isomorphic-fetch';

class FetcherBase {
  constructor (url) {
    this.url = url;
  }

  async fetch (operation, variables) {
    const authToken = localStorage.getItem('id_token');
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ query: operation.text, variables }),
    });
    return response.json();
  }
}

export class ClientFetcher extends FetcherBase {
  constructor (url, payloads) {
    super(url);

    this.payloads = payloads;
  }

  async fetch (...args) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(...args);
  }
}

/*
NOTE: The fetcher class in this file gets consumed by Relay.Network.create()
which is then consumed by found-relay's `Resolver` constructor.

See `./Root.js` for how this gets used. The args for a fetch look like:
```
function fetchQuery (
  operation,
  variables,
  cacheConfig,
  uploadables,
)
```
...but found-relay deals with all of this stuff for us.
*/
