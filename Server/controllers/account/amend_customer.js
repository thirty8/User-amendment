const oracledb = require('oracledb');
const config = require('../../config/dbConfig');

async function amendCustomer(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(config);

        const {
            P_BATCH_NO,
            P_CUSTOMER_NUMBER,
            P_CUSTOMER_NAME,
            P_C_TYPE,
            P_TYPE_OF_CUSTOMER,
            P_SEGMENT,
            P_SUB_SEGMENT,
            P_SECTOR,
            P_SUB_SECTOR,
            P_SWIFT_CODE,
            P_DECEASED,
            P_WHEREABOUTS_UNKNOWN,
            P_AR_AP_TRACKING,
            P_MT920,
            P_MT940
        } = req.body;

        const result = await connection.execute(
            `BEGIN
                PKG_STATICAMEND_RT.PRC_CUSTOMER_SAVE_RT(
                    :P_BATCH_NO,
                    :P_CUSTOMER_NUMBER,
                    :P_CUSTOMER_NAME,
                    :P_C_TYPE,
                    :P_TYPE_OF_CUSTOMER,
                    :P_SEGMENT,
                    :P_SUB_SEGMENT,
                    :P_SECTOR,
                    :P_SUB_SECTOR,
                    :P_SWIFT_CODE,
                    :P_DECEASED,
                    :P_WHEREABOUTS_UNKNOWN,
                    :P_AR_AP_TRACKING,
                    :P_MT920,
                    :P_MT940,
                    :P_MESSAGE
                );
            END;`,
            {
                P_BATCH_NO,
                P_CUSTOMER_NUMBER,
                P_CUSTOMER_NAME,
                P_C_TYPE,
                P_TYPE_OF_CUSTOMER,
                P_SEGMENT,
                P_SUB_SEGMENT,
                P_SECTOR,
                P_SUB_SECTOR,
                P_SWIFT_CODE,
                P_DECEASED,
                P_WHEREABOUTS_UNKNOWN,
                P_AR_AP_TRACKING,
                P_MT920,
                P_MT940,
                P_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 500 }
            }
        );

        const P_MESSAGE = result.outBinds.P_MESSAGE;

        await connection.execute(
            `BEGIN
                PKG_STATICAMEND_RT.PRC_DET_LOGGER(
                    :P_BATCH_NO,
                    :P_FORM_NAME,
                    :P_FIELD_ALTERED,
                    :P_OLD_VALUE,
                    :P_NEW_VALUE,
                    :P_ITEM,
                    :P_TAB_NAME,
                    :P_KEY_VAL1,
                    :P_KEY_VAL2,
                    :P_ALTERED_BY,
                    :P_BRANCH_CODE,
                    :P_ALTERATION_TERMINAL,
                    :P_ALTERATION_IP
                );
            END;`,
            {
                P_BATCH_NO: '',
                P_FORM_NAME: 'STATIC AMENDMENT',
                P_FIELD_ALTERED: '',
                P_OLD_VALUE: '',
                P_NEW_VALUE: '',
                P_ITEM: '',
                P_TAB_NAME: '',
                P_KEY_VAL1: '',
                P_KEY_VAL2: null,
                P_ALTERED_BY: 'Godfrey',
                P_BRANCH_CODE: '001',
                P_ALTERATION_TERMINAL: req.ip,
                P_ALTERATION_IP: req.ip
            }
        );

        await connection.commit();

        res.json({ message: P_MESSAGE });
    } catch (err) {
        console.error(err);
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackErr) {
                console.error('Rollback error: ', rollbackErr);
            }
        }
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Close connection error: ', closeErr);
            }
        }
    }
}

module.exports = {
    amendCustomer
};
