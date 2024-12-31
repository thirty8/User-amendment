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

const StoppedChequeCreation = async (req, res) => {
  const {
    account_number_validation,
    cheque_no_validation,
    fetch_fees,
    cheque_no_v,
    cheque_no_end_v,
    amount_on_cheque_v,
    reason_code_v,
    total_v,
    date_on_cheque_v,
    date_stopped_v,
    acct_link_v,
    trans_code_v,
    charge_acct_link_v,
    payee_details_v,
    batch_no_v,
    username_v,
    global_branch_v,
    form_code_v,
    get_all_customer_numbers,
    customer_no,
    okay_procedure,
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
        acct_link_v,
        charge_acct_link_v,
        batch_no_v,
        cheque_no_v,
        cheque_no_end_v,
        amount_on_cheque_v,
        reason_code_v,
        payee_details_v,
        total_v,
        date_on_cheque_v,
        date_stopped_v,
        username_v,
        global_branch_v,
        machine_ip_v: ip.address(),
        hostname_v: os.hostname(),
        form_code_v,
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_stopped_cheque_crt(:acct_link_v, :charge_acct_link_v,:batch_no_v,
          :cheque_no_v,:cheque_no_end_v,:amount_on_cheque_v,:reason_code_v,:payee_details_v, :total_v, 
          :date_on_cheque_v, :date_stopped_v,
          :username_v,:global_branch_v,:machine_ip_v,:hostname_v,GET_SESSID,
          :form_code_v, :global_prog_v, 
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link_v,
          charge_acct_link_v,
          batch_no_v,
          cheque_no_v: {
            val: cheque_no_v,
            dir: oracledb.BIND_IN,
            type: oracledb.NUMBER,
          },
          cheque_no_end_v: {
            val: cheque_no_end_v,
            dir: oracledb.BIND_IN,
            type: oracledb.NUMBER,
          },
          amount_on_cheque_v: {
            val: amount_on_cheque_v,
            dir: oracledb.BIND_IN,
            type: oracledb.NUMBER,
          },
          reason_code_v,
          payee_details_v,
          total_v: { val: total_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          date_on_cheque_v,
          date_stopped_v,
          username_v,
          global_branch_v,
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code_v,
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

    if (account_number_validation === "true") {
      console.log({
        acct_link_v,
        trans_code_v,
        batch_no_v,
        username_v,
        global_branch_v,
        hostname_v: os.hostname(),
        form_code_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_stopped_cheque_acct_no_validate ( :acct_link_v, :trans_code_v, :batch_no_v, :username_v, :global_branch_v, :hostname_v, :form_code_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link_v,
          trans_code_v,
          batch_no_v,
          username_v,
          global_branch_v,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code_v,
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

    // fetch fees
    if (fetch_fees === "true") {
      const data = await con.execute(
        `select * from vw_fee_transactions WHERE BATCH_NO = :batch_no_v and CREDIT_AMOUNT is not null
         and acct_link not in (select position_ac from tb_curr_acct)`,
        {
          batch_no_v,
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
        return res.status(500).send(err);
      }
    }

    // validate cheque no
    if (cheque_no_validation === "true") {
      console.log({
        acct_link_v,
        cheque_no_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_stopped_cheque_no_validate ( :acct_link_v, :cheque_no_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link_v,
          cheque_no_v,
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

    // get all customer numbers
    if (get_all_customer_numbers === "true") {
      const data = await con.execute(
        `select acct_link, GET_ACCTDESC(acct_link) account_name, get_avbal(acct_link) account_balance
          from g_ledger where customer_number =:customer_no`,
        { customer_no }
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const value = data.rows[i][0];
          const label = data.rows[i][1];
          const account_balance = data.rows[i][2];

          arr.push({
            label: `${value} - ${label} ( ${account_balance} )`,
            value: value ? `${value} * ${label} * ${account_balance}` : "",
          });
        }

        return res.status(200).send(arr);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { StoppedChequeCreation };
