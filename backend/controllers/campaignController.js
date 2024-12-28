// backend/controllers/campaignController.js

const Campaign = require("../models/Campaign");

// Create Campaign
exports.createCampaign = async (req, res) => {
  const { title, description, goal, endDate, category } = req.body;

  try {
    const campaign = new Campaign({
      title,
      description,
      goal,
      endDate,
      category,
      creator: req.user._id,
    });

    const createdCampaign = await campaign.save();
    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name email");
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "creator",
      "name email"
    );

    if (campaign) {
      res.json(campaign);
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Campaign
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
      // Ensure the user updating the campaign is the creator
      if (campaign.creator.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      campaign.title = req.body.title || campaign.title;
      campaign.description = req.body.description || campaign.description;
      campaign.goal = req.body.goal || campaign.goal;
      campaign.endDate = req.body.endDate || campaign.endDate;
      campaign.category = req.body.category || campaign.category;

      const updatedCampaign = await campaign.save();
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
      // Ensure the user deleting the campaign is the creator
      if (campaign.creator.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      await campaign.remove();
      res.json({ message: "Campaign removed" });
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
