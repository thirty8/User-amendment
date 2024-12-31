const oracledb = require('oracledb');

// Oracle DB connection details
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function addEServicesRel(req, res) {
  let connection;

  try {
    // Define each variable explicitly from the request body
    const P_RELATION_NO = req.body.P_RELATION_NO;
    const P_CUSTOMER_NO = req.body.P_CUSTOMER_NO;
    const P_ACCT_LINK = req.body.P_ACCT_LINK;
    const P_SMS_ALERT = req.body.P_SMS_ALERT;
    const P_EMAIL_ALERT = req.body.P_EMAIL_ALERT;
    const P_E_STATEMENT = req.body.P_E_STATEMENT;
    const P_INTERNET_BANKING = req.body.P_INTERNET_BANKING;
    const P_MOBILE_BANKING = req.body.P_MOBILE_BANKING;
    const P_ATM_SERVICES = req.body.P_ATM_SERVICES;
    
    // Convert array of objects to a JSON string for the CLOB field
    const P_ATM_SERVICES_CLOB = JSON.stringify(req.body.P_ATM_SERVICES_CLOB);
    
    // New fields
    const P_STATEMENT_FREQ = req.body.P_STATEMENT_FREQ;
    const P_CARD_TYPE = req.body.P_CARD_TYPE;

    const P_SERVICE_CODE = req.body.P_SERVICE_CODE;
    const P_DAILY = req.body.P_DAILY;
    const P_WEEKLY = req.body.P_WEEKLY;
    const P_MONTHLY = req.body.P_MONTHLY;
    const P_QUARTERLY = req.body.P_QUARTERLY;
    const P_STATE_DATE = req.body.P_STATE_DATE;
    const P_END_DATE = req.body.P_END_DATE;
    const P_CUST_NO = req.body.P_CUST_NO;

    // Initialize Oracle DB connection
    connection = await oracledb.getConnection(config);

    // Execute the stored procedure
    const result = await connection.execute(
      `
      BEGIN
        PKG_CASA_ACT_create_RT_V1.PRC_ADD_ESERVICES_REL(
          :P_RELATION_NO,
          :P_CUSTOMER_NO,
          :P_ACCT_LINK,
          :P_SMS_ALERT,
          :P_EMAIL_ALERT,
          :P_E_STATEMENT,
          :P_INTERNET_BANKING,
          :P_MOBILE_BANKING,
          :P_ATM_SERVICES,
          :P_ATM_SERVICES_CLOB,
          :P_SERVICE_CODE,
          :P_STATEMENT_FREQ,
          :P_CARD_TYPE,
          :P_DAILY,
          :P_WEEKLY,
          :P_MONTHLY,
          :P_QUARTERLY,
          :P_STATE_DATE,
          :P_END_DATE,
          :P_CUST_NO,
          :P_API_STATUS,
          :P_API_MSG
        );
      END;
      `,
      {
        P_RELATION_NO,
        P_CUSTOMER_NO,
        P_ACCT_LINK,
        P_SMS_ALERT,
        P_EMAIL_ALERT,
        P_E_STATEMENT,
        P_INTERNET_BANKING,
        P_MOBILE_BANKING,
        P_ATM_SERVICES,
        P_ATM_SERVICES_CLOB: { val: P_ATM_SERVICES_CLOB, type: oracledb.CLOB }, // Bind as CLOB
        P_SERVICE_CODE,
        P_STATEMENT_FREQ,
        P_CARD_TYPE,
        P_DAILY,
        P_WEEKLY,
        P_MONTHLY,
        P_QUARTERLY,
        P_STATE_DATE,
        P_END_DATE,
        P_CUST_NO,
        P_API_STATUS: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        P_API_MSG: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
    );

    // Commit the transaction
    await connection.commit();

    // Release the connection
    await connection.close();

    // Send response
    res.status(200).json({
      apiStatus: result.outBinds.P_API_STATUS,
      apiMessage: result.outBinds.P_API_MSG,
    });
  } catch (error) {
    console.error('Error executing addEServicesRel:', error);

    // Ensure connection is closed in case of error
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addEServicesRel,
};
