const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

const stakeholderController = async (req, res) => {
  const {
    relation_no,
    cust_no,
    director_status,
    sole_proprietor,
    partner,
    shared_percentage,
    director,
    otherdetails,
    stakeholder_type,
    shareholder
  } = req.body;

  let connection;

  try {
    // Get the database connection
    connection = await oracledb.getConnection(config);

    // Define the PL/SQL procedure call
    const procedureCall = `
      BEGIN
        PKG_CASA_ACT_create_RT_V1.PRC_ADD_STAKEHOLDER(
          :relation_no,
          :cust_no,
          :director_status,
          :sole_proprietor,
          :partner,
          :shared_percentage,
          :director,
          :otherdetails,
          :stakeholder_type,
          :shareholder
        );
      END;
    `;

    // Execute the procedure with binding parameters
    await connection.execute(procedureCall, {
      relation_no,
      cust_no,
      director_status,
      sole_proprietor,
      partner,
      shared_percentage,
      director,
      otherdetails,
      stakeholder_type,
      shareholder
    }, { autoCommit: true });

    // Send a successful response
    res.status(200).json({ message: 'Stakeholder inserted successfully!' });
  } catch (err) {
    console.error('Error inserting stakeholder:', err);
    res.status(500).json({ error: 'Error inserting stakeholder' });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Always close the connection
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
};

module.exports = { stakeholderController };
