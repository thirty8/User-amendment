const express = require("express");
const app = express();

const listOfAccounts = require("./list-of-accounts-oca");
const CloseAccounts = require("./closed-accounts");

// ENDPOINTS
app.post("/api/list-of-accounts", listOfAccounts?.listOfAccountsFunc);
app.post("/api/closed-accounts-report", CloseAccounts?.closedAccountsFunc);

module.exports = { app };
