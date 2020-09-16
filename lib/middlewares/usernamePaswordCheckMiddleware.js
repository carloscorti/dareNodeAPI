/**
 * Middleware usernamePaswordChekcMiddleware: checks if req.body username and password fields,
 * in other words if post request has username and password
 *
 * @return
 *   - case no username or password fields in req.body sends status 400, missing or empty username or password fields
 *   - case req.body has property username and password call next()
 */

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
