const router = require("express").Router();
const authMiddleware = require("../../../../middlewares/authMiddleware");
const { createTicket } = require("./model");

router.post("/", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const result = await createTicket(req);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});

module.exports = router;
