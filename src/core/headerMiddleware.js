export default next => req => token => {
  req.headers['Authorization'] = `Bearer ${token}`;
  return next(req);
}
