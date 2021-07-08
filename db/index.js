const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/abc-company", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongo is working"))
  .catch((error) => console.log(error));

module.exports = mongoose;
