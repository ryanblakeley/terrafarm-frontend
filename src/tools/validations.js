import moment from 'moment';

/* eslint-disable max-len, no-useless-escape */
const validations = {
  matchNormalWords: /^[a-zA-Z0-9,.()&% ]*$/,
  matchCurrency: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
  matchDate: /^(?=\d)(?:(?!(?:1582(?:\.|-|\/)10(?:\.|-|\/)(?:0?[5-9]|1[0-4]))|(?:1752(?:\.|-|\/)0?9(?:\.|-|\/)(?:0?[3-9]|1[0-3])))(?=(?:(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:\d\d)(?:[02468][048]|[13579][26]))\D0?2\D29)|(?:\d{4}\D(?!(?:0?[2469]|11)\D31)(?!0?2(?:\.|-|\/)(?:29|30))))(\d{4})([-\/.])(0?\d|1[012])\2((?!00)[012]?\d|3[01])(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/,
  isTime: (formData, value) => {
    if (!value) return true;
    const formattedTime = moment(value, 'HH:mm:ss a').format('HH:mm:ss');
    return moment(formattedTime, 'HH:mm:ss', true).isValid();
  },
};

export const validationErrors = {
  url: 'Should be a url, e.x. http://imgur.com/abc123',
  maxLength: 'Character limit reached.',
  normalWords: 'Invalid characters detected.',
  words: 'Should be letters and spaces only.',
  textArea: '500 character limit.',
  location: 'Should be a valid address',
  contact: 'Should be an email address or phone number.',
  token: 'Not a valid token.',
  date: 'Should be date in format YYYY-MM-DD',
  time: 'Should be a valid time.',
  number: 'Should be a number.',
  currency: 'Should be a dollar amount.',
};

export const conversions = {
  time: v => (v ? moment(v, 'HH:mm:ss a').format('HH:mm:ss') : null),
};

export default validations;
