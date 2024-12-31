require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const app = express();

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const util = require("util");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;

let cashWithdrawalFunc = async (
  account_number,
  amount,
  voucher_date,
  transaction_details,
  username,
  approved_by,
  machine_id,
  branch,
  batch_no,
  document_ref,
  narration,
  trans_ref,
  source_of_funds,
  form_code
) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    if (db) {
      const execute = util.promisify(db.execute).bind(db);
      const sql = `BEGIN Pkg_cashtrx_rt.prc_actrxcash_rt (:acct, :amt, :v_date, 'BRA', :trans_desc, 'CWLY', :p_by, :app_by, :terminal, :branch, 'CWD', NULL, :btch, :DOCUMENT_REFF, 'Y', :narration, :TRANS_REF, :SRC_FUND, :FORM_COD, :resp_code, :resp_mess); END;`;
      const bindVars = {
        acct: account_number,
        amt: amount * -1,
        v_date: new Date(voucher_date),
        trans_desc: transaction_details,
        p_by: username,
        app_by: approved_by,
        terminal: machine_id,
        branch: branch,
        btch: batch_no,
        DOCUMENT_REFF: document_ref,
        narration: narration,
        TRANS_REF: trans_ref,
        SRC_FUND: source_of_funds ? source_of_funds : null,
        FORM_COD: form_code,
        resp_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        resp_mess: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      };

      const result = await execute(sql, bindVars);
      // let response = execute(
      //   `BEGIN Pkg_cashtrx_rt.prc_actrxcash_rt (${data}); END;`
      // ,{ resp_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      //       resp_mess: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      //     } );

      if (result) {
        // console.log({result})
        if (result.outBinds.resp_code === "000") {
          return {
            responseCode: result.outBinds.resp_code,
            responseMessage: result.outBinds.resp_mess,
          };
        } else {
          return {
            responseCode: "204",
            responseMessage: "Something went wrong!",
          };
        }
      }
    }
  } catch (e) {
    return e;
  }
};

module.exports.cashWithdrawalFunc = cashWithdrawalFunc;
