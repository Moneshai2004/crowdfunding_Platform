// backend/routes/campaigns.js

const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");
const { protect } = require("../middleware/authMiddleware");

// Create a new campaign
router.post("/", protect, createCampaign);

// Get all campaigns
router.get("/", getCampaigns);

// Get campaign by ID
router.get("/:id", getCampaignById);

// Update campaign
router.put("/:id", protect, updateCampaign);

// Delete campaign
router.delete("/:id", protect, deleteCampaign);

module.exports = router;
