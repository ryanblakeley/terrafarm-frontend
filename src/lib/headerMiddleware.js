/* eslint quote-props: 0 */
export default token => next => req => {
  const nextHeaders = Object.assign(req.headers, {
    'Authorization': `Bearer ${token}`,
  });
  const nextReq = Object.assign(req, { headers: nextHeaders });
  return next(nextReq);
};
