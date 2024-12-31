require("dotenv").config();
const express = require("express");
const cors = require("cors");
var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "256mb" }));

// loans
// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

require("dotenv").config();

var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
// const bodyParser = require("body-parser");

// GET CRED PRE-DISBURSEMENT DATA
const getCreditTransactions = async (req, res) => {
  const {
    branch,
    globalBranch,
    facilityNo,
    customerName,
    principalAcct,
    status,
    transCode,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    const data = await con.execute(
      `select * from vw_unapp_loantrans where branch_code 
      like '%'||nvl(:branch ,:globalBranch)||'%' and facility_no like '%'||:facilityNo||'%' 
      and account_name like '%'||:customerName||'%' and principal_account like
       '%'||:principalAcct||'%' and status like '%'||:status||'%' and
        trans_code like '%'||:transCode||'%' and ROWNUM <=200`,
      {
        branch,
        globalBranch,
        facilityNo,
        customerName,
        principalAcct,
        status,
        transCode,
      }
    );

    if (data.rows) {
      // res.send("bro");
      const response = [];
      for (let i = 0; i < data.rows.length; i++) {
        const rowData = {}; // Create an object for each row

        for (let x = 0; x < data.metaData.length; x++) {
          const columnName = data.metaData[x].name.toLowerCase();
          const columnValue = data.rows[i][x];
          rowData[columnName] = columnValue; // Assign each column to the object
        }

        response.push(rowData); // Push the object to the response array
      }
      return res.status(200).send(response);
    } else {
      return res
        .status(500)
        .send("Something went wrong... Nothing was returned!!");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

// GET CREDIT TRANSACTION BRANCHES
const creditTransactionsBranches = async (req, res) => {
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    const data = await con.execute(
      `SELECT DISTINCT BR_CODE value ,BR_DESCRIPTION label FROM TB_BRANCH`
    );

    if (data.rows) {
      const response = [];
      for (let i = 0; i < data.rows.length; i++) {
        const rowData = {};

        for (let x = 0; x < data.metaData.length; x++) {
          const columnName = data.metaData[x].name.toLowerCase();
          const columnValue = data.rows[i][x];
          rowData[columnName] = columnValue;
        }

        response.push(rowData);
      }
      return res.status(200).send(response);
    } else {
      return res
        .status(500)
        .send("Something went wrong... Nothing was returned!!");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { getCreditTransactions, creditTransactionsBranches };
