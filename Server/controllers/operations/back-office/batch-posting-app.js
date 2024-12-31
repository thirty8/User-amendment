const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const ip = require("ip");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
// const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const BatchPostingApproval = async (req, res) => {
  const {
    okay_procedure,
    reject_procedure,
    batch_no_v,
    debit_amount_v,
    credit_amount_v,
    global_branch_v,
    posted_by_v,
    form_code_v,
    global_prog_v,
    load_data,
    load_account_balances,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // procedure to submit
    if (okay_procedure === "true") {
      console.log({
        batch_no_v,
        debit_amount_v,
        credit_amount_v,
        username_v,
        global_branch_v,
        hostname_v: os.hostname(),
        machine_ip_v: ip.address(),
        form_code_v,
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_batch_posting_approval(:batch_no_v, :debit_amount_v,:credit_amount_v,
          :username_v,:global_branch_v, GET_SESSID, :hostname_v, :machine_ip_v,
          :form_code_v, :global_prog_v,
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          batch_no_v,
          debit_amount_v: { val: debit_amount_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          credit_amount_v: { val: credit_amount_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          username_v,
          global_branch_v,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code_v,
          global_prog_v,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result.outBinds?.RESPONSE_CODE === "999" || result.outBinds?.RESPONSE_CODE === "000") {
        return res.status(200).send([
          {
            RESPONSE_CODE: result.outBinds?.RESPONSE_CODE,
            RESPONSE_MESS: result.outBinds?.RESPONSE_MESS,
          },
        ]);
      } else {
        return res.status(200).send(result.outBinds?.RESPONSE_MESS);
      }
    }

    if (reject_procedure === "true") {
      console.log({
        batch_no_v,
        credit_amount_v,
        username_v,
        global_branch_v,
        hostname_v: os.hostname(),
        machine_ip_v: ip.address(),
        form_code_v,
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_batch_posting_reject(:batch_no_v, :credit_amount_v,
          :username_v,:global_branch_v, GET_SESSID, :hostname_v, :machine_ip_v,
          :form_code_v, :global_prog_v,
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          batch_no_v,
          credit_amount_v: { val: credit_amount_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          username_v,
          global_branch_v,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code_v,
          global_prog_v,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result.outBinds?.RESPONSE_CODE === "999" || result.outBinds?.RESPONSE_CODE === "000") {
        return res.status(200).send([
          {
            RESPONSE_CODE: result.outBinds?.RESPONSE_CODE,
            RESPONSE_MESS: result.outBinds?.RESPONSE_MESS,
          },
        ]);
      } else {
        return res.status(200).send(result.outBinds?.RESPONSE_MESS);
      }
    }

    if (load_data === "true") {
      const data = await con.execute(
        `SELECT ACCT_LINK, GET_ACCTDESC(ACCT_LINK) ACCT_DESC, DOCUMENT_REF, TRANSACTION_DETAILS,LOCAL_EQUIVALENT_DB, LOCAL_EQUIVALENT_CR, VALUE_DATE,
          INTER_BRANCH, GET_BRANCHDESC(INTER_BRANCH) BRANCH_DESC, CURRENCY_CODE,GET_ISO_CODE(CURRENCY_CODE) ISO_CODE 
          FROM AC_POST_ALL where USER_NAME = :posted_by_v and APPROVED_BY is  null
          and batch_no = :batch_no_v`,
        {
          posted_by_v,
          batch_no_v,
        }
      );
      if (data.rows) {
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
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }

    if (load_account_balances === "true") {
      const data = await con.execute(
        `select * from vw_after_trans where BATCH_NO = :batch_no_v and amt < 0 and bal_after < 0`,
        {
          batch_no_v,
        }
      );
      if (data.rows) {
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
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { BatchPostingApproval };
