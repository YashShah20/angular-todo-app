const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const pool = require("./connection");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

app.use("/user", userRouter);
app.use("/todo", todoRouter);

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log(`server is listening to the port ${port}`);
});

// const crypto = require('crypto');
// console.log(crypto.randomBytes(16).toString('hex'));
