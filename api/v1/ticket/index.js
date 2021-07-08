const router = require("express").Router();
const authMiddleware = require("../../../middlewares/authMiddleware");
const { createTicket, updateStatus, getCustomerTickets, getTickets, getTicket } = require("./model");

// create a ticket
router.post("/", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const result = await createTicket(req);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});
// Get tickets based on isAdmin so if it is a true then get all tickets else get only the user tickets
router.get("/", authMiddleware.authenticateToken, async (req, res) => {
  try {
    let result;
    if (!req.payload.isAdmin) result = await getCustomerTickets(req);
    if (req.payload.isAdmin) result = await getTickets(req);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});
// get a specific ticket
router.get("/:id", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const result = await getTicket(req);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});
// update a ticket status by admin
router.patch("/:id/status", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const result = await updateStatus(req);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "something went wrong", data: [] });
  }
});

module.exports = router;
