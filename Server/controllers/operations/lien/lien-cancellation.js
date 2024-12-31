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

const LienCancellation = async (req, res) => {
  const {
    okay_procedure,
    req_no_v,
    account_number,
    amount,
    lien_type,
    effective_date,
    expiry_date,
    next_review_date,
    comments,
    posted_by,
    global_branch_v,
    branch_code,
    fetch_data,
    get_account_name,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    let determinant = "";

    if (account_number) {
      determinant += `AND acct_link LIKE '%${account_number}%'`;
    } else {
      determinant += "";
    }

    if (amount) {
      determinant += `AND LIEN_AMOUNT >= NVL(${amount},0) `;
    } else {
      determinant += "";
    }

    if (branch_code) {
      determinant += `AND BRANCH_CODE LIKE '%'||NVL(${branch_code},${global_branch_v})||'%'`;
    } else {
      determinant += "";
    }

    // procedure to submit
    if (okay_procedure === "true") {
      const result = await con.execute(
        `BEGIN cbxdmx.prc_lien_canc(:req_no_v,:account_number , :amount , :lien_type, :global_branch_v , :effective_date , :expiry_date, :next_review_date , :comments , :posted_by, :ip_address, :RESPONSE_CODE, :RESPONSE_MESS  ); END;`,
        {
          req_no_v,
          account_number,
          amount: parseFloat(amount),
          ip_address: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          lien_type,
          global_branch_v,
          effective_date,
          expiry_date,
          next_review_date,
          comments,
          posted_by,
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result?.outBinds) {
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

    if (fetch_data === "true") {
      const data = await con.execute(
        `SELECT ACCT_LINK, LIEN_AMOUNT, LIEN_NUMBER, GET_ACCTDESC(ACCT_LINK) ACCT_DESC, EFFECTIVE_DATE,
         EXPIRY_DATE, NEXT_REVIEW_DATE, COMMENTS FROM LIEN WHERE APPROVAL_FLAG ='Y' ${determinant} ORDER BY POSTING_DATE DESC`
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

    // get account name on key down
    if (get_account_name === "true") {
      const data = await con.execute(
        `select acct_link , GET_ACCTDESC(acct_link) as acct_desc from g_ledger where acct_link= :account_number`,
        { account_number }
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

module.exports = { LienCancellation };
