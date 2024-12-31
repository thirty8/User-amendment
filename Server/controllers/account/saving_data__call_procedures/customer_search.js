const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

exports.searchCustomer = async (req, res) => {
  const { searchQuery } = req.query;

  // Use wildcard search term or default to '%'
  const searchTerm = searchQuery ? `%${searchQuery}%` : "%";

  const sqlQuery = `
    SELECT * FROM tb_relation 
    WHERE CUSTOMER_NUMBER LIKE :searchTerm 
    OR FIRST_NAME LIKE :searchTerm 
    OR SURNAME LIKE :searchTerm 
    OR MOBILE1 LIKE :searchTerm

    UNION

    SELECT * FROM tb_relation_temp
    WHERE CUSTOMER_NUMBER LIKE :searchTerm 
    OR FIRST_NAME LIKE :searchTerm 
    OR SURNAME LIKE :searchTerm 
    OR MOBILE1 LIKE :searchTerm
  `;

  let connection;

  try {
    connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      sqlQuery,
      { searchTerm }, // Bind the search term
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return results as JSON objects
    );

    res.json(result.rows);
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
