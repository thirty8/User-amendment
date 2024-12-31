// controllers/customerController.js
const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};


const getCustomerController = async (req, res) => {
  const customer_number = req.params.customer_number;

  let connection;
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT CUSTOMER_NUMBER, CUSTOMER_NAME, C_TYPE, PHONE1, SECTOR,
       SUB_SECTOR, ARM_CODE, CUSTOMER_CODE
       FROM CUSTOMER 
       WHERE CUSTOMER_NUMBER = :customer_number`,
      [customer_number], // Bind parameters
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return results as objects
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // if (connection) {
    //   try {
    //     await connection.close();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  }
};

module.exports = { getCustomerController };
