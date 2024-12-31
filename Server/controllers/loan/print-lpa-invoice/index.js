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
const printLpa = require("./get-print-lpa-invoice");

// ENDPOINTS
app.post("/api/get-printLpaData", printLpa?.getLpaInvoice);
app.get("/api/get-printLpaBranches", printLpa?.getPrintLpaBranches);

module.exports = { app };
