const express = require("express");
const app = express();

const safeCustodyCreation = require("../safe-custody/safe-custody-creation");
const safeCustodyLiquidation = require("../safe-custody/safe-custody-liquidation");
const safeCustodyRegisterEnquiry = require("../safe-custody/safe-custody-register-enquiry");

// ENDPOINTS
app.post(
  "/api/safe-custody-creation",
  safeCustodyCreation?.SafeCustodyCreation
);
app.post(
  "/api/safe-custody-liquidation",
  safeCustodyLiquidation?.SafeCustodyLiquidation
);
app.post(
  "/api/safe-custody-register-enquiry",
  safeCustodyRegisterEnquiry?.SafeCustodyRegisterEnquiry
);

module.exports = { app };
