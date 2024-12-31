const express = require("express");
const app = express();

const accountStatementReq = require("../account-statement/account-statement-request");
const accountStatementReqApp = require("../account-statement/account-statement-request-approval");
const printAccountStatement = require("../account-statement/print-account-statement");

// ENDPOINTS
app.post(
  "/api/account-statement-request",
  accountStatementReq?.accountStatementReqFunc
);

app.post(
  "/api/account-statement-request-approval",
  accountStatementReqApp?.accountStatementReqAppFunc
);
app.post(
  "/api/print-account-statement",
  printAccountStatement?.printAccountStatementFunc
);

module.exports = { app };
