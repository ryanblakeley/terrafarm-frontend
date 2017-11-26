import jwtDecode from 'jwt-decode';

/*
 * TODO:
 * this could be a more robust validation for the shape of the jwt token
 * but it would probably be better if this pattern is dropped
 * instead defer more elegantly to API 401 unauthorized responses
 */

function validateTokenExpiration (token) {
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const { exp } = decodedToken;

  if (!exp) return true;

  const now = new Date();
  const seconds = Math.floor(now.getTime() / 1000);
  const isExpired = seconds > exp;

  return !isExpired;
}

export default validateTokenExpiration;
