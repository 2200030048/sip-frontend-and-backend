const express = require("express");

const router = express.Router();

const {
    getInvestor,
    checkinverstorExists,
    InvestorHoldings,
    calculateNav,
    login,
    logout
} = require("../controllers/investorController");

const {
    verifyjwt
} = require("../utility/authManager");





// TEMP STORAGE

const invalidToken = [];

const investors = [];





// AUTH MIDDLEWARE

const authMiddleware = (
    request,
    response,
    next
) => {

    const token =
        request.headers.authorization;





    if (!token) {

        return response
            .status(401)
            .json({
                message:
                    "Token not provided"
            });
    }

    try {

        if (
            invalidToken.find(
                (t) => t === token
            )
        ) {

            return response
                .status(401)
                .json({
                    message:
                        "Invalid token"
                });
        }





        const payload =
            verifyjwt(token);

        console.log(payload);





        if (
            payload.role ===
            "investor"
        ) {

            request.user =
                payload;

            next();

        } else {

            return response
                .status(403)
                .json({
                    message:
                        "Invalid Permissions"
                });
        }

    } catch (error) {

        return response
            .status(401)
            .json({
                message:
                    "Authorization failed"
            });
    }
};





// LOGIN

router.post(
    "/login",
    login
);





// LOGOUT

router.post(
    "/logout",
    logout
);





// ADD INVESTOR

router.post(
    "/add",
    (request, response) => {

        const {
            name,
            email,
            mobile
        } = request.body;





        const newInvestor = {
            id:
                investors.length + 1,

            name,
            email,
            mobile
        };





        investors.push(
            newInvestor
        );

        console.log(
            investors
        );





        response.json({

            message:
                "Investor Added Successfully",

            investor:
                newInvestor
        });
    }
);





// CHECK INVESTOR

router.get(
    "/check/:mobile",

    authMiddleware,

    checkinverstorExists
);





// INVESTOR HOLDINGS

router.get(
    "/:mobile/holdings",

    authMiddleware,

    InvestorHoldings
);





// INVESTOR NETWORTH

router.get(
    "/:mobile/networth",

    authMiddleware,

    calculateNav
);





// GET INVESTOR PROFILE

router.get(
    "/:mobile",

    getInvestor
);





module.exports = router;