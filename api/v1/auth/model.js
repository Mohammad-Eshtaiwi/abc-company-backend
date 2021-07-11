const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../db/user");
const validateSchemas = require("../../../utils/validateSchema");
const authSchemas = require("./authSchemas");

async function signup(req) {
  try {
    //   validate user input
    const validate = validateSchemas(req.body, authSchemas.joiUserSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };

    // encrypt the password before saving it into the database
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.password = hashedPassword;
    } catch (error) {
      return { status: 500, message: "something went wrong", data: [] };
    }
    // check if the user exist or not
    findUser = await User.findOne({ username: req.body.username }).lean();
    if (findUser) return { status: 401, message: "username is already used", data: [] };
    // add new user
    addUser = new User({
      username: req.body.username,
      password: req.password,
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    });
    await addUser.save();
    return { status: 201, message: "created", data: [] };
  } catch (error) {
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
async function login(req) {
  try {
    //   validate user input
    const validate = validateSchemas(req.body, authSchemas.joiUserSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };
    // check if the user exist or not
    findUser = await User.findOne({ username: req.body.username }).lean();
    if (!findUser)
      return {
        status: 401,
        message: "username or password is not correct",
        data: [],
      };

    // if the password is wrong then reject the request
    if (!(await bcrypt.compare(req.body.password, findUser.password)))
      return {
        status: 401,
        message: "username or password is not correct",
        data: [],
      };
    const token = jwt.sign({ username: findUser.username, isAdmin: findUser.isAdmin }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    return {
      status: 201,
      message: "created",
      data: [{ token, username: findUser.username, isAdmin: findUser.isAdmin }],
    };
  } catch (error) {
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}

module.exports = { signup, login };
