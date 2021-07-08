const router = require("express").Router();

const { signup, login } = require("./model");

router.post("/signup", async (req, res) => {
  try {
    const result = await signup(req);
    res.json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: "something went wrong", data: [] });
  }
});
router.post("/login", async (req, res) => {
  try {
    const result = await login(req);
    res.json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: "something went wrong", data: [] });
  }
});

module.exports = router;
