const oracledb = require('oracledb');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
  };

// Function to call the Oracle Procedure
async function addSignatory(req, res) {
  let connection;

  try {
    // Extract data from the request body
    const {
      customer_no,
      acct_link,
      relation_no,
      signatory,
      signatory_level,
      posted_by,
      posting_date,
      approved_by,
      approval_date,
      approver_lim,
      approver_state
    } = req.body;

    // Establish the database connection
    connection = await oracledb.getConnection(config);

    // Call the stored procedure
    await connection.execute(
      `BEGIN 
         PKG_CASA_ACT_CREATE_RT_V1.PRC_ADD_SIGNATORIES_TEMP(:customer_no, :acct_link, :relation_no, :signatory, :signatory_level, :posted_by, :posting_date, :approved_by, :approval_date, :approver_lim, :approver_state); 
       END;`,
      {
        customer_no: customer_no,
        acct_link: acct_link,
        relation_no: relation_no,
        signatory: signatory,
        signatory_level: signatory_level,
        posted_by: posted_by,
        posting_date: new Date(posting_date),
        approved_by: approved_by,
        approval_date: new Date(approval_date),
        approver_lim: approver_lim,
        approver_state: approver_state,
      }
    );

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inserting data' });
  } finally {
    // Close the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
    addSignatory,
};
