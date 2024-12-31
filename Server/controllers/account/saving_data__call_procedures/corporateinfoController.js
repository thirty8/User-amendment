const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};
async function addCorporateInformation(req, res) {
  const {
    CUSTOMER_NAME,
    CORP_FLATHSENO,
    CORP_STREETNAME,
    CORP_LOCATION,
    CORP_POSTALADDRESS,
    CORP_COUNTRY,
    CORP_EMAIL,
    CORP_PREF_LANG,
    DATE_OFINCORP,
    CORP_COMM_MODE,
    CORP_PHONENO,
    CORP_TINNO,
    BANKSISCOMP,
    BUSINESSDESC,
    COUNTRY_OF_REGISTRATION,
    CORP_PHYSICAL_ADDRESS,
    TOWN_CITY,
    POSTAL_CODE,
    POSTAL_ADDRESS,
    PLOT_NUMBER,
    WEBSITE_URL,
    TELEPHONE,
    FAX_NUMBER,
    PERSONAL_FULLNAME,
    PERSONAL_EMAIL,
    PERSONAL_PHONENUMBER,
    CORP_REQISTERNO,
  } = req.body;

  let CUSTOMER_NUMBER;

  try {
    const connection = await oracledb.getConnection(config);
    
    
    const result = await connection.execute(
      `BEGIN 
        PKG_CASA_ACT_create_RT_V1.PRC_ADD_CORPORATE_INFORMATION(
          :CUSTOMER_NAME,
          :CORP_FLATHSENO,
          :CORP_STREETNAME,
          :CORP_LOCATION,
          :CORP_POSTALADDRESS,
          :CORP_COUNTRY,
          :CORP_EMAIL,
          :CORP_PREF_LANG,
          :DATE_OFINCORP,
          :CORP_COMM_MODE,
          :CORP_PHONENO,
          :CORP_TINNO,
          :BANKSISCOMP,
          :BUSINESSDESC,
          :COUNTRY_OF_REGISTRATION,
          :CORP_PHYSICAL_ADDRESS,
          :TOWN_CITY,
          :POSTAL_CODE,
          :POSTAL_ADDRESS,
          :PLOT_NUMBER,
          :WEBSITE_URL,
          :TELEPHONE,
          :FAX_NUMBER,
          :PERSONAL_FULLNAME,
          :PERSONAL_EMAIL,
          :PERSONAL_PHONENUMBER,
          :CORP_REQISTERNO,
          :CUSTOMER_NUMBER
        ); 
      END;`,
      {
        // Bind parameters
        CUSTOMER_NAME,
        CORP_FLATHSENO,
        CORP_STREETNAME,
        CORP_LOCATION,
        CORP_POSTALADDRESS,
        CORP_COUNTRY,
        CORP_EMAIL,
        CORP_PREF_LANG,
        DATE_OFINCORP: DATE_OFINCORP ? new Date(DATE_OFINCORP) : null, // Convert to Date object if needed
        CORP_COMM_MODE,
        CORP_PHONENO,
        CORP_TINNO,
        BANKSISCOMP,
        BUSINESSDESC,
        COUNTRY_OF_REGISTRATION,
        CORP_PHYSICAL_ADDRESS,
        TOWN_CITY,
        POSTAL_CODE,
        POSTAL_ADDRESS,
        PLOT_NUMBER,
        WEBSITE_URL,
        TELEPHONE,
        FAX_NUMBER,
        PERSONAL_FULLNAME,
        PERSONAL_EMAIL,
        PERSONAL_PHONENUMBER,
        CORP_REQISTERNO,
        CUSTOMER_NUMBER: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );

    // Get the output CUSTOMER_NUMBER
    CUSTOMER_NUMBER = result.outBinds.CUSTOMER_NUMBER;

    // Send the response
    res.status(200).json({ success: true, CUSTOMER_NUMBER });
  } catch (err) {
    console.error('Error executing procedure: ', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    // try {
    //   // Ensure the connection is closed
    //   if (connection) {
    //     await connection.close();
    //   }
    // } catch (err) {
    //   console.error('Error closing connection: ', err);
    // }
  }
}

module.exports = { addCorporateInformation };
