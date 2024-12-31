const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const printAccountStatementFunc = async (req, res) => {
  const {
    fetch,
    openModal,
    batch_number,
    branch_code,
    account_number,
    report,
    details,
    posted_by,
    procedureType,
    start_date,
    end_date,
  } = req.body;

  let db;
  try {
    db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });
    // const execute = util.promisify(db.execute).bind(db);

    let determinant = "";

    if (account_number) {
      determinant = `AND ACCT_LINK LIKE '%${account_number}%'`;
    } else {
      determinant = "";
    }
    // data table okay button procedure

    if (procedureType === "OK") {
      const data = await db.execute(
        `BEGIN BANKOWNER.prc_statment_done(:msg_v, :msg_code, :batch_number); END;`,
        {
          batch_number: batch_number,
          msg_v: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          msg_code: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
        },
        function (err, result) {
          if (err) {
            throw err;
          }

          if (result) {
            return res.send(result.outBinds);
          } else {
            return res.send("nothing found");
            // }
          }
        }
      );
      return;
    }

    // fetching details for report
    if (details === "true") {
      const data = await db.execute(
        `select a.ACCT_LINK, a.POST_AV_BAL, a.POST_BOOKBAL, nvl(b.SHADOW_BALANCE_TODAY, 0) as SHADOW_BALANCE_TODAY, b.SHADOW_UNCLEARED, GET_PRODUCTDESC(a.PROD_CODE) PRODUCT_DESC, a.ACCOUNT_DESCRP, 
              a.BRDESC,GET_ISO_CODE(a.CURRENCY_CODE) AS ISO_CODE, 
                 nvl(b.SHADOW_BALANCE_TODAY, 0) as SHADOW_BALANCE_TODAY from VW_ALL_LEDGER a JOIN vw_ledger_enq b ON a.acct_link = b.acct_link and a.acct_link='${account_number}'`
      );
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
      return res.send(response);
    }

    if (fetch === "true") {
      const data = await db.execute(
        `SELECT REQUISITION_NO, ACCT_LINK, GET_ACCTDESC(ACCT_LINK) AS ACCOUNT_DESC,POSTING_DATE,POSTED_BY, APPROVED_BY
            FROM TB_STATEMENT_REQUEST WHERE APPROVAL_FLAG='Y' and branch_code='${branch_code}' ${determinant}`
      );
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
      return res.send(response);
    }

    // fetch report
    if (report === "true") {
      const data = await db.execute(
        `SELECT to_char(POST_DATE,'DD-MON-YYYY') as posting_date,to_char(VALUE_DATE,'DD-MON-YYYY') 
            as value_date,TRANSACTION_DETAILS as transaction_details,DOCUMENT_REF as document_ref,BATCH_NO as batch_no,
            NVL(CAST(AMOUNT_DEBIT AS VARCHAR(10)), ' ') AS debit,NVL(CAST(AMOUNT_CREDIT AS VARCHAR(10)), ' ') as credit,
            BALANCE as balance,TRANS_NO FROM VW_INT_STATEMENT_rt WHERE ACC_TRANS = '${account_number}' AND TRUNC(POST_DATE) BETWEEN 
            '${start_date}'  AND '${end_date}' ORDER BY TRANS_NO`
      );
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
      return res.send(response);
    }

    // fetch details when modal opens
    if (openModal === "true") {
      const data = await db.execute(
        `SELECT REQUISITION_NO, ACCT_LINK, GET_ACCTDESC(ACCT_LINK) AS ACCOUNT_DESC, STATEMENT_TYPE, GET_CODE_DESC(STATEMENT_TYPE, 'STT') AS STATEMENT_TYPE_DESC,
            DOCUMENT_NO,NO_OF_PAGES,REQUESTED_BY,COMMENTS, APPROVED_BY, APPROVAL_DATE,START_DATE,END_DATE
            FROM TB_STATEMENT_REQUEST 
            WHERE  REQUISITION_NO ='${batch_number}'`
      );
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
      return res.send(response);
    } else {
      return res.send("Something went wrong... Nothing was returned!!");
    }
  } catch (err) {
    return res.status(500).json({ error: "An error occurred " + err });
  }
};

module.exports = { printAccountStatementFunc };
