const express = require("express");

const router = express.Router();

const {
    addFund,
    getFunds,
    updateNAV
} = require("../controllers/fundController");

router.post("/", addFund);

router.get("/", getFunds);

router.put("/:fundId/nav", updateNAV);

module.exports = router;