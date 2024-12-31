const oracledb = require("oracledb");
const config = require("../../config/dbConfig");

// cooperate
class CooperateDetails {
  constructor() {
    this.initializeDB();
  }

  async initializeDB() {
    try {
      this.connection = await oracledb.getConnection(config);
      if (this.connection) {
        console.log("Database connected successfully.");
      }
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  }

  fetch_details_data = async (req, res) => {
    const { customer_no } = req.body;
    try {
      const query = `SELECT  * FROM TB_RELATION WHERE nvl(REL_FLAG,'Y') = 'Y' AND CUSTOMER_NUMBER = :customer_no`;
      const result = await this.connection.execute(query, { customer_no }, { autoCommit: true });
      if (result.rows) {
        const response = [];
        for (let i = 0; i < result.rows.length; i++) {
          const rowData = {}; // Create an object for each row

          for (let x = 0; x < result.metaData.length; x++) {
            const columnName = result.metaData[x].name.toLowerCase();
            const columnValue = result.rows[i][x];
            rowData[columnName] = columnValue; // Assign each column to the object
          }

          response.push(rowData); // Push the object to the response array
        }
        return res.status(200).send(response);
      }
    } catch (err) {
      return res.status(500).send("Something went wrong... Nothing was returned!!");
    }
  };

  fetch_address_data = async (req, res) => {
    const { customer_no } = req.body;
    try {
      const query = `SELECT  * FROM tb_address where CUSTOMER_NUMBER = :customer_no`;
      const result = await this.connection.execute(query, { customer_no }, { autoCommit: true });
      if (result.rows) {
        const response = [];
        for (let i = 0; i < result.rows.length; i++) {
          const rowData = {}; // Create an object for each row

          for (let x = 0; x < result.metaData.length; x++) {
            const columnName = result.metaData[x].name.toLowerCase();
            const columnValue = result.rows[i][x];
            rowData[columnName] = columnValue; // Assign each column to the object
          }

          response.push(rowData); // Push the object to the response array
        }
        return res.status(200).send(response);
      }
    } catch (err) {
      return res.status(500).send("Something went wrong... Nothing was returned!!");
    }
  };

  prc_amend_address = async (req, res) => {
    const {
      state,
      e_mail,
      phone1,
      phone2,
      house_type,
      ph_address2,
      nature_of_ownership,
      ph_address1,
      styed_since,
      ph_address3,
      cost_of_accom,
      location,
      current_value,
      ph_city,
      balance_mortguage,
      ph_attention_party,
      ph_nearest_land_mark,
      fax_no,
      po_address1,
      postal_zip_code,
      po_address2,
      country_code,
      po_city,
      po_attention_party,
      po_nearest_land_mark,
    } = req.body;

    try {
      const query = `BEGIN PKG_STATICAMEND_RT.PRC_ADDRESS_SAVE_RT(
        :state,
        :e_mail,
        :phone1,
        :phone2,
        :house_type,
        :ph_address2,
        :nature_of_ownership,
        :ph_address1,
        :styed_since,
        :ph_address3,
        :cost_of_accom,
        :location,
        :current_value,
        :ph_city,
        :balance_mortguage,
        :ph_attention_party,
        :ph_nearest_land_mark,
        :fax_no,
        :po_address1,
        :postal_zip_code,
        :po_address2,
        :country_code,
        :po_city,
        :po_attention_party,
        :po_nearest_land_mark
      ); END;`;

      const params = {
        state,
        e_mail,
        phone1,
        phone2,
        house_type,
        ph_address2,
        nature_of_ownership,
        ph_address1,
        styed_since,
        ph_address3,
        cost_of_accom,
        location,
        current_value,
        ph_city,
        balance_mortguage,
        ph_attention_party,
        ph_nearest_land_mark,
        fax_no,
        po_address1,
        postal_zip_code,
        po_address2,
        country_code,
        po_city,
        po_attention_party,
        po_nearest_land_mark,
      };

      const result = await this.connection.execute(query, params, { autoCommit: true });
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).send("Something went wrong... Nothing was returned!!");
    }
  };
}

module.exports = CooperateDetails;
