const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const ChequeBookListing = async (req, res) => {
  const { fetch_data, fetch_used_cheque_data, fetch_stopped_cheque_data, acct_link } = req.body;
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
      determinant += `WHERE ACCT_LINK = '${acct_link}'`;
    } else {
      determinant += "";
    }
    // fetch data for listing enquiry
    if (fetch_data === "true") {
      const data = await con.execute(
        `select requisition_no, acct_link,requisition_date, leaves_no,start_no, end_page, number_of_books,branch, status, posted_by from vw_cheque_listing ${determinant} `
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

    // fetch used cheque book listing
    if (fetch_used_cheque_data === "true") {
      const data = await con.execute(
        `select acct_link, cheque_number, trans_no, date_presented from vw_used_cheques ${determinant} `
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

    // fetch stopped cheque listing
    if (fetch_stopped_cheque_data === "true") {
      const data = await con.execute(
        `select acct_link, cheque_no, date_stopped, amount, branch_used from vw_stopped_cheques ${determinant} `
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

module.exports = { ChequeBookListing };
