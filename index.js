const express = require("express");
require("dotenv").config();
const app = express();
const port = 3005;
const auth = require("./api/v1/auth");
const ticket = require("./api/v1/ticket");
const comment = require("./api/v1/ticket/comment");
require("./db");
app.use(express.json());
app.use("/auth", auth);
app.use("/tickets", ticket);
app.use("/tickets/comments", comment);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
