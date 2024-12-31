const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const os = require("os");
const ip = require("ip");
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const ChequeBookRequest = async (req, res) => {
  const {
    cheque_reqdata_v,
    validation,
    delete_batch,
    fetch_charge_code,
    code,
    get_branch,
    get_all_customer_numbers,
    customer_no,
    okay_procedure,
    acct_link,
    batch_no_v,
    fetch_data,
    global_bra_v,
    username_v,
    form_code,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // procedure for checking cheque number validation
    if (okay_procedure === "true") {
      const result = await con.execute(
        `BEGIN PKG_CHEQUE_BOOK.PRC_CHEQUEBK_REQT_multi_v(:cheque_reqdata_v,:global_bra_v,:terminaL_id, :username_v, GET_POSTINGDATE,:form_code, GET_SESSID, :machine_ip,
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          cheque_reqdata_v: JSON.stringify(cheque_reqdata_v),
          global_bra_v,
          terminaL_id: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          username_v,
          machine_ip: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          form_code,
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
    if (validation === "true") {
      const data = await con.execute(
        `select count(acct_link) as count from g_ledger a where acct_link= :acct_link and exists(select 1 from tb_product b
         where a.prod_code = b.prod_code and b.cheque_request='Y')`,
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

    // fetch charge code
    if (fetch_charge_code === "true") {
      const data = await con.execute(
        `select description,actual_code,ltrim(rtrim(short_descrp,0)) short_descrp from code_desc 
         where code_type='CHL' and CLASS_CODE= '${code}'`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const label = data.rows[i][0];
          const value = data.rows[i][1];
          const short_descrp = data.rows[i][2];

          arr.push({
            label: `${value} - ${label}`,
            value: value ? `${value} * ${short_descrp}` : "",
          });
        }

        return res.status(200).send(arr);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
    // get branch
    if (get_branch === "true") {
      const data = await con.execute(
        `SELECT TB_BRANCH.BR_CODE, TB_BRANCH.BR_DESCRIPTION
        FROM TB_BRANCH ORDER BY TB_BRANCH.BR_CODE ASC`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const value = data.rows[i][0];
          const label = data.rows[i][1];

          arr.push({
            label: `${value} - ${label}`,
            value: value ? `${value}` : "",
          });
        }

        return res.status(200).send(arr);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }

    // delete fees
    if (delete_batch === "true") {
      const data = await con.execute(`DELETE FROM AC_POST_TEMP WHERE BATCH_NO = :batch_no_v`, {
        batch_no_v,
      });
      if (data) {
        return res.status(200).send([{ mess_code: "1", mess: "successfully deleted" }]);
      }
    }

    // fetch commision details when check procedure is clicked s
    if (fetch_data === "true") {
      const data = await con.execute(
        `select * from vw_fee_transactions where batch_no = :batch_no_v and CREDIT_AMOUNT is not null
        and acct_link not in (select position_ac from tb_curr_acct)`,
        { batch_no_v }
      );

      if (data.rows) {
        // res.send("bro");
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

module.exports = { ChequeBookRequest };
