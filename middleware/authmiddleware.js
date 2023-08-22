const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/db");

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decodedToken;
    next();
  });
}

function isAdmin(req, res, next) {
  const token = req.headers?.cookie.split("=")[1];
  const decodedToken = jwt.verify(token, "prakash14");

  const userRole = decodedToken.role;
  console.log(userRole);
  if (userRole && userRole === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
}

module.exports = { authenticateUser, isAdmin };
