// backend/models/Campaign.js

const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    default: 0,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Wind Turbine", "Hybrid System", "Solar Panel", "Biomass Generator"],
    required: true,
  },
  // Add more fields as necessary
});

module.exports = mongoose.model("Campaign", CampaignSchema);
