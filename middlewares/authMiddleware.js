const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function authenticateToken(req, res, next) {
  const authHeader = req.headers[["authorization"]];
  // if header not found then = undefined
  const token = authHeader && authHeader.split(" ")[1];

  // if there is no token reject the request
  if (!token)
    return res
      .status(401)
      .json({ status: 403, message: "unauthorized", data: [] });

  // if there is not verified token reject the request
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!payload) {
    console.log("hiii its meee hahhahah");
    return res
      .status(401)
      .json({ status: 403, message: "unauthorized", data: [] });
  }

  req.payload = { isAdmin: payload.isAdmin, username: payload.username };
  console.log(req.payload);

  next();
}

module.exports = { authenticateToken };
