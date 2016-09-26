export default token => next => req => {
  req.headers['Authorization'] = `Bearer ${token}`;
  return next(req);
}
