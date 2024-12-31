const oracledb = require("oracledb");
const config = require("../../config/dbConfig");

async function getAddressesToAmend(req, res) {
  const { CUSTOMER_NUMBER } = req.body;

  try {
    let connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      `SELECT * FROM TB_ADDRESS_TEMP WHERE CUSTOMER_NUMBER = :customerNumber`,
      [CUSTOMER_NUMBER],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
    await connection.close();
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
  //    finally {
  //     if (connection) {
  //       try {
  //         await connection.close();
  //       } catch (closeErr) {
  //         console.error(closeErr);
  //       }
  //     }
  //   }
}

module.exports = { getAddressesToAmend };
