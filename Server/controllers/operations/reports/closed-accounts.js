const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// LIST OF ACCOUNTS REPORT
const closedAccountsFunc = async (req, res) => {
  const { start_date, end_date, branch_code, fetch, branch } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    let determinant = "";

    if (start_date || end_date || branch_code) {
      determinant = `branch_code like '%'||'${branch_code}'||'%' and DATE_ACCOUNT_CLOSED between NVL('${start_date}','01-JAN-1900') 
      and NVL('${end_date}','1-DEC-9999')`;
    } else {
      determinant = "";
    }

    console.log({ start_date, end_date, branch_code });
    //   fetch closed account details
    if (fetch === "true") {
      const data = await con.execute(
        `SELECT  ACCT_LINK,PROD_CODE, DESCRIPTION, ACCOUNT_DESCRP, SHADOW_BALANCE_TODAY, 
        DATE_OPENED, STATUS_INDICATOR, BRANCH_CODE, CUSTOMER_NUMBER, TYPE_OF_ACCT, CURRENCY_CODE, ISO_CODE, BRANCH_DESCRP, 
        ARM_CODE, ARM_NAME, C_TYPE,DATE_ACCOUNT_CLOSED, CLOSED_BY,CLOS_APP_BY FROM VW_CLOSE_ACCOUNT_REP WHERE ${determinant} `
      );

      if (data.rows) {
        const response = [];
        const groupedData = {};
        for (let i = 0; i < data.rows.length; i++) {
          const rowData = {}; // Create an object for each row

          for (let x = 0; x < data.metaData.length; x++) {
            const columnName = data.metaData[x].name.toLowerCase();
            const columnValue = data.rows[i][x];
            rowData[columnName] = columnValue; // Assign each column to the object
          }

          response.push(rowData); // Push the object to the response array
        }

        response.forEach((entry) => {
          const itemDescrp = entry.description + " * " + entry.iso_code;
          if (groupedData[itemDescrp]) {
            groupedData[itemDescrp].push(entry);
          } else {
            groupedData[itemDescrp] = [entry];
          }
        });

        const groupedResponse = Object.keys(groupedData).map((key) => ({
          item_descrp: key,
          data: groupedData[key],
        }));
        return res.status(200).send(groupedResponse);
      } else {
        return res
          .status(500)
          .send("Something went wrong... Nothing was returned!!");
      }
    }

    if (branch === "true") {
      const data = await con.execute(
        `select BR_CODE,BR_DESCRIPTION from Tb_branch where br_code like '%'||NVL('${branch_code}','0')||'%' order by br_code ASC`
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
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { closedAccountsFunc };
