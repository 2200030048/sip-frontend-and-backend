const {

    createSIP,
    getSIPById,
    processSIP,
    getSIPTransactions

} = require("../models/sipModel");

// Create SIP

const addSIP = async (req, res) => {

    try {

        const {
            portfolio_id,
            fund_id,
            sip_amount,
            sip_date
        } = req.body;

        const result = await createSIP(
            portfolio_id,
            fund_id,
            sip_amount,
            sip_date
        );

        res.status(201).json({
            message: "SIP created",
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Get SIP

const getSIP = async (req, res) => {

    try {

        const { sipId } = req.params;

        const sip =
            await getSIPById(sipId);

        res.status(200).json(sip);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Process SIP

const processSIPController =
async (req, res) => {

    try {

        const { sipId } = req.params;

        const result =
            await processSIP(sipId);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Transactions

const getTransactions =
async (req, res) => {

    try {

        const { sipId } = req.params;

        const transactions =
            await getSIPTransactions(sipId);

        res.status(200).json(transactions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addSIP,
    getSIP,
    processSIPController,
    getTransactions
};