const oracledb = require('oracledb');

const getMultipleValidation = async (req, res) => {
  let db;
  try {
    const { dynamicNumber } = req.body;

    if (!dynamicNumber) {
      return res.status(400).json({ message: "Dynamic number is required." });
    }

    db = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });

    const countQuery = `
      SELECT COUNT(*) AS userCount
      FROM vw_relation_all
      WHERE NIN = :dynamicNumber
    `;
    const countResult = await db.execute(countQuery, { dynamicNumber });

    const userCount = countResult.rows[0][0];

    if (userCount > 0) {
      const userDataQuery = `
        SELECT *
        FROM vw_relation_all
        WHERE NIN = :dynamicNumber
      `;
      const userDataResult = await db.execute(userDataQuery, { dynamicNumber });

      const userData = userDataResult.rows[0];
      const userDataObject = {};

      // Map userData to userDataObject
      userDataResult.metaData.forEach((column, i) => {
        userDataObject[column.name.toLowerCase()] = userData[i];
      });

      return res.json({ userExists: true, userData: [userDataObject] });
    } else {
      return res.json({ userExists: false, userData: [] });
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (db) {
      await db.close();
    }
  }
};

module.exports = {
  getMultipleValidation,
};
