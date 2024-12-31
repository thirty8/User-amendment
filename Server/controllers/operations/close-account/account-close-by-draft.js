const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// CLOSE ACCOUNT
const closeAccountByDraftFunc = async (req, res) => {
  const {
    okay_procedure,
    cheque_validation,
    search_name,
    acct_link,
    batch_no_v,
    fetch_data,
    cheque_no,
    transaction_details,
    acct_name,
    get_cheque_details,
    branch_code,
    global_bra_v,
    currency_code,
    get_amount_in_words,
    amount,
    total_charges,
    post_bookbal,
    purchaser,
    purchaser_address,
    beneficiary,
    beneficiary_address,
    draftcls_flag,
    posted_by,
    username,
    machine_ip,
    hostname,
    cheque_acct_link,
    commission_acct_link,
    trans_type,
    form_code,
    // session_id,
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

    let determinant = "";

    if (acct_name) {
      determinant += `where account_descrp like UPPER('%'||'${acct_name}'||'%')`;
    } else {
      determinant += `where rownum <=100`;
    }

    // procedure for checking cheque number validation
    if (okay_procedure === "true") {
      console.log({
        acct_link,
        batch_no_v,
        currency_code,
        amount,
        total_charges,
        post_bookbal,
        cheque_no,
        transaction_details,
        purchaser,
        purchaser_address,
        beneficiary,
        beneficiary_address,
        branch_code,
        global_bra_v,
        draftcls_flag,
        posted_by,
        username,
        machine_ip,
        hostname,
        cheque_acct_link,
        commission_acct_link,
        trans_type,
        form_code,
        // session_id,
        global_prog,
      });
      const result = await con.execute(
        `BEGIN BANKOWNER.prc_acct_draft_save( :acct_link , :batch_no_v, :currency_code, :amount, :total_charges, :post_bookbal, :cheque_no, :transaction_details,
          :purchaser, :purchaser_address, :beneficiary, :beneficiary_address, :branch_code, :global_bra_v, :draftcls_flag, :posted_by,: username, GET_POSTINGDATE, :machine_ip,
          :hostname, :cheque_acct_link,:commission_acct_link, :trans_type, :form_code, GET_SESSID, :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          batch_no_v,
          currency_code,
          amount,
          total_charges,
          post_bookbal,
          cheque_no,
          transaction_details,
          purchaser,
          purchaser_address,
          beneficiary,
          beneficiary_address,
          branch_code,
          global_bra_v,
          draftcls_flag,
          posted_by,
          username,
          machine_ip,
          hostname,
          cheque_acct_link,
          commission_acct_link,
          trans_type,
          form_code,
          // session_id,
          global_prog,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (
        result.outBinds?.RESPONSE_CODE === "1" ||
        result.outBinds?.RESPONSE_CODE === "0"
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

    if (cheque_validation === "true") {
      const result = await con.execute(
        `BEGIN BANKOWNER.prc_acct_draft_cheque_no( :acct_link , :cheque_no, :RESPONSE_CODE, : RESPONSE_MESS); END;`,
        {
          acct_link,
          cheque_no,
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
    // get account summary by account number
    if (search_name === "true") {
      const data = await con.execute(
        `select acct_link, account_descrp, get_iso_code(currency_code) as iso_code, cust_no, currency_code, status_indicator from vw_casa_ledger ${determinant} order by account_descrp`
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

    console.log({
      search_name,
      determinant,
      get_cheque_details,
      branch_code,
      currency_code,
    });

    // fetch cheque detais when account number is entered
    if (get_cheque_details === "true") {
      const data = await con.execute(
        `select ac_no, get_acctdesc(ac_no) as account_descrp  from tb_trans_contra where CONTRA_CODE='DRAFT' and currency_code = '${currency_code}'
        and branch_code LIKE '%'||'${branch_code}'||'%'`
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
    // fetch transaction details by account number
    if (transaction_details === "true") {
      const data = await con.execute(
        `select a.actual_code, b.description||' '||'ORDER BY '||GET_ACCTDESC(:acct_link) as transaction_details  from  code_desc b, sysgen_transactions a
        where  a.sys_code = 'BCI' and b.code_type = 'TR' and a.actual_code = b.actual_code`,
        { acct_link }
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }

    // fetch amount  description when draft amount changes
    if (get_amount_in_words === "true") {
      const data = await con.execute(
        `select number_to_currency(:amount, get_iso_code(:currency_code)) as amount_in_words from dual`,
        { currency_code, amount }
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { closeAccountByDraftFunc };
