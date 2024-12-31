// const oracledb = require('oracledb');

// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     connectString: process.env.DB_CONNECTION_STRING,
// };

// // Function to delete relation
// const deleteRelation = async (req, res) => {
//     const { relationNumber } = req.params; // Assuming you pass the relation number as a URL parameter

//     let connection;

//     try {
//         // Connect to the database
//         connection = await oracledb.getConnection(config);

//         // Prepare the output variables for the stored procedure
//         let api_status = { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1 };
//         let api_msg = { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 200 };

//         // Execute the stored procedure to delete from PRC_DELETE_RELATION_TEMP
//         const result = await connection.execute(
//             `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_DELETE_RELATION_TEMP(:rel_no_v, :cust_no_v, :api_status, :api_msg); END;`,
//             {
//                 rel_no_v: relationNumber,
//                 cust_no_v: customerNumber,
//                 api_status: api_status,
//                 api_msg: api_msg
//             }
//         );

//         // Get the output values
//         const status = result.outBinds.api_status;
//         const message = result.outBinds.api_msg;

//         // Check the status from the stored procedure
//         if (status === 'Y') {
//             // Data found and deleted in PRC_DELETE_RELATION_TEMP
//             return res.status(200).json({ success: true, message });
//         } else {
//             // Data was not found in PRC_DELETE_RELATION_TEMP, now checking TB_CUSTRELATION_LINK_TEMP
//             const resultLinkTemp = await connection.execute(
//                 `SELECT 1 FROM CBXDMX.TB_CUSTRELATION_LINK_TEMP WHERE RELATION_NO = :relationNumber`,
//                 { relationNumber }
//             );

//             if (resultLinkTemp.rows.length > 0) {
//                 // If data is found in TB_CUSTRELATION_LINK_TEMP, delete it
//                 await connection.execute(
//                     `DELETE FROM CBXDMX.TB_CUSTRELATION_LINK_TEMP WHERE RELATION_NO = :relationNumber`,
//                     { relationNumber }
//                 );

//                 // Commit the transaction
//                 await connection.commit();

//                 return res.status(200).json({ success: true, message: 'Relation deleted from TB_CUSTRELATION_LINK_TEMP.' });
//             } else {
//                 // Data not found in either PRC_DELETE_RELATION_TEMP or TB_CUSTRELATION_LINK_TEMP
//                 return res.status(404).json({ success: false, message: 'Relation not found in either table.' });
//             }
//         }
//     } catch (err) {
//         console.error('Error executing stored procedure or deleting relation', err);
//         return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
//     } finally {
//         // Ensure the connection is released
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error('Error closing connection', err);
//             }
//         }
//     }
// };

// module.exports = {
//     deleteRelation
// };




const oracledb = require('oracledb');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
};


// Controller function to delete relation records
async function deleteRelation(req, res) {
  const { relationNo, customerNo } = req.body;

  if (!relationNo || !customerNo) {
    return res.status(400).json({
      status: 'N',
      message: 'Relation Number and Customer Number are required'
    });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(config);

    // Define the output parameters
    let result = await connection.execute(
      `
      BEGIN
        PKG_CASA_ACT_create_RT_V1.PRC_DELETE_RELATION_TEMP(:rel_no_v, :cust_no_v, :api_status, :api_msg);
      END;
      `,
      {
        rel_no_v: relationNo,
        cust_no_v: customerNo,
        api_status: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        api_msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );

    // Handle success response
    return res.status(200).json({
      status: result.outBinds.api_status,
      message: result.outBinds.api_msg
    });

  } catch (error) {
    console.error('Error deleting relation:', error);
    return res.status(500).json({
      status: 'N',
      message: 'Internal Server Error'
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing the connection:', closeErr);
      }
    }
  }
}

module.exports = { deleteRelation };
