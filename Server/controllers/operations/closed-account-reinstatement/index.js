const express = require("express");
const app = express();

const ClosedAccountReinstatement = require("../closed-account-reinstatement/closed-account-reinstatement");

// ENDPOINTS
app.post(
  "/api/closed-account-reinstatement",
  ClosedAccountReinstatement?.ClosedAccountReinstatement
);

module.exports = { app };
