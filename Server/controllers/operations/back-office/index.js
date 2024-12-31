const express = require("express");
const app = express();

// BACK OFFICE
const singlePayment = require("../back-office/single-payment");
const batchPostingApproval = require("../back-office/batch-posting-app");

// ENDPOINTS
app.post("/api/single-payment", singlePayment?.SinglePayment);
app.post("/api/batch-posting-approval", batchPostingApproval?.BatchPostingApproval);

module.exports = { app };
