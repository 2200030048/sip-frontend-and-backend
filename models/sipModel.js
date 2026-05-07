const { db } = require("../utility/dbManager");

// Create SIP

const createSIP = (
    portfolio_id,
    fund_id,
    sip_amount,
    sip_date
) => {

    return new Promise((resolve, reject) => {

        db.run(

            `
            INSERT INTO sips
            (
                portfolio_id,
                fund_id,
                sip_amount,
                sip_date
            )
            VALUES (?, ?, ?, ?)
            `,

            [
                portfolio_id,
                fund_id,
                sip_amount,
                sip_date
            ],

            function (err) {

                if (err) {
                    reject(err);
                } else {

                    resolve({
                        sip_id: this.lastID
                    });
                }
            }
        );
    });
};

// Get SIP

const getSIPById = (sipId) => {

    return new Promise((resolve, reject) => {

        db.get(

            `
            SELECT * FROM sips
            WHERE sip_id = ?
            `,

            [sipId],

            (err, row) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

// Process SIP

const processSIP = (sipId) => {

    return new Promise((resolve, reject) => {

        db.get(

            `
            SELECT
                s.sip_id,
                s.sip_amount,
                f.nav
            FROM sips s
            JOIN funds f
            ON s.fund_id = f.fund_id
            WHERE s.sip_id = ?
            `,

            [sipId],

            (err, sip) => {

                if (err || !sip) {
                    reject(err || "SIP not found");
                } else {

                    const units =
                        sip.sip_amount / sip.nav;

                    db.serialize(() => {

                        db.run(
                            "BEGIN TRANSACTION"
                        );

                        db.run(

                            `
                            INSERT INTO transactions
                            (
                                sip_id,
                                transaction_amount,
                                nav,
                                units,
                                transaction_date
                            )
                            VALUES (?, ?, ?, ?, DATE('now'))
                            `,

                            [
                                sip.sip_id,
                                sip.sip_amount,
                                sip.nav,
                                units
                            ],

                            (err) => {

                                if (err) {

                                    db.run(
                                        "ROLLBACK"
                                    );

                                    reject(err);

                                } else {

                                    db.run(
                                        "COMMIT"
                                    );

                                    resolve({
                                        message:
                                        "SIP processed",
                                        units
                                    });
                                }
                            }
                        );
                    });
                }
            }
        );
    });
};

// SIP Transactions

const getSIPTransactions = (sipId) => {

    return new Promise((resolve, reject) => {

        db.all(

            `
            SELECT * FROM transactions
            WHERE sip_id = ?
            `,

            [sipId],

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

module.exports = {
    createSIP,
    getSIPById,
    processSIP,
    getSIPTransactions
};