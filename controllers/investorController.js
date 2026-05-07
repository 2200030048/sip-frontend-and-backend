const { fetchInvestorData, loginUser, logoutUser, calculateNAV } = require("../models/investorModel");
const { signjwt, verifyjwt } = require("../utility/authManager");
const { users, investors } = require("../models/investorModel");

const login = (req, res) => {

    const { email, password } = req.body;
    const user = loginUser(email, password);

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(user);
    const token = signjwt({
        email: user.email,
        role: user.role
    });
    return res.status(200).json({ token });

}

const logout = (req, res) => {

    const { email, token } = req.body;
    const user = logoutUser(email, token)
    return res.status(200).json({ message: "User logged out successfully" });

}




const getInvestor = async (req, res) => {

    // console.log("1. Controller Started");

    const { mobile } = req.params;

    // console.log("2. Mobile:", mobile);

    const investorProfile =
        await fetchInvestorData(mobile);

    // console.log("3. After fetchInvestorData");

    res.json(investorProfile);
};

const checkinverstorExists = (req, res) => {
    const { mobile } = req.params;

    const investorProfile = fetchInvestorData(mobile);

    if (investorProfile) {
        res.status(200).json(true);
    } else {
        res.status(404).json(false);
    }

}

const InvestorHoldings = async (req, res) => {

    const { mobile } = req.params;

    const investorProfile =
        await fetchInvestorData(mobile);

    if (investorProfile) {

        res.status(200).json({
            message: "Investor holdings fetched",
            investor: investorProfile
        });

    } else {

        res.status(404).json({
            message: "Investor not found"
        });
    }
};

const calculateNav = async (req, res) => {

    const { mobile } = req.params;

    const net_asset_value = await calculateNAV(mobile);

    if (net_asset_value !== null) {

        res.status(200).json({
            mobile,
            NAV: net_asset_value
        });

    } else {

        res.status(400).send("Invalid mobile number");
    }
};

// const login = (req, res) => {
//     const { mobile } = req.params;
//     const investorProfile = fetchInvestorData(mobile);
//     if (investorProfile) {
//         res.status(200).json(true);
//     } else {
//         res.status(404).json(false);
//     }
// }


// const logout = (req, res) => {
//     const { mobile } = req.params;
//     const token = req.headers.authorization;



module.exports = {
    getInvestor,
    checkinverstorExists,
    InvestorHoldings,
    calculateNav,
    login,
    logout
}

