const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const ip = require("ip");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const ChequeReIssuance = async (req, res) => {
  const {
    validation,
    okay_procedure,
    acct_link,
    cheque_range_validation,
    leaves_no,
    start_no,
    request_id_v,
    end_page_v,
    global_username,
    // machine_ip_v,
    global_prog_v,
    form_code,
    // hostname_v,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // procedure to submit cheque book reissuance
    if (okay_procedure === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.prc_chequebk_resissuance(:request_id_v,:acct_link, :leaves_no, :start_no, :end_page_v,
         :global_username, :machine_ip_v, :global_prog_v, GET_SESSID,:hostname_v, :form_code, 
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          request_id_v,
          acct_link,
          leaves_no,
          start_no,
          end_page_v,
          global_username,
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          global_prog_v,
          form_code,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
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

    // check if account number is valid on enter
    if (validation === "true") {
      const data = await con.execute(
        `select accts, account_descrp from g_ledger_vw 
         where accts= :acct_link
         and TYPE_OF_ACCT IN ('1','2','9')`,
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
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { ChequeReIssuance };
