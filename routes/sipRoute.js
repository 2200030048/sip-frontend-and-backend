const express = require("express");

const router = express.Router();

const {

    addSIP,

    getSIP,

    processSIPController,

    getTransactions

} = require(
    "../controllers/sipController"
);





// TEMP STORAGE

const sipData = [];





// CREATE SIP

router.post(
    "/create",

    (request, response) => {

        const {
            fund,
            amount
        } = request.body;





        const newSIP = {

            id:
                sipData.length + 1,

            fund,

            amount
        };





        sipData.push(
            newSIP
        );

        console.log(
            sipData
        );





        response.json({

            message:
                "SIP Created Successfully",

            sip:
                newSIP
        });
    }
);





// ADD SIP

router.post(
    "/",
    addSIP
);





// GET SIP

router.get(
    "/:sipId",
    getSIP
);





// PROCESS SIP

router.post(
    "/:sipId/process",
    processSIPController
);





// GET TRANSACTIONS

router.get(
    "/:sipId/transactions",
    getTransactions
);





module.exports = router;