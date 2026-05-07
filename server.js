const express = require('express');

const app = express();

const { db } = require('./utility/dbManager');

app.use(express.json());
const fundRoute =
require("./routes/fundRoute");

const sipRoute =
require("./routes/sipRoute");

app.use("/api/funds", fundRoute);

app.use("/api/sips", sipRoute);
app.use("/api/investor", require("./routes/investorRoute"))
// app.use("/api/db", require("./utility/dbManager"))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
