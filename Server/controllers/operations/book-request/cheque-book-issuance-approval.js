const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const ChequeBookIssuanceApproval = async (req, res) => {
  const {
    acct_link,
    // host_name_v,
    batch_number,
    fetch_cheque_range,
    fetch_data,
    global_bra,
    global_username,
    handle_procedure,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    if (handle_procedure === "true") {
      const result = await con.execute(
        `begin PKG_CHEQUE_BOOK.prc_chequebk_issuance_app(:acct_link, :global_bra, :global_username,
         :batch_number,:host_name_v,:RESPONSE_CODE, :RESPONSE_MESS); end;`,
        {
          acct_link,
          global_bra,
          global_username,
          batch_number,
          host_name_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result) {
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

    // page load fetch data
    if (fetch_data === "true") {
      const data = await con.execute(
        `select a.* , get_acctdesc(acct_link) as account_desc , get_branchdesc(delivery_branch) as branch_desc 
             from  CHEQUE_REQUISITION a where REQUISITION_NO = :batch_number`,
        { batch_number }
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

    if (fetch_cheque_range === "true") {
      const data = await con.execute(
        `select request_id,requisition_no, acct_link, start_page, end_page from tb_cheque_ranges where requisition_no  = :batch_number and acct_link = :acct_link`,
        { batch_number, acct_link }
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

module.exports = { ChequeBookIssuanceApproval };
