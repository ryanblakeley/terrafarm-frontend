import 'fetch-everywhere';

import { networkAddress } from './network';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export function post({ url, body, options = {} }) {
  return fetch(`//${networkAddress}/${url}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());
}
