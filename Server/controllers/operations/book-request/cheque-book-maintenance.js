const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const ChequeBookMaintenance = async (req, res) => {
  const {
    data_v,
    acct_link,
    generate_sequence,
    request_no_v,
    num_of_books,
    account_name,
    branch_code,
    get_account_name,
    fetch_screen_two_details,
    batch_number,
    fetch_cheque_range,
    cheque_range_validation,
    leaves_no,
    start_no,
    fetch_data,
    global_bra_v,
    global_username,
    handle_procedure,
    prc_type_v,
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

    if (branch_code) {
      determinant += `AND BRANCH_CODE LIKE '%${branch_code}%'`;
    } else {
      determinant += "";
    }

    if (handle_procedure === "true") {
      const result = await con.execute(
        `begin PKG_CHEQUE_BOOK.prc_chequebk_maintenance( :data_v, :prc_type_v,:acct_link, :global_bra_v, :global_username,
         :batch_number,:RESPONSE_CODE, :RESPONSE_MESS); end;`,
        {
          data_v: JSON.stringify(data_v),
          prc_type_v,
          acct_link,
          global_bra_v,
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

    if (generate_sequence === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.prc_generate_seq( :request_no_v ,:acct_link, :num_of_books,:global_username , :RESPONSE_CODE, : RESPONSE_MESS); END;`,
        {
          request_no_v,
          acct_link,
          num_of_books,
          global_username,
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

    if (cheque_range_validation === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.prc_get_cheque_range_new( :acct_link , :leaves_no, :start_no, :RESPONSE_CODE, : RESPONSE_MESS); END;`,
        {
          acct_link,
          leaves_no,
          start_no,
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

    if (fetch_data === "true") {
      const data = await con.execute(
        `select * from vw_cheque_requisition_app where app_flag='A' ${determinant} ORDER BY POSTING_DATE DESC`
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
        `select acct_link , GET_ACCTDESC(acct_link) as acct_desc from g_ledger where acct_link= :acct_link`,
        { acct_link }
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

    // fetch details for screen two for maintenance
    if (fetch_screen_two_details === "true") {
      const data = await con.execute(
        `select a.* , get_acctdesc(acct_link) as account_desc ,  get_branchdesc(delivery_branch) as branch_desc 
         from  CHEQUE_REQUISITION a where REQUISITION_NO = :batch_number and app_flag='A'`,
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

    // fetch cheque book range for screen two for maintenance
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

module.exports = { ChequeBookMaintenance };
