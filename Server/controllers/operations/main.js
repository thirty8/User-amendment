const express = require("express");
const app = express();
const closeAccountFolder = require("./close-account");
const accountStatementFolder = require("./account-statement");
const ClosedAccountReinstatementFolder = require("./closed-account-reinstatement");
const bookRequestFolder = require("./book-request");
const ATMCardRequestFolder = require("./atm-card");
const safeCustodyFolder = require("./safe-custody");
const backOfficeFolder = require("./back-office");
const stoppedChequeFolder = require("./stopped-cheques");
const lienFolder = require("./lien");
const operationReports = require("./reports");

app.use(
  bookRequestFolder?.app,
  closeAccountFolder?.app,
  accountStatementFolder?.app,
  safeCustodyFolder?.app,
  ATMCardRequestFolder?.app,
  backOfficeFolder?.app,
  stoppedChequeFolder?.app,
  lienFolder?.app,
  operationReports?.app,
  ClosedAccountReinstatementFolder?.app
);

module.exports = { app };
