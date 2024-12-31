const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

const getRelationNo = async (req, res) => {
  const { customer_number } = req.body; // Accessing the customer_number from the POST body

  if (!customer_number) {
    return res.status(400).json({ error: "Customer number is required" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT RELATION_NO FROM TB_RELATION WHERE CUSTOMER_NUMBER = :customer_number`,
      [customer_number], // Bind customer_number to the query
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return rows as objects
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const relationData = result.rows[0];

    res.json(relationData);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

module.exports = { getRelationNo };
