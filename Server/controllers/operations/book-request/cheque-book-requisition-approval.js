const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const ChequeBookRequestApproval = async (req, res) => {
  const {
    batch_number,
    get_fee_transaction,
    fetch_all_details,
    no_of_leaves,
    approveReq,
    rejectReq,
    acct_link,
    global_bra_v,
    total_charges_v,
    username_v,
    form_code_v,
    // terminal_v,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // approve request
    if (approveReq === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.prc_chequebk_reqt_app( :acct_link , :no_of_leaves, :total_charges_v,
      :batch_number, :username_v, :global_bra_v, GET_POSTINGDATE, :form_code_v, :terminal_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          no_of_leaves,
          total_charges_v,
          batch_number,
          username_v,
          global_bra_v,
          form_code_v,
          terminal_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
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

    // reject request
    if (rejectReq === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.prc_chequebk_reqt_reject( :acct_link, :batch_number, :username_v, :global_bra_v, GET_POSTINGDATE, :terminal_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          batch_number,
          username_v,
          global_bra_v,
          terminal_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
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

    // check if account number is valid on enter
    if (get_fee_transaction === "true") {
      const data = await con.execute(
        `select * from vw_fee_transactions where batch_no = :batch_number and CREDIT_AMOUNT is not null
        and acct_link not in (select position_ac from tb_curr_acct)`,
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

    // fetch details for cheque approval
    if (fetch_all_details === "true") {
      const data = await con.execute(
        `select requisition_no, acct_link, get_acctdesc(acct_link) as account_descrp, charge, posting_date, cheque_book_type, number_of_books, leaves_no,delivery_channel, delivery_branch, 
        get_branchdesc(delivery_branch) as delivery_branch_desc,courrier_address, branch_code from CHEQUE_REQUISITION where REQUISITION_NO = :batch_number and
         app_flag='N'`,
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
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { ChequeBookRequestApproval };
