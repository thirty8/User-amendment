const express = require("express");
const app = express();
const creditPreDisbursementFolder = require("./credit-pre-disbursement");
const creditTransactions = require("./credit-transactions-enquiry");
const printLpaInvoice = require("./print-lpa-invoice");

app.use(
  creditPreDisbursementFolder?.app,
  creditTransactions?.app,
  printLpaInvoice?.app
);

module.exports = { app };
