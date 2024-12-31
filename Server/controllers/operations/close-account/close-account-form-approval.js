const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// CLOSE ACCOUNT
const closeAccountApproval = async (req, res) => {
  const {
    acct_link,
    cls_type,
    mandate,
    document_no,
    transferAcc,
    transf_acct_v,
    choosenType,
    currency_code,
    iso_code,
    naration,
    global_bra,
    terminal,
    username,
    procedure,
    acct_link_validation,
    fetch,
    frmcode,
    sess_id,
    machine_ip,
    global_prog,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    if (procedure === "close account") {
      const result = await con.execute(
        `BEGIN BANKOWNER.PKG_clsAcct_RT_REF.prc_clsAcct_reqt_RT ( :acct_link , :cls_type, :mandate, : document_no, :transf_acct_v, :currency_code, :naration, :global_bra, :terminal, :username, GET_POSTINGDATE, :frmcode, GET_SESSID, :machine_ip, :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          cls_type,
          mandate,
          document_no,
          transf_acct_v,
          currency_code,
          naration,
          global_bra,
          terminal,
          username,
          frmcode,
          // sess_id,
          machine_ip,
          global_prog,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );

      if (
        result.outBinds?.RESPONSE_CODE === "999" ||
        result.outBinds?.RESPONSE_CODE === "000"
      ) {
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

    // getting transfer account when cash is selected
    if (fetch === "true") {
      const data = await con.execute(
        `select account_number, get_acctdesc(account_number) as account_desc, reason_desc, posted_by, balance_contra, get_acctdesc(balance_contra) as balance_contra_desc, reason_desc,
         batch_no, document_no, cls_type  from account_closure where account_number = :acct_link`,
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { closeAccountApproval };
