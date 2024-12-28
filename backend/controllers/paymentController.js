// backend/controllers/paymentController.js

const axios = require("axios");
const Contribution = require("../models/Contribution");
const Campaign = require("../models/Campaign");

// backend/controllers/paymentController.js

// Temporary Stub for Payment Initiation
exports.initiatePayment = async (req, res) => {
    const { amount, campaignId } = req.body;

    try {
        // Mock response for development purposes
        const mockPaymentLink = `http://mock-payment-gateway.com/pay?amount=${amount}&campaignId=${campaignId}`;
        res.json({ link: mockPaymentLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment initiation failed' });
    }
};

// Temporary Stub for Payment Verification
exports.verifyPayment = async (req, res) => {
    try {
        const { transaction_id } = req.params;

        // Mock response for successful payment verification
        res.json({
            message: 'Payment verified successfully',
            transaction_id,
            status: 'success',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment verification failed' });
    }
};
