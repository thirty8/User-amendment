// controllers/customerController.js
const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

const getCustomerDetailsController = async (req, res) => {
  const { customerNumber } = req.body; // Get customerNumber from the request body

  const query = `
    SELECT 
     CUSTOMER_NUMBER, 
CUSTOMER_NAME, 
C_TYPE,
TYPE_OF_CUSTOMER,
DECEASED,
PHONE1,
WHEREABOUTS_UNKNOWN,
AR_AP_TRACKING,
SECTOR, 
SUB_SECTOR, 
SUB_SEGMENT, 
SEGMENT,
SWIFT_CODE, 
MT920, 
MT940 
    FROM CUSTOMER 
    WHERE CUSTOMER_NUMBER = :customerNumber
  `;

  let connection;

  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(query, [customerNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customerData = result.rows[0];
    const response = {
      CUSTOMER_NUMBER: customerData[0],
      CUSTOMER_NAME: customerData[1],
      C_TYPE: customerData[2],
      TYPE_OF_CUSTOMER: customerData[3],
      DECEASED: customerData[4],
      PHONE1: customerData[5],
      WHEREABOUTS_UNKNOWN: customerData[6],
      AR_AP_TRACKING: customerData[7],
      SECTOR: customerData[8],
      SUB_SECTOR: customerData[9],
      SUB_SEGMENT: customerData[10],
      SEGMENT: customerData[11],
      SWIFT_CODE: customerData[12],
      MT920: customerData[13],
      MT940: customerData[14],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Database query error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

module.exports = { getCustomerDetailsController };



// controllers/customerController.js
// const oracledb = require("oracledb");

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   connectString: process.env.DB_CONNECTION_STRING,
// };

// const getCustomerDetailsController = async (req, res) => {
//   const { searchText } = req.body; // Use 'searchText' to search by customer number or name

//   // Modify the query to search for a partial match in CUSTOMER_NUMBER or CUSTOMER_NAME
//   const query = `
//     SELECT 
//       CUSTOMER_NUMBER, 
//       CUSTOMER_NAME, 
//       C_TYPE,
//       TYPE_OF_CUSTOMER,
//       DECEASED,
//       PHONE1,
//       WHEREABOUTS_UNKNOWN,
//       AR_AP_TRACKING,
//       SECTOR, 
//       SUB_SECTOR, 
//       SUB_SEGMENT, 
//       SEGMENT,
//       SWIFT_CODE, 
//       MT920, 
//       MT940 
//     FROM CUSTOMER 
//     WHERE CUSTOMER_NUMBER LIKE :searchText OR CUSTOMER_NAME LIKE :searchText
//   `;

//   let connection;

//   try {
//     connection = await oracledb.getConnection(config);
//     const result = await connection.execute(query, [`%${searchText}%`]); // Add wildcards for partial match

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "No matching customers found" });
//     }

//     // Map the rows to objects
//     const customers = result.rows.map(row => ({
//       CUSTOMER_NUMBER: row[0],
//       CUSTOMER_NAME: row[1],
//       C_TYPE: row[2],
//       TYPE_OF_CUSTOMER: row[3],
//       DECEASED: row[4],
//       PHONE1: row[5],
//       WHEREABOUTS_UNKNOWN: row[6],
//       AR_AP_TRACKING: row[7],
//       SECTOR: row[8],
//       SUB_SECTOR: row[9],
//       SUB_SEGMENT: row[10],
//       SEGMENT: row[11],
//       SWIFT_CODE: row[12],
//       MT920: row[13],
//       MT940: row[14],
//     }));

//     res.status(200).json(customers);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Database query error" });
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error("Error closing connection:", err);
//       }
//     }
//   }
// };

// module.exports = { getCustomerDetailsController };
