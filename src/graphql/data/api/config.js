const {
  FIELDBOOK_ID,
  FIELDBOOK_USER,
  FIELDBOOK_KEY,
} = process.env;

export const baseUrl = `https://api.fieldbook.com/v1/${FIELDBOOK_ID}`;
export const options = {
  headers: {accept: 'application/json'},

  auth: {
    username: FIELDBOOK_USER,
    password: FIELDBOOK_KEY,
  },
};
