const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const ip = require("ip");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const UntaggedStoppedCheque = async (req, res) => {
  const {
    okay_procedure,
    acct_link,
    account_name,
    branch_code,
    get_account_name,
    fetch_screen_two_details,
    stop_ref,
    batch_no_v,
    cheque_no_v,
    username_v,
    global_bra_v,
    fetch_data,
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

    let determinant = "";

    if (acct_link) {
      determinant += `AND accts LIKE '%${acct_link}%'`;
    } else {
      determinant += "";
    }

    if (account_name) {
      determinant += `AND account_descrp LIKE '%${account_name}%'`;
    } else {
      determinant += "";
    }

    if (branch_code) {
      determinant += `AND bra LIKE '%${branch_code}%'`;
    } else {
      determinant += "";
    }

    // procedure to submit
    if (okay_procedure === "true") {
      console.log({
        acct_link,
        batch_no_v,
        cheque_no_v,
        username_v,
        form_code_v,
        global_bra_v,
        machine_ip_v: ip.address(),
        hostname_v: os.hostname(),
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_untag_stop_cheq(:acct_link, :batch_no_v,:cheque_no_v,
      :username_v, GET_SESSID, :form_code_v, :hostname_v,:machine_ip_v,
      :global_prog_v, :global_bra_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          batch_no_v,
          cheque_no_v: {
            val: cheque_no_v,
            dir: oracledb.BIND_IN,
            type: oracledb.NUMBER,
          },
          username_v,
          form_code_v,
          global_bra_v,
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          global_prog_v,
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

    if (fetch_data === "true") {
      const data = await con.execute(
        `select * from VW_UNTAG_STOPPED_CHG  where untag_flag='N' and app_flag = 'Y' ${determinant}`
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

    // fetch details for screen two for stopped cheque
    if (fetch_screen_two_details === "true") {
      const data = await con.execute(
        `select a.* , get_acctdesc(a.acct_link) account_descrp, get_code_desc(a.reason_code, 'CHS')  as reason_code_desc, get_acctdesc(a.charge_acct) as charge_acct_desc, get_avbal(a.charge_acct) as charge_acct_avbal 
         from STOPPED_CHEQUE a where a.STOP_REF = :stop_ref`,
        { stop_ref }
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

module.exports = { UntaggedStoppedCheque };
