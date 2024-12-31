const express = require("express");
const app = express();

// LIEN
const lienCreation = require("../lien/lien-creation");
const lienCreationApproval = require("../lien/lien-creation-approval");
const lienCancellation = require("../lien/lien-cancellation");
const lienCancellationApproval = require("../lien/lien-cancellation-approval");

// ENDPOINTS
app.post("/api/lien-creation", lienCreation?.LienCreation);
app.post("/api/lien-creation-approval", lienCreationApproval?.LienCreationApproval);
app.post("/api/lien-cancellation", lienCancellation?.LienCancellation);
app.post("/api/lien-cancellation-approval", lienCancellationApproval?.LienCancellationApproval);

module.exports = { app };
