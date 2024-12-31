const oracledb = require("oracledb");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
};

const fs = require('fs');
const path = require('path');

const logToFile = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type}] ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}\n`;
    const logDir = path.join(__dirname, '../../../logs');
    const logFile = path.join(logDir, 'relation_amendment.log');

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logFile, logMessage);
}

const amendRelation = async (req, res) => {
    const startTime = new Date();
    const { customerNo, rel, bra, postingDate, username, hostname, lastName, surname, firstName, gender, mobile1, placeOfBirth, emailAddress, domicileCountry, residenceCountry, nationality, consolidatedStatement, constitutionalCode, residentialAddress, aliasName, title, suffix, dateOfBirth, residenceStatus, idType, idNumber, idIssueDate, idIssuedAt, idExpiryDate, tin, idIssuedAuthority, templateId, nin, ninExpiryDate, maritalStatus, mothersFname, mothersMiName, mothersMaName, nextOfKin, nextOfKinAddress, nextOfKinPhone, qualification, natureOfWork, preferredAtmLang, preferredPhoneLang, numberOfCars, numberOfDependents } = req.body;

    let connection;
    try {
        logToFile(`Starting relation amendment process for customer: ${customerNo}`);
        
        connection = await oracledb.getConnection(config);
        logToFile('Database connection established successfully');

        const procedureCall = `
            BEGIN
                CBXDMX.PKG_STATIC_DATA_AMENTMENT_RT.PRC_AMEND_RELATION(
                    :customerNo,
                    :rel,
                    :bra,
                    TO_DATE(:postingDate, 'DD-MON-YYYY'),
                    :username,
                    :hostname,
                    :lastName,
                    :surname,
                    :firstName,
                    :gender,
                    :mobile1,
                    :placeOfBirth,
                    :emailAddress,
                    :domicileCountry,
                    :residenceCountry,
                    :nationality,
                    :consolidatedStatement,
                    :constitutionalCode,
                    :residentialAddress,
                    :aliasName,
                    :title,
                    :suffix,
                    TO_DATE(:dateOfBirth, 'DD-MON-YYYY'),
                    :residenceStatus,
                    :idType,
                    :idNumber,
                    TO_DATE(:idIssueDate, 'DD-MON-YYYY'),
                    :idIssuedAt,
                    TO_DATE(:idExpiryDate, 'DD-MON-YYYY'),
                    :tin,
                    :idIssuedAuthority,
                    :templateId,
                    :nin,
                    TO_DATE(:ninExpiryDate, 'DD-MON-YYYY'),
                    :maritalStatus,
                    :mothersFname,
                    :mothersMiName,
                    :mothersMaName,
                    :nextOfKin,
                    :nextOfKinAddress,
                    :nextOfKinPhone,
                    :qualification,
                    :natureOfWork,
                    :preferredAtmLang,
                    :preferredPhoneLang,
                    :numberOfCars,
                    :numberOfDependents
                );
            END;
        `;

        const binds = {
            customerNo,
            rel,
            bra,
            postingDate,
            username,
            hostname,
            lastName,
            surname,
            firstName,
            gender,
            mobile1,
            placeOfBirth,
            emailAddress,
            domicileCountry,
            residenceCountry,
            nationality,
            consolidatedStatement,
            constitutionalCode,
            residentialAddress,
            aliasName,
            title,
            suffix,
            dateOfBirth,
            residenceStatus,
            idType,
            idNumber,
            idIssueDate,
            idIssuedAt,
            idExpiryDate,
            tin,
            idIssuedAuthority,
            templateId,
            nin,
            ninExpiryDate,
            maritalStatus,
            mothersFname,
            mothersMiName,
            mothersMaName,
            nextOfKin,
            nextOfKinAddress,
            nextOfKinPhone,
            qualification,
            natureOfWork,
            preferredAtmLang,
            preferredPhoneLang,
            numberOfCars,
            numberOfDependents
        };

        logToFile({
            message: 'Executing stored procedure with parameters',
            data: {
                customerNo,
                rel,
                bra,
                postingDate,
                username,
                time: new Date().toISOString()
            }
        });

        await connection.execute(procedureCall, binds, { autoCommit: true });
        logToFile('Stored procedure executed successfully');

        const endTime = new Date();
        const executionTime = endTime - startTime;

        const successResponse = {
            message: 'Relation amended successfully',
            relationNo: rel,
            executionTime: `${executionTime}ms`,
            timestamp: new Date().toISOString()
        };
        logToFile({
            message: 'Success response sent',
            data: successResponse
        });
        res.status(200).json(successResponse);

    } catch (error) {
        const endTime = new Date();
        const executionTime = endTime - startTime;
        
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            code: error.code,
            errorNum: error.errorNum,
            offset: error.offset,
            executionTime: `${executionTime}ms`,
            timestamp: new Date().toISOString()
        };
        
        logToFile({
            message: 'Error occurred during relation amendment',
            error: errorDetails
        }, 'error');
        
        const errorResponse = { 
            error: 'Internal Server Error', 
            details: error.message,
            executionTime: `${executionTime}ms`,
            timestamp: new Date().toISOString()
        };
        logToFile({
            message: 'Error response sent',
            data: errorResponse
        }, 'error');
        
        res.status(500).json(errorResponse);

    } finally {
        if (connection) {
            try {
                await connection.close();
                logToFile('Database connection closed successfully');
            } catch (closeError) {
                logToFile({
                    message: 'Error closing database connection',
                    error: {
                        message: closeError.message,
                        stack: closeError.stack
                    }
                }, 'error');
            }
        }
    }
};

module.exports = {
    amendRelation,
};
