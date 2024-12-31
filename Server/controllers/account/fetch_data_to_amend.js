const oracledb = require('oracledb');
const config = require("../../config/dbConfig");

module.exports=getCustomers = async (req, res) => {
  // Debugging: Log the request body
  // console.log('Request body:', req.body);

  const { custNo, custName, branch, dob1, dob2, globalDate } = req.body;

  // Debugging: Log the extracted variables
  // console.log('Extracted variables:', { custNo, custName, branch, dob1, dob2, globalDate });

  try {
    // Establish connection to the Oracle database
    const connection = await oracledb.getConnection(config);

    // SQL query
    const query = `
      SELECT *
      FROM customer
      WHERE APP_FLAG IN ('B', 'A')
        AND Customer_number LIKE '%' || :custNo || '%'
        AND customer_name LIKE '%' || :custName || '%'
        AND branch_code LIKE '%' || :branch || '%'
        AND NVL(DATE_ESTABLISHED, TO_DATE('1-JAN-1900', 'DD-MON-YYYY'))
          BETWEEN NVL(:dob1, TO_DATE('1-JAN-1900', 'DD-MON-YYYY'))
          AND NVL(:dob2, TO_DATE(:globalDate, 'DD-MON-YYYY'))
    `;

    // Bind parameters
    const binds = {
      custNo: custNo || '',
      custName: custName || '',
      branch: branch || '',
      dob1: dob1 || null,
      dob2: dob2 || null,
      globalDate: globalDate || null
    };

    // Debugging: Log the binds object
    // console.log('Binds:', binds);

    // Execute the query
    const result = await connection.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // Close the connection
    await connection.close();

    // Send the results as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error executing query');
  }
};

