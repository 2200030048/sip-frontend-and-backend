const {
    createFund,
    getAllFunds,
    updateFundNAV
} = require("../models/fundModel");

// Create Fund

const addFund = async (req, res) => {

    try {

        const {
            fund_name,
            amc_name,
            category,
            nav
        } = req.body;

        const result = await createFund(
            fund_name,
            amc_name,
            category,
            nav
        );

        res.status(201).json({
            message: "Fund added",
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Get Funds

const getFunds = async (req, res) => {

    try {

        const funds = await getAllFunds();

        res.status(200).json(funds);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Update NAV

const updateNAV = async (req, res) => {

    try {

        const { fundId } = req.params;

        const { nav } = req.body;

        const result =
            await updateFundNAV(fundId, nav);

        res.status(200).json({
            message: "NAV updated",
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addFund,
    getFunds,
    updateNAV
};