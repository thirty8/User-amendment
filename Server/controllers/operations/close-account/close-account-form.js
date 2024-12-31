const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// CLOSE ACCOUNT
const closeAccountFunc = async (req, res) => {
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
    get_details,
    code_value,
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
      console.log({
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
      });
      const result = await con.execute(
        `BEGIN CBXDMX.PKG_clsAcct_RT_REF.prc_clsAcct_reqt_RT ( :acct_link , :cls_type, :mandate, : document_no, :transf_acct_v, :currency_code, :naration, :global_bra, :terminal, :username, GET_POSTINGDATE, :frmcode, GET_SESSID, :machine_ip, :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
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

    // check if account numnber is closed, dormant, or has lien
    // new requirement that chris wants. acc should be closed at any branch
    if (acct_link_validation === "true") {
      const myArray = [];
      const result = await con.execute(
        `BEGIN CBXDMX.PRC_ACCOUNT_CLOSURE_NUM ( :acct_link , :global_bra, :RESPONSE_CODE,:RESPONSE_MESS); END;`,
        {
          acct_link,
          global_bra,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: {
            dir: oracledb.BIND_OUT,
            type: oracledb.STRING,
            maxSize: 10000,
          },
        }
      );

      const response_code = result.outBinds?.RESPONSE_CODE;
      const response_mess = result.outBinds?.RESPONSE_MESS;
      if (response_code === "000") {
        myArray.push({
          RESPONSE_CODE: response_code,
          RESPONSE_MESS: response_mess,
        });

        return res.status(200).send(myArray);
      } else if (response_code === "100") {
        const response_mess2 = response_mess?.split("*");
        myArray.push({
          RESPONSE_CODE: response_code,
          RESPONSE_MESS: [
            {
              lien_v: response_mess2[0]?.trim(),
              pending_trans_v: response_mess2[1]?.trim(),
              fixed_deposit_v: response_mess2[2]?.trim(),
              loan_v: response_mess2[3]?.trim(),
              internet_banking_v: response_mess2[4]?.trim(),
              activated_atm_v: response_mess2[5]?.trim(),
              standing_order_v: response_mess2[6]?.trim(),
              uncleared_bal_v: response_mess2[7]?.trim(),
            },
          ],
        });
        return res.status(200).send(myArray);
      }
      if (response_code === "999") {
        myArray.push({
          RESPONSE_CODE: response_code,
          RESPONSE_MESS: response_mess,
        });

        return res.status(200).send(myArray);
      } else {
        myArray.push({ RESPONSE_MESS: response_mess });
        return res.status(200).send(myArray);
      }
    }

    // fetching details when view button is clicked
    if (get_details === "true") {
      const response = [];
      if (code_value === "06116") {
        const data = await con.execute(
          `select acct_link as account_number, db_amt as debit_amount, get_branchdesc(branch_code) as branch, posted_by, narration
          from vw_close_lien where acct_link=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06117") {
        const data = await con.execute(
          `select acct_link as account_number, db_amt as debit_amount, get_branchdesc(branch_code) as branch, posted_by, narration from vw_close_temp where acct_link=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06118") {
        const data = await con.execute(
          `select deal_no as deal_number, principal_account, deal_amount,tenor, effective_date, maturity_date from treasury where RETIREMENT_DATE is null and PRINCIPAL_CONTRA=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06119") {
        const data = await con.execute(
          `select facility_no as facility_number, principal_account, current_balance,get_iso_code(currency_code) as iso_code, effective_date, expiry_date from vw_valid_loans where REPAYMENT_ACCOUNT=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06120") {
        const data = await con.execute(
          `select acct_link as account_number,c_type as customer_type,  posting_date, posted_by, get_branchdesc(branch_code) as branch from intb_requisition where ACCT_LINK=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06121") {
        const data = await con.execute(
          `select rec_id as request_id, acct_link as account_number, card_status, get_branchdesc(branch_code) as branch, 
          posted_by from pan_account where CARD_STATUS ='A' and ACCT_LINK=:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else if (code_value === "06122") {
        const data = await con.execute(
          `select order_number, acct_link as account_number, due_amount, first_payment_date, last_payment_date, termination_date from standing_order where ORDER_STATUS not in ('E','C') and ACCT_LINK =:acct_link`,
          { acct_link }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response.push(rowData); // Push the object to the response array
          }
        } else {
          return res.status(500).send("Something went wrong... Nothing was returned!!");
        }
      } else {
        return res.status(500).send("no data found");
      }
      return res.status(200).send(response);
    }

    // getting transfer account when cash is selected
    if (choosenType) {
      const data = await con.execute(
        `SELECT closure_contra , GET_ACCTDESC(closure_contra) AS account_desc FROM tb_closure_type
          WHERE currency_code = get_currcode(:iso_code)`,
        { iso_code }
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

    // getting transfer account when account is selected
    if (transferAcc === "true") {
      const data = await con.execute(
        `select ACCOUNT_DESCRP,currency_code from g_ledger 
        where acct_link= :transf_acct_v  
        and status_indicator not in ('DO','CLOS','CR','BO')`,
        { transf_acct_v }
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

module.exports = { closeAccountFunc };
