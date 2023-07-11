const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    const user = jwt.verify(token, JWT_SECRET);
    if (!user) {
      return res.status(403).end("auth failed");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).end("auth failed");
  }
};

module.exports = { userAuth };
