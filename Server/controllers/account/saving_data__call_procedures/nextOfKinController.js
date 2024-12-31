const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Add Next of Kin
// Add Next of Kin
exports.addNextOfKin = async (req, res) => {
    const {
        customer_number, next_of_kin, next_of_kin_address, next_of_kin_phone,
        next_of_kin_id_type, next_of_kin_id_no, next_of_kin_id_expdate,
        next_of_kin_relationship, next_of_kin_dob, next_of_kin_percentshare
    } = req.body;

    let connection;
    try {
        // Step 1: Add the Next of Kin
        connection = await oracledb.getConnection(config);
        await connection.execute(
            `BEGIN 
                PKG_CASA_ACT_create_RT_V1.PRC_ADD_NEXT_OF_KIN(
                    :customer_number, :next_of_kin, :next_of_kin_address,
                    :next_of_kin_phone, :next_of_kin_id_type, :next_of_kin_id_no,
                    :next_of_kin_id_expdate, :next_of_kin_relationship, 
                    :next_of_kin_dob, :next_of_kin_percentshare, :p_return_cursor
                ); 
             END;`,
            {
                customer_number,
                next_of_kin,
                next_of_kin_address,
                next_of_kin_phone,
                next_of_kin_id_type,
                next_of_kin_id_no,
                next_of_kin_id_expdate,
                next_of_kin_relationship,
                next_of_kin_dob,
                next_of_kin_percentshare,
                p_return_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Step 2: Retrieve Next of Kin Temp Data after adding
        const tempResult = await connection.execute(
            `SELECT * FROM TB_NEXT_OF_KIN_TEMP WHERE CUSTOMER_NUMBER = :customer_number`,
            { customer_number },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Step 3: Return both success message and the temp data
        res.status(200).json({
            message: 'Next of kin added successfully',
            data: tempResult.rows
        });
    } catch (err) {
        res.status(500).json({ message: 'Error adding next of kin', error: err.message });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

// Edit Next of Kin
exports.editNextOfKin = async (req, res) => {
    const {
        customer_number, next_of_kin, next_of_kin_address, next_of_kin_phone,
        next_of_kin_id_type, next_of_kin_id_no, next_of_kin_id_expdate,
        next_of_kin_relationship, next_of_kin_dob, next_of_kin_percentshare
    } = req.body;

    let connection;
    try {
        connection = await oracledb.getConnection(config);
        await connection.execute(
            `BEGIN 
                PKG_CASA_ACT_create_RT_V1.PRC_EDIT_NEXT_OF_KIN(
                    :customer_number, :next_of_kin, :next_of_kin_address,
                    :next_of_kin_phone, :next_of_kin_id_type, :next_of_kin_id_no,
                    :next_of_kin_id_expdate, :next_of_kin_relationship, 
                    :next_of_kin_dob, :next_of_kin_percentshare
                ); 
             END;`,
            {
                customer_number,
                next_of_kin,
                next_of_kin_address,
                next_of_kin_phone,
                next_of_kin_id_type,
                next_of_kin_id_no,
                next_of_kin_id_expdate,
                next_of_kin_relationship,
                next_of_kin_dob,
                next_of_kin_percentshare
            }
        );

        res.status(200).json({
            message: 'Next of kin updated successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating next of kin', error: err.message });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

// Delete Next of Kin
exports.deleteNextOfKin = async (req, res) => {
    const { customer_number } = req.params;

    let connection;
    try {
        connection = await oracledb.getConnection(config);
        await connection.execute(
            `BEGIN 
                PKG_CASA_ACT_create_RT_V1.PRC_DELETE_NEXT_OF_KIN(:customer_number); 
             END;`,
            { customer_number }
        );

        res.status(200).json({
            message: 'Next of kin deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting next of kin', error: err.message });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};
