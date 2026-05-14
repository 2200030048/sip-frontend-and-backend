const express = require("express");

const cors = require("cors");

const app = express();

const { db } =
require("./utility/dbManager");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const fundRoute =
require("./routes/fundRoute");

const sipRoute =
require("./routes/sipRoute");

const investorRoute =
require("./routes/investorRoute");

const loginRoute =
require("./routes/loginRoute");

app.use("/api/funds", fundRoute);

app.use("/api/sips", sipRoute);

app.use("/api/investor", investorRoute);

app.use("/login", loginRoute);

app.listen(4000, () => {

  console.log(
    "Server running on port 4000"
  );
});