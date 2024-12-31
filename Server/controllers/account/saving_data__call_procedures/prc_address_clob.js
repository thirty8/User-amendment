const oracledb = require('oracledb');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
  };// Assuming you have a DB config file

// Function to add address data using PRC_ADD_ADDRESS_TEMP procedure
async function addAddressTemp(req, res) {
  let connection;

  try {
    // Extract address data from the request body
    const addressData = req.body.addressData; // Expecting a JSON array as addressData

    if (!addressData) {
      return res.status(400).send({ message: 'Address data is required.' });
    }

    // Convert the address data JSON to a CLOB (string)
    const addressDataClob = JSON.stringify(addressData);

    // Connect to the Oracle database
    connection = await oracledb.getConnection(config);

    // Prepare CLOB input and output parameters
    const bindVars = {
      p_address_data: { val: addressDataClob, type: oracledb.CLOB },
      p_response: { dir: oracledb.BIND_OUT, type: oracledb.CLOB }
    };

    // Call the stored procedure
    const result = await connection.execute(
      `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_ADD_ADDRESS_TEMP(:P_RELATION_NO, :P_CUSTOMER_NO, :p_address_data, :p_response); END;`,
      bindVars
    );

    // Retrieve the response from the procedure
    const response = await result.outBinds.p_response.getData();

    // Return the response to the client
    res.status(200).send({ message: response });

  } catch (error) {
    // Handle any errors
    console.error('Error executing stored procedure:', error);
    res.status(500).send({ message: 'Error processing the request', error: error.message });

  } finally {
    // Ensure the connection is closed
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error closing the connection:', closeError);
      }
    }
  }
}

module.exports = { addAddressTemp };
