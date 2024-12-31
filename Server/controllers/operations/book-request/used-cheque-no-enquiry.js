const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const UsedChequeNoEnquiry = async (req, res) => {
  const { fetch_data, cheque_no, acct_link } = req.body;
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
      determinant += `WHERE acct_link like '%${acct_link}%'`;
    } else {
      determinant += "";
    }

    if (cheque_no) {
      determinant += `AND cheque_number like '%${cheque_no}%'`;
    } else {
      determinant += "";
    }

    // fetch used cheque book number enquiry
    if (fetch_data === "true") {
      const data = await con.execute(`SELECT * FROM cheque_details ${determinant}`);

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

    // fetch cheque book enquiry issuance
    if (issuance_data === "true") {
      const data = await con.execute(
        `select a.*, get_branchdesc(a.branch_code) as branch_desc from CHEQUE_ISSUANCE_VIEW a WHERE a.REQUISITION_DATE BETWEEN NVL(:start_date,'01-JAN-1900') AND NVL(:end_date,GET_POSTINGDATE) ${determinant}`,
        { start_date, end_date }
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
    // fetch cheque book enquiry cheque number enquiry
    if (cheque_number_enquiry_data === "true") {
      const data = await con.execute(
        `select a.*, get_branchdesc(a.branch_code) as branch_desc from CHEQUE_ISSUANCE_VIEW a WHERE 
        a.REQUISITION_DATE BETWEEN NVL(:start_date,'01-JAN-1900') AND NVL(:end_date,GET_POSTINGDATE) ${determinant2}`,
        { start_date, end_date }
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

    // lov for branch
    if (get_branch_lov === "true") {
      const data = await con.execute(
        `SELECT BR_CODE,BR_DESCRIPTION FROM TB_BRANCH ORDER BY BR_CODE`
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
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { UsedChequeNoEnquiry };
