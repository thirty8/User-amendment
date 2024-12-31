require("dotenv").config();
const express = require("express");
const cors = require("cors");
var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "256mb" }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);
require("dotenv").config();
const creditTrans = require("../credit-transactions-enquiry/get-creditTransactions");

// ENDPOINTS
app.post("/api/get-creditTransactions", creditTrans?.getCreditTransactions);
app.get(
  "/api/get-creditTransactions-branches",
  creditTrans?.creditTransactionsBranches
);

module.exports = { app };
