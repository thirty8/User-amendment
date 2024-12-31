const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Function to get all relation data based on relation_no using POST request
exports.getRelationData = async (req, res) => {
  const relation_no = req.body.relation_no; // Get relation_no from the request body
  let connection;

  if (!relation_no) {
    return res.status(400).json({ message: "relation_no is required in the request body" });
  }

  try {
    // Establish a connection
    connection = await oracledb.getConnection(config);

    // Execute multiple queries to fetch data
    const relationTempQuery = `SELECT * FROM TB_RELATION WHERE RELATION_NO = :relation_no`;
    const custRelationLinkTempQuery = `SELECT * FROM TB_CUSTRELATION_LINK_TEMP WHERE RELATION_NO = :relation_no`;
    const addressTempQuery = `SELECT * FROM TB_ADDRESS_TEMP WHERE RELATION_NO = :relation_no`;
    const estatementTempQuery = `SELECT * FROM TB_ESTATEMENT_TEMP WHERE RELATION_NO = :relation_no`;
    const atmServiceTempQuery = `SELECT * FROM TB_ATMSERVICE_TEMP WHERE RELATION_NO = :relation_no`;
    const eServicesTempQuery = `SELECT * FROM TB_ESERVICES_TEMP WHERE RELATION_NO = :relation_no`;

    // Execute each query using `execute` and bind the relation_no parameter
    const relationTemp = await connection.execute(relationTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const custRelationLinkTemp = await connection.execute(custRelationLinkTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const addressTemp = await connection.execute(addressTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const estatementTemp = await connection.execute(estatementTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const atmServiceTemp = await connection.execute(atmServiceTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const eServicesTemp = await connection.execute(eServicesTempQuery, [relation_no], { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // Construct the result object
    const result = {
      relationData: relationTemp.rows,        // Accessing rows from the result
      custRelationLinkData: custRelationLinkTemp.rows,
      addressData: addressTemp.rows,
      estatementData: estatementTemp.rows,
      atmServiceData: atmServiceTemp.rows,
      eServicesData: eServicesTemp.rows,
    };

    // Send response
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching relation data:', error);
    res.status(500).json({ message: 'Internal server error', error });
  } finally {
    // Close the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
};
