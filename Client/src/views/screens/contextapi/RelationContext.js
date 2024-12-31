import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create the Context
export const RelationContext = createContext();

// Create the Provider Component
export const RelationProvider = ({ children }) => {
  // Initialize state for the form input fields
  const [add_new_relation, setAddNewRelation] = useState({
    title_v: "", // TITLE OF THE RELATION
    gender_v: "", // GENDER OF THE RELATION
    fname_v: "", // FIRST NAME OF THE RELATION
    mname_v: "", // MIDDLE NAME OF THE RELATION
    sname_v: "", // SURNAME OF THE RELATION
    short_name_v: "", // SHORT NAME OF THE RELATION
    alias_v: "", // ALIAS OF THE RELATION
    tin_v: "", // TIN NUMBER OF THE RELATION
    preferred_name_v: "", // PREFERRED NAME OF THE RELATION
    dob_v: "", // DATE OF BIRTH OF THE RELATION
    country_v: "", // COUNTRY OF ORIGIN THE RELATION
    region_v: "", // REGION THE RELATION COMES FROM
    district_v: "", // DISTRICT IN THE RELATION'S REGION
    location_v: "", // LOCATION OF THE RELATION
    preferred_lang_v: "", // PREFERRED LANGUAGE OF THE RELATION
    minor_v: "", // IS THE RELATION A MINOR ?
    Guardian_id_v: "", // IF THE RELATION IS A MINOR THEN PROVIDE THE GUARDIAN ID
    Guardian_type_v: "", // PROVIDE THE GUARDIAN TYPE IF THE RELATION IS A MINOR
    health_challenge_v: "", // DOES THE RELATION HAS ANY HEALTH CHALLENGE ?
    health_challenge_type_v: "", // IF YES THEN CHOOSE THE TYPE
    staff_indicator_v: "", // IS THE RELATION A STAFF OF THE BANK ? Y OR N
    staff_id_v: "", // IF Y (YES) THEN PROVIDE THE STAFF ID
    OCCUPATION_V: "", // OCCUPATION OR TYPE OF WORK OF THE RELATION
    OTHER_OCCUPATION_V: "", // OTHER OCCUPATION IF THE RELATION'S OCCUPATION IS NOT LISTED IN THE LIST OF VALUE (LOV)
    RESIDENT_V: "", // IS THE RELATION A RESIDENT ?
    nATIONALITY_V: "", // IF YES THEN CHOOSE THE COUNTRY
    NATIONAL_ID_V: "", // ENTER NATION IDENTIFICATION NUMBER
    NIN_dateissued_v: "", // DATE THE ID CARD WAS GIVEN TO THE RELATION
    nin_expiry_v: "", // DATE THE ID CARD WILL EXPIRE
    ID_type_v: "", // WHAT IS THE TYPE OF ID
    id_nO_v: "", // OTHER ID NUMBER
    id_issue_at_v: "", // PLACE OTHER ID WAS ISSUED
    ID_issued_authority_v: "", //AUTHORITY THAT ISSUES THE OTHER ID
    ID_date_issued_v: "", // OTHER ID DATE ISSUED
    ID_expirydate_v: "", // OTHER ID DATE EXPIRED
    Mobile_comm_no_v: "", // MOBILE NUMBER OF THE RELATION
    home_phone_type_v: "", // HOME PHONE TYPE OF THE RELATION
    Home_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
    office_phone_type_v: "", // OFFICE PHONE TYPE OF THE RELATION
    office_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
    Office_email_v: "", // OFFICE EMAIL OF THE RELATION
    home_email_V: "",  // HOME EMAIL OF THE RELATION
    mobile_bankphoneno_V: "",
    Mobile_bankemail_v: "",
    type_of_c_v: "I", // TYPE OF CUSTOMER
    OVERRIDE_CODE_v: "", 
    SUB_rel_v: "",
    rel_dedup_v: "E",
    p_channel: "",
    p_pterm_id: "",
    p_pip: "",
    cust_no_v: "", // PASS CUSTOMER NUMBER IF IT WILL BE REUSED AGAIN ELSE PROCEDURE SHOULD RETURN IT
    rel_no_v: "", // RELATION NUMBER
    username_v: "", // 
    hostname_v: "",
    P_FLAG: "",
    P_POSTING_BRANCH: "", 
    P_POSTED_BY: "", // THE CUSTOMER SERVICE PROVIDER DETAILS SHOULD BE ADDED HERE (NAME)
    P_POSTING_TERMINAL: "",
    P_ACCT_LINK: "",
    P_SMS_ALERT: "N", // Default "No"
    P_EMAIL_ALERT: "N", // Default "No"
    P_E_STATEMENT: "N", // Default "No"
    P_INTERNET_BANKING: "N", // Default "No"
    P_MOBILE_BANKING: "N", // Default "No"
    P_ATM_SERVICES: "N", // Default "No"
    P_ATM_SERVICES_CLOB: [{ accountNumber: "", serviceCode: "" }], // SERVICECODE IS THE CARD_TYPE IN THE TABLE
    P_SERVICE_CODE: "",
    P_STATEMENT_FREQ: "", // THIS IS EITHER DAILY, WEEKLY, MONTHLY, QUARTERLY, STATE_DATE(START DATE)
    P_CARD_TYPE: "",
    P_DAILY: "N", // Default "No"
    P_WEEKLY: "N", // Default "No"
    P_MONTHLY: "N", // Default "No"
    P_QUARTERLY: "N", // Default "No"
    P_STATE_DATE: "",
    P_END_DATE: "",
    addressData: [ // KEY TO INSERT THE ADDRESS DETAILS INTO THE ADDRESS TABLE
      {
        PO_ADDRESS1: "",
        PO_ADDRESS2: "",
        PO_CITY: "",
        STATE: "",
        POSTAL_ZIP_CODE: "",
        COUNTRY_CODE: "",
        PO_ATTENTION_PARTY: "",
        PO_NEAREST_LAND_MARK: "",
        HOUSE_TYPE: "",
        PH_ADDRESS1: "",
        PH_ADDRESS2: "",
        PH_ADDRESS3: "",
        LOCATION: "",
        PH_CITY: "",
        PH_NEAREST_LAND_MARK: "",
        FAX_NO: "",
        PHONE1: "",
        PHONE2: "",
        NATURE_OF_OWNERSHIP: "",
        STYED_SINCE: "",
        COST_OF_ACCOM: "",
        CURRENT_VALUE: "",
        BALANCE_MORTGUAGE: "",
        PH_ATTENTION_PARTY: "",
        APPROVAL_FLAG: "Y",
        POSTED_BY: "",
        POSTING_TERMINAL: "",
        APPROVED_BY: "",
        BRANCH_CODE: "",
        SRL_NO: "",
        E_MAIL: "",
        ADDRESS_ID: "",
        KYC_FLAG: "Y",
        RENT_PER_ANNUAL: "",
        STAYED_TO: "",
        OWNER_OF_PROPERTY: "",
        ADDRESS_TYPE: "",
        POSTING_SYS_DATE: "",
        POSTING_SYS_TIME: "",
      },
    ],
  });
  // State to manage the customer's account number if required
  const [custNo, setCustNo] = useState('');

  // Function to handle form inputs and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddNewRelation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log("add_new_relation", add_new_relation)

  // Function to handle radio button and checkbox changes
  const handleCheckboxChangep = (e) => {
    const { name, checked } = e.target;
    setAddNewRelation((prevState) => ({
      ...prevState,
      [name]: checked ? 'Y' : 'N' 
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCustNo = custNo !== '' ? custNo : add_new_relation.cust_no_v;

    setAddNewRelation((prevState) => ({
      ...prevState,
      cust_no_v: finalCustNo
    }));

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.203.14.195:3320/api/add-relation',
      headers: { 
        'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(add_new_relation)
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  // Provide the state and functions to children components
  return (
    <RelationContext.Provider
      value={{
        add_new_relation,
        handleInputChange,
        handleCheckboxChangep,
        handleSubmit,
        setCustNo,
        custNo,
      }}
    >
      {children}
    </RelationContext.Provider>
  );
};
