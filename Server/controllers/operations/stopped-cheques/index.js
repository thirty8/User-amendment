const express = require("express");
const app = express();

// BACK OFFICE
const stoppedChequeCreation = require("../stopped-cheques/stopped-cheque-creation");
const stoppedChequeCreationApproval = require("../stopped-cheques/stopped-cheque-creation-approval");
const untaggedStoppedCheque = require("../stopped-cheques/untagged-stopped-cheque");
const untaggedStoppedChequeApproval = require("../stopped-cheques/untagged-stopped-cheque-approval");

// ENDPOINTS
app.post("/api/stopped-cheque-creation", stoppedChequeCreation?.StoppedChequeCreation);
app.post(
  "/api/stopped-cheque-creation-approval",
  stoppedChequeCreationApproval?.StoppedChequeCreationApproval
);
app.post("/api/untagged-stopped-cheque", untaggedStoppedCheque?.UntaggedStoppedCheque);
app.post(
  "/api/untagged-stopped-cheque-approval",
  untaggedStoppedChequeApproval?.UntaggedStoppedChequeApproval
);

module.exports = { app };
