// controllers/relationController.js
const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

exports.deleteCustRelation = async (req, res) => {
    const { relationNo, customerNumber } = req.body;

    if (!relationNo || !customerNumber) {
        return res.status(400).json({ error: 'Relation No and Customer Number are required' });
    }

    try {
        const connection = await oracledb.getConnection(config);
        const result = await connection.execute(
            `BEGIN 
                PKG_CASA_ACT_create_RT_V1.PRC_DELETE_CUSTRELATION_LINK_TEMP(:relationNo, :customerNumber); 
            END;`,
            {
                relationNo: relationNo,
                customerNumber: customerNumber
            }
        );

        await connection.commit();
        res.status(200).json({ message: 'Relation deleted successfully', result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting relation' });
    }
};
