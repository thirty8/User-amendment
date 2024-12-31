"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var oracledb = require("oracledb");

oracledb.autoCommit = true;

var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json({
  limit: "256mb"
})); // loans
// enable cors

app.use(cors({
  origin: "*"
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/json

app.use(express.json());
app.set("trust proxy", true);

require("dotenv").config();

var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT; // const bodyParser = require("body-parser");
// GET CRED PRE-DISBURSEMENT DATA

var creditPreDisbursementData = function creditPreDisbursementData(req, res) {
  var _req$body, amount, application_no, action_by, branch, relation_officer, con, data, response, i, rowData, x, columnName, columnValue;

  return regeneratorRuntime.async(function creditPreDisbursementData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, amount = _req$body.amount, application_no = _req$body.application_no, action_by = _req$body.action_by, branch = _req$body.branch, relation_officer = _req$body.relation_officer;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(oracledb.getConnection({
            user: DB_USER,
            password: DB_PASSWORD,
            connectString: DB_CONNECTION_STRING,
            timeout: DB_CONNECTION_TIMEOUT
          }));

        case 4:
          con = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(con.execute("select applicant_no, facility_type, get_currdesc(currency) currency, applicant_name, amount, get_branchdesc(branch_code) branch_code, age, posting_sys_date, returned_by\n from loans_app_summ where app_flag in ('06','07','00') \n            and amount>nvl(:amount,0) \n            and applicant_no like '%'||:application_no||'%'\n            and br_approved_by like '%'||:action_by||'%' \n            and branch_code like '%'||:branch||'%'\n            and applicant_name like '%'||:relation_officer||'%' AND ROWNUM <=100", {
            amount: amount,
            application_no: application_no,
            action_by: action_by,
            branch: branch,
            relation_officer: relation_officer
          }));

        case 7:
          data = _context.sent;

          if (!data.rows) {
            _context.next = 14;
            break;
          }

          // res.send("bro");
          response = [];

          for (i = 0; i < data.rows.length; i++) {
            rowData = {}; // Create an object for each row

            for (x = 0; x < data.metaData.length; x++) {
              columnName = data.metaData[x].name.toLowerCase();
              columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }

          return _context.abrupt("return", res.status(200).send(response));

        case 14:
          return _context.abrupt("return", res.status(500).send("Something went wrong... Nothing was returned!!"));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).send(_context.t0));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var creditPreDisbursementBranches = function creditPreDisbursementBranches(req, res) {
  var con, data, response, i, rowData, x, columnName, columnValue;
  return regeneratorRuntime.async(function creditPreDisbursementBranches$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection({
            user: DB_USER,
            password: DB_PASSWORD,
            connectString: DB_CONNECTION_STRING,
            timeout: DB_CONNECTION_TIMEOUT
          }));

        case 3:
          con = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(con.execute("\n            SELECT ALL TB_BRANCH.BR_CODE as value, TB_BRANCH.BR_DESCRIPTION as label\n            FROM TB_BRANCH WHERE FLAG_STATUS='A'\n"));

        case 6:
          data = _context2.sent;

          if (!data.rows) {
            _context2.next = 13;
            break;
          }

          response = [];

          for (i = 0; i < data.rows.length; i++) {
            rowData = {};

            for (x = 0; x < data.metaData.length; x++) {
              columnName = data.metaData[x].name.toLowerCase();
              columnValue = data.rows[i][x];
              rowData[columnName] = columnValue;
            }

            response.push(rowData);
          }

          return _context2.abrupt("return", res.status(200).send(response));

        case 13:
          return _context2.abrupt("return", res.status(500).send("Something went wrong... Nothing was returned!!"));

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send(_context2.t0));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  creditPreDisbursementData: creditPreDisbursementData,
  creditPreDisbursementBranches: creditPreDisbursementBranches
};