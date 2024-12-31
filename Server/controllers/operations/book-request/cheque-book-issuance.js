const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const ChequeBookIssuance = async (req, res) => {
  const {
    get_details,
    acct_link,
    account_name,
    global_bra,
    handle_procedure,
    global_username,
    batch_number,
    fetch_screen_two_details,
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

    if (acct_link) {
      determinant += `AND acct_link LIKE '%${acct_link}%'`;
    } else {
      determinant += "";
    }

    if (account_name) {
      determinant += `AND ACCOUNT_NAME LIKE '%${account_name}%'`;
    } else {
      determinant += "";
    }

    if (handle_procedure === "true") {
      const result = await con.execute(
        `begin PKG_CHEQUE_BOOK.prc_chequebk_issuance(:acct_link, :global_bra, :global_username,
         :batch_number,:RESPONSE_CODE, :RESPONSE_MESS); end;`,
        {
          acct_link,
          global_bra,
          global_username,
          batch_number,
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

    // fetch details for screen two for maintenance
    if (fetch_screen_two_details === "true") {
      const data = await con.execute(
        `select a.* , get_acctdesc(acct_link) as account_desc ,  get_branchdesc(delivery_branch) as branch_desc 
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

    // load data
    if (get_details === "true") {
      const data = await con.execute(
        `select * from vw_cheque_requisition_app where app_flag='I' and branch_code =:global_bra ${determinant}`,
        { global_bra }
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

module.exports = { ChequeBookIssuance };
