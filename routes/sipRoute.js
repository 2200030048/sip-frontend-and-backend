const express = require("express");

const router = express.Router();

const {

    addSIP,
    getSIP,
    processSIPController,
    getTransactions

} = require("../controllers/sipController");

router.post("/", addSIP);

router.get("/:sipId", getSIP);

router.post(
    "/:sipId/process",
    processSIPController
);

router.get(
    "/:sipId/transactions",
    getTransactions
);

module.exports = router;