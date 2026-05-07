const express = require('express');

const router = express.Router();

const {
    getInvestor,
    checkinverstorExists,
    InvestorHoldings,
    calculateNav,
    login,
    logout
} = require('../controllers/investorController');

const { verifyjwt } = require('../utility/authManager');


// Temporary invalid token storage
const invalidToken = [];


// Authentication Middleware
const authMiddleware = (request, response, next) => {

    const token = request.headers.authorization;

    // Check token exists
    if (!token) {
        return response.status(401).json({
            message: "Token not provided"
        });
    }

    try {

        // Check invalid token
        if (invalidToken.find((t) => t === token)) {
            return response.status(401).json({
                message: "Invalid token"
            });
        }

        // Verify JWT
        const payload = verifyjwt(token);
        console.log(payload);

        // Role validation
        if (payload.role === "investor") {

            request.user = payload;
            console.log(request.user);

            next();

        } else {

            return response.status(403).json({
                message: "Invalid Permissions"
            });
        }

    } catch (error) {

        return response.status(401).json({
            message: "Authorization failed"
        });
    }
};

// console.log(typeof (login), typeof (logout), typeof (authMiddleware), typeof (checkInvestorExists), typeof (investorHoldings), typeof (calculateNav), typeof (getInvestor));

// Routes

// Login
router.post('/login', login);


// Logout
router.post('/logout', logout);

// Check investor exists
router.get(
    '/check/:mobile',
    authMiddleware,
    checkinverstorExists
);


// Investor holdings
router.get(
    '/:mobile/holdings',
    authMiddleware,
    InvestorHoldings
);


// Investor NAV
router.get(
    '/:mobile/networth',
    authMiddleware,
    calculateNav
);


// Get investor profile
router.get(
    '/:mobile',
    getInvestor
);

// console.log(typeof (login), typeof (logout), typeof (authMiddleware), typeof (checkInvestorExists), typeof (investorHoldings), typeof (calculateNav), typeof (getInvestor));


module.exports = router;

