const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// CLOSE ACCOUNT REINSTATEMENT
const ClosedAccountReinstatement = async (req, res) => {
  const {
    fetch,
    procedure,
    acct_link,
    document_no,
    reason_v,
    hostname_v,
    posted_by_v,
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

    if (procedure === "submit") {
      console.log({
        acct_link,
        document_no,
        reason_v,
        posted_by_v,
        hostname_v,
        machine_ip,
        global_prog,
      });
      const result = await con.execute(
        `BEGIN bankowner.prc_cls_acct_reinstatement ( :acct_link , :document_no, :reason_v, : posted_by_v, GET_POSTINGDATE, GET_SESSID, :hostname_v, :machine_ip, :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          document_no,
          reason_v,
          posted_by_v,
          hostname_v,
          machine_ip,
          global_prog,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );

      if (
        result.outBinds?.RESPONSE_CODE === "0" ||
        result.outBinds?.RESPONSE_CODE === "1"
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

    console.log("bro");
    // fetch account details
    if (fetch === "true") {
      const data = await con.execute(
        `select acct_link,account_descrp, prod_code, GET_PRODUCTDESC(prod_code) as product_desc,  currency_code,
        get_currdesc(currency_code) as currency_desc, branch_code ,GET_BRANCHDESC(branch_code) as branch_desc, date_account_closed
        from g_ledger where acct_link = :acct_link and type_of_acct in ('1','2') and status_indicator='CLOS'`,
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

module.exports = { ClosedAccountReinstatement };
