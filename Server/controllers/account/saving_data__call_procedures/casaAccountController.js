const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function createCasaAccount(req, res) {
  const {
    p_app_flag, p_typeofC, p_TYPEOFCUSTOMER, p_customername, p_typeofacct,
    p_legalform, p_currencycode, p_CHANNEL, p_armcode, p_introsource,
    p_SECTOR, p_subSECTOR, p_Segment, p_subsegment, p_fxcategory,
    p_acmandate, p_documentreq_type, p_relationdets, P_cor_det,
    p_documents, p_accountreferee, p_aml, p_sourceofwealth, p_sourceoffund,
    p_transtype, p_nok_kin, p_address, p_branchcode, p_date, p_postedby,
    p_pterm_id, p_pip, p_hostname, p_member_type, p_customerno
  } = req.body;

  let connection;

  try {
    connection = await oracledb.getConnection(config);

    console.log("request body", p_documents)

    const result = await connection.execute(
      `BEGIN
         PKG_CASA_ACT_CREATE_RT_V1.PRC_CASA_CREATEACCT_RT(
           :p_app_flag, :p_typeofC, :p_TYPEOFCUSTOMER, :p_customername, :p_typeofacct,
           :p_legalform, :p_currencycode, :p_CHANNEL, :p_armcode, :p_introsource,
           :p_SECTOR, :p_subSECTOR, :p_Segment, :p_subsegment, :p_fxcategory,
           :p_acmandate, :p_documentreq_type, :p_relationdets, :P_cor_det, :p_documents,
           :p_accountreferee, :p_aml, :p_sourceofwealth, :p_sourceoffund, :p_transtype,
           :p_nok_kin, :p_address, :p_branchcode, :p_date, :p_postedby, :p_pterm_id,
           :p_pip, :p_hostname, :p_member_type, :p_customerno, :p_acctno, :P_acctno_settle,
           :P_acctno_settle2, :P_acctno_settle3, :api_status, :api_msg
         );
       END;`,
      {
        p_app_flag: p_app_flag, 
        p_typeofC: p_typeofC, 
        p_TYPEOFCUSTOMER: p_TYPEOFCUSTOMER,
        p_customername: p_customername, 
        p_typeofacct: p_typeofacct, 
        p_legalform: p_legalform,
        p_currencycode: p_currencycode, 
        p_CHANNEL: p_CHANNEL, 
        p_armcode: p_armcode,
        p_introsource: p_introsource, 
        p_SECTOR: p_SECTOR, 
        p_subSECTOR: p_subSECTOR,
        p_Segment: p_Segment, 
        p_subsegment: p_subsegment, 
        p_fxcategory: p_fxcategory,
        p_acmandate: p_acmandate, 
        p_documentreq_type: p_documentreq_type,
        p_relationdets: p_relationdets, 
        P_cor_det: P_cor_det, 
        p_documents: JSON.stringify(p_documents),  // Make sure to stringify arrays
        p_accountreferee: p_accountreferee, 
        p_aml: JSON.stringify(p_aml),  // Stringify AML data if it's an array
        p_sourceofwealth: p_sourceofwealth, 
        p_sourceoffund: p_sourceoffund, 
        p_transtype: p_transtype,
        p_nok_kin: p_nok_kin, 
        p_address: p_address, 
        p_branchcode: p_branchcode, 
        p_date: new Date(p_date),  // Ensure correct date format
        p_postedby: p_postedby,
        p_pterm_id: p_pterm_id, 
        p_pip: p_pip, 
        p_hostname: p_hostname, 
        p_member_type: p_member_type,
        p_customerno:p_customerno, // { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
        p_acctno: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
        P_acctno_settle: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 3000 },
        P_acctno_settle2: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
        P_acctno_settle3: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
        api_status: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1 },
        api_msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 200 }
      }
    );

    // Return the output values from the procedure
    res.status(200).json({
      customerno: result.outBinds.p_customerno,
      acctno: result.outBinds.p_acctno,
      acctno_settle: result.outBinds.P_acctno_settle,
      acctno_settle2: result.outBinds.P_acctno_settle2,
      acctno_settle3: result.outBinds.P_acctno_settle3,
      api_status: result.outBinds.api_status,
      api_msg: result.outBinds.api_msg
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = { createCasaAccount };
