const router = require("express").Router();
const { getPriorities } = require("./model");

router.get("/", async (req, res) => {
  try {
    const result = await getPriorities(req);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});

module.exports = router;
