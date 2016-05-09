import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function sheetQuery (endpoint, query) {
  const url = baseUrl + '/' + endpoint() + query;

  let response;
  try {
    response = await requestify.get(url, options);
  } catch (err) {
    console.error('[Error] with sheetQuery API:', err);
  }

  return JSON.parse(response.body);
}


