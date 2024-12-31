const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const accountStatementReqAppFunc = async (req, res) => {
  const {
    fetch,
    batch_number,
    procedureType,
    db_account_v,
    terminal,
    statement_type_v,
    state_type_v,
    bra_v,
    doc_no_v,
    start_date,
    end_date,
    no_of_pages,
    requested_by,
    posted_by,
    req_no_v,
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

    if (procedureType === "approve") {
      console.log({
        db_account_v: db_account_v,
        statement_type_v: statement_type_v,
        state_type_v: state_type_v,
        doc_no_v: doc_no_v,
        bra_v: bra_v,
        start_date: start_date,
        end_date: end_date,
        no_of_pages: no_of_pages,
        requested_by: requested_by,
        posted_by: posted_by,
        msg_v: {
          type: oracledb.STRING,
          dir: oracledb.BIND_OUT,
        },
        msg_code: {
          type: oracledb.NUMBER,
          dir: oracledb.BIND_OUT,
        },
        terminal: terminal,
        req_no_v: req_no_v,
      });
      const data = await db.execute(
        `BEGIN BANKOWNER.prc_statment_app(:db_account_v,:statement_type_v,:state_type_v, :doc_no_v ,:bra_v,:start_date,:end_date,:no_of_pages,:requested_by,:posted_by,:msg_v,:msg_code,:req_no_v,:terminal); END;`,
        {
          db_account_v: db_account_v,
          statement_type_v: statement_type_v,
          state_type_v: state_type_v,
          doc_no_v: doc_no_v,
          bra_v: bra_v,
          start_date: start_date,
          end_date: end_date,
          no_of_pages: no_of_pages,
          requested_by: requested_by,
          posted_by: posted_by,
          msg_v: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          msg_code: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
          terminal: terminal,
          req_no_v: req_no_v,
        }
      );
      if (data) {
        return res.status(200).send([
          {
            msg_code: data.outBinds?.msg_code,
            msg_v: data.outBinds?.msg_v,
          },
        ]);
      } else {
        return res.send("nothing found");
        // }
      }
      return;
    }

    if (fetch === "true") {
      const data = await db.execute(
        `SELECT a.REQUISITION_NO, a.ACCT_LINK, GET_ACCTDESC(a.ACCT_LINK) AS ACCOUNT_DESC,
            b.PROD_CODE, GET_PRODUCTDESC(b.PROD_CODE) PRODUCT_DESC, b.CURRENCY_CODE, GET_ISO_CODE( b.CURRENCY_CODE) AS ISO_CODE,
            GET_CURRDESC(b.CURRENCY_CODE) AS CURRENCY_DESC,GET_AVBAL(a.ACCT_LINK) AS AV_BAL,
            b.DATE_OPENED,b.DATE_OF_LAST_ACTIVITY, a.POSTED_BY, a.REQUESTED_BY, a.NO_OF_PAGES, a.START_DATE,a.END_DATE,a.COMMENTS,a.DOCUMENT_NO, 
            a.STATEMENT_TYPE,GET_CODE_DESC(a.STATEMENT_TYPE, 'STT') AS STATEMENT_TYPE_DESC FROM TB_STATEMENT_REQUEST a join 
            G_LEDGER b on a.acct_link = b.acct_link
            WHERE a.REQUISITION_NO = '${batch_number}'`
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
      return res.status(200).send(response);
    } else {
      return res.send("Something went wrong... Nothing was returned!!");
    }
  } catch (err) {
    return res.status(500).json({ error: "An error occurred " + err });
  }
};

module.exports = { accountStatementReqAppFunc };
