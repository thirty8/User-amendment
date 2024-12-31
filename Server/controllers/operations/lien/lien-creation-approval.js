const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const ip = require("ip");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
// const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const LienCreationApproval = async (req, res) => {
  const {
    fetch_data,
    req_no_v,
    prc_type_v,
    okay_procedure,
    account_number,
    amount,
    expiry_date,
    posted_by,
    global_branch_v,
    form_code_v,
    global_prog_v,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // procedure to submit
    if (okay_procedure === "true") {
      console.log({
        prc_type_v,
        req_no_v,
        account_number,
        amount: parseFloat(amount),
        ip_address: ip.address(),
        global_branch_v,
        expiry_date,
        posted_by,
        hostname_v: os.hostname(),
        form_code_v,
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_lien_app(:prc_type_v, :req_no_v,:account_number , :amount , :global_branch_v , :expiry_date, :posted_by, :ip_address, 
        :hostname_v, GET_SESSID, :form_code_v,:global_prog_v, :RESPONSE_CODE, :RESPONSE_MESS  ); END;`,
        {
          prc_type_v,
          req_no_v,
          account_number,
          amount: parseFloat(amount),
          ip_address: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          global_branch_v,
          expiry_date,
          posted_by,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code_v,
          global_prog_v,
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result?.outBinds) {
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
        `SELECT A.*, GET_CODE_DESC(A.LIEN_CODE, 'LIE') LIEN_CODE_DESC FROM CBXDMX.VW_UNAPP_LIEN A WHERE A.LIEN_NUMBER = :req_no_v`,
        {
          req_no_v,
        }
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

module.exports = { LienCreationApproval };
