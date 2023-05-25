const jwt = require("jsonwebtoken");
const JWT_SIGN = "M$3315";

const fetchUsers = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SIGN);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUsers;
