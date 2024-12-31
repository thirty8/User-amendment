const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

exports.getAddressByRelationNo = async (req, res) => {
  const { relationNo } = req.body;

  if (!relationNo) {
    return res.status(400).json({ message: "RELATION_NO is required in the request body." });
  }

  const sqlQuery = `
    SELECT * FROM TB_ADDRESS_TEMP 
    WHERE RELATION_NO = :relationNo
  `;

  let connection;

  try {
    connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      sqlQuery,
      { relationNo }, // Bind the relationNo to the query
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return results as JSON objects
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "No data found for the provided RELATION_NO." });
    } else {
      res.json(result.rows); // Return the rows found
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Server error");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle DB connection:", err);
      }
    }
  }
};
