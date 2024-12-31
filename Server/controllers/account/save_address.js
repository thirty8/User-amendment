const oracledb = require("oracledb");
const config = require("../../config/dbConfig");

async function saveAddress(req, res) {
  try {
    const {
      customer_number,
      address_id,
      address_type,
      house_type,
      ph_address1,
      ph_address2,
      ph_address3,
      location,
      ph_city,
      ph_nearest_land_mark,
      po_address1,
      po_address2,
      po_city,
      po_nearest_land_mark,
      postal_zip_code,
      state,
      country_code,
      owner_of_property,
      stayed_since,
      stayed_to,
      rent_per_annum,
      current_value,
      balance_mortguage,
      po_attention_party,
      phone1,
      phone2,
      email,
      branch_code,
      county,
      approval_flag,
      posted_by,
      posting_sys_date,
      posting_sys_time,
      posting_terminal,
      approved_by,
      approval_date,
      approval_time,
      approval_terminal,
      amended_by,
      amended_date,
      amended_time,
      amended_terminal,
    } = req.body;

    console.log(req.body);
    // Get a connection to the Oracle database
    const connection = await oracledb.getConnection(config);

    // Call the stored procedure
    await connection.execute(
      `BEGIN PKG_STATICAMEND_RT.PRC_ADDRESS_SAVE_RT(
        :p_customer_number, :p_address_id, :p_address_type, :p_house_type, :p_ph_address1, :p_ph_address2, :p_ph_address3,
        :p_location, :p_ph_city, :p_ph_nearest_land_mark, :p_po_address1, :p_po_address2, :p_po_city, :p_po_nearest_land_mark,
        :p_postal_zip_code, :p_state, :p_country_code, :p_owner_of_property, :p_stayed_since, :p_stayed_to,
        :p_rent_per_annum, :p_current_value, :p_balance_mortguage, :p_po_attention_party, :p_phone1,
        :p_phone2, :p_email, :p_branch_code, :p_county, :p_approval_flag, :p_posted_by, :p_posting_sys_date,
        :p_posting_sys_time, :p_posting_terminal, :p_approved_by, :p_approval_date, :p_approval_time,
        :p_approval_terminal, :p_amended_by, :p_amended_date, :p_amended_time, :p_amended_terminal
      ); END;`,
      {
        p_customer_number: { dir: oracledb.BIND_IN, val: customer_number },
        p_address_id: { dir: oracledb.BIND_IN, val: address_id },
        p_address_type: { dir: oracledb.BIND_IN, val: address_type },
        p_house_type: { dir: oracledb.BIND_IN, val: house_type },
        p_ph_address1: { dir: oracledb.BIND_IN, val: ph_address1 },
        p_ph_address2: { dir: oracledb.BIND_IN, val: ph_address2 },
        p_ph_address3: { dir: oracledb.BIND_IN, val: ph_address3 },
        p_location: { dir: oracledb.BIND_IN, val: location },
        p_ph_city: { dir: oracledb.BIND_IN, val: ph_city },
        p_ph_nearest_land_mark: {
          dir: oracledb.BIND_IN,
          val: ph_nearest_land_mark,
        },
        p_po_address1: { dir: oracledb.BIND_IN, val: po_address1 },
        p_po_address2: { dir: oracledb.BIND_IN, val: po_address2 },
        p_po_city: { dir: oracledb.BIND_IN, val: po_city },
        p_po_nearest_land_mark: {
          dir: oracledb.BIND_IN,
          val: po_nearest_land_mark,
        },
        p_postal_zip_code: { dir: oracledb.BIND_IN, val: postal_zip_code },
        p_state: { dir: oracledb.BIND_IN, val: state },
        p_country_code: { dir: oracledb.BIND_IN, val: country_code },
        p_owner_of_property: { dir: oracledb.BIND_IN, val: owner_of_property },
        p_stayed_since: { dir: oracledb.BIND_IN, val: stayed_since },
        p_stayed_to: { dir: oracledb.BIND_IN, val: stayed_to },
        p_rent_per_annum: { dir: oracledb.BIND_IN, val: rent_per_annum },
        p_current_value: { dir: oracledb.BIND_IN, val: current_value },
        p_balance_mortguage: { dir: oracledb.BIND_IN, val: balance_mortguage },
        p_po_attention_party: {
          dir: oracledb.BIND_IN,
          val: po_attention_party,
        },
        p_phone1: { dir: oracledb.BIND_IN, val: phone1 },
        p_phone2: { dir: oracledb.BIND_IN, val: phone2 },
        p_email: { dir: oracledb.BIND_IN, val: email },
        p_branch_code: { dir: oracledb.BIND_IN, val: branch_code },
        p_county: { dir: oracledb.BIND_IN, val: county },
        p_approval_flag: { dir: oracledb.BIND_IN, val: approval_flag },
        p_posted_by: { dir: oracledb.BIND_IN, val: posted_by },
        p_posting_sys_date: { dir: oracledb.BIND_IN, val: posting_sys_date },
        p_posting_sys_time: { dir: oracledb.BIND_IN, val: posting_sys_time },
        p_posting_terminal: { dir: oracledb.BIND_IN, val: posting_terminal },
        p_approved_by: { dir: oracledb.BIND_IN, val: approved_by },
        p_approval_date: { dir: oracledb.BIND_IN, val: approval_date },
        p_approval_time: { dir: oracledb.BIND_IN, val: approval_time },
        p_approval_terminal: { dir: oracledb.BIND_IN, val: approval_terminal },
        p_amended_by: { dir: oracledb.BIND_IN, val: amended_by },
        p_amended_date: { dir: oracledb.BIND_IN, val: amended_date },
        p_amended_time: { dir: oracledb.BIND_IN, val: amended_time },
        p_amended_terminal: { dir: oracledb.BIND_IN, val: amended_terminal },
      }
    );

    // Commit the transaction
    await connection.commit();

    // Release the connection
    await connection.close();

    res.status(200).json({ message: "Address saved successfully." });
  } catch (error) {
    console.error("Error executing procedure:", error);
    res.status(500).json({ error: "Internal server error." });
  }

  //   state: details?.state,
  // email: details?.e_mail,
  // phone1: details?.phone1,
  // phone2: details?.phone2,
  // house_type: details?.house_type,
  // ph_address1: details?.ph_address1,
  // ph_address2: details?.ph_address2,
  // ph_address3: details?.ph_address3,
  // stayed_since: details?.styed_since,
  // // ph_address3:details?.cost_of_accom,
  // location: details?.location,
  // current_value: details?.current_value,
  // ph_city: details?.ph_city,
  // balance_mortguage: details?.balance_mortguage,
  // ph_nearest_land_mark: details?.ph_nearest_land_mark,
  // // ph_attention_party:details?.ph_attention_party,

  // // fax_no:details?.fax_no,
  // po_address1: details?.po_address1,
  // postal_zip_code: details?.postal_zip_code,
  // po_address2: details?.po_address2,
  // country_code: details?.country_code,
  // po_city: details?.po_city,
  // po_attention_party: details?.po_attention_party,
  // po_nearest_land_mark: details?.po_nearest_land_mark,
}

module.exports = {
  saveAddress,
};
