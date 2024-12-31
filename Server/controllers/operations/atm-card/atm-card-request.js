const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const ATMCardRequest = async (req, res) => {
  const {
    acct_link,
    atm_lov,
    branch_lov,
    batch_no,
    fetch,
    get_fees,
    delete_batch,
    branch,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    //   fetch fee transaction
    if (get_fees === "true") {
      const response = [];

      const data = await con.execute(
        `select * from vw_fee_transactions where batch_no = :batch_no and CREDIT_AMOUNT is not null
        and acct_link not in (select position_ac from tb_curr_acct)`,
        { batch_no }
      );

      if (data.rows) {
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

    // delete fees
    if (delete_batch === "true") {
      const data = await con.execute(
        `DELETE FROM AC_POST_TEMP WHERE BATCH_NO = :batch_no`,
        { batch_no }
      );
      if (data) {
        return res
          .status(200)
          .send([{ mess_code: "1", mess: "successfully deleted" }]);
      }
    }

    // validations
    if (fetch === "true" && acct_link) {
      const response = [];

      const data = await con.execute(
        `SELECT COUNT(ACCT_LINK) as count FROM ATM_requisition_temp
          WHERE ACCT_LINK=:acct_link`,
        { acct_link }
      );

      const data2 = await con.execute(
        `select accts, account_descrp from g_ledger_vw 
        where accts = :acct_link and STATUS_INDICATOR NOT IN ('DO','DR','CLOS')
        AND type_of_acct in ('1','2')`,
        { acct_link }
      );

      if (data.rows) {
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }

      if (data2.rows) {
        for (let i = 0; i < data2.rows.length; i++) {
          const rowData = {}; // Create an object for each row

          for (let x = 0; x < data2.metaData.length; x++) {
            const columnName = data2.metaData[x].name.toLowerCase();
            const columnValue = data2.rows[i][x];
            rowData[columnName] = columnValue; // Assign each column to the object
          }

          response.push(rowData); // Push the object to the response array
        }
      } else {
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }

      return res.status(200).send(response);
    }

    if (atm_lov === "true") {
      const data = await con.execute(
        `select actual_code, description from code_desc where code_type = 'ATM'`
      );
      // where actual_code = '03'

      // return res.send(data);

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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }

    if (branch_lov === "true") {
      const data = await con.execute(
        `select br_code,br_description from tb_branch order by br_code asc`
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
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    } else {
      return res
        .status(500)
        .send("Something went wrong... Nothing was returned!!");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { ATMCardRequest };
