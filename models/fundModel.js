const { db } = require("../utility/dbManager");

// Add Fund

const createFund = (
    fund_name,
    amc_name,
    category,
    nav
) => {

    return new Promise((resolve, reject) => {

        db.run(

            `
            INSERT INTO funds
            (
                fund_name,
                amc_name,
                category,
                nav
            )
            VALUES (?, ?, ?, ?)
            `,

            [fund_name, amc_name, category, nav],

            function (err) {

                if (err) {
                    reject(err);
                } else {

                    resolve({
                        fund_id: this.lastID
                    });
                }
            }
        );
    });
};

// Get All Funds

const getAllFunds = () => {

    return new Promise((resolve, reject) => {

        db.all(

            `SELECT * FROM funds`,

            [],

            (err, rows) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

// Update NAV

const updateFundNAV = (
    fundId,
    nav
) => {

    return new Promise((resolve, reject) => {

        db.run(

            `
            UPDATE funds
            SET nav = ?
            WHERE fund_id = ?
            `,

            [nav, fundId],

            function (err) {

                if (err) {
                    reject(err);
                } else {

                    resolve({
                        updated: this.changes
                    });
                }
            }
        );
    });
};

module.exports = {
    createFund,
    getAllFunds,
    updateFundNAV
};