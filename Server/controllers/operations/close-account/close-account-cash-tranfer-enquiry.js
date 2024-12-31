const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// CLOSE ACCOUNT
const closeAccountCashTransferEnquiryFunc = async (req, res) => {
  const {
    acct_link,
    global_bra,
    fetch,
    reference_no,
    print_voucher,
    batch_number,
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
    if (reference_no) {
      determinant += `AND reference_no LIKE '%${reference_no}%'`;
    } else {
      determinant += "";
    }
    // }
    if (acct_link) {
      determinant += `AND CLSE_ACCT LIKE '%${acct_link}%'`;
    } else {
      determinant += "";
    }

    // fetch all close account cash transfer account enquiry
    if (fetch === "true") {
      const data = await con.execute(
        `select reference_no, batch_no, clse_acct, get_acctdesc(clse_acct) as close_acct_desc, transfer_acct, get_acctdesc(transfer_acct) as transfer_acct_desc, 
        get_currdesc(transfer_currency) as transfer_currency_desc, transfer_amount, posted_by, posting_date, app_flag
        from TB_AC_CLSE_PAY where code_type='CLO' AND branch_code= :global_bra and app_flag='Y' ${determinant}`,
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }
    if (print_voucher === "true") {
      const data = await con.execute(
        `select (REGEXP_REPLACE (SUBSTR (cr_acct, 1, 7), '[^ ]', 'X')|| SUBSTR (cr_acct, 7, 20)) CR_ACCT, CR_NAME, AMT, POSTING_DATE, 
         POSTING_SYS_DATE, USER_NAME, BATCH_NO,br_description,cur_desc,branch_code,document_ref,batch_no
        from acctclosure_RECEIPT_VW where batch_no = :batch_number`,
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { closeAccountCashTransferEnquiryFunc };
