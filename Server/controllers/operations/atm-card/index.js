const express = require("express");
const app = express();

const ATMCardRequest = require("../atm-card/atm-card-request");

// ENDPOINTS
app.post("/api/atm-card-request", ATMCardRequest?.ATMCardRequest);

module.exports = { app };
