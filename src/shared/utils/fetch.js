import 'fetch-everywhere';

import { networkAddress } from './network';

/* eslint quote-props: 0 */
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export default function post ({ url, body, options = {} }) {
  return fetch(`//${networkAddress}/${url}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  }).then(response => response.json());
}
