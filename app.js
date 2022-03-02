const express = require("express");
const { connectDb } = require("./config/db");
const app = express();
const router = require("./router");
const port = process.env.PORT || 3000;
require("dotenv").config(); //to enable the .env file

//Connect Database
// pool();
connectDb();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.baseUrl);
  res.send({
    success: true,
    routes: [
      `${req.originalUrl}api/v1/horrors`,
      `${req.originalUrl}api/v2/horrors`,
    ],
  });
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`Horror movie app is running on port ${port}.`);
});
