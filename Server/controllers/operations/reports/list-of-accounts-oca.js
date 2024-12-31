const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

// LIST OF ACCOUNTS REPORT
const listOfAccountsFunc = async (req, res) => {
  const {
    start_date,
    end_date,
    product_code,
    branch_code,
    fetch,
    branch,
    product,
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

    console.log({ start_date, end_date, branch_code, product_code });
    if (start_date || end_date || branch_code || product_code) {
      determinant = `DATE_OPENED BETWEEN NVL('${start_date}','01-JAN-1900') AND NVL('${end_date}','1-DEC-9999') 
                    AND branch_code like '%'||'${branch_code}'||'%' AND prod_code like '%'||'${product_code}'||'%'`;
    } else {
      determinant = "";
    }

    //   fetch list of account report details
    if (fetch === "true") {
      const data = await con.execute(
        `SELECT DESCRIPTION ,acct_link ,ACCOUNT_DESCRP, NVL(shadow_balance_today,0) balance,date_opened 
            FROM vw_g_ledger_opened WHERE ${determinant} AND type_of_acct != '9' ORDER BY ACCOUNT_DESCRP, date_opened`
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
          const itemDescrp = entry.description;
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
    if (product === "true") {
      const data = await con.execute(
        `SELECT ALL TB_PRODUCT.PROD_CODE, TB_PRODUCT.DESCRIPTION
        FROM TB_PRODUCT WHERE PROD_GROUP LIKE '%'||'${product_code}'||'%'  order by PROD_CODE ASC`
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

module.exports = { listOfAccountsFunc };
