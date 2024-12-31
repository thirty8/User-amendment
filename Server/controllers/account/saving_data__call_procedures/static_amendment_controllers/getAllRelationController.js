const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

const getAllRelationController = async (req, res) => {
  const { relation_no } = req.body; // Accessing the customer_number from the POST body

  if (!relation_no) {
    return res.status(400).json({ error: "Customer number is required" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT * FROM TB_RELATION WHERE RELATION_NO = :relation_no`,
      [relation_no], // Bind customer_number to the query
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return rows as objects
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with the array of customer data
    res.json(result.rows);
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

module.exports = { getAllRelationController };
