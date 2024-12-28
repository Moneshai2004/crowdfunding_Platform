// backend/controllers/contributionController.js

const Contribution = require("../models/Contribution");
const Campaign = require("../models/Campaign");

// Add Contribution
exports.addContribution = async (req, res) => {
  const { amount } = req.body;
  const campaignId = req.params.campaignId;

  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Update the amount raised in the campaign
    campaign.amountRaised += amount;
    await campaign.save();

    const contribution = new Contribution({
      campaign: campaignId,
      contributor: req.user._id,
      amount,
    });

    const createdContribution = await contribution.save();
    res.status(201).json(createdContribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Contributions by Campaign
exports.getContributionsByCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    const contributions = await Contribution.find({
      campaign: campaignId,
    }).populate("contributor", "name email");
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
