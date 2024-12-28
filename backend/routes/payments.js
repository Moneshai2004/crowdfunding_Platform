const express = require("express");
const router = express.Router();
const {
  initiatePayment,
  verifyPayment,
} = require("../controllers/paymentController");

// Initiate Payment (Stubbed)
router.post("/initiate", initiatePayment);

// Verify Payment (Stubbed)
router.get("/verify/:transaction_id", verifyPayment);

module.exports = router;
