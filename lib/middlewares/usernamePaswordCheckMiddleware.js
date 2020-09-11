const usernamePaswordChekcMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    return next();
  }
  return res.status(400).send({
    code: 400,
    message: 'missing or empty username or password fields',
  });
};

export default usernamePaswordChekcMiddleware;
