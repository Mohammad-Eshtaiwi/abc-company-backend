const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();
const port = 3005;
const auth = require("./api/v1/auth");
const ticket = require("./api/v1/ticket");
const comment = require("./api/v1/ticket/comment");
const type = require("./api/v1/type");
const priority = require("./api/v1/priority");
const status = require("./api/v1/status");
require("./db");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", auth);
app.use("/api/v1/tickets", ticket);
app.use("/api/v1/tickets/comments", comment);
app.use("/api/v1/types", type);
app.use("/api/v1/priorities", priority);
app.use("/api/v1/statuses", status);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
