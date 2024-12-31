const express = require("express");
const app = express();

// CHEQUE BOOK REQUEST
const chequeBookRequest = require("../book-request/cheque-book-requisition");
const ChequeBookRequestApproval = require("../book-request/cheque-book-requisition-approval");
const ChequeBookMaintenance = require("../book-request/cheque-book-maintenance");
const ChequeBookMaintenanceApproval = require("../book-request/cheque-book-maintenance-approval");
const ChequeBookIssuance = require("../book-request/cheque-book-issuance");
const ChequeBookIssuanceApproval = require("../book-request/cheque-book-issuance-approval");
const ChequeBookEnquiry = require("../book-request/cheque-book-enquiry");
const ChequeBookListing = require("../book-request/cheque-book-listing");
const UsedChequeNoEnquiry = require("../book-request/used-cheque-no-enquiry");
const ChequeReIssuance = require("../book-request/cheque-reissuance");

// ENDPOINTS
app.post("/api/cheque-book-request", chequeBookRequest?.ChequeBookRequest);
app.post("/api/cheque-book-request-approval", ChequeBookRequestApproval?.ChequeBookRequestApproval);
app.post("/api/cheque-book-maintenance", ChequeBookMaintenance?.ChequeBookMaintenance);
app.post(
  "/api/cheque-book-maintenance-approval",
  ChequeBookMaintenanceApproval?.ChequeBookMaintenanceApproval
);
app.post("/api/cheque-book-issuance", ChequeBookIssuance?.ChequeBookIssuance);
app.post(
  "/api/cheque-book-issuance-approval",
  ChequeBookIssuanceApproval?.ChequeBookIssuanceApproval
);
app.post("/api/cheque-book-enquiry", ChequeBookEnquiry?.ChequeBookEnquiry);
app.post("/api/cheque-book-listing", ChequeBookListing?.ChequeBookListing);
app.post("/api/used-cheque-no-enquiry", UsedChequeNoEnquiry?.UsedChequeNoEnquiry);
app.post("/api/cheque-reissuance", ChequeReIssuance?.ChequeReIssuance);

module.exports = { app };
