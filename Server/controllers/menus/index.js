const express = require("express");
const app = express();

const accessFormManagement = require("./access-form-management");

// ENDPOINTS
app.post(
  "/api/access-form-management",
  accessFormManagement?.accessFormManagement
);

module.exports = { app };
