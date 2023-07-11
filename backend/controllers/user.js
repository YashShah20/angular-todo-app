const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = (
      await pool.query("select * from users where email=$1", [email])
    ).rows;

    if (!user) {
      return res.status(403).json("invalid credentials");
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(403).json("invalid credentials");
    }

    delete user.password;
    const token = jwt.sign(user, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).end("internal server error");
  }
};

const signup = [
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const userCount = (
        await pool.query("select * from users where email=$1", [email])
      ).rowCount;

      if (userCount !== 0) {
        return res.status(400).end("user already exists...");
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).end("internal server error");
    }
  },
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const [user] = (
        await pool.query(
          "insert into users (name,email,password) values ($1,$2,$3) returning *;",
          [name, email, hashedPassword]
        )
      ).rows;

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).end("internal server error");
    }
  },
];

module.exports = {
  signin,
  signup,
};
