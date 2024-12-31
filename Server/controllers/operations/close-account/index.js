const express = require("express");
const app = express();

// CLOSE ACCOUNT
const closeAccount = require("../close-account/close-account-form");
const closeAccountApproval = require("../close-account/close-account-form-approval");
const closeAccountCashTransferEnquiry = require("../close-account/close-account-cash-tranfer-enquiry");
const closeAccountCashByDraft = require("../close-account/account-close-by-draft");

// ENDPOINTS

app.post("/api/close-account", closeAccount?.closeAccountFunc);
app.post(
  "/api/close-account-approval",
  closeAccountApproval?.closeAccountApproval
);
app.post(
  "/api/close-account-cash-transfer-enquiry",
  closeAccountCashTransferEnquiry?.closeAccountCashTransferEnquiryFunc
);
app.post(
  "/api/close-account-by-draft",
  closeAccountCashByDraft?.closeAccountByDraftFunc
);

module.exports = { app };
