// const oracledb = require('oracledb');
// const config = require('../../config/dbConfig');


// async function account_rejection (req, res) {
//   try {
//     const { customerNumber, approvalStatus } = req.body;

//     // Get a connection to the Oracle database
//     const connection = await oracledb.getConnection(config);

//     // Call the stored procedure
//     await connection.execute(
//       `BEGIN PRC_ACCT_REJECTION(:customerNumber, :approvalStatus); END;`,
//       {
//         customerNumber: { dir: oracledb.BIND_IN, val: customerNumber },
//         approvalStatus: { dir: oracledb.BIND_IN, val: approvalStatus }
//       }
//     );

//     // Commit the transaction
//     await connection.commit();

//     // Release the connection
//     await connection.close();

//     res.status(200).json({ message: 'Procedure executed successfully.' });
//   } catch (error) {
//     console.error('Error executing procedure:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// module.exports = {
//     account_rejection
// };



const oracledb = require('oracledb');
const config = require('../../config/dbConfig');


async function account_rejection (req, res) {
  try {
    const { customerNumber, approvalStatus, rejReason } = req.body;

    // console.log("req.body", customerNumber, approvalStatus)

    // Get a connection to the Oracle database
    const connection = await oracledb.getConnection(config);

    // Call the stored procedure
    await connection.execute(
      `BEGIN CBXDMX.PRC_ACCT_REJECTION(:customerNumber, :approvalStatus, :rejReason); END;`,
      {
        customerNumber: { dir: oracledb.BIND_IN, val: customerNumber },
        approvalStatus: { dir: oracledb.BIND_IN, val: approvalStatus },
        rejReason: { dir: oracledb.BIND_IN, val: rejReason }
      }
    );

    // Commit the transaction
    await connection.commit();

    // Release the connection
    await connection.close();

    res.status(200).json({ message: 'Account rejected successfully.' });
  } catch (error) {
    console.error('Error executing procedure:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


module.exports = {
    account_rejection
};
