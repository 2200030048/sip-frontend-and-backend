const { db } = require('../utility/dbManager');


// Investors

const investors = [
    {
        mobile: "6789543210",
        name: "pushpa",
        email: "pushpa@gmail.com",

        portfolio: [
            { name: "irctc", price: 100, quantity: 10 },
            { name: "reliance", price: 100, quantity: 10 },
            { name: "infosys", price: 100, quantity: 10 },
            { name: "icici", price: 100, quantity: 10 }
        ]
    }
];


// Users

const users = [
   {
      mobile: "7702450142",
      email: "pushpa@gmail.com",
      password: "1234",
      role: "investor",
      token: "",
      loggedIn: false
   }
];


// Invalid Tokens

const invalidTokens = [];


// Company liabilities

const liabilities = 100000;



// LOGIN

const loginUser = (email, password) => {

    const userIndex = users.findIndex(
        user =>
            user.email === email &&
            user.password === password
    );

    if (userIndex !== -1) {

        users[userIndex] = {
            ...users[userIndex],
            loggedIn: true
        };

        return users[userIndex];
    }

    return null;
};



// LOGOUT

const logoutUser = (email, token) => {

    const userIndex = users.findIndex(
        user => user.email === email
    );

    if (userIndex !== -1) {

        users[userIndex] = {
            ...users[userIndex],
            loggedIn: false
        };

        invalidTokens.push(token);

        return true;
    }

    return false;
};



// DATABASE FETCH

async function fetchInvestorFromDB(mobile) {

    return new Promise((resolve, reject) => {

        db.get(
            "SELECT * FROM investor WHERE investor_id = ?",
            [mobile],
            (err, row) => {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }

            }
        );

    });

}



// MAIN FETCH FUNCTION

const fetchInvestorData = async (mobile) => {
    console.log(mobile);
    try {

        const data = await fetchInvestorFromDB(mobile);

        console.log(data);


        return data;

    }
    catch (error) {

        console.error(
            "Error fetching investor data:",
            error
        );

        throw error;
    }

}



// NAV CALCULATION

async function calculateNAV(mobile) {

    const investor = investors.find(
        inv => inv.mobile === mobile
    );

    if (!investor) {
        return null;
    }

    const portfolio = investor.portfolio;

    const totalAssets = portfolio.reduce(

        (total, asset) =>

            total + (asset.price * asset.quantity),

        0

    );

    let netAssets = totalAssets - liabilities;

    netAssets = netAssets - 2000;

    return netAssets;
}
async function migrateAssets(){
    const migratePromise=new Promise((resolve,reject)=>{
        db.serialize(() => {

            db.run("BEGIN TRANSACTION");

            db.run(`
                INSERT INTO portfolio(portfolio_id, investor_id)
                VALUES (301, 'INV001')
            `);

            db.run(`
                INSERT INTO asset(
                id,
                name,
                qty,
                purchase_date,
                unit_value,
                portfolio_id
                )
                VALUES (
                2001,
                'Infosys Shares',
                10,
                '2024-01-01',
                1500,
                301
                )
            `);

            // Intentional FK failure
            db.run(`
                INSERT INTO asset(
                id,
                name,
                qty,
                purchase_date,
                unit_value,
                portfolio_id
                )
                VALUES (
                2002,
                'Broken Asset',
                5,
                '2024-01-01',
                1000,
                9999
                )
            `, (err) => {

                if (err) {
                console.log("Error occurred");
                console.log(err.message);

                db.run("ROLLBACK");
                } else {
                db.run("COMMIT");
                }

            });

            });
    })
    try{
        await migratePromise;
    }catch(err){
        console.log(err);
    }
};


module.exports = {
    fetchInvestorData,
    calculateNAV,
    loginUser,
    logoutUser,
    invalidTokens,
    users,
    investors
};

