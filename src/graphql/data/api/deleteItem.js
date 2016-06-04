import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function deleteItem (endpoint, id, info) {
  const url = `${baseUrl}/${endpoint(id)}`;

  let response;
  try {
    response = await requestify.delete(url, options);
  } catch (err) {
    console.error(`[Error] with deleteItem API: ${err}`);
  }

  return response.getCode(); // No response body, returns HTTP 204
}
