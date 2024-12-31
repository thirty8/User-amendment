const oracledb = require('oracledb');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
  };

// Controller to handle the PRC_CUSTRELATION_LINK_TEMP procedure
exports.linkTempRelation = async (req, res) => {
  let connection;

  try {
    // Get parameters from req.body without destructuring
    const relationNo = req.body.relationNo;
    const custNo = req.body.custNo;
    const flag = req.body.flag;
    const postingBranch = req.body.postingBranch;
    const postedBy = req.body.postedBy;
    const postingDate = req.body.postingDate; // Expecting 'YYYY-MM-DD' format
    const postingSysdate = req.body.postingSysdate;
    const postingTerminal = req.body.postingTerminal;

    // Open the Oracle database connection
    connection = await oracledb.getConnection(config);

    // Bind parameters for the procedure
    const binds = {
      P_RELATION_NO: relationNo,
      P_CUST_NO: custNo,
      P_FLAG: flag,
      P_POSTING_BRANCH: postingBranch,
      P_POSTED_BY: postedBy,
      P_POSTING_DATE: new Date(postingDate), // Convert string date to Date object for Oracle
      P_POSTING_SYSDATE: postingSysdate, // VARCHAR2 field
      P_POSTING_TERMINAL: postingTerminal,
      api_status: { type: oracledb.STRING, dir: oracledb.BIND_OUT }, // OUT status ('Y' or 'N')
      api_msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT } // OUT message
    };

    // Execute the stored procedure
    await connection.execute(
      `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_CUSTRELATION_LINK_TEMP(
        :P_RELATION_NO, :P_CUST_NO, :P_FLAG, :P_POSTING_BRANCH,
        :P_POSTED_BY, :P_POSTING_DATE, :P_POSTING_SYSDATE, :P_POSTING_TERMINAL,
        :api_status, :api_msg
      ); END;`,
      binds,
      { autoCommit: true }
    );

    // Send success response with output parameters
    res.status(200).json({
      status: binds.api_status,
      message: binds.api_msg
    });
  } catch (err) {
    // Handle errors
    console.error('Error executing procedure:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Close the connection
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
};
