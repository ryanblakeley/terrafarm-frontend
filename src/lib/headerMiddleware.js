export default token => next => req => {
  const nextReq = Object.assign(req, { headers: {
    Authorization: `Bearer ${token}`,
  }});
  return next(nextReq);
};
