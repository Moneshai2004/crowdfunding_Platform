// backend/routes/contributions.js

const express = require("express");
const router = express.Router();
const {
  addContribution,
  getContributionsByCampaign,
} = require("../controllers/contributionController");
const { protect } = require("../middleware/authMiddleware");

// Add a contribution to a campaign
router.post("/:campaignId", protect, addContribution);

// Get contributions for a campaign
router.get("/:campaignId", getContributionsByCampaign);

module.exports = router;
