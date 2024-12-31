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

var getLpaInvoice = function getLpaInvoice(req, res) {
  var _req$body, branch, globalBranch, facilityNo, customerName, principalAcct, status, transCode, con, data, response, i, rowData, x, columnName, columnValue;

  return regeneratorRuntime.async(function getLpaInvoice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, branch = _req$body.branch, globalBranch = _req$body.globalBranch, facilityNo = _req$body.facilityNo, customerName = _req$body.customerName, principalAcct = _req$body.principalAcct, status = _req$body.status, transCode = _req$body.transCode;
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
          return regeneratorRuntime.awrap(con.execute("select * from vw_unapp_loantrans where branch_code \n      like '%'||nvl(:branch ,:globalBranch)||'%' and facility_no like '%'||:facilityNo||'%' \n      and account_name like '%'||:customerName||'%' and principal_account like\n       '%'||:principalAcct||'%' and status like '%'||:status||'%' and\n        trans_code like '%'||:transCode||'%' and ROWNUM <=200", {
            branch: branch,
            globalBranch: globalBranch,
            facilityNo: facilityNo,
            customerName: customerName,
            principalAcct: principalAcct,
            status: status,
            transCode: transCode
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
}; // GET CREDIT TRANSACTION BRANCHES
// const creditTransactionsBranches = async (req, res) => {
//   let con;
//   try {
//     con = await oracledb.getConnection({
//       user: DB_USER,
//       password: DB_PASSWORD,
//       connectString: DB_CONNECTION_STRING,
//       timeout: DB_CONNECTION_TIMEOUT,
//     });
//     const data = await con.execute(
//       `SELECT DISTINCT BR_CODE value ,BR_DESCRIPTION label FROM TB_BRANCH`
//     );
//     if (data.rows) {
//       const response = [];
//       for (let i = 0; i < data.rows.length; i++) {
//         const rowData = {};
//         for (let x = 0; x < data.metaData.length; x++) {
//           const columnName = data.metaData[x].name.toLowerCase();
//           const columnValue = data.rows[i][x];
//           rowData[columnName] = columnValue;
//         }
//         response.push(rowData);
//       }
//       return res.status(200).send(response);
//     } else {
//       return res
//         .status(500)
//         .send("Something went wrong... Nothing was returned!!");
//     }
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// };


module.exports = {
  getLpaInvoice: getLpaInvoice
};