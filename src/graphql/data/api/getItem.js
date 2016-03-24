import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function getItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint(id);
  options.body = {};

  let response;
  try {
    response = await requestify.get(url, options);
  } catch (err) {
    console.error('API error with getItem:', err);
  }

  return JSON.parse(response.body);
}

