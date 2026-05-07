const jwt = require("jsonwebtoken");

const secret = "ahakjakhfkahfkahdfafa123";


// Generate JWT
function signjwt(payload) {

    try {

        const token = jwt.sign(
            payload,
            secret,
            {
                expiresIn: "60m"
            }


        );
        console.log("payload", payload);

        return token;

    } catch (err) {

        console.log(err);

        return null;
    }
}


// Verify JWT
function verifyjwt(token) {

    try {

        const payload = jwt.verify(token, secret);

        return payload;

    } catch (err) {

        throw err;
    }
}


module.exports = {
    signjwt,
    verifyjwt
};

