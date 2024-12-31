const oracledb = require("oracledb");
const errorHandler = require("../../../utils/errorHandler"); // Adjust the path as necessary

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function executeStoredProcedure(req, res, next) {
  let connection;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(config);

    // Define the parameters for the first stored procedure
    const addRelationBindParams = {
      title_v: req.body.title_v,
      gender_v: req.body.gender_v,
      fname_v: req.body.fname_v,
      mname_v: req.body.mname_v,
      sname_v: req.body.sname_v,
      short_name_v: req.body.short_name_v,
      alias_v: req.body.alias_v,
      tin_v: req.body.tin_v,
      preferred_name_v: req.body.preferred_name_v,
      dob_v: req.body.dob_v,
      country_v: req.body.country_v,
      region_v: req.body.region_v,
      district_v: req.body.district_v,
      location_v: req.body.location_v,
      sublocation_v: req.body.sublocation_v,
      preferred_lang_v: req.body.preferred_lang_v,
      minor_v: req.body.minor_v,
      Guardian_id_v: req.body.Guardian_id_v,
      Guardian_type_v: req.body.Guardian_type_v,
      health_challenge_v: req.body.health_challenge_v,
      health_challenge_type_v: req.body.health_challenge_type_v,
      staff_indicator_v: req.body.staff_indicator_v,
      staff_id_v: req.body.staff_id_v,
      OCCUPATION_V: req.body.OCCUPATION_V,
      OTHER_OCCUPATION_V: req.body.OTHER_OCCUPATION_V,
      RESIDENT_V: req.body.RESIDENT_V,
      nATIONALITY_V: req.body.nATIONALITY_V,
      NATIONAL_ID_V: req.body.NATIONAL_ID_V,
      NIN_dateissued_v: req.body.NIN_dateissued_v,
      nin_expiry_v: req.body.nin_expiry_v,
      ID_type_v: req.body.ID_type_v,
      id_nO_v: req.body.id_nO_v,
      id_issue_at_v: req.body.id_issue_at_v,
      ID_issued_authority_v: req.body.ID_issued_authority_v,
      ID_date_issued_v: req.body.ID_date_issued_v,
      ID_expirydate_v: req.body.ID_expirydate_v,
      Mobile_comm_no_v: req.body.Mobile_comm_no_v,
      home_phone_type_v: req.body.home_phone_type_v,
      Home_phone_no_v: req.body.Home_phone_no_v,
      office_phone_type_v: req.body.office_phone_type_v,
      office_phone_no_v: req.body.office_phone_no_v,
      Office_email_v: req.body.Office_email_v,
      home_email_V: req.body.home_email_V,
      mobile_bankphoneno_V: req.body.mobile_bankphoneno_V,
      Mobile_bankemail_v: req.body.Mobile_bankemail_v,
      type_of_c_v: req.body.type_of_c_v,
      OVERRIDE_CODE_v: req.body.OVERRIDE_CODE_v,
      SUB_rel_v: req.body.SUB_rel_v,
      rel_dedup_v: req.body.rel_dedup_v,
      p_channel: req.body.p_channel,
      p_pterm_id: req.body.p_pterm_id,
      p_pip: req.body.p_pip,
    //   cust_no_v: req.body.cust_no_v,
      cust_no_v: { dir: oracledb.BIND_INOUT, type: oracledb.STRING , val: req.body.cust_no_v },
      rel_no_v: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      username_v: req.body.username_v,
      hostname_v: req.body.hostname_v,
      api_status: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      api_msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    };


    console.log("addRelationBindParams", addRelationBindParams)

    

    // Call the first stored procedure
    const addRelationResult = await connection.execute(
      `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_CASA_ADD_RELATION_RT(
                :title_v, :gender_v, :fname_v, :mname_v, :sname_v, :short_name_v, :alias_v, :tin_v, :preferred_name_v, 
                :dob_v, :country_v, :region_v, :district_v, :location_v, :sublocation_v, :preferred_lang_v, :minor_v, :Guardian_id_v, 
                :Guardian_type_v, :health_challenge_v, :health_challenge_type_v, :staff_indicator_v, :staff_id_v, 
                :OCCUPATION_V, :OTHER_OCCUPATION_V, :RESIDENT_V, :NATIONALITY_V, :NATIONAL_ID_V, :NIN_dateissued_v, 
                :nin_expiry_v, :ID_type_v, :id_nO_v, :id_issue_at_v, :ID_issued_authority_v, :ID_date_issued_v, 
                :ID_expirydate_v, :Mobile_comm_no_v, :home_phone_type_v, :Home_phone_no_v, :office_phone_type_v, 
                :office_phone_no_v, :Office_email_v, :home_email_V, :mobile_bankphoneno_V, :Mobile_bankemail_v, 
                :type_of_c_v, :OVERRIDE_CODE_v, :SUB_rel_v, :rel_dedup_v, :p_channel, :p_pterm_id, :p_pip, 
                :cust_no_v, :rel_no_v, :username_v, :hostname_v, :api_status, :api_msg); END;`,
      addRelationBindParams
    );

    const { outBinds: addRelationOutBinds } = addRelationResult;

    if (addRelationOutBinds.api_status === "Y") {
      // Second stored procedure (PRC_CUSTRELATION_LINK_TEMP)
      const linkRelationBindParams = {
        P_RELATION_NO: addRelationOutBinds.rel_no_v,
        P_CUST_NO: addRelationOutBinds.cust_no_v,
        P_FLAG: req.body.P_FLAG,
        P_POSTING_BRANCH: req.body.P_POSTING_BRANCH,
        P_POSTED_BY: req.body.P_POSTED_BY,
        P_POSTING_DATE: new Date(),
        P_POSTING_SYSDATE: new Date().toISOString().slice(0, 19),
        P_POSTING_TERMINAL: req.body.P_POSTING_TERMINAL,
        api_status: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        api_msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      };

      console.log({linkRelationBindParams})

      const linkRelationResult = await connection.execute(
        `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_CUSTRELATION_LINK_TEMP(
                    :P_RELATION_NO, :P_CUST_NO, :P_FLAG, :P_POSTING_BRANCH,
                    :P_POSTED_BY, :P_POSTING_DATE, :P_POSTING_SYSDATE, :P_POSTING_TERMINAL,
                    :api_status, :api_msg
                ); END;`,
        linkRelationBindParams
      );

      const { outBinds: linkRelationOutBinds } = linkRelationResult;

      // If second procedure successful, call PRC_ADD_ESERVICES_REL
      if (addRelationOutBinds.api_status === "Y") {
        // Third stored procedure (e-services)
        const eServicesBindParams = {
          P_RELATION_NO: addRelationOutBinds.rel_no_v,
          P_CUSTOMER_NO: addRelationOutBinds.cust_no_v,
          P_ACCT_LINK: req.body.P_ACCT_LINK,
          P_SMS_ALERT: req.body.P_SMS_ALERT,
          P_EMAIL_ALERT: req.body.P_EMAIL_ALERT,
          P_E_STATEMENT: req.body.P_E_STATEMENT,
          P_INTERNET_BANKING: req.body.P_INTERNET_BANKING,
          P_MOBILE_BANKING: req.body.P_MOBILE_BANKING,
          P_ATM_SERVICES: req.body.P_ATM_SERVICES,
          P_ATM_SERVICES_CLOB: JSON.stringify(req.body.P_ATM_SERVICES_CLOB),
          P_STATEMENT_FREQ: req.body.P_STATEMENT_FREQ,
          P_CARD_TYPE: req.body.P_CARD_TYPE,
          P_SERVICE_CODE: req.body.P_SERVICE_CODE,
          P_DAILY: req.body.P_DAILY,
          P_WEEKLY: req.body.P_WEEKLY,
          P_MONTHLY: req.body.P_MONTHLY,
          P_QUARTERLY: req.body.P_QUARTERLY,
          P_STATE_DATE: req.body.P_STATE_DATE,
          P_END_DATE: req.body.P_END_DATE,
          P_CUST_NO: req.body.P_CUST_NO,
          P_API_STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_API_MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        };

        // return res.send(eServicesBindParams)

        const eServicesResult = await connection.execute(
          `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_ADD_ESERVICES_REL(
            :P_RELATION_NO, :P_CUSTOMER_NO, :P_ACCT_LINK, :P_SMS_ALERT, :P_EMAIL_ALERT,
            :P_E_STATEMENT, :P_INTERNET_BANKING, :P_MOBILE_BANKING, :P_ATM_SERVICES, :P_ATM_SERVICES_CLOB,
            :P_SERVICE_CODE, :P_STATEMENT_FREQ, :P_CARD_TYPE, :P_DAILY, :P_WEEKLY, 
            :P_MONTHLY, :P_QUARTERLY, :P_STATE_DATE, :P_END_DATE, :P_CUST_NO, 
            :P_API_STATUS, :P_API_MSG
        ); END;`,
          eServicesBindParams
        );

        const { outBinds: eServicesOutBinds } = eServicesResult;

      
        const addressData = req.body.addressData; // Expecting a JSON array as addressData

        if (!addressData) {
          return res.status(400).send({ message: "Address data is required." });
        }

        // Convert the address data JSON to a CLOB (string)
        const addressDataClob = JSON.stringify(addressData);

        // Connect to the Oracle database
        connection = await oracledb.getConnection(config);

        // Prepare CLOB input and output parameters
        const bindVars = {
          P_RELATION_NO: addRelationOutBinds.rel_no_v,
          P_CUSTOMER_NO: addRelationOutBinds.cust_no_v,
          p_address_data: { val: addressDataClob, type: oracledb.CLOB },
          p_response: { dir: oracledb.BIND_OUT, type: oracledb.CLOB },
        };

        // return res.send(bindVars.P_RELATION_NO)

        // Call the stored procedure
        const result = await connection.execute(
          `BEGIN PKG_CASA_ACT_create_RT_V1.PRC_ADD_ADDRESS_TEMP(:P_RELATION_NO, :P_CUSTOMER_NO, :p_address_data, :p_response); END;`,
          bindVars
        );

        // Retrieve the response from the procedure
        const response = await result.outBinds.p_response.getData();

            // const relationNo = addRelationOutBinds.rel_no_v;
            // // const query = `SELECT * FROM TB_RELATION_TEMP WHERE RELATION_NO = :rel_no`;
            // const getcurrentdataresult = await connection.execute(query, [relationNo]);

            const custNo = addRelationOutBinds.cust_no_v;
            const query = `SELECT * FROM TB_RELATION_TEMP WHERE CUSTOMER_NUMBER = :cust_no`; // ORDER BY RELATION_NO ASC`;
            const getcurrentdataresult = await connection.execute(query, [custNo], { outFormat: oracledb.OUT_FORMAT_OBJECT });

        // Return the response to the client
        // res.status(200).send({ message: response });
        // return res.send(addRelationOutBinds)

        // Send the final response with eServices result
        res.status(200).json({
          cust_no_v: addRelationOutBinds.cust_no_v,
          rel_no_v: addRelationOutBinds.rel_no_v,
          api_status_add_relation: addRelationOutBinds.api_status,
          api_msg_add_relation: addRelationOutBinds.api_msg,
          api_status_link_relation: linkRelationOutBinds.api_status,
          api_msg_link_relation: linkRelationOutBinds.api_msg,
          api_status_eServices: eServicesOutBinds.P_API_STATUS,
          api_msg_eServices: eServicesOutBinds.P_API_MSG,
          message: response,
          insertedData: getcurrentdataresult.rows,
        });
      } else {
        // Handle the failure of the second procedure
        res.status(400).json({
          api_status: linkRelationOutBinds.api_status,
          api_msg: linkRelationOutBinds.api_msg,
        });
      }
    } else {
      // Handle the failure of the first procedure
      res.status(400).json({
        api_status: addRelationOutBinds.api_status,
        api_msg: addRelationOutBinds.api_msg,
      });
    }
  } catch (err) {
    // Pass the error to the error handler middleware
    next(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        // Log and pass the connection close error to the error handler
        const closeError = new Error("Failed to close database connection");
        closeError.statusCode = 500;
        closeError.details = {
          message: closeErr.message,
          stack: closeErr.stack,
        };
        next(closeError);
      }
    }
  }
}

module.exports = { executeStoredProcedure };
