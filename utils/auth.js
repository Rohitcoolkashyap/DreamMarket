const config = require("../config");
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      req.user = token;
      next();
      return;
    });
  }
  return res.status(401).send({ msg: "Token is not supplied." });
};

const isAdmin;